var iFollow ;
var followMe;
var following = [];
var followers = [];
var followingLink = [];
var followersLink = [];
var followersLength;
var followingLength;

function checkExt(event) {
  const file = event.target.files[0];

  if (file.type !== "application/json") {
    alert(
      "Only JSON files are supported. It is recommended to download from Instagram a .json file."
    );
    return;
  }
  readJsonFile(file)
    .then((jsonData) => {
      if (file["name"] == "followers_1.json") {
        followMe = jsonData;
        followersLength = followMe.length;
        for (let index = 0; index < followersLength; index++) {
          followers.push(followMe[index].string_list_data[0].value);
          followersLink.push(followMe[index].string_list_data[0].href);
        }
      }
      if (file["name"] == "following.json") {
        iFollow = jsonData;
        followingLength = iFollow.relationships_following.length;
        for (let index = 0; index < followingLength; index++) {
          following.push(
            iFollow.relationships_following[index].string_list_data[0].value
          );

          followingLink.push(
            iFollow.relationships_following[index].string_list_data[0].href
          );
        }
      }
    })
    .catch((error) => {
      alert("Error reading" + error.message);
    }); 
  // if(following.length!=0 && followers.length !=0){
  //   compare()
  // }
}

const readJsonFile = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsText(file);
    reader.onload = (readerevent) => {
      try {
        const content = readerevent.target.result;
        const parsedJSON = JSON.parse(content);

        resolve(parsedJSON);
      } catch (error) {
        reject(error);
      }
    };
  });
};

function extraction() {

  // followingLength = iFollow.relationships_following.length;
  followersLength = followMe.length;

  // for (let index = 0; index < followingLength; index++) {
  //   following.push(
  //     iFollow.relationships_following[index].string_list_data[0].value
  //   );

  //   followingLink.push(
  //     iFollow.relationships_following[index].string_list_data[0].href
  //   );
  // }
  for (let index = 0; index < followersLength; index++) {
    followers.push(followMe[index].string_list_data[0].value);
    followersLink.push(followMe[index].string_list_data[0].href);
  }
}

function compare() {
  // extraction();
  var notFollowingBack = [];
  var notFollowingBackLink = [];

  for (let index = 0; index < followingLength; index++) {
    if (!followers.includes(following[index])) {
      notFollowingBack.push(following[index]);
      notFollowingBackLink.push(followingLink[index])
    }
  }
  // for (let index = 0; index < notFollowingBack.length; index++) {
  //   document.getElementById("unfollowers-list").innerHTML = notFollowingBack[index];
  //   document.getElementById("unfollowers-list-link").innerHTML = notFollowingBackLink[index];
    
  // }
  var l  = "Click to Unfollow <br>";
  for (let index = 0; index < notFollowingBack.length; index++) {
    
    l = l + ( "<a href="+notFollowingBackLink[index]+" target="+ "_blank> "+notFollowingBack[index]+" </a> <br>");  
  } 
  document.getElementById("unfollowers-list").innerHTML =
    l + "<br>Reload to check again, thanks for testing the app ";
  
}
