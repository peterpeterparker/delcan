export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'delete' : IDL.Func([], [IDL.Principal], []),
    'init' : IDL.Func([], [IDL.Principal], []),
    'installCode' : IDL.Func(
        [IDL.Principal, IDL.Vec(IDL.Nat8), IDL.Vec(IDL.Nat8)],
        [],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
