var iFollow;
var followMe;
var following = [];
var followers = [];
var followingLink = [];
var followersLink = [];
var followersLength;
var followingLength;

function unzip(files) {
  var file = files[0];

  var reader = new FileReader();
  reader.onload = function (event) {
    var zip = new JSZip();
    zip.loadAsync(event.target.result).then(function (zip) {
      var filePromises = [];

      Object.keys(zip.files).forEach(function (filename) {
        var file;

        if (filename.split("/")[1] == "following.json") {
          //
          file = zip.files[filename];
          if (!file.dir) {
            filePromises.push(
              file.async("blob").then(async function (blob) {
                // var a = document.createElement("a");
                // a.href = window.URL.createObjectURL(blob);
                // a.download = filename;
                // a.click();
                iFollow = JSON.parse(await blob.text())
                followingLength = iFollow.relationships_following.length;
                for (let index = 0; index < followingLength; index++) {
                  following.push(
                    iFollow.relationships_following[index].string_list_data[0]
                      .value
                  );
                  followingLink.push(
                    iFollow.relationships_following[index].string_list_data[0]
                      .href
                  );
                }
                // console.log(JSON.parse(await blob.text()));
              })
            );
          }
        }
        if (filename.split("/")[1] == "followers_1.json") {
          //
          file = zip.files[filename];
          if (!file.dir) {
            filePromises.push(
              file.async("blob").then(async function (blob) {
                
                followMe = JSON.parse(await blob.text())
                followersLength = followMe.length;
                for (let index = 0; index < followersLength; index++) {
                  followers.push(followMe[index].string_list_data[0].value);
                  followersLink.push(followMe[index].string_list_data[0].href);
                }

                // console.log(JSON.parse(await blob.text()));
              })
            );
          }
        }
      });
    });
  };
  reader.readAsArrayBuffer(file);
}

function checkExt(event) {
  const file = event.target.files[0];

  const fileName1 = document.getElementById("followers");
  const fileName2 = document.getElementById("following");

  if (file.type !== "application/json") {
    //not working this
    alert(
      "Only JSON files are supported. It is recommended to download from Instagram a .json file."
    );

    fileName1.value = "";
    fileName2.value = "";
    return;
  } else if (file.name != "followers_1.json" && file.name != "following.json") {
    alert(
      "Only files named as following.json or followers_1.json allowed, check again."
    );
    if (file.name != "followers_1.json") {
      fileName1.value = "";
    } else if (file.name != "following.json") {
      fileName2.value = "";
    }

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

function fileIncorrect() {
  const fileName1 = document.getElementById("followers");
  const fileName2 = document.getElementById("following");
}

function compare() {
  var notFollowingBack = [];
  var notFollowingBackLink = [];

  for (let index = 0; index < followingLength; index++) {
    if (!followers.includes(following[index])) {
      notFollowingBack.push(following[index]);
      notFollowingBackLink.push(followingLink[index]);
    }
  }
  if (notFollowingBack.length == 0) {
    document.getElementById("count").innerHTML =
      "The files are not correct, one needs to be <strong>following.json</strong> and the other <strong>followers_1.json</strong>, if the error persist try to download again from Instagram";
    return;
  }

  var l1 = "";
  var l2 = "";

  c =
    notFollowingBack.length +
    " Instagram users do not follow you back <br><br>";
  unf = "Click the link to Unfollow them <br>";
  for (let index = 0; index < notFollowingBack.length / 2; index++) {
    console.log(index, " ", notFollowingBack[index]);
    l1 =
      l1 +
      `<a href= ${notFollowingBackLink[index]} target= "_blank"> 
        ${notFollowingBack[index]}</a> <br>`;
  }
  for (
    let index = (notFollowingBack.length / 2).toFixed(0);
    index < notFollowingBack.length;
    index++
  ) {
    if (notFollowingBack.length > 1) {
      console.log(index, " ", notFollowingBack[index]);
      l2 =
        l2 +
        `<a href=
          ${notFollowingBackLink[index]} target= "_blank"> 
          ${notFollowingBack[index]} </a> <br>`;
    }
  }

  d =
    "Reload to check another files<br>To update the list of users you need to download again the json files from Instagram and upload here again<br>Thanks for testing the website";

  document.getElementById("count").innerHTML = c;
  document.getElementById("unf").innerHTML = unf;
  document.getElementById("unfollowers-listLeft").innerHTML = l1;
  document.getElementById("unfollowers-listRight").innerHTML = l2;
  document.getElementById("final").innerHTML = d;
}
