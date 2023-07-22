var following = [];
var followers = [];
var followingLink = [];
var followersLink = [];
var followersLength;
var followingLength;

function checkExt(filename) {
  if (!filename.match(/\.json$/)) {
    alert(
      "Only JSON files are supported. It is recommended to download from Instagram a .json file."
    );
  }
}

function uploadFile() {
  let file = document.querySelector("#filea");
}

function extraction() {
    var iFollow = document.getElementById("following");
    var followMe = document.getElementById("followers");
    iFollow = require(iFollow);
    followMe = require(followMe);
    console.log(iFollow)

//   var iFollow = require("./following.json");
//   var followMe = require("./followers_1.json");

  followingLength = iFollow.relationships_following.length;

  followersLength = followMe.length;

  for (let index = 0; index < followingLength; index++) {
    following.push(
      iFollow.relationships_following[index].string_list_data[0].value
    );

    followingLink.push(
      iFollow.relationships_following[index].string_list_data[0].href
    );
  }
  for (let index = 0; index < followersLength; index++) {
    followers.push(followMe[index].string_list_data[0].value);
    followersLink.push(followMe[index].string_list_data[0].href);
  }
}

function compare() {
  extraction();
  var notFollowingBack = [];

  for (let index = 0; index < followingLength; index++) {
    if (!followers.includes(following[index])) {
      notFollowingBack.push(following[index] + " - " + followingLink[index]);
    }
  }
  console.log(notFollowingBack[0]);

  // const string = JSON.stringify(notFollowingBack, null, 4);

  // document.getElementById("unfollowers-list").innerHTML = "notFollowingBack[0]";
}
compare();
