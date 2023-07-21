    var following = [] ;
    var followers = [];
    var followingLink = [];
    var followersLink = [];
    var followersLength;
    var followingLength;
    

function checkExt(filename){

    if (!filename.match(/\.json$/)){
        alert('Only JSON files are supported. It is recommended to download from Instagram a .json file.');
    }
}

function uploadFile(){
    let file = document.querySelector('#filea');
}

function extraction(){

    const v = require('./following.json');
    const f = require('./followers_1.json');
    followingLength = v.relationships_following.length;
    followersLength = f.length;


    for (let index = 0; index < followingLength; index++) {
        following.push(v.relationships_following[index].string_list_data[0].value);
        
        followingLink.push(v.relationships_following[index].string_list_data[0].href)
        
    }
    for (let index = 0; index < followersLength; index++) {
        followers.push(f[index].string_list_data[0].value)
        followersLink.push(f[index].string_list_data[0].href)  
    }
}

function compare(){
    
    extraction()
    var notFollowingBack= []
    

    for (let index = 0; index < followingLength; index++) {
        if(!followers.includes(following[index])){
            notFollowingBack.push(following[index]+ " - " + followingLink[index]);

        }
    }
    const string = JSON.stringify(notFollowingBack, null, 4);

    document.getElementById("unfollowers-list").innerHTML = string;
}
