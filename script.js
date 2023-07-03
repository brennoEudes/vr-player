// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script") // cria uma tag script

tag.src = "https://www.youtube.com/iframe_api" // busca api e insere um src
var firstScriptTag = document.getElementsByTagName("script")[0] // coloca a 1º tag script do código antes da tag script criada acima
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// Criando iframes
let video
let ambientLight
let animationEnded = false
const videoId = "qC0vDKVPCrw"

function createAmbientLight() {
  if (!animationEnded)
    return (ambientLight = new YT.Player("ambient-light", {
      videoId,
      events: {
        onReady: ambientLightReady /* vídeo mute */,
        onStateChange: ambientStateChange,
      },
    }))
}

window.onYouTubeIframeAPIReady = function () {
  video = new YT.Player("video", {
    videoId,
    events: {
      /* quando mudar o estado do vídeo */ onStateChange: videoStateChange,
    },
  })
}

function videoStateChange(event) {}
function ambientLightReady(event) {}
function ambientStateChange(event) {}
