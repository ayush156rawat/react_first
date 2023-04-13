console.log("welcome to spotify");
let songindex = 0;
let audioElement = new Audio('song/1.mp3');
let masterPlay = document.getElementById('masterplay');
let myProgressBar= document.getElementById('myProgressBar');
let gif= document.getElementById('gif');
let mastersongname= document.getElementById('mastersongname');
let songitem = Array.from(document.getElementsByClassName('songitem'));

let songs = [
    {songName: "om-shanti-om-sharukh", filePath: "song/1.mp3", coverPath:"cover/skul.jfif"},
    {songName: "meri jaan-alia bhat", filePath: "song/2.mp3", coverPath:"cover/1.webp"},
    {songName: "naaza-guru randhawa", filePath: "song/3.mp3", coverPath:"cover/2.jpg"},
    {songName: "volume 1-honey singh", filePath: "song/4.mp3", coverPath:"cover/4.jfif"},
    {songName: "basanti-shole", filePath: "song/5.mp3", coverPath:"cover/5.jpg"},
    {songName: "kanjoos-fukrey", filePath: "song/6.mp3", coverPath:"cover/6.jpg"},
    {songName: "arre waah waah waah-my fav", filePath: "song/7.mp3", coverPath:"cover/7.jfif"}
]

songitem.forEach((element,i)=>{
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songname")[0].innerText = songs[i].songName ;
})

//handle play pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-circle-pause');
        masterPlay.classList.add('fa-circle-play');
        gif.style.opacity = 0;
    }
})

//listen to event
audioElement.addEventListener('timeupdate', ()=>{
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value*audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
        element.classList.remove('fa-circle-pause');
        element.classList.add('fa-circle-play');
})
}
Array.from(document.getElementsByClassName('songitemplay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        console.log(e.target);
        makeAllPlays();
        songindex = parseInt(e.target.id);
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-circle-pause');
        audioElement.src = `song/${songindex+1}.mp3`;
        gif.style.opacity = 1;
        mastersongname.innerText = songs[songindex].songName;
        audioElement.currentTime=0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-circle-pause');
    })
})

document.getElementById('next').addEventListener('click',()=>{
    if(songindex>=6){
        songindex=0;
    }
    else{
        songindex+=1;
    }
    audioElement.src = `song/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})

document.getElementById('previous').addEventListener('click',()=>{
    if(songindex<=0){
        songindex=0;
    }
    else{
        songindex-=1;
    }
    audioElement.src = `song/${songindex+1}.mp3`;
    mastersongname.innerText = songs[songindex].songName;
    audioElement.currentTime=0;
    audioElement.play();
    masterPlay.classList.remove('fa-circle-play');
    masterPlay.classList.add('fa-circle-pause'); 
})