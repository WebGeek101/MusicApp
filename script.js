const musicContainer=document.getElementById("music-container");
const playBtn=document.getElementById("play");
const prevBtn=document.getElementById("prev");
const nextBtn=document.getElementById("next");
const audio=document.getElementById("audio");
const progress=document.getElementById("progress");
const progresssContainer=document.getElementById("progress-container");
const title=document.getElementById("title");
const cover=document.getElementById("cover");

//Songs
const songs = ["one", "two", "three"];

//keep track of songs
let songIndex=0;

//Initially load song intp my datbase
loadSong(songs[songIndex]);

//Update song (details)
function loadSong(song)
{
    title.innerText = song;
    audio.src=`${song}.mp3`;
    cover.src=`${song}.jpg`;
}

//Play song
function playSong()
{
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
}

//Stop song
function pauseSong()
{
    musicContainer.classList.remove("play");
    playBtn.querySelector("i.fa").classList.add("fa-play");
    playBtn.querySelector("i.fa").classList.remove("fa-pause");
    audio.pause();
}

//Previous songs
function prevSong()
{
    songIndex--;
    if(songIndex <0 )
    {
        songIndex=songs.length-1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Next song
function nextSong(){
    songIndex++;
    if(songIndex > songs.length-1)
    {
        songIndex=0;
    }
    loadSong(songs[songIndex]);
    playSong();
}

//Update progress bar
function updateProgress(e)
{
    const{duration,currentTime}=e.srcElement;
    const progressPerCent=(currentTime/duration)*100;
    progress.style.width=`${progressPerCent}%`;
}

//Set Progress
function setProgress(e)
{
    const width=this.clientWidth;
    const clickX=e.offsetX;
    const duration=audio.duration;
    audio.currentTime=(clickX/width)*duration;
}

//Event Listenrers
playBtn.addEventListener("click",()=>{
    const isPlaying=musicContainer.classList.contains("play");
    if(isPlaying)
    {
        pauseSong();
    }
    else
    {
        playSong();
    }
});



//Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

//Time/Song Update
audio.addEventListener("timeupdate",updateProgress);

//Cick on Progress vbar
progresssContainer.addEventListener("click",setProgress);

//Song End
audio.addEventListener("ended",nextSong);