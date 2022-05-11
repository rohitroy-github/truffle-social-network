
pragma solidity ^0.5.0;

contract SocialNetwork 
{
    string public name; 
    uint public postCount = 0; //To keep track of the number of posts added to the mapping() 

    mapping(uint => Post) public posts; 

    //struct > user-defined data-type
    struct Post
    { 
        uint id; 
        string content; 
        uint tipAmount; 
        address author; 
    }

    event PostCreated( 
        uint id, 
        string content, 
        uint tipAmount, 
        address author
    );

    constructor() public 
    {
        name = "Rohit Roy"; 
    }

    function createPosts(string memory _content) public
    { 
        //Require valid content 
        require(bytes(_content).length > 0);
        //If this require() functions returns yes then the rest code will get executed otherwise not 
        //Increment postCount
        postCount++; 
        //Create the post 
        posts[postCount] = Post(1, _content, 0, msg.sender);
        //msg.sender > auhtor/ address who is running this contract/ function

        //Trigger event 
        emit PostCreated(postCount, _content, 0, msg.sender); 
    }


}