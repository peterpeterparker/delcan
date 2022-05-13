export const idlFactory = ({ IDL }) => {
  const DataBucket = IDL.Service({
    'say' : IDL.Func([IDL.Text], [IDL.Text], ['query']),
    'transferCycles' : IDL.Func([], [], []),
  });
  return DataBucket;
};
export const init = ({ IDL }) => { return []; };
