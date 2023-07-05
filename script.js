// 2. This code loads the IFrame Player API code asynchronously.
var tag = document.createElement("script") // cria uma tag script

tag.src = "https://www.youtube.com/iframe_api" // busca api e insere um src
var firstScriptTag = document.getElementsByTagName("script")[0] // coloca a 1º tag script do código antes da tag script criada acima
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag)

// CRIANDO IFRAMES
let video
let ambientLight
let animationEnded = false // variável de controle
const videoId = "qC0vDKVPCrw"

// 2º frame (abaixo)
function createAmbientLight() {
  if (!animationEnded) return

  ambientLight = new YT.Player("ambient-light", {
    videoId,
    events: {
      onReady: ambientLightReady /* 1º ajuste: vídeo mutado */,
      onStateChange: ambientStateChange /* mudança de estado */,
    },
  })
}

// 1º frame (acima)
window.onYouTubeIframeAPIReady = function () {
  video = new YT.Player("video", {
    videoId,
    events: {
      /* quando mudar o estado do vídeo */ onStateChange: videoStateChange,
    },
  })
}

// CONTROLE DOS VÍDEOS
function videoStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.PLAYING:
      if (!ambientLight) return
      ambientLight.seekTo(event.target.getCurrentTime()) // coloca o vídeo de baixo no msm tempo q o vídeo principal!
      ambientLight.playVideo() // play no vídeo secundário
      break

    case YT.PlayerState.PAUSED:
      if (!ambientLight) return
      ambientLight.seekTo(event.target.getCurrentTime())
      ambientLight.pauseVideo()
      break
  }
}

function betterAmbientLight(event) {
  event.target.mute() /* comando video mute */

  const qualityLevels = event.target.getAvailableQualityLevels()
  if (qualityLevels && qualityLevels.length && qualityLevels.length > 0) {
    qualityLevels.reverse()
    const lowestLevel =
      qualityLevels[
        qualityLevels.findIndex((q) => q !== "auto")
      ] /* garante que buscará o menor index independente do nível de qualidade que existir */

    event.target.setPlaybackQuality(lowestLevel)
  }
}

// Quando vídeo secundátio estiver pronto
function ambientLightReady(event) {
  betterAmbientLight(event)
}

function ambientStateChange(event) {
  switch (event.data) {
    case YT.PlayerState.BUFFERING:
    case YT.PlayerState.PLAYING:
      betterAmbientLight(event)
      break
  }
}

// Colocando o vídeo secundário na página
const app = document.querySelector("#app") // pegando div "app"
/* quando a animação acabar, executa a função */
app.addEventListener("animationend", (e) => {
  if (e.animationName !== "appear") return

  animationEnded = true
  createAmbientLight()
})
