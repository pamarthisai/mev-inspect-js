const abi = [
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'buyer',
        type: 'address',
      },
      {
        indexed: false,
        name: 'sold_id',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'tokens_sold',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'bought_id',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'tokens_bought',
        type: 'uint256',
      },
    ],
    name: 'TokenExchange',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[3]',
      },
      {
        indexed: false,
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[4]',
      },
      {
        indexed: false,
        name: 'fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'AddLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[2]',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[3]',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amounts',
        type: 'uint256[4]',
      },
      {
        indexed: false,
        name: 'token_supply',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidity',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'provider',
        type: 'address',
      },
      {
        indexed: false,
        name: 'token_amount',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'coin_index',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'coin_amount',
        type: 'uint256',
      },
    ],
    name: 'RemoveLiquidityOne',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: true,
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'CommitNewAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'admin',
        type: 'address',
      },
    ],
    name: 'NewAdmin',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'deadline',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'admin_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'mid_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'out_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'fee_gamma',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'price_threshold',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'adjustment_step',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'ma_half_time',
        type: 'uint256',
      },
    ],
    name: 'CommitNewParameters',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'admin_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'mid_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'out_fee',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'fee_gamma',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'price_threshold',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'adjustment_step',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'ma_half_time',
        type: 'uint256',
      },
    ],
    name: 'NewParameters',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'initial_A',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'future_A',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'initial_time',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'future_time',
        type: 'uint256',
      },
    ],
    name: 'RampAgamma',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        name: 'current_A',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'current_gamma',
        type: 'uint256',
      },
      {
        indexed: false,
        name: 'time',
        type: 'uint256',
      },
    ],
    name: 'StopRampA',
    type: 'event',
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        name: 'admin',
        type: 'address',
      },
      {
        indexed: false,
        name: 'tokens',
        type: 'uint256',
      },
    ],
    name: 'ClaimAdminFee',
    type: 'event',
  },
  {
    inputs: [
      {
        name: 'owner',
        type: 'address',
      },
      {
        name: 'A',
        type: 'uint256',
      },
      {
        name: 'gamma',
        type: 'uint256',
      },
      {
        name: 'mid_fee',
        type: 'uint256',
      },
      {
        name: 'out_fee',
        type: 'uint256',
      },
      {
        name: 'price_threshold',
        type: 'uint256',
      },
      {
        name: 'fee_gamma',
        type: 'uint256',
      },
      {
        name: 'adjustment_step',
        type: 'uint256',
      },
      {
        name: 'admin_fee',
        type: 'uint256',
      },
      {
        name: 'ma_half_time',
        type: 'uint256',
      },
      {
        name: 'initial_prices',
        type: 'uint256[2]',
      },
    ],
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'constructor',
  },
  {
    stateMutability: 'payable',
    type: 'fallback',
  },
  {
    inputs: [
      {
        name: 'k',
        type: 'uint256',
      },
    ],
    name: 'price_oracle',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'k',
        type: 'uint256',
      },
    ],
    name: 'price_scale',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'k',
        type: 'uint256',
      },
    ],
    name: 'last_prices',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'token',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'i',
        type: 'uint256',
      },
    ],
    name: 'coins',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'A',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'gamma',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'A_precise',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'xp',
        type: 'uint256[3]',
      },
    ],
    name: 'fee_calc',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'get_virtual_price',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'i',
        type: 'uint256',
      },
      {
        name: 'j',
        type: 'uint256',
      },
      {
        name: 'dx',
        type: 'uint256',
      },
      {
        name: 'min_dy',
        type: 'uint256',
      },
    ],
    name: 'exchange',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'i',
        type: 'uint256',
      },
      {
        name: 'j',
        type: 'uint256',
      },
      {
        name: 'dx',
        type: 'uint256',
      },
      {
        name: 'min_dy',
        type: 'uint256',
      },
      {
        name: 'use_eth',
        type: 'bool',
      },
    ],
    name: 'exchange',
    outputs: [],
    stateMutability: 'payable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'i',
        type: 'uint256',
      },
      {
        name: 'j',
        type: 'uint256',
      },
      {
        name: 'dx',
        type: 'uint256',
      },
    ],
    name: 'get_dy',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'amounts',
        type: 'uint256[3]',
      },
      {
        name: 'xp',
        type: 'uint256[3]',
      },
    ],
    name: 'calc_token_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'amounts',
        type: 'uint256[3]',
      },
      {
        name: 'min_mint_amount',
        type: 'uint256',
      },
    ],
    name: 'add_liquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_amount',
        type: 'uint256',
      },
      {
        name: 'min_amounts',
        type: 'uint256[3]',
      },
    ],
    name: 'remove_liquidity',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'amounts',
        type: 'uint256[3]',
      },
      {
        name: 'deposit',
        type: 'bool',
      },
    ],
    name: 'calc_token_amount',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'token_amount',
        type: 'uint256',
      },
      {
        name: 'i',
        type: 'uint256',
      },
    ],
    name: 'calc_withdraw_one_coin',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'token_amount',
        type: 'uint256',
      },
      {
        name: 'i',
        type: 'uint256',
      },
      {
        name: 'min_amount',
        type: 'uint256',
      },
    ],
    name: 'remove_liquidity_one_coin',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'claim_admin_fees',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'future_A',
        type: 'uint256',
      },
      {
        name: 'future_gamma',
        type: 'uint256',
      },
      {
        name: 'future_time',
        type: 'uint256',
      },
    ],
    name: 'ramp_A_gamma',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'stop_ramp_A_gamma',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_new_mid_fee',
        type: 'uint256',
      },
      {
        name: '_new_out_fee',
        type: 'uint256',
      },
      {
        name: '_new_admin_fee',
        type: 'uint256',
      },
      {
        name: '_new_fee_gamma',
        type: 'uint256',
      },
      {
        name: '_new_price_threshold',
        type: 'uint256',
      },
      {
        name: '_new_adjustment_step',
        type: 'uint256',
      },
      {
        name: '_new_ma_half_time',
        type: 'uint256',
      },
    ],
    name: 'commit_new_parameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'apply_new_parameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'revert_new_parameters',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_owner',
        type: 'address',
      },
    ],
    name: 'commit_transfer_ownership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'apply_transfer_ownership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'revert_transfer_ownership',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'kill_me',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'unkill_me',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [
      {
        name: '_admin_fee_receiver',
        type: 'address',
      },
    ],
    name: 'set_admin_fee_receiver',
    outputs: [],
    stateMutability: 'nonpayable',
    type: 'function',
  },
  {
    inputs: [],
    name: 'last_prices_timestamp',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initial_A_gamma',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_A_gamma',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'initial_A_gamma_time',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_A_gamma_time',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'price_threshold',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_price_threshoold',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'fee_gamma',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_fee_gamma',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'adjustment_step',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_adjustment_step',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'ma_half_time',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_ma_half_time',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'mid_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'out_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'admin_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_mid_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_out_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_admin_fee',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [
      {
        name: 'arg0',
        type: 'uint256',
      },
    ],
    name: 'balances',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'D',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'future_owner',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xcp_profit',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'xcp_profit_a',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'virtual_price',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'is_killed',
    outputs: [
      {
        name: '',
        type: 'bool',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'kill_deadline',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'transfer_ownership_deadline',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'admin_actions_deadline',
    outputs: [
      {
        name: '',
        type: 'uint256',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
  {
    inputs: [],
    name: 'admin_fee_receiver',
    outputs: [
      {
        name: '',
        type: 'address',
      },
    ],
    stateMutability: 'view',
    type: 'function',
  },
];

export default abi;
