const headerBtn = document.querySelector('.header__nav-btn');
const headerNav = document.querySelector('.header__nav-media');
const navLink = document.querySelectorAll('.header__link');

navLink.forEach(link =>{
    link.addEventListener('click', function (e) {
        for (let i = 0; i < navLink.length; i++) {
            navLink[i].classList.remove('active')
        }
        this.classList.add('active')
    })
})

headerBtn.addEventListener('click', function () {
    headerBtn.classList.toggle('active')
    headerNav.classList.toggle('active')
})

// accardion

const infoBoxes = document.querySelectorAll('.info__box');

for (let i = 0; i < infoBoxes.length; i++) {
    infoBoxes[i].addEventListener('click', function () {
        for (let j = 0; j < infoBoxes.length; j++) {
            infoBoxes[j].classList.remove('active')
        }
        this.classList.add('active')
    })
    
}

const sliderbtns = document.querySelectorAll('[data-target]');
const sliderItems = document.querySelectorAll('.slider__item');
const slider = document.querySelector('.slider');
let activeSlide = 0
for (let i = 0; i < sliderItems.length; i++) {
    if (sliderItems[i].classList.contains('active')) {
        activeSlide = i
    }
    
}
sliderbtns.forEach((btn)=>{
    btn.addEventListener('click', function (e) {
        sliderMove(e.target.getAttribute('data-target'))
    })
})

function sliderMove(dir) {
    if (dir === 'next') {
        if (activeSlide < sliderItems.length -1) {
            activeSlide++
        } else {
            activeSlide = 0
        }
    }else{
        if (activeSlide > 0) {
            activeSlide--
        } else {
            activeSlide = sliderItems.length -1
        }
    }
    sliderItems.forEach((item)=>{
        item.classList.remove('active')
    })
    sliderItems[activeSlide].classList.add('active')
}

setInterval(() => {
    sliderMove('next')
}, 5000);



// video

const video         = document.querySelector('.video__mp4'),
      start         = document.querySelector('#start'),
      end           = document.querySelector('#end'),
      progress      = document.querySelector('.video__progress'),
      line          = document.querySelector('.video__line'),
      ruler         = document.querySelector('.video__progress-ruler'),
      restart       = document.querySelector('.video__restart'),
      prevSpeed     = document.querySelector('.video__prev-speed'),
      prev          = document.querySelector('.video__prev'),
      playPause     = document.querySelector('.video__play'),
      next          = document.querySelector('.video__next'),
      nextSpeed     = document.querySelector('.video__next-speed'),
      volumeIcon    = document.querySelector('.video__volume-icon'),
      volumeRange   = document.querySelector('.video__volume-range'),
      screen        = document.querySelector('.video__screen'),
      speedText     = document.querySelector('.video__speed-text');

playPause.addEventListener('click', ()=>{
    videoPlay(playPause)
})
video.addEventListener('dblclick', ()=>{
    videoPlay(playPause)
})

function videoPlay(playPause) {
    playPause.classList.toggle('active')
    if (video.paused == true) {
        video.play()
        videoEnd()
        videoStart()
    } else {
        video.pause()
    }
}

function changeTime(time) {
    const noll = (num)=> num < 10 ? '0' + num : num
    let hour = Math.trunc(time / 3600)
    time -= hour * 3600
    let minute = Math.trunc(time / 60)
    time -= minute * 60
    time = Math.trunc(time)
    return `${noll(hour)}:${noll(minute)}:${noll(time)}`
}

function videoStart() {
    setInterval(() => {
        return start.innerHTML = changeTime(video.currentTime)
    }, 1000);
}
function videoEnd() {
    end.innerHTML = changeTime(video.duration)
}
restart.addEventListener('click', ()=>{
    video.currentTime = 0
})
prevSpeed.addEventListener('click', ()=>{
    playDownSpeed()
})

function playDownSpeed() {
    if (video.playbackRate > 0) {
        video.playbackRate = video.playbackRate - 0.25
        speedText.style.opacity = "1"
        speedText.innerHTML = video.playbackRate + 'x'
        setTimeout(() => {
            speedText.style.opacity = "0"
        }, 1000);
    }
}
nextSpeed.addEventListener('click', ()=>{
    playUpSpeed()
})

function playUpSpeed() {
    if (video.playbackRate < 2) {
        video.playbackRate = video.playbackRate + 0.25
        speedText.style.opacity = "1"
        speedText.innerHTML = video.playbackRate + 'x'
        setTimeout(() => {
            speedText.style.opacity = "0"
        }, 1000);
    }
}

prev.addEventListener('click', ()=>{
    alert('sizda boshqa video yoq')
})
next.addEventListener('click', ()=>{
    alert('sizda boshqa video yoq')
})
line.addEventListener('click', function (e) {
    const videoTime = (e.offsetX / line.clientWidth) * video.duration
    video.currentTime = videoTime
})
video.addEventListener('timeupdate', function () {
    const progressWidth = (video.currentTime / video.duration)
    progress.style.width = progressWidth * 100 + '%'
})

const volumeIcons = ['mute','off','down','normal','up']

video.onvolumechange = ()=>{
    for (let i = 0; i < volumeIcons.length; i++) {
        volumeIcon.classList.remove(volumeIcons[i])
    }
    let volume = video.volume * 100
    if (video.muted) {
        volumeIcon.classList.add('mute')
    }else if(volume > 75){
        volumeIcon.classList.add('up')
    }else if(volume > 50){
        volumeIcon.classList.add('normal')
    }else if(volume > 25){
        volumeIcon.classList.add('down')
    }else if(volume > 0){
        volumeIcon.classList.add('off')
    }else if(volume == 0){
        volumeIcon.classList.add('mute')
    }
}
volumeIcon.addEventListener('click', ()=> video.muted == true ? video.muted = false : video.muted = true)

volumeRange.addEventListener('click', function (e) {
    video.volume = e.currentTarget.value / 100
})
screen.addEventListener('click', ()=>{
    video.requestFullscreen()
})