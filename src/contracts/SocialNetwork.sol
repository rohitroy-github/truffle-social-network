//Upgraded Code
pragma solidity ^0.5.0;

contract SocialNetwork {
    string public name;
    uint public postCount = 0;
    mapping(uint => Post) public posts;

    struct Post {
        uint id;
        string content;
        uint tipAmount;
        address payable author;
    }

    event PostCreated(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    event PostTipped(
        uint id,
        string content,
        uint tipAmount,
        address payable author
    );

    constructor() public {
        name = "Dapp University Social Network";
    }

    function createPost(string memory _content) public {
        // Require valid content
        require(bytes(_content).length > 0);
        // Increment the post count
        postCount ++;
        // Create the post
        posts[postCount] = Post(postCount, _content, 0, msg.sender);
        // Trigger event
        emit PostCreated(postCount, _content, 0, msg.sender);
    }

    function tipPost(uint _id) public payable {
        // Make sure the id is valid
        require(_id > 0 && _id <= postCount);
        // Fetch the post
        Post memory _post = posts[_id];
        // Fetch the author
        address payable _author = _post.author;
        // Pay the author by sending them Ether
        address(_author).transfer(msg.value);
        // Incremet the tip amount
        _post.tipAmount = _post.tipAmount + msg.value;
        // Update the post
        posts[_id] = _post;
        // Trigger an event
        emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
    }
}

// //My Code
// pragma solidity ^0.5.0; //Version

// contract SocialNetwork 
// {
//     string public name; 
//     uint public postCount = 0; //To keep track of the number of posts added to the mapping() 

//     mapping(uint => Post) public posts; 

//     //struct > user-defined data-type
//     struct Post
//     { 
//         uint id; 
//         string content; 
//         uint tipAmount; 
//         address payable author; //[payble] since ether is gonna get transfered here | payment address
//     }

//     event PostCreated( 
//         uint id, 
//         string content, 
//         uint tipAmount, 
//         address payable author
//     );

//     event PostTipped( 
//         uint id, 
//         string content, 
//         uint tipAmount, 
//         address payable author
//     );

//     constructor() public 
//     {
//         name = "Rohit Roy"; 
//     }

//     function createPosts(string memory _content) public
//     { 
//         //Require valid content 
//         require(bytes(_content).length > 0);
//         //If this require() functions returns yes then the rest code will get executed otherwise not 
//         //Increment postCount
//         postCount++; 
//         //Create the post 
//         posts[postCount] = Post(postCount, _content, 0, msg.sender);
//         //msg.sender > auhtor/ address who is running this contract/ function
//         //Trigger event 
//         emit PostCreated(postCount, _content, 0, msg.sender); 
//     }

//     //tipPost function 
//     function tipPost(uint _id) public payable 
//     {
//         //Make sure post is valid for tipping 
//         require((_id > 0 && _id <= postCount));
//         //Fetch the post 
//         Post memory _post = posts[_id]; 
//         //Fetch the author 
//         address payable _author = _post.author; 
//         //Pay the author by sending them Ether
//         address(_author).transfer(msg.value); 
//         //Increment tip amount 
//         _post.tipAmount = _post.tipAmount = msg.value; 
//         //Update the post 
//         posts[_id] = _post; 
//         //Trigger an event 
//         emit PostTipped(postCount, _post.content, _post.tipAmount, _author);
//     }
// }