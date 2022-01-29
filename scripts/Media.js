/**
 * File to ask the user for camera use. This media.js
 * file will need to be granted permission by the
 * user to use the camera and the microphone in order
 * to stream video and use audio. Because of the way
 * getUserMedia() works, it is very tedious to test it
 * locally since it requires a https validation from the
 * browser.
 */

// gonna scrape the code example directly from
// https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getUserMedia
// throwing in some secret herbs and spices from
// https://developers.google.com/web/updates/2015/10/media-devices

var constraints = {video: {width: 256, height: 144}};
// testing just video for now

// this works if you open the extension as a webpage
// not as a proper extension tho
// ok so apparently Chrome doesn't allow unpacked extensions to access the camera
// fine, no problem. I can pack this extension (into a .crx file) and run it right?
// WRONG! in order to run a packed extension, it must come from the web store
// so there is no way to get the camera working unless we pay to publish this
navigator.mediaDevices.getUserMedia(constraints).then(function(mediaStream){
    
    var video = document.querySelector("video");
    // there is more than 1 video element in the page dunno why
    
    console.log("made it 1");

    //var videoTracks = mediaStream.getVideoTracks();
    //console.log("using video device: " + videoTracks[0].label);
    //window.stream = mediaStream;
    // not entirely sure what this does

    console.log("made it 2");

    video.srcObject = mediaStream;
    
    console.log("made it 3");

    video.onloadedmetadata = function(e){
        video.play();
    };

}).catch(function(err){
    console.log(err.name + ": " + err.message);
});

// the following code is scraped from
// https://developers.google.com/web/updates/2015/10/media-devices
// just to see what it does

navigator.mediaDevices.enumerateDevices()
  .then(gotDevices)
  .catch(errorCallback);

function gotDevices(deviceInfos){
    console.log("found " + deviceInfos.length + " devices");
    
    for(var i = 0; i < deviceInfos.length; i++){
        console.log("device type: " + deviceInfos[i].kind);
    }
}

function errorCallback(){
    console.log("help I have no audio or video :o");
}

/*
var video = document.querySelector("#videoElement");

// Ask for camera permission and stream it if granted
if(navigator.mediaDevices.getUserMedia) {
  navigator.mediaDevices.getUserMedia({ video : true })
    .then(function (stream) {
      video.srcObject = stream;
    })
    .catch(function (err0r) {
      console.log("Could not open the camera stream!");
    });
}

// Ask for microphone permission and use it if granted
if(navigator.mediaDevices.getUserMedia) {
    navigator.mediaDevices.getUserMedia({ audio : true }, function(stream) {
        console.log("Microphone accessed!");
    },
    function(err) {
        console.log("Could not access the microphone!");
    });
}
*/