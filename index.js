console.log("Hello World");
let songIndex = 0;
let audio = new Audio("../songs/1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let songItem = Array.from(document.getElementsByClassName("songItem"));
let songItemPlay = Array.from(document.getElementsByClassName("songItemPlay"));

let songs = [
  {
    songName: "relaxing tune",
    filePath: "songs/1.mp3",
    coverPath: "covers/1.jpg",
  },
  {
    songName: "relaxing tune2",
    filePath: "songs/2.mp3",
    coverPath: "covers/2.jpg",
  },
  {
    songName: "relaxing tun3",
    filePath: "songs/3.mp3",
    coverPath: "covers/3.jpg",
  },
  {
    songName: "relaxing tune4",
    filePath: "songs/4.mp3",
    coverPath: "covers/4.jpg",
  },
];

//song item play
songItemPlay.forEach((play, index) => {
  play.addEventListener("click", () => {
    if (songIndex == index) {
      if (audio.paused) {
        audio.play();
        play.src = "fa-circle-pause";
        gif.style.opacity = "1";
      } else {
        audio.pause();
        play.src = "fa-circle-play";
        gif.style.opacity = "0";
      }
    } else {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    }
  });
});

//change songs time

//changing name and images
songItem.forEach((element, index) => {
  element.getElementsByTagName("img")[0].src = songs[index].coverPath;
  element.getElementsByClassName("songsName")[0].innerText =
    songs[index].songName;
});

//play song or pause song
masterPlay.addEventListener("click", () => {
  if (audio.paused || audio.currentTime <= 0) {
    audio.play();
    masterPlay.classList.remove("fa-circle-play");
    masterPlay.classList.add("fa-circle-pause");
    gif.style.opacity = "1";
  } else {
    audio.pause();
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
    gif.style.opacity = "0";
  }
});

//time update on progrees bar
audio.addEventListener("timeupdate", () => {
  let position = parseInt((audio.currentTime / audio.duration) * 100);
  myProgressBar.value = position;
});

//change song on progress bar
myProgressBar.addEventListener("change", () => {
  audio.width.currentTime = (myProgressBar.value * audio.duration) / 100;
});

function newFunction() {
  timeStamp.forEach((time, index) => {
    time.innerText = convertTime(songs[index][0].filePath.duration);
  });
}
// masterPlay.classList.remove("fa-regular fa-3x fa-circle-play");
// masterPlay.classList.add(" fa-regular fa-pause");
const makesAllPlay = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.remove("fa-circle-pause");
      element.classList.add("fa-circle-play");
    }
  );
};

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makesAllPlay();
      songIndex = parseInt(e.target.id);
      e.target.classList.remove("fa-circle-play");
      e.target.classList.add("fa-circle-pause");
      audio.src = "../songs/${songIndex+1}.mp3";
      audio.currentTime = 0;
      audio.play();
      masterPlay.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
    });
  }
);
