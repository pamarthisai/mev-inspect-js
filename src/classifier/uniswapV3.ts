import { BigNumber } from '@ethersproject/bignumber';
import { Contract } from '@ethersproject/contracts';
import { Provider } from '@ethersproject/providers';

import poolAbi from '../abi/uniswapV3/pool.js';
import { equalWithTolerance } from '../utils.js';

import {
  Classifier,
  Pool,
  Swap,
  Transfer,
  getLatestPoolTransfer,
} from './base.js';

import { ClassifiedEvent } from './index.js';

async function fetchPool(provider: Provider, address: string): Promise<Pool> {
  const poolContract = new Contract(address, poolAbi, provider);
  const asset0 = (await poolContract.token0()) as string;
  const asset1 = (await poolContract.token1()) as string;
  const assets = [asset0.toLowerCase(), asset1.toLowerCase()];
  return { address: address.toLowerCase(), assets };
}

function parse(
  pool: Pool,
  event: ClassifiedEvent,
  transfers: Transfer[],
): Swap | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;
  const { address: poolAddress, assets } = pool;

  const poolTransfer = getLatestPoolTransfer(poolAddress, logIndex, transfers);
  if (!poolTransfer) {
    return null;
  }

  const from = poolTransfer.from;
  const to = (values.recipient as string).toLowerCase();
  const amount0 = (values.amount0 as BigNumber).toBigInt();
  const amount1 = (values.amount1 as BigNumber).toBigInt();

  const assetOut = amount0 < 0 ? assets[0] : assets[1];
  const amountOut = amount0 < 0 ? amount0 * -1n : amount1 * -1n;

  const assetIn = amount0 > 0 ? assets[0] : assets[1];
  const amountIn = amount0 > 0 ? amount0 : amount1;

  if (poolTransfer.event.address !== assetIn) {
    return null;
  }
  if (!equalWithTolerance(poolTransfer.value, amountIn, 0.001)) {
    return null;
  }

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
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
  };
}

const CLASSIFIERS: Classifier[] = [
  {
    protocol: 'UniswapV3',
    event: { name: 'Swap', type: 'swap', parse, fetchPool },
    abi: poolAbi,
  },
];

export { fetchPool, CLASSIFIERS };
