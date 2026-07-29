document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-btn');
  const musicIcon = document.getElementById('music-icon');
  
  let isPlaying = false;

  // Toggle Bật/Tắt nhạc khi bấm nút
  musicBtn.addEventListener('click', () => {
    if (isPlaying) {
      music.pause();
      musicIcon.classList.remove('fa-volume-high');
      musicIcon.classList.add('fa-volume-xmark');
    } else {
      music.play().then(() => {
        musicIcon.classList.remove('fa-volume-xmark');
        musicIcon.classList.add('fa-volume-high');
      }).catch(err => {
        console.log("Trình duyệt chặn tự động phát nhạc:", err);
      });
    }
    isPlaying = !isPlaying;
  });
});