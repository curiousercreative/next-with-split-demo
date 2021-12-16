#!/usr/bin/env node
import { copyFileSync, statSync, unlinkSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import nextEnv from '@next/env';

const __dirname = dirname(fileURLToPath(import.meta.url));

nextEnv.loadEnvConfig(resolve(__dirname, '..'));

if (![ '0', '1' ].includes(process.env.NEXT_SPLIT_ACTIVE)) {
  throw new Error(`Expected to find process.env.NEXT_SPLIT_ACTIVE = 0 or 1`);
}
const isActive = Boolean(Number(process.env.NEXT_SPLIT_ACTIVE));
const path = process.env.NEXT_SPLIT_PATH || '/';

const MIDDLEWARE_PATH_ACTIVE = resolve(resolve(__dirname, '..', 'pages', `.${path}`, '_middleware.js'));
const MIDDLEWARE_PATH_INACTIVE = resolve(__dirname, '..', 'withSplit.middleware.js');

function installMiddleware () {
  copyFileSync(MIDDLEWARE_PATH_INACTIVE, MIDDLEWARE_PATH_ACTIVE);
}

function removeMiddleware () {
  if (statSync(MIDDLEWARE_PATH_ACTIVE, { throwIfNoEntry: false })) {
    unlinkSync(MIDDLEWARE_PATH_ACTIVE);
  }
}

switch (isActive) {
case false:
  console.info(`split traffic disabled, removing middleware from ${MIDDLEWARE_PATH_ACTIVE}`);
  removeMiddleware();
  break;
case true:
  console.info(`split traffic enabled, installing middleware to ${MIDDLEWARE_PATH_ACTIVE}`);
  installMiddleware();
  break;
}
