console.log("welcome to spotify");
//Initialize all the variables
let songIndex = 0;
let audioElement = new Audio(`songs/1.mp3`);
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let playingSongName = document.getElementById('playingSongName');
let currentTime = document.getElementById('masterCurrentTime');
let totalDuration = document.getElementById('masterTotalDuration');
let heart = document.getElementById("heart");


let songs = [
      { songName: "Let Me Love You - Justin Bieber", filePath: "songs/1.mp3", coverPath: "covers/1.jpg" },
      { songName: "Calm Down - Rema, Selena Gomez", filePath: "songs/2.mp3", coverPath: "covers/2.jpg" },
      { songName: "Phir Aur kya Chahiye - Arijit, Sachin", filePath: "songs/3.mp3", coverPath: "covers/3.jpg" },
      { songName: "Different Heaven & EH!DE - My Heart [NCS Release]", filePath: "songs/4.mp3", coverPath: "covers/4.jpg" },
      { songName: "Janji-Heroes-Tonight-feat-Johnning-NCS-Release", filePath: "songs/5.mp3", coverPath: "covers/5.jpg" },
      { songName: "Tum kya mile - Arijit", filePath: "songs/2.mp3", coverPath: "covers/6.jpg" },
      { songName: "Tum kya mile - Arijit Singh, Pritam", filePath: "songs/2.mp3", coverPath: "covers/7.jpg" },
      { songName: "Bhula Dena - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/8.jpg" },
      { songName: "Tumhari Kasam - Salam-e-Ishq", filePath: "songs/2.mp3", coverPath: "covers/9.jpg" },
      { songName: "Na Jaana - Salam-e-Ishq", filePath: "songs/4.mp3", coverPath: "covers/10.jpg" },
]

const updateSongItemPlayButton = (songIndex, isPlaying) => {
      const songItemPlayButtons = Array.from(document.getElementsByClassName('songItemPlay'));

      // Reset all play buttons to play state
      songItemPlayButtons.forEach((button) => {
            button.classList.remove('fa-pause-circle');
            button.classList.add('fa-play-circle');
      });

      // Update the play button of the current song item
      const currentSongItemPlayButton = songItemPlayButtons[songIndex];
      if (isPlaying) {
            currentSongItemPlayButton.classList.remove('fa-play-circle');
            currentSongItemPlayButton.classList.add('fa-pause-circle');
      }
};

// Handle play/pause click
masterPlay.addEventListener('click', () => {
      if (audioElement.paused || audioElement.currentTime <= 0) {
            audioElement.play();
            masterPlay.classList.remove('fa-play-circle');
            masterPlay.classList.add('fa-pause-circle');
            gif.style.opacity = 1;
            updateSongItemPlayButton(songIndex, true);
            updateTime();
            changeBar();

      }
      else {
            audioElement.pause();
            masterPlay.classList.remove('fa-pause-circle');
            masterPlay.classList.add('fa-play-circle');
            gif.style.opacity = 0;
            updateSongItemPlayButton(songIndex, false);
            updateTime();
            changeBar();
      }
})

// for displayin song duration for span element in min:sec format
function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      const formattedMinutes = String(minutes).padStart(2, '0');
      const formattedSeconds = String(remainingSeconds).padStart(2, '0');
      return `${formattedMinutes}:${formattedSeconds}`;
}

// Function to update the current time and total duration



// adding all the cover's images by iterating coverpath from the songs array to the songItem img src, so that it will iterate first songItems array and then in that it will give value to our element by iterating songs array
songItems.forEach((element, i) => {
      element.getElementsByTagName("img")[0].src = songs[i].coverPath;
      element.getElementsByClassName("songName")[0].innerText = songs[i].songName;

      const audio = new Audio(songs[i].filePath);
      audio.addEventListener('durationchange', () => {
            const duration = audio.duration;
            const durationElement = element.getElementsByClassName("songDuration")[0];
            durationElement.innerText = formatTime(duration);
      });
      audio.src = songs[i].filePath;
});
// element.getElementsByClassName("songDuration")[0].innerText = formatTime(audioElement.duration);
// element.getElementsByid("songDuration")

// Listen to Events
const changeBar = () => {
      myProgressBar.addEventListener('change', () => {
            //update audio seek
            audioElement.currentTime = parseInt((myProgressBar.value * audioElement.duration) / 100);
      })
}
const updateTime = () => {
      audioElement.addEventListener('timeupdate', () => {
            // console.log('timeupdate');

            //update seekbar
            progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
            myProgressBar.value = progress;
            currentTime.innerText = formatTime(audioElement.currentTime);
            totalDuration.innerText = formatTime(audioElement.duration);
      })
}

// songItems.forEach((i))
Array.from(document.getElementsByClassName('songItemPlay')).forEach((element) => {
      element.addEventListener('click', (e) => {
            if (audioElement.paused || audioElement.currentTime <= 0) {
                  // makeAllPlays();
                  songIndex = parseInt(e.target.id);
                  e.target.classList.add('fa-pause-circle');
                  playingSongName.innerText = songs[songIndex].songName;
                  audioElement.src = `songs/${songIndex + 1}.mp3`;
                  audioElement.currentTime = 0;
                  audioElement.play();
                  gif.style.opacity = 1;
                  updateSongItemPlayButton(songIndex, true);
                  masterPlay.classList.remove('fa-play-circle');
                  masterPlay.classList.add('fa-pause-circle');
                  updateTime();
                  changeBar();

            }
            else {

                  songIndex = parseInt(e.target.id);
                  e.target.classList.add('fa-play-circle');
                  playingSongName.innerText = songs[songIndex].songName;
                  audioElement.src = `songs/${songIndex + 1}.mp3`;
                  audioElement.currentTime = 0;
                  audioElement.pause();
                  gif.style.opacity = 1;
                  updateSongItemPlayButton(songIndex, false);
                  masterPlay.classList.remove('fa-pause-circle');
                  masterPlay.classList.add('fa-play-circle');
                  updateTime();
                  changeBar();

            }
      })
})

document.getElementById("next").addEventListener('click', () => {
      if (songIndex > 9) {
            songIndex = 0;
      }
      else {
            songIndex += 1;
      }
      playingSongName.innerText = songs[songIndex].songName;
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      updateSongItemPlayButton(songIndex, true);
      updateTime();
      changeBar();

})

document.getElementById("previous").addEventListener('click', () => {
      if (songIndex <= 0) {
            songIndex = 0;
      }
      else {
            songIndex -= 1;
      }
      playingSongName.innerText = songs[songIndex].songName;
      audioElement.src = `songs/${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove('fa-play-circle');
      masterPlay.classList.add('fa-pause-circle');
      updateSongItemPlayButton(songIndex, true);
      updateTime();
      changeBar();

})

heart.addEventListener('click', () => {
      heart.style.color = "lightgreen";
      heart.style.backgroundColor = "black";
})


