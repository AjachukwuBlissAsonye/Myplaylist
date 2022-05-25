const musicContainer = document.querySelector(".music-container");
const musicTitle = document.querySelector("#title");
const musicCover = document.querySelector("#cover");
const playBtn = document.querySelector("#play");
const prevBtn = document.querySelector("#prev");
const nextBtn = document.querySelector("#next");
const progressBar = document.querySelector(".progress-bar");
const progress = document.querySelector(".progress");
const audio = document.querySelector("#audio");

//Pass the song titles into an array
const songs = ["simi", "ronisia", "pomme"];

//making one song a default using the array index of the song titles
let homeSong = 2;

const loadSong = (song) => {
  musicTitle.innerText = song;
  audio.src = `audio/${song}.mp3`;
  musicCover.src = `img/${song}.jpg`;
};

const playMusic = () => {
  musicContainer.classList.add("play");
  playBtn.querySelector("i.fas").classList.remove("fa-play");
  playBtn.querySelector("i.fas").classList.add("fa-pause");

  audio.play();
};

const pauseMusic = () => {
  musicContainer.classList.remove("play");
  playBtn.querySelector("i.fas").classList.remove("fa-pause");
  playBtn.querySelector("i.fas").classList.add("fa-play");

  audio.pause();
};

const prevMusic = () => {
  homeSong--;

  if (homeSong < 0) {
    homeSong = songs.length - 1;
  }
  loadSong(songs[homeSong]);
  playMusic();
};

const nextMusic = () => {
  homeSong++;

  if (homeSong > songs.length - 1) {
    homeSong = 0;
  }

  loadSong(songs[homeSong]);
  playMusic();
};

const musicProgress = (event) => {
  const { duration, currentTime } = event.srcElement;
  const barPercent = (currentTime / duration) * 100;
  progress.style.width = `${barPercent}%`;
};

function setBar(event) {
  const width = this.clientWidth;
  const clickX = event.offsetX;
  const duration = audio.duration;
  audio.currentTime = (clickX / width) * duration;
}
loadSong(songs[homeSong]);

//Adding Event listeners to the buttons
playBtn.addEventListener("click", () => {
  const musicOn = musicContainer.classList.contains("play");

  if (musicOn) {
    pauseMusic();
  } else {
    playMusic();
  }
});

prevBtn.addEventListener("click", () => {
  prevMusic();
});

nextBtn.addEventListener("click", () => {
  nextMusic();
});

//using the timeupdate from audio to match the progressbar with the width of the audio progress
audio.addEventListener("timeupdate", musicProgress);

//Listening for click action on the progress bar

progressBar.addEventListener("click", setBar);

//Calling nextMusic when song is done playing.

audio.addEventListener("ended", nextMusic);
