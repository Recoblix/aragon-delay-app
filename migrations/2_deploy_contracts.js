var App = artifacts.require('./Delay.sol')

module.exports = function (deployer) {
  deployer.deploy(App)
}
