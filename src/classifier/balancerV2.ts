import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import vaultAbi from '../abi/balancerV2/vault.js';

import { Classifier, Pool, Swap, Transfer } from './base.js';

import { ClassifiedEvent } from './index.js';

const VAULT = '0xBA12222222228d8Ba445958a75a0704d566BF2C8';

async function fetchPool(provider: Provider, id: string): Promise<Pool> {
  const address = id.substring(0, 42);
  const vaultContract = new Contract(VAULT, vaultAbi, provider);
  const poolTokens = await vaultContract.getPoolTokens(id);
  const assets = poolTokens.tokens;
  return { address, assets };
}

function parse(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): Swap | null {
  const { values, transactionHash: hash, logIndex, address } = event;
  const { address: poolAddress } = pool;

  const assetIn = values.tokenIn as string;
  const assetOut = values.tokenOut as string;
  const amountIn = (values.amountIn as BigNumber).toBigInt();
  const amountOut = (values.amountOut as BigNumber).toBigInt();

  const swapTransfers = getSwapTransfers(logIndex, transfers);
  if (!swapTransfers) {
    return null;
  }
  const [transferIn, transferOut] = swapTransfers;
  if (transferIn.event.address !== assetIn) {
    return null;
  }
  if (transferOut.event.address !== assetOut) {
    return null;
  }
  if (transferIn.value !== amountIn) {
    return null;
  }
  if (transferOut.value !== amountOut) {
    return null;
  }
  if (transferIn.to !== VAULT) {
    return null;
  }
  if (transferOut.from !== VAULT) {
    return null;
  }
  const from = transferIn.from;
  const to = transferOut.to;

  return {
    contract: poolAddress,
    from,
    to,
    assetIn,
    amountIn,
    assetOut,
    amountOut,
    transaction: {
      hash,
    },
    event: {
      logIndex,
      address,
    },
  };
}

function getSwapTransfers(
  logIndex: number,
  transfers: Transfer[],
): [Transfer, Transfer] | null {
  const transferIn = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex + 1,
  );
  const transferOut = transfers.find(
    (transfer) => transfer.event.logIndex === logIndex + 2,
  );
  if (!transferIn) {
    return null;
  }
  if (!transferOut) {
    return null;
  }
  return [transferIn, transferOut];
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'BalancerV2',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: vaultAbi,
  },
];

export { fetchPool, CLASSIFIERS };
