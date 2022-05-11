//Migrations files are numbered to let truffle know the order of executing the migrations

const SocialNetwork = artifacts.require("SocialNetwork");

module.exports = function(deployer) {
  deployer.deploy(SocialNetwork);
};
