module.exports = (api) => {
  //env from parameter --env-name, you can customize your build based on env.
  //example command: npx babel src --out-dir lib --env-name 'dev'
  //https://babeljs.io/docs/en/options#envname
  const env = api.env()
  console.log('\x1b[36m', 'Babel Env:', env, '\x1b[0m')
  //Babel complains about caches and tells him what to do is mandatory
  //https://babeljs.io/docs/en/config-files#apicache
  //If set to false this configuration runs every time on each file it transpile.
  api.cache(true)
  return {
    presets: [
      [
        '@babel/preset-env',
        {
          modules: false,
          loose: true,
        },
      ],
      '@babel/preset-react',
    ],
    plugins: [
      [
        'transform-react-remove-prop-types',
        { ignoreFilenames: ['node_modules'], removeImport: true },
      ],
    ],
  }
}
