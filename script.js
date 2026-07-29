document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  
  const mainPage = document.getElementById('main-page');
  const serverPage = document.getElementById('server-page');
  
  const btnOpenServer = document.getElementById('btn-open-server');
  const btnBack = document.getElementById('btn-back');
  
  const btnOpenDonate = document.getElementById('btn-open-donate');
  const donateSection = document.getElementById('donate-section');

  // Spotify Controls
  const btnPlayPause = document.getElementById('btn-play-pause');
  const playIcon = document.getElementById('play-icon');
  const btnRewind = document.getElementById('btn-rewind');
  const btnForward = document.getElementById('btn-forward');
  const seekBar = document.getElementById('seek-bar');
  const currentTimeEl = document.getElementById('current-time');
  const durationTimeEl = document.getElementById('duration-time');

  let isPlaying = false;

  function formatTime(seconds) {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  }

  // Play/Pause
  btnPlayPause.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      playIcon.classList.remove('fa-pause');
      playIcon.classList.add('fa-play');
    } else {
      music.play().then(() => {
        playIcon.classList.remove('fa-play');
        playIcon.classList.add('fa-pause');
      }).catch(err => {
        console.log("Trình duyệt chặn phát nhạc tự động:", err);
      });
    }
    isPlaying = !isPlaying;
  });

  // Tua lùi 10s
  btnRewind.addEventListener('click', () => {
    music.currentTime = Math.max(0, music.currentTime - 10);
  });

  // Tua nhanh 10s
  btnForward.addEventListener('click', () => {
    music.currentTime = Math.min(music.duration, music.currentTime + 10);
  });

  // Cập nhật thanh tiến trình
  music.addEventListener('timeupdate', () => {
    if (music.duration) {
      const progressPercent = (music.currentTime / music.duration) * 100;
      seekBar.value = progressPercent;
      currentTimeEl.textContent = formatTime(music.currentTime);
      durationTimeEl.textContent = formatTime(music.duration);
    }
  });

  // Kéo thanh tiến trình
  seekBar.addEventListener('input', () => {
    if (music.duration) {
      music.currentTime = (seekBar.value / 100) * music.duration;
    }
  });

  // Mở trang Server Discord
  btnOpenServer.addEventListener('click', () => {
    mainPage.classList.add('hidden');
    serverPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  // Về trang chủ
  btnBack.addEventListener('click', () => {
    serverPage.classList.add('hidden');
    mainPage.classList.remove('hidden');
    window.scrollTo(0, 0);
  });

  // Ẩn/Hiện QR Donate
  btnOpenDonate.addEventListener('click', () => {
    donateSection.classList.toggle('hidden');
    if (!donateSection.classList.contains('hidden')) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
});
