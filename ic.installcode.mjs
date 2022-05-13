#!/usr/bin/env node

import pkgAgent from '@dfinity/agent';
import {IDL} from '@dfinity/candid';
import pkgIdentity from '@dfinity/identity';
import pkgPrincipal from '@dfinity/principal';
import crypto from 'crypto';
import {readFileSync} from 'fs';
import fetch from 'node-fetch';
import {idlFactory} from './.dfx/local/canisters/delcan/delcan.did.mjs';

const {Principal} = pkgPrincipal;

const {Secp256k1KeyIdentity} = pkgIdentity;

const {HttpAgent, Actor} = pkgAgent;

const managerPrincipal = () => {
    const buffer = readFileSync('./canister_ids.json');
    const {delcan} = JSON.parse(buffer.toString('utf-8'));
    return Principal.fromText(delcan.ic);
};

/**
 * ! Replicating the dfx identity in a nodejs script is NOT possible at the moment !
 *
 * See: https://forum.dfinity.org/t/using-dfinity-agent-in-node-js/6169/41
 */
const initIdentity = () => {
    const buffer = readFileSync('/Users/daviddalbusco/.config/dfx/identity/default/identity.pem');
    const key = buffer.toString('utf-8');

    const privateKey = crypto.createHash('sha256').update(key).digest('base64');

    return Secp256k1KeyIdentity.fromSecretKey(Buffer.from(privateKey, 'base64'));
};

const upgradeBucketData = async ({actor, bucketId, wasmModule}) => {
    console.log(`Upgrading: ${bucketId.toText()}`);

    // const arg = IDL.encode([IDL.Nat], '');

    await actor.installCode(bucketId, [], wasmModule);

    console.log(`Done: ${bucketId.toText()}`);
};

const loadWasm = (type) => {
    const buffer = readFileSync(`${process.cwd()}/.dfx/local/canisters/${type}/${type}.wasm`);
    return [...new Uint8Array(buffer)];
};

const fromNullable = (value) => {
    return value?.[0];
};

(async () => {

    try {
        const canisterId = managerPrincipal();

        const identity = initIdentity();

        const agent = new HttpAgent({identity, fetch, host: 'https://ic0.app'});

        // Local: Principal.fromText('rrkah-fqaaa-aaaaa-aaaaq-cai')
        const actor = Actor.createActor(idlFactory, {
            agent,
            canisterId
        });

        const wasmModule = loadWasm('data');

        const bucketId = Principal.fromText('q3fc5-haaaa-aaaaa-aaahq-cai');
        await upgradeBucketData({actor, wasmModule, bucketId})
    } catch (e) {
        console.error(e);
    }
})();
