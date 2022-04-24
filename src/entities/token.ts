import invariant from 'tiny-invariant'
import { ChainId } from '../constants'
import { validateAndParseAddress } from '../utils'
import { Currency } from './currency'

/**
 * Represents an ERC20 token with a unique address and some metadata.
 */
export class Token extends Currency {
  public readonly chainId: ChainId
  public readonly address: string

  public constructor(chainId: ChainId, address: string, decimals: number, symbol?: string, name?: string) {
    super(decimals, symbol, name)
    this.chainId = chainId
    this.address = validateAndParseAddress(address)
  }

  /**
   * Returns true if the two tokens are equivalent, i.e. have the same chainId and address.
   * @param other other token to compare
   */
  public equals(other: Token): boolean {
    // short circuit on reference equality
    if (this === other) {
      return true
    }
    return this.chainId === other.chainId && this.address === other.address
  }

  /**
   * Returns true if the address of this token sorts before the address of the other token
   * @param other other token to compare
   * @throws if the tokens have the same address
   * @throws if the tokens are on different chains
   */
  public sortsBefore(other: Token): boolean {
    invariant(this.chainId === other.chainId, 'CHAIN_IDS')
    invariant(this.address !== other.address, 'ADDRESSES')
    return this.address.toLowerCase() < other.address.toLowerCase()
  }
}

/**
 * Compares two currencies for equality
 */
export function currencyEquals(currencyA: Currency, currencyB: Currency): boolean {
  if (currencyA instanceof Token && currencyB instanceof Token) {
    return currencyA.equals(currencyB)
  } else if (currencyA instanceof Token) {
    return false
  } else if (currencyB instanceof Token) {
    return false
  } else {
    return currencyA === currencyB
  }
}

export const WETH = {
  [ChainId.MAINNET]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.FTMTESTNET]: new Token(
    ChainId.FTMTESTNET,
    '0xf1277d1Ed8AD466beddF92ef448A132661956621',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.BSC]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.ETHMAINNET]: new Token(
    ChainId.MAINNET,
    '0x21be370D5312f44cB42ce377BC9b8a0cEF1A4C83',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.CRONOSTESTNET]: new Token(
    ChainId.CRONOSTESTNET,
    '0x873c905681Fb587cc12a29DA5CD3c447bE61F146',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
  [ChainId.CRONOSMAINNET]: new Token(
    ChainId.CRONOSMAINNET,
    '0x5C7F8A570d578ED84E63fdFA7b1eE72dEae1AE23',
    18,
    'WFTM',
    'Wrapped FTM'
  ),
}
