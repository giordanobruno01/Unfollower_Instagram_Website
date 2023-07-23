var iFollow;
var followMe;
var following = [];
var followers = [];
var followingLink = [];
var followersLink = [];
var followersLength;
var followingLength;

function checkExt(event) {
  const file = event.target.files[0];
 const fileName = document.getElementById('followers');
 
  if (file.type !== "application/json") {
    alert(
      "Only JSON files are supported. It is recommended to download from Instagram a .json file."
    );
    fileName.value = "";
    return;
  } else if (
    file.name != "followers_1.json" &&
    file.name != "following.json"
  ) {
    alert(
      "Only files named as following.json or followers_1.json allowed, check again."
    );
    fileName.value = "";
    return;
  } else {
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
  }
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

// function extraction() {

// followingLength = iFollow.relationships_following.length;
// followersLength = followMe.length;

// for (let index = 0; index < followingLength; index++) {
//   following.push(
//     iFollow.relationships_following[index].string_list_data[0].value
//   );

//   followingLink.push(
//     iFollow.relationships_following[index].string_list_data[0].href
//   );
// }
// for (let index = 0; index < followersLength; index++) {
//   followers.push(followMe[index].string_list_data[0].value);
//   followersLink.push(followMe[index].string_list_data[0].href);
//   }
// }

function compare() {
  
  var notFollowingBack = [];
  var notFollowingBackLink = [];

  for (let index = 0; index < followingLength; index++) {
    if (!followers.includes(following[index])) {
      notFollowingBack.push(following[index]);
      notFollowingBackLink.push(followingLink[index]);
    }
  }
  // for (let index = 0; index < notFollowingBack.length; index++) {
  //   document.getElementById("unfollowers-list").innerHTML = notFollowingBack[index];
  //   document.getElementById("unfollowers-list-link").innerHTML = notFollowingBackLink[index];

  // }
  var l1 = "";
  var l2 = "";

  c =
    notFollowingBack.length +
    " Instagram users do not follow you back <br><br>";
  unf = "Click the link to Unfollow them <br>";
  for (let index = 0; index < notFollowingBack.length / 2; index++) {
    l1 =
      l1 +
      ("<a href=" +
        notFollowingBackLink[index] +
        " target=" +
        "_blank> " +
        notFollowingBack[index] +
        " </a> <br>");
  }
  for (
    let index = notFollowingBack.length / 2;
    index < notFollowingBack.length;
    index++
  ) {
    l2 =
      l2 +
      ("<a href=" + notFollowingBackLink[index] + " target=" + "_blank> " +
        notFollowingBack[index] + " </a> <br>");
  }
  d = "<br>Reload to check again, thanks for testing the website <br>";

  document.getElementById("count").innerHTML = c;
  document.getElementById("unf").innerHTML = unf;
  document.getElementById("unfollowers-listLeft").innerHTML = l1;
  document.getElementById("unfollowers-listRight").innerHTML = l2;
  document.getElementById("final").innerHTML = d;

  // document.getElementById("unfollowers-list").innerHTML =
  //   '<button type="button" onClick="window.location.reload()">Reload</button>';
}
