import { BigNumber } from '@ethersproject/bignumber';
import { Event } from 'abi-coder';
import { Call } from 'ethcall';

import exchangeAbi from '../../abi/openseaSeaport.js';
import { Classifier, NftPool, NftPoolData, NftSwap } from '../base.js';
import { ChainId, ClassifiedEvent, nativeAsset } from '../index.js';

interface SpentItem {
  itemType: number;
  token: string;
  identifier: BigNumber;
  amount: BigNumber;
}

interface ReceivedItem extends SpentItem {
  recipient: string;
}

function isValid(event: Event): boolean {
  return event.name === 'OrderFulfilled';
}

function getPoolCalls(): Call[] {
  return [];
}

function processPoolCalls(
  _results: unknown[],
  address: string,
): NftPoolData | null {
  return {
    factoryAddress: address.toLowerCase(),
    asset: '',
    collection: '',
    metadata: {},
  };
}

function parse(
  pool: NftPool,
  event: ClassifiedEvent,
  chainId: ChainId,
): NftSwap | null {
  const {
    values,
    transactionHash: hash,
    gasUsed,
    logIndex,
    address,
    blockHash,
    blockNumber,
  } = event;

  const offerer = (values.offerer as string).toLowerCase();
  const recipient = (values.recipient as string).toLowerCase();
  const offer = values.offer as SpentItem[];
  const consideration = values.consideration as ReceivedItem[];

  // Filter out fee, royalty, and other payments
  const recipientConsideration = consideration.filter(
    (item) => item.recipient.toLowerCase() === offerer,
  );

  if (offer.length !== 1 || recipientConsideration.length !== 1) {
    // Only single item trades are supported
    return null;
  }

  const spentItem = offer[0];
  const receivedItem = recipientConsideration[0];
  const considerationAmount = consideration.reduce(
    (total, item) => total + item.amount.toBigInt(),
    0n,
  );
  const feeAmount = considerationAmount - receivedItem.amount.toBigInt();

  const from = recipient;
  const to = recipient;

  return {
    contract: {
      address: pool.address,
      protocol: {
        abi: 'OpenseaSeaport',
        factory: pool.factory,
      },
    },
    block: {
      hash: blockHash,
      number: blockNumber,
    },
    transaction: {
      hash,
      gasUsed,
    },
    event: {
      address: address.toLowerCase(),
      logIndex,
    },
    from,
    to,
    assetIn:
      receivedItem.itemType === 0
        ? {
            type: 'erc20',
            address: nativeAsset[chainId],
          }
        : receivedItem.itemType === 1
        ? {
            type: 'erc20',
            address: spentItem.token.toLowerCase(),
          }
        : {
            type: 'erc721',
            collection: receivedItem.token.toLowerCase(),
            id: receivedItem.identifier.toBigInt(),
          },
    amountIn:
      receivedItem.itemType < 2
        ? considerationAmount
        : considerationAmount - feeAmount,
    assetOut:
      spentItem.itemType === 0
        ? {
            type: 'erc20',
            address: nativeAsset[chainId],
          }
        : spentItem.itemType === 1
        ? {
            type: 'erc20',
            address: spentItem.token.toLowerCase(),
          }
        : {
            type: 'erc721',
            collection: spentItem.token.toLowerCase(),
            id: spentItem.identifier.toBigInt(),
          },
    amountOut:
      receivedItem.itemType < 2
        ? spentItem.amount.toBigInt()
        : spentItem.amount.toBigInt() - feeAmount,
  };
}

const CLASSIFIER: Classifier = {
  type: 'nft_swap',
  protocol: 'OpenseaSeaport',
  abi: exchangeAbi,
  isValid,
  parse,
  pool: {
    getCalls: getPoolCalls,
    processCalls: processPoolCalls,
  },
};
export default CLASSIFIER;
