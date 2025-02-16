import {
  ChainId,
  LiquidityDeposit,
  LiquidityWithdrawal,
  Swap,
  isKnownRouter,
} from '../classifier/index.js';
import { minByAbs } from '../utils.js';

interface Sandwich {
  sandwicher: string;
  frontSwap: Swap;
  backSwap: Swap;
  sandwiched: (Swap | LiquidityDeposit | LiquidityWithdrawal)[];
  profit: {
    asset: string;
    amount: bigint;
  };
}

function isSwap(
  event: Swap | LiquidityDeposit | LiquidityWithdrawal,
): event is Swap {
  return 'from' in event;
}

function isDeposit(
  event: Swap | LiquidityDeposit | LiquidityWithdrawal,
): event is LiquidityDeposit {
  return 'depositor' in event;
}

function isWithdrawal(
  event: Swap | LiquidityDeposit | LiquidityWithdrawal,
): event is LiquidityWithdrawal {
  return 'withdrawer' in event;
}

function getSandwiches(
  chainId: ChainId,
  swaps: Swap[],
  deposits: LiquidityDeposit[],
  withdrawals: LiquidityWithdrawal[],
): Sandwich[] {
  const orderedEvents = [...swaps, ...deposits, ...withdrawals];
  orderedEvents.sort((a, b) => a.event.logIndex - b.event.logIndex);

  const sandwiches: Sandwich[] = [];
  for (const i in orderedEvents) {
    const swap = orderedEvents[i];
    if (!isSwap(swap)) {
      // Not a swap
      continue;
    }
    const restEvents = orderedEvents.slice(parseInt(i) + 1);
    const sandwich = getSandwich(chainId, swap, restEvents);
    if (sandwich) {
      sandwiches.push(sandwich);
    }
  }
  return sandwiches;
}

function getSandwich(
  chainId: ChainId,
  frontSwap: Swap,
  restEvents: (Swap | LiquidityDeposit | LiquidityWithdrawal)[],
): Sandwich | null {
  const sandwicher = frontSwap.to;
  const sandwiched: (Swap | LiquidityDeposit | LiquidityWithdrawal)[] = [];

  if (isKnownRouter(chainId, sandwicher)) {
    return null;
  }

  for (const event of restEvents) {
    if (event.transaction.hash === frontSwap.transaction.hash) {
      continue;
    }

    if (event.contract.address === frontSwap.contract.address) {
      if (
        isSwap(event) &&
        event.assetIn === frontSwap.assetIn &&
        event.assetOut === frontSwap.assetOut &&
        event.from !== sandwicher
      ) {
        sandwiched.push(event);
      } else if (
        // Some AMMs (like Balancer and Curve) allow to add disproportional/single-side liquidity
        // This is effectively the same as doing the swap and then depositing proportionally.
        // Since swap is involved, it is possible to sandwich such liquidity deposit.
        isDeposit(event) &&
        event.assets
          .filter((_asset, index) => event.amounts[index] > 0)
          .includes(frontSwap.assetIn) &&
        event.depositor !== sandwicher
      ) {
        sandwiched.push(event);
      } else if (
        // The above applies to dispropotional liquidity withdrawals as well.
        isWithdrawal(event) &&
        event.assets
          .filter((_asset, index) => event.amounts[index] > 0)
          .includes(frontSwap.assetOut) &&
        event.withdrawer !== sandwicher
      ) {
        sandwiched.push(event);
      } else if (
        isSwap(event) &&
        event.assetOut === frontSwap.assetIn &&
        event.assetIn === frontSwap.assetOut &&
        event.from === sandwicher
      ) {
        if (sandwiched.length > 0) {
          return {
            sandwicher,
            frontSwap,
            backSwap: event,
            sandwiched,
            profit: {
              asset: frontSwap.assetIn,
              amount: getProfit(frontSwap, event),
            },
          };
        }
      }
    }
  }

  return null;
}

function getProfit(frontSwap: Swap, backSwap: Swap): bigint {
  const multiplier = 1_000_000_000_000_000_000_000_000_000_000_000_000n;
  if (backSwap.amountIn === 0n || frontSwap.amountOut === 0n) {
    return 0n;
  }
  const profitFrontrun =
    (frontSwap.amountOut *
      ((multiplier * backSwap.amountOut) / backSwap.amountIn)) /
      multiplier -
    frontSwap.amountIn;
  const profitBackrun =
    backSwap.amountOut -
    (backSwap.amountIn *
      ((multiplier * frontSwap.amountIn) / frontSwap.amountOut)) /
      multiplier;
  return minByAbs(profitFrontrun, profitBackrun);
}

export { Sandwich, getSandwiches };
