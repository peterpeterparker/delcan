export const idlFactory = ({ IDL }) => {
  return IDL.Service({
    'delete' : IDL.Func([], [IDL.Principal], []),
    'init' : IDL.Func([], [IDL.Principal], []),
  });
};
export const init = ({ IDL }) => { return []; };
