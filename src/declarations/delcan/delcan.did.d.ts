import type { Principal } from '@dfinity/principal';
export interface _SERVICE {
  'delete' : () => Promise<Principal>,
  'init' : () => Promise<Principal>,
  'installCode' : (
      arg_0: Principal,
      arg_1: Array<number>,
      arg_2: Array<number>,
    ) => Promise<undefined>,
}
