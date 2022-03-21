import IC "./ic.types";
import Cycles "mo:base/ExperimentalCycles";

actor class DataBucket() = this {

    private let ic : IC.Self = actor "aaaaa-aa";

    public query func say(phrase : Text) : async Text {
        return phrase;
      };

    public shared({ caller }) func transferCycles(): async() {
      let balance: Nat = Cycles.balance();

          // We have to retain some cycles to be able to transfer some
          let cycles: Nat = balance - 4_100_000;

          if (cycles > 0) {
              Cycles.add(cycles);
              await ic.deposit_cycles({ canister_id = caller });
          };
    };

     
}
