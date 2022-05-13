#!/usr/bin/env node

const {writeFileSync, readFileSync} = require('fs');

const copyAdminManagerMjs = ({src}) => {
  const buffer = readFileSync(`${src}delcan/delcan.did.js`);
  writeFileSync(`${src}delcan/delcan.did.mjs`, buffer.toString('utf-8'));
};

copyAdminManagerMjs({src: '.dfx/local/canisters/'});
