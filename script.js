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

// 1º frame (abaixo)
function createAmbientLight() {
  if (!animationEnded) return

  ambientLight = new YT.Player("ambient-light", {
    videoId,
    events: {
      onReady: ambientLightReady /* vídeo mute */,
      onStateChange: ambientStateChange,
    },
  })
}

// 2º frame (acima)
window.onYouTubeIframeAPIReady = function () {
  video = new YT.Player("video", {
    videoId,
    events: {
      /* quando mudar o estado do vídeo */ onStateChange: videoStateChange,
    },
  })
}

function videoStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      if (!ambientLight) return
      ambientLight.seekTo(event.target.getCurrentTime()) // colocando o vídeo de abaixo no msm tempo q o vídeo principal!
      ambientLight.playVideo()
      break

    case YT.PlayerState.PAUSE:
      if (!ambientLight) return
      ambientLight.seekTo(event.target.getCurrentTime())
      ambientLight.pauseVideo()
      break
  }
}
function ambientLightReady(event) {
  event.target.mute() /* cmd video mute */
}
function ambientStateChange(event) {}

const app = document.querySelector("#app")
/* quando a animação acabar, executa a função */
app.addEventListener("animationend", (e) => {
  if (e.animationName !== "appear") return

  animationEnded = true
  createAmbientLight()
})
