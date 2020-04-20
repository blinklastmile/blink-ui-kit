/* eslint-disable no-console */
const path = require('path');
const fse = require('fs-extra');
const execa = require('execa');

const srcRoot = path.join(__dirname, '../src');

const libRoot = path.join(__dirname, '../lib');
// const distRoot = path.join(libRoot, 'dist');
// const cjsRoot = path.join(libRoot, 'cjs');
// const esRoot = path.join(libRoot, 'esm');

console.log(
  '\x1b[36m',
  'Node Env: ',
  '\x1b[32m',
  process.env.NODE_ENV,
  '\x1b[0m',
);

const clean = () => fse.existsSync(libRoot) && fse.removeSync(libRoot);

const step = (name, fn) => async () => {
  console.log('\x1b[36m', 'Building: ', '\x1b[32m', name, '\x1b[0m');
  await fn();
  console.log('\x1b[36m', 'Built: ', '\x1b[32m', name, '\x1b[0m');
};

const shell = (cmd) => execa(cmd, { stdio: ['pipe', 'pipe', 'inherit'], shell: true });

const copySass = () => shell(
  `mkdir -p ${libRoot} && cd ${srcRoot} && cp --parents -r ./components/**/*.scss ./styles ${libRoot} && cd ${__dirname}`,
);

const copyTypes = () => shell(
  `mkdir -p ${libRoot} && cd ${srcRoot} && cp --parents ./components/**/*.d.ts ./index.d.ts ${libRoot} && cd ${__dirname}`,
);

/**
 * Run babel over the src directory and output
 * compiled es modules (but otherwise es5) to /es
 */
const buildEsm = step('es modules', async () => {
  await shell(
    `npx babel ${srcRoot} --out-dir ${libRoot} --env-name "production"`,
  );
  copyTypes();
  copySass();
});

clean();
buildEsm();
