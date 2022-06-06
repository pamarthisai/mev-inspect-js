import { Coder, Event } from 'abi-coder';

import { Log } from '../chain.js';

import {
  Block,
  Classifier,
  LendingProtocol,
  Market,
  Pool,
  Repayment,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
} from './base.js';
import {
  ChainId,
  nativeAsset,
  getFactoryByAddress,
  getPoolByAddress,
  isValidFactory,
  isValidPool,
  isKnownRouter,
} from './directory.js';
import aaveV2Classifiers from './items/aaveV2.js';
import aaveV3Classifiers from './items/aaveV3.js';
import balancerV1Classifier from './items/balancerV1.js';
import balancerV2Classifiers from './items/balancerV2.js';
import compoundV2Classifiers from './items/compoundV2.js';
import erc20Classifier from './items/erc20.js';
import uniswapV2Classifier from './items/uniswapV2.js';
import uniswapV3Classifier from './items/uniswapV3.js';

interface ClassifiedEvent extends Event {
  address: string;
  blockHash: string;
  blockNumber: number;
  transactionHash: string;
  gasUsed: number;
  logIndex: number;
  classifier: Classifier;
}

function classify(chainId: ChainId, logs: Log[]): ClassifiedEvent[] {
  return logs.map((log) => classifyLog(chainId, log)).flat();
}

function classifyLog(chainId: ChainId, log: Log): ClassifiedEvent[] {
  const events: ClassifiedEvent[] = [];
  const classifiers = getClassifiers();
  for (const classifier of classifiers) {
    const coder = new Coder(classifier.abi);
    try {
      const {
        topics,
        data,
        address,
        transactionHash,
        gasUsed,
        logIndex,
        blockHash,
        blockNumber,
      } = log;
      const event = coder.decodeEvent(topics, data);
      if (!classifier.isValid(event, address, chainId)) {
        continue;
      }
      const classifiedEvent: ClassifiedEvent = {
        address,
        blockHash,
        blockNumber,
        transactionHash,
        gasUsed,
        logIndex,
        classifier,
        ...event,
      };
      events.push(classifiedEvent);
    } catch {
      continue;
    }
  }
  return events;
}

function getClassifiers(): Classifier[] {
  return [
    balancerV1Classifier,
    ...balancerV2Classifiers,
    erc20Classifier,
    uniswapV2Classifier,
    uniswapV3Classifier,
    ...compoundV2Classifiers,
    ...aaveV2Classifiers,
    ...aaveV3Classifiers,
  ];
}

export default classify;

export {
  Block,
  ChainId,
  ClassifiedEvent,
  LendingProtocol,
  Market,
  Pool,
  Repayment,
  Seizure,
  Swap,
  SwapProtocol,
  Transaction,
  Transfer,
  getFactoryByAddress,
  getPoolByAddress,
  isValidFactory,
  isValidPool,
  isKnownRouter,
  nativeAsset,
};
