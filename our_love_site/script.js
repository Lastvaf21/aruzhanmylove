const openButton = document.getElementById("openLove");
const welcome = document.getElementById("welcome");
const lovePage = document.getElementById("lovePage");
const audio = document.getElementById("loveAudio");
const musicButton = document.getElementById("musicButton");
const musicStatus = document.getElementById("musicStatus");
const equalizer = document.getElementById("equalizer");

// Открываем вашу историю и плавно прокручиваем страницу вверх.
openButton.addEventListener("click", () => {
  welcome.classList.add("hidden");
  lovePage.classList.remove("hidden");
  window.scrollTo({ top: 0, behavior: "smooth" });
  createAmbientHearts();
});

// Музыка запускается только после нажатия — так работают ограничения браузеров.
musicButton.addEventListener("click", async () => {
  if (audio.paused) {
    try {
      await audio.play();
      musicButton.textContent = "Ⅱ";
      musicStatus.textContent = "Сейчас играет для тебя ❤️";
      equalizer.classList.add("playing");
    } catch (error) {
      musicStatus.textContent = "Добавь файл music/our-song.mp3";
    }
  } else {
    audio.pause();
    musicButton.textContent = "♫";
    musicStatus.textContent = "Музыка на паузе";
    equalizer.classList.remove("playing");
  }
});

audio.addEventListener("ended", () => {
  musicButton.textContent = "♫";
  equalizer.classList.remove("playing");
});

// Увеличение фотографий по нажатию.
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const closeLightbox = document.getElementById("closeLightbox");

document.querySelectorAll(".memory-photo img, .chat-image-wrap img").forEach((img) => {
  img.addEventListener("click", () => {
    lightboxImage.src = img.src;
    lightboxImage.alt = img.alt;
    lightbox.classList.remove("hidden");
  });
});

function closePhoto() {
  lightbox.classList.add("hidden");
  lightboxImage.src = "";
}
closeLightbox.addEventListener("click", closePhoto);
lightbox.addEventListener("click", (event) => {
  if (event.target === lightbox) closePhoto();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePhoto();
});

// Лёгкие декоративные сердечки на фоне.
function createAmbientHearts() {
  const layer = document.querySelector(".ambient-hearts");
  if (layer.dataset.created) return;
  layer.dataset.created = "true";
  const symbols = ["♥", "♡", "❤"];
  for (let i = 0; i < 22; i++) {
    const heart = document.createElement("span");
    heart.className = "ambient-heart";
    heart.textContent = symbols[Math.floor(Math.random() * symbols.length)];
    heart.style.left = `${Math.random() * 100}%`;
    heart.style.fontSize = `${12 + Math.random() * 20}px`;
    heart.style.animationDuration = `${9 + Math.random() * 13}s`;
    heart.style.animationDelay = `${Math.random() * 8}s`;
    layer.appendChild(heart);
  }
}
