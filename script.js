document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  
  // Nút mở các section xổ xuống
  const btnToggleServer = document.getElementById('btn-toggle-server');
  const serverSection = document.getElementById('server-section');
  
  const btnOpenDonate = document.getElementById('btn-open-donate');
  const donateSection = document.getElementById('donate-section');

  const btnToggleService = document.getElementById('btn-toggle-service');
  const serviceSection = document.getElementById('service-section');

  // Spotify Player
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

  btnRewind.addEventListener('click', () => {
    music.currentTime = Math.max(0, music.currentTime - 10);
  });

  btnForward.addEventListener('click', () => {
    music.currentTime = Math.min(music.duration, music.currentTime + 10);
  });

  music.addEventListener('timeupdate', () => {
    if (music.duration) {
      const progressPercent = (music.currentTime / music.duration) * 100;
      seekBar.value = progressPercent;
      currentTimeEl.textContent = formatTime(music.currentTime);
      durationTimeEl.textContent = formatTime(music.duration);
    }
  });

  seekBar.addEventListener('input', () => {
    if (music.duration) {
      music.currentTime = (seekBar.value / 100) * music.duration;
    }
  });

  // Toggle ẩn/hiện Server Section
  btnToggleServer.addEventListener('click', () => {
    serverSection.classList.toggle('hidden');
    if (!serverSection.classList.contains('hidden')) {
      serverSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Toggle ẩn/hiện Donate Section
  btnOpenDonate.addEventListener('click', () => {
    donateSection.classList.toggle('hidden');
    if (!donateSection.classList.contains('hidden')) {
      donateSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // Toggle ẩn/hiện Dịch vụ Mua hộ Section
  btnToggleService.addEventListener('click', () => {
    serviceSection.classList.toggle('hidden');
    if (!serviceSection.classList.contains('hidden')) {
      serviceSection.scrollIntoView({ behavior: 'smooth' });
    }
  });

  // ==========================================
  // BỘ ĐIỀU KHIỂN IMAGE VIEWER MODAL (ZOOM & DRAG)
  // ==========================================
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');
  const serverPreviewImg = document.getElementById('server-preview-img');

  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');

  let scale = 1;
  let pointX = 0;
  let pointY = 0;
  let startX = 0;
  let startY = 0;
  let isDragging = false;

  function updateTransform() {
    modalImg.style.transform = `translate(${pointX}px, ${pointY}px) scale(${scale})`;
  }

  function resetZoom() {
    scale = 1;
    pointX = 0;
    pointY = 0;
    updateTransform();
  }

  // Mở modal khi bấm vào ảnh xem trước server
  serverPreviewImg.addEventListener('click', () => {
    modalImg.src = serverPreviewImg.src;
    imageModal.classList.remove('hidden');
    resetZoom();
  });

  // Đóng modal
  modalCloseBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  document.querySelector('.modal-backdrop').addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  // Nút Zoom
  zoomInBtn.addEventListener('click', () => {
    scale += 0.25;
    updateTransform();
  });

  zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(0.5, scale - 0.25);
    updateTransform();
  });

  zoomResetBtn.addEventListener('click', resetZoom);

  // Kéo di chuyển ảnh (Chuột & Cảm ứng tay)
  modalBody.addEventListener('mousedown', (e) => {
    e.preventDefault();
    startX = e.clientX - pointX;
    startY = e.clientY - pointY;
    isDragging = true;
  });

  window.addEventListener('mousemove', (e) => {
    if (!isDragging) return;
    pointX = e.clientX - startX;
    pointY = e.clientY - startY;
    updateTransform();
  });

  window.addEventListener('mouseup', () => {
    isDragging = false;
  });

  // Hỗ trợ Touch cho điện thoại
  modalBody.addEventListener('touchstart', (e) => {
    if (e.touches.length === 1) {
      startX = e.touches[0].clientX - pointX;
      startY = e.touches[0].clientY - pointY;
      isDragging = true;
    }
  });

  window.addEventListener('touchmove', (e) => {
    if (!isDragging || e.touches.length !== 1) return;
    pointX = e.touches[0].clientX - startX;
    pointY = e.touches[0].clientY - startY;
    updateTransform();
  });

  window.addEventListener('touchend', () => {
    isDragging = false;
  });
});

