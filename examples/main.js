// Multitracks example

import Multitracks from '../dist/multitracks.js'

// Call Multitracks.create to initialize a multitrack mixer
// Pass a tracks array and WaveSurfer options with a container element for each track, or a single container for all tracks
const multitrack = Multitracks.create(
  [
    {
      id: 0,
      hideScrollbar: true,
      container: document.querySelector('#track0'),
    },
    {
      id: 1,
      container: document.querySelector('#track1'),
      draggable: false,
      startPosition: 14, // start time relative to the entire multitrack
      url: '/examples/audio/librivox.mp3',
      fadeInEnd: 5,
      fadeOutStart: 250,
      volume: 1,
      options: {
        waveColor: 'hsl(46, 87%, 49%)',
        progressColor: 'hsl(46, 87%, 20%)',
      },
      intro: {
        endTime: 16,
        label: 'Intro',
        color: '#FFE56E',
      },
      markers: [
        {
          time: 21,
          label: 'M1',
          color: 'hsla(600, 100%, 30%, 0.5)',
        },
        {
          time: 22.7,
          label: 'M2',
          color: 'hsla(400, 100%, 30%, 0.5)',
        },
        {
          time: 24,
          label: 'M3',
          color: 'hsla(200, 50%, 70%, 0.5)',
        },
        {
          time: 27,
          label: 'M4',
          color: 'hsla(200, 50%, 70%, 0.5)',
        },
      ],
      // peaks: [ [ 0, 0, 2.567, -2.454, 10.5645 ] ], // optional pre-generated peaks
    },
    {
      id: 2,
      container: document.querySelector('#track2'),
      hideScrollbar: true,
      draggable: true,
      startPosition: 1,
      startCue: 2.1,
      endCue: 20,
      fadeInEnd: 8,
      fadeOutStart: 11,
      volume: 0.8,
      options: {
        waveColor: 'hsl(161, 87%, 49%)',
        progressColor: 'hsl(161, 87%, 20%)',
      },
      url: '/examples/audio/audio.wav',
    },
  ],
  {
    minPxPerSec: 10, // zoom level
    rightButtonDrag: true, // drag tracks with the right mouse button
    cursorWidth: 2,
    cursorColor: '#D72F21',
    trackBackground: '#2D2D2D',
    trackBorderColor: '#7C7C7C',
    envelopeOptions: {
      lineColor: 'rgba(255, 0, 0, 0.7)',
      lineWidth: 4,
      dragPointSize: 8,
      dragPointFill: 'rgba(255, 255, 255, 0.8)',
      dragPointStroke: 'rgba(255, 255, 255, 0.3)',
    },
  },
)

// Events
multitracks.on('start-position-change', ({ id, startPosition }) => {
  console.log(`Track ${id} start position updated to ${startPosition}`)
})
multitracks.on('start-cue-change', ({ id, startCue }) => {
  console.log(`Track ${id} start cue updated to ${startCue}`)
})
multitracks.on('end-cue-change', ({ id, endCue }) => {
  console.log(`Track ${id} end cue updated to ${endCue}`)
})
multitracks.on('volume-change', ({ id, volume }) => {
  console.log(`Track ${id} volume updated to ${volume}`)
})
multitracks.on('fade-in-change', ({ id, fadeInEnd }) => {
  console.log(`Track ${id} fade-in updated to ${fadeInEnd}`)
})
multitracks.on('fade-out-change', ({ id, fadeOutStart }) => {
  console.log(`Track ${id} fade-out updated to ${fadeOutStart}`)
})
multitracks.on('intro-end-change', ({ id, endTime }) => {
  console.log(`Track ${id} intro end updated to ${endTime}`)
})
multitracks.on('drop', ({ id }) => {
  multitracks.addTrack({
    id,
    url: '/examples/audio/demo.wav',
    startPosition: 0,
    draggable: true,
    options: {
      waveColor: 'hsl(25, 87%, 49%)',
      progressColor: 'hsl(25, 87%, 20%)',
    },
  })
})

// Play/pause button
const button = document.querySelector('#play')
button.disabled = true
multitracks.once('canplay', () => {
  button.disabled = false
  button.onclick = () => {
    multitracks.isPlaying() ? multitracks.pause() : multitracks.play()
    button.textContent = multitracks.isPlaying() ? 'Pause' : 'Play'
  }
})

// Forward/back buttons
const forward = document.querySelector('#forward')
forward.onclick = () => {
  multitracks.setTime(multitracks.getCurrentTime() + 30)
}
const backward = document.querySelector('#backward')
backward.onclick = () => {
  multitracks.setTime(multitracks.getCurrentTime() - 30)
}

// Zoom
const slider = document.querySelector('input[type="range"]')
slider.oninput = () => {
  multitracks.zoom(slider.valueAsNumber)
}

// Destroy all wavesurfer instances on unmount
// This should be called before calling initMultitracks again to properly clean up
window.onbeforeunload = () => {
  multitracks.destroy()
}
