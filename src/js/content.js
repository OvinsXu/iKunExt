const audio = new AudioContext();
let source = audio.createBufferSource();
// 加载音频文件
const setMP3 = () => {

    const request = new XMLHttpRequest();

    request.open('GET', chrome.runtime.getURL("audio/ji.mp3"), true);
    request.responseType = 'arraybuffer';
    request.onload = function () {
        audio.decodeAudioData(request.response, function (buffer) {
            source.buffer = buffer;
        });
    };

    request.send();
    source.connect(audio.destination);

}

let img = document.createElement("img");

img.style.position = "fixed";
img.style.bottom = "10px";
img.style.right = "10px";
img.src = chrome.runtime.getURL("images/tiao.gif");
img.id = "imgTiao"

// 将图片添加到网页的 body 元素中
document.body.appendChild(img);


let isPlay = false;
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    //唱
    if (request.btnClick == "chang") {
        isPlay = !isPlay;
        if (isPlay) {
            setMP3();
            source.start();
        } else {
            source.stop();
            source = audio.createBufferSource();
        }
    }
    //跳
    if (request.btnClick == "tiao") {
        let mimg = document.getElementById('imgTiao');

        if (mimg.style.display == "none") {
            mimg.style.display = "block";
        } else {
            mimg.style.display = "none";
        }

    }
});