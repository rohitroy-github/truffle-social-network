//Upgraded Code
const SocialNetwork = artifacts.require('./SocialNetwork.sol')

require('chai')
  .use(require('chai-as-promised'))
  .should()

contract('SocialNetwork', ([deployer, author, tipper]) => {
  let socialNetwork

  before(async () => {
    socialNetwork = await SocialNetwork.deployed()
  })

  describe('deployment', async () => {
    it('deploys successfully', async () => {
      const address = await socialNetwork.address
      assert.notEqual(address, 0x0)
      assert.notEqual(address, '')
      assert.notEqual(address, null)
      assert.notEqual(address, undefined)
    })

    it('has a name', async () => {
      const name = await socialNetwork.name()
      assert.equal(name, 'Dapp University Social Network')
    })
  })

  describe('posts', async () => {
    let result, postCount

    before(async () => {
      result = await socialNetwork.createPost('This is my first post', { from: author })
      postCount = await socialNetwork.postCount()
    })

    it('creates posts', async () => {
      // SUCESS
      assert.equal(postCount, 1)
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is my first post', 'content is correct')
      assert.equal(event.tipAmount, '0', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // FAILURE: Post must have content
      await socialNetwork.createPost('', { from: author }).should.be.rejected;
    })

    it('lists posts', async () => {
      const post = await socialNetwork.posts(postCount)
      assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(post.content, 'This is my first post', 'content is correct')
      assert.equal(post.tipAmount, '0', 'tip amount is correct')
      assert.equal(post.author, author, 'author is correct')
    })

    it('allows users to tip posts', async () => {
      // Track the author balance before purchase
      let oldAuthorBalance
      oldAuthorBalance = await web3.eth.getBalance(author)
      oldAuthorBalance = new web3.utils.BN(oldAuthorBalance)

      result = await socialNetwork.tipPost(postCount, { from: tipper, value: web3.utils.toWei('1', 'Ether') })

      // SUCESS
      const event = result.logs[0].args
      assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
      assert.equal(event.content, 'This is my first post', 'content is correct')
      assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
      assert.equal(event.author, author, 'author is correct')

      // Check that author received funds
      let newAuthorBalance
      newAuthorBalance = await web3.eth.getBalance(author)
      newAuthorBalance = new web3.utils.BN(newAuthorBalance)

      let tipAmount
      tipAmount = web3.utils.toWei('1', 'Ether')
      tipAmount = new web3.utils.BN(tipAmount)

      const exepectedBalance = oldAuthorBalance.add(tipAmount)

      assert.equal(newAuthorBalance.toString(), exepectedBalance.toString())

      // FAILURE: Tries to tip a post that does not exist
      await socialNetwork.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected;
    })

  })
})

//My Code
// //using Mocha testing framework 
// //using Chai Assertion Library 

// const { assert } = require('chai');
// const { Item } = require('react-bootstrap/Breadcrumb');
// const { default: Web3 } = require('web3');

// const SocialNetwork = artifacts.require('./SocialNetwork.sol'); 

// require('chai')
//     .use(require('chai-as-promised')) 
//     .should()

// contract('SocialNetwork', ([deployer, author, tipper]) => { 
//     let socialNetwork; 

//     before(async() => { 
//         socialNetwork = await SocialNetwork.deployed()
//     })

//     describe('deployment', () => { 
//         it('deploys successfully', async () => { 
//             socialNetwork = await SocialNetwork.deployed() 
//             const address = await socialNetwork.address 
//             assert.notEqual(address, 0x0)
//             //asserts compares 2 values 
//             //0x0 is a null address
//             assert.notEqual(address, '')
//             assert.notEqual(address, null)
//             assert.notEqual(address, undefined)
//         })

//         it('has a name', async() => { 
//             const name = await socialNetwork.name() 
//             assert.equal(name, 'Rohit Roy')
//         })
//     })

//     describe('posts', async() => { 
//         let result, postCount; 
//     before(async () => 
//     {
//         result = await socialNetwork.createPosts('This is my first post', { from: author})
//         postCount = await socialNetwork.postCount()
//     })
//         it('create posts', async() => { 
//             result = await socialNetwork.createPosts('This is my first post !', {from: author});
//             postCount = await socialNetwork.postCount()
//             //Success 
//             assert.equal(postCount, 1)
//             console.log(result)
//             const event = result.logs[0].args
//             assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
//             assert.equal(event.content, 'This is my first post', 'content is correct')
//             assert.equal(event.tipAmount, '0', 'tip amount is correct')
//             assert.equal(event.author, author, 'author is correct')

//             //Failure: Post must have content 
//             await socialNetwork.createPosts('', {from: author}). should.be.rejected; 
//         })

//         it('lists posts', async() => { 
//             const post = await socialNetwork.posts(postCount)
//             assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
//             assert.equal(post.content, 'This is my first post', 'content is correct')
//             assert.equal(post.tipAmount, '0', 'tip amount is correct')
//             assert.equal(post.author, author, 'author is correct')
//         })

//         it('allows users to tip posts', async() => { 
//             //Checking author balance before tipping 
//             let oldAuthorBalance
//             oldAuthorBalance = await Web3.length.getBalance(author) //checking balance from a wallet 
//             oldAuthorBalance = new Web3.utils.isBN(oldAuthorBalance)//converting balance into a bit number

//             //Tipping 1 ether
//             //Using web3.utils.toWei
//             result = await socialNetwork.tipPost(postCount, { from: tipper, value: Web3.utils.toWei('1', 'Ether') })
//             //Success 
//             const event = result.logs[0].args
//             assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
//             assert.equal(event.content, 'This is my first post', 'content is correct')
//             assert.equal(event.tipAmount, '1000000000000000000', 'tip amount is correct')
//             assert.equal(event.author, author, 'author is correct')

//             //Checking balance after tipping 
//             let newAuthorBalance
//             newAuthorBalance = await Web3.length.getBalance(author) //checking balance from a wallet 
//             newAuthorBalance = new Web3.utils.isBN(newAuthorBalance)//converting balance into a bit number

//             //Factor tip amount
//             let tipAmount
//             tipAmount = web3.utils.toWei('1', 'ether')
//             tipAmount = new web3.utils.BN(tipAmount)

//             const expectedBalance = oldAuthorBalance.add(tipAmount)
            
//             //Checking the updated balance 
//             assert.equal(newAuthorBalance.toString(), expectedBalance.toString())

//             //Failure 
//             //Tries to tip a post that doesn't exist 
//             await socialNetwork.tipPost(99, { from: tipper, value: web3.utils.toWei('1', 'Ether')}).should.be.rejected; 
//         })
//     })
// })
