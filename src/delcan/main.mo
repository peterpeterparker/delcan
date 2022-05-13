import Cycles "mo:base/ExperimentalCycles";
import Principal "mo:base/Principal";
import Error "mo:base/Error";

import IC "./ic.types";

import DataBucket "./data";

actor Main {
  
  private let ic : IC.Self = actor "aaaaa-aa";

  private type DataBucket = DataBucket.DataBucket;

  private stable var canisterId: ?Principal = null;
  
  public shared({ caller }) func init(): async (Principal) {
    Cycles.add(1_000_000_000_000);
    let b = await DataBucket.DataBucket();

    canisterId := ?(Principal.fromActor(b));

    switch (canisterId) {
      case null {
        throw Error.reject("Bucket init weird error");
      };
      case (?canisterId) {
        let self: Principal = Principal.fromActor(Main);

        let controllers: ?[Principal] = ?[canisterId, caller, self];

        await ic.update_settings(({canister_id = canisterId; settings = {
            controllers = controllers;
            freezing_threshold = null;
            memory_allocation = null;
            compute_allocation = null;
        }}));

        return canisterId;
      };
    };
  };

  public shared({ caller }) func delete(): async (Principal) {
    switch (canisterId) {
      case null {
        throw Error.reject("No bucket canisterId to delete");
      };
      case (?cId) {
        let deckBucket = actor(Principal.toText(cId)): actor { transferCycles: () -> async () };

        await deckBucket.transferCycles();

        await ic.stop_canister({ canister_id = cId });

        await ic.delete_canister({ canister_id = cId });

        canisterId := null;

        return cId;
      };
    };
  };

  public shared({ caller }) func installCode(canisterId: Principal, arg: Blob, wasmModule: Blob): async() {
        await ic.install_code({
                arg = arg;
                wasm_module = wasmModule;
                mode = #upgrade;
                canister_id = canisterId;
            });
    };

};
