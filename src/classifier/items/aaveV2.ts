import { BigNumber } from '@ethersproject/bignumber';
import { Provider } from '@ethersproject/providers';
import { Event } from 'abi-coder';

import poolAbi from '../../abi/aaveV2Pool.js';
import { Classifier, Liquidation, Market } from '../base.js';
import { ChainId, lendingPools } from '../directory.js';
import { ClassifiedEvent } from '../index.js';

function isValid(event: Event, address: string, chainId: ChainId): boolean {
  const pools = lendingPools[chainId]['AaveV2'];
  const validPool = pools.some((list) => list.includes(address.toLowerCase()));
  return event.name === 'LiquidationCall' && validPool;
}

async function fetchMarket(
  _chainId: ChainId,
  _provider: Provider,
  address: string,
): Promise<Market> {
  // TODO fix
  return {
    address: address.toLowerCase(),
    pool: address.toLowerCase(),
    asset: '',
  };
}

function parseLiquidation(
  market: Market,
  event: ClassifiedEvent,
): Liquidation | null {
  const { values, transactionHash: hash, gasUsed, logIndex, address } = event;

  const assetCollateral = (values.collateralAsset as string).toLowerCase();
  const assetDebt = (values.debtAsset as string).toLowerCase();
  const borrower = (values.user as string).toLowerCase();
  const amountDebt = (values.debtToCover as BigNumber).toBigInt();
  const amountCollateral = (
    values.liquidatedCollateralAmount as BigNumber
  ).toBigInt();
  const liquidator = (values.liquidator as string).toLowerCase();

  return {
    contract: {
      address,
      protocol: {
        abi: 'AaveV2',
        pool: market.pool,
      },
    },
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      logIndex,
      address: address.toLowerCase(),
    },
    liquidator,
    borrower,
    assetDebt,
    amountDebt,
    assetCollateral,
    amountCollateral,
  };
}

const CLASSIFIERS: Classifier = {
  type: 'liquidation',
  protocol: 'AaveV2',
  abi: poolAbi,
  isValid,
  parse: parseLiquidation,
  fetchMarket,
};

export default CLASSIFIERS;
