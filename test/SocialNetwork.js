//using Mocha testing framework 
//using Chai Assertion Library 

const { assert } = require('chai');
const { Item } = require('react-bootstrap/Breadcrumb');

const SocialNetwork = artifacts.require('./SocialNetwork.sol'); 

require('chai')
    .use(require('chai-as-promised')) 
    .should()

contract('SocialNetwork', ([deployer, author, tipper]) => { 
    let socialNetwork; 

    before(async() => { 
        socialNetwork = await SocialNetwork.deployed()
    })

    describe('deployment', () => { 
        it('deploys successfully', async () => { 
            socialNetwork = await SocialNetwork.deployed() 
            const address = await socialNetwork.address 
            assert.notEqual(address, 0x0)
            //asserts compares 2 values 
            //0x0 is a null address
            assert.notEqual(address, '')
            assert.notEqual(address, null)
            assert.notEqual(address, undefined)
        })

        it('has a name', async() => { 
            const name = await socialNetwork.name() 
            assert.equal(name, 'Rohit Roy')
        })
    })

    describe('posts', async() => { 
        let result, postCount; 
    before(async () => 
    {
        result = await socialNetwork.createPosts('This is my first post', { from: author})
        postCount = await socialNetwork.postCount()
    })
        it('create posts', async() => { 
            result = await socialNetwork.createPosts('This is my first post !', {from: author});
            postCount = await socialNetwork.postCount()
            //Success 
            assert.equal(postCount, 1)
            console.log(result)
            const event = result.logs[0].args
            assert.equal(event.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(event.content, 'This is my first post', 'content is correct')
            assert.equal(event.tipAmount, '0', 'tip amount is correct')
            assert.equal(event.author, author, 'author is correct')

            //Failure: Post must have content 
            await socialNetwork.createPosts('', {from: author}). should.be.rejected; 
        })

        it('lists posts', async() => { 
            const post = await socialNetwork.posts(postCount)
            assert.equal(post.id.toNumber(), postCount.toNumber(), 'id is correct')
            assert.equal(post.content, 'This is my first post', 'content is correct')
            assert.equal(post.tipAmount, '0', 'tip amount is correct')
            assert.equal(post.author, author, 'author is correct')
        })

        it('allows users to tip posts', async() => { 

        })
    })
})
