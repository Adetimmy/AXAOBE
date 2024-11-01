// SDK initialization

var ImageKit = require("imagekit");


// documentation => https://github.com/imagekit-developer/imagekit-nodejs

var imagekit = new ImageKit({
  publicKey: "public_YgXrMRmKMci3MDsWuZd/El7ephs=",
  privateKey: "private_6V1LZErKYV56NN5tdJILoC7TG/w=",
  urlEndpoint: "https://ik.imagekit.io/Adetimmy",
});

// Upload function internally uses the ImageKit.io javascript SDK

function upload(data) {
  var file = document.getElementById("file1");
  imagekit.upload(
    {
      file: file.files[0],
      fileName: "abc1.jpg",
      tags: ["tag1"],
    },
    function (err, result) {
      console.log(arguments);

      console.log(
        imagekit.url({
          src: result.url,
          transformation: [
            {
              height: 300,
              width: 400,
            },
          ],
        })
      );
    }
  );
}
