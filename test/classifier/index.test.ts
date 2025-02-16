import { describe, test, expect } from 'vitest';

import { Log } from '../../src/chain.js';
import { Classifier } from '../../src/classifier/base.js';
import classify from '../../src/classifier/index.js';
import aaveV2Classifiers from '../../src/classifier/items/aaveV2.js';
import balancerV2Classifiers from '../../src/classifier/items/balancerV2.js';
import compoundV2Classifiers from '../../src/classifier/items/compoundV2.js';
import erc20Classifier from '../../src/classifier/items/erc20.js';
import uniswapV2Classifier from '../../src/classifier/items/uniswapV2.js';
import uniswapV3Classifier from '../../src/classifier/items/uniswapV3.js';

const ETHEREUM = 1;

describe('Classfiers', () => {
  test('transfers', () => {
    const erc20TransferLog: Log = {
      blockHash:
        '0x81c4fe77261262d47111f7cdc4752d627b7d4153802e5d629bbe05fd5b6fe1b0',
      blockNumber: 14803804,
      transactionHash:
        '0x5d61baac521ccd94e193dc7e1e97e6f5f05df731b0305676f0e709671ca85637',
      logIndex: 472,
      gasUsed: 47030,
      address: '0x6b175474e89094c44da98b954eedeac495271d0f',
      topics: [
        '0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef',
        '0x000000000000000000000000b8eaafa0502a16068ea82dfde38e1a08cd6034a6',
        '0x0000000000000000000000007b820cecfb85a2da4615d417cdf62dc3239afe0c',
      ],
      data: '0x000000000000000000000000000000000000000000000001ddd7b0a5477ec800',
    };

    const balancerV2TransferLog: Log = {
      blockHash:
        '0x5927564872c886bcfcddb093fbcdcf732c94a86a8d7f87d872698590fb12a7ae',
      blockNumber: 14802839,
      transactionHash:
        '0xf3105e2cdbd40c733460f6a0d25867e77cccb0776a9c83d5a24f08f98db42922',
      logIndex: 29,
      gasUsed: 154341,
      address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      topics: [
        '0x18e1ea4139e68413d7d08aa752e71568e36b2c5bf940893314c2c5b01eaa0c42',
        '0x0000000000000000000000000000e0ca771e21bd00057f54a68c30d400000000',
        '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
      ],
      data: '0x0000000000000000000000000000000000000000000000000b1171a390067c6e',
    };

    const logs = [erc20TransferLog, balancerV2TransferLog];
    const classifiedLogs = classify(ETHEREUM, logs);

    expect(classifiedLogs[0].classifier).toEqual<Classifier>(erc20Classifier);
    expect(classifiedLogs[1].classifier).toEqual<Classifier>(
      balancerV2Classifiers[3],
    );
  });

  test('swaps', () => {
    const uniswapV2SwapLog: Log = {
      blockHash:
        '0x8ba06d42b983e83504399c641f72e8ee1cd73bc6c1417a66fbe79401a8702d80',
      blockNumber: 14804038,
      transactionHash:
        '0x86aa33fdc8e87caddb52d404a3f1da08dd3a60df3a407a55edb5d91151dec2e0',
      logIndex: 198,
      gasUsed: 190050,
      address: '0x0d4a11d5eeaac28ec3f61d100daf4d40471f1852',
      topics: [
        '0xd78ad95fa46c994b6551d0da85fc275fe613ce37657fb8d5e3d130840159d822',
        '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        '0x000000000000000000000000774171beaeba8c2c3e5ddafecee60b28e51c8fbd',
      ],
      data: '0x000000000000000000000000000000000000000000000000287406303f0036e100000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000015167f471',
    };

    const uniswapV3SwapLog: Log = {
      blockHash:
        '0x67c82d2794211d3f150bdee7f659730db174b20082773b225e0dcaafd59ce74f',
      blockNumber: 14803820,
      transactionHash:
        '0xbb33579bc3fc10acd908195756a7f1aa21f4383a9a101781ff81af4ba2c6a40e',
      logIndex: 22,
      gasUsed: 663325,
      address: '0x99ac8ca7087fa4a2a1fb6357269965a2014abc35',
      topics: [
        '0xc42079f94a6350d7e6235f29174924f928cc2ac818eb64fed8004e115fbcca67',
        '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
        '0x00000000000000000000000068b3465833fb72a70ecdf485e0e4c7bd8665fc45',
      ],
      data: '0xfffffffffffffffffffffffffffffffffffffffffffffffffffffffff5d8c9c00000000000000000000000000000000000000000000000000000000b942d3f83000000000000000000000000000000000000001110111b88a4090688bc99c4c100000000000000000000000000000000000000000000000000000b5b01013ad4000000000000000000000000000000000000000000000000000000000000dda4',
    };

    const balancerV2SwapLog: Log = {
      blockHash:
        '0x21303a078facfc9c4e687bfff11117810fa6d444394c15702445be7a5d5a6bc8',
      blockNumber: 14804055,
      transactionHash:
        '0x14fb5d365886414c0693b6048f911ae3268777e8c236d965df06b7828ff16211',
      logIndex: 489,
      gasUsed: 0,
      address: '0xba12222222228d8ba445958a75a0704d566bf2c8',
      topics: [
        '0x2170c741c41531aec20e7c107c24eecfdd15e69c9bb0a8dd37b1840b9e0b207b',
        '0x96646936b91d6b9d7d0c47c496afbf3d6ec7b6f8000200000000000000000019',
        '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
      ],
      data: '0x000000000000000000000000000000000000000000000000e77f02dbb74d5b0000000000000000000000000000000000000000000000000000000007868b4375',
    };

    const logs = [uniswapV2SwapLog, uniswapV3SwapLog, balancerV2SwapLog];
    const classifiedLogs = classify(ETHEREUM, logs);

    expect(classifiedLogs[0].classifier).toEqual<Classifier>(
      uniswapV2Classifier,
    );
    expect(classifiedLogs[1].classifier).toEqual<Classifier>(
      uniswapV3Classifier[0],
    );
    expect(classifiedLogs[2].classifier).toEqual<Classifier>(
      balancerV2Classifiers[0],
    );
  });

  test('repayments', () => {
    const compoundV2RepaymentLog: Log = {
      blockHash:
        '0x2807e9aaf0406aa232f9d95aca53f38670501c8186d39feb673c0ea12905da33',
      blockNumber: 14787423,
      transactionHash:
        '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
      logIndex: 17,
      gasUsed: 671221,
      address: '0x041171993284df560249b57358f931d9eb7b925d',
      topics: [
        '0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1',
      ],
      data: '0x000000000000000000000000b5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c000000000000000000000000f7f6192e35d15a153105d4476a1b4d59ec2014dd0000000000000000000000000000000000000000000000442cfb0b133521c18800000000000000000000000000000000000000000000004433f6aa1ae11ae570000000000000000000000000000000000000000000001177ef652bdd78e4fe7b',
    };

    const aaveV2RepaymentLog: Log = {
      blockHash:
        '0x4c462f472947289c04108125cfdc124b32db90e5db9851777f7502346ac3b1f0',
      blockNumber: 14802369,
      transactionHash:
        '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
      logIndex: 146,
      gasUsed: 556582,
      address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
      topics: [
        '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286',
        '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x000000000000000000000000a8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000025a541d000000000000000000000000000000000000000000000000004c91d696ef7ebae000000000000000000000000d911560979b78821d7b045c79e36e9cbfc2f6c6f0000000000000000000000000000000000000000000000000000000000000001',
    };

    const logs = [compoundV2RepaymentLog, aaveV2RepaymentLog];
    const classifiedLogs = classify(ETHEREUM, logs);

    const compoundV2RepaymentEvents = classifiedLogs.filter(
      (log) => log.classifier === compoundV2Classifiers[0],
    );
    const aaveV2RepaymentEvents = classifiedLogs.filter(
      (log) => log.classifier === aaveV2Classifiers[0],
    );

    expect(compoundV2RepaymentEvents.length).toEqual(1);
    expect(aaveV2RepaymentEvents.length).toEqual(1);
  });

  test('seizures', () => {
    const compoundV2SeizureLog: Log = {
      blockHash:
        '0x2807e9aaf0406aa232f9d95aca53f38670501c8186d39feb673c0ea12905da33',
      blockNumber: 14787423,
      transactionHash:
        '0xdf838db24228f280eba8a279266d1602b03b54507afdca3cb4b4ec640535642b',
      logIndex: 21,
      gasUsed: 671221,
      address: '0x041171993284df560249b57358f931d9eb7b925d',
      topics: [
        '0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52',
      ],
      data: '0x000000000000000000000000b5c7ad3cb6506c65da01f2fac2e667dcb9e66e9c000000000000000000000000f7f6192e35d15a153105d4476a1b4d59ec2014dd0000000000000000000000000000000000000000000000442cfb0b133521c1880000000000000000000000004ddc2d193948926d02f9b1fe9e1daa0718270ed500000000000000000000000000000000000000000000000000000000cad363d8',
    };

    const aaveV2SeizureLog: Log = {
      blockHash:
        '0x4c462f472947289c04108125cfdc124b32db90e5db9851777f7502346ac3b1f0',
      blockNumber: 14802369,
      transactionHash:
        '0x580a2d8d142207a50636b74d41feca1774b106143c536078ca80de000f83f3d8',
      logIndex: 146,
      gasUsed: 556582,
      address: '0x7d2768de32b0b80b7a3454c06bdac94a69ddc7a9',
      topics: [
        '0xe413a321e8681d831f4dbccbca790d2952b56f977908e45be37335533e005286',
        '0x000000000000000000000000c02aaa39b223fe8d0a0e5c4f27ead9083c756cc2',
        '0x000000000000000000000000a0b86991c6218b36c1d19d4a2e9eb0ce3606eb48',
        '0x000000000000000000000000a8556b50ab7781eeccf647eec1c0bf3bf9e5b3ad',
      ],
      data: '0x0000000000000000000000000000000000000000000000000000000025a541d000000000000000000000000000000000000000000000000004c91d696ef7ebae000000000000000000000000d911560979b78821d7b045c79e36e9cbfc2f6c6f0000000000000000000000000000000000000000000000000000000000000001',
    };

    const logs = [compoundV2SeizureLog, aaveV2SeizureLog];
    const classifiedLogs = classify(ETHEREUM, logs);

    const compoundV2SeizureEvents = classifiedLogs.filter(
      (log) => log.classifier === compoundV2Classifiers[1],
    );
    const aaveV2SeizureEvents = classifiedLogs.filter(
      (log) => log.classifier === aaveV2Classifiers[1],
    );

    expect(compoundV2SeizureEvents.length).toEqual(1);
    expect(aaveV2SeizureEvents.length).toEqual(1);
  });
});
