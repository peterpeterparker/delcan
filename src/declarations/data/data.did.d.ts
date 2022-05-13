import type { Principal } from '@dfinity/principal';
export interface DataBucket {
  'say' : (arg_0: string) => Promise<string>,
  'transferCycles' : () => Promise<undefined>,
}
export interface _SERVICE extends DataBucket {}
