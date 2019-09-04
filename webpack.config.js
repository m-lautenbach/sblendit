module.exports = (env = 'dev') => {
  return require(`./config/webpack.${env}.js`)
}
