document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle-btn');
  const playingStatus = document.getElementById('now-playing-status');
  
  // Nút mở các section xổ xuống
  const btnToggleServer = document.getElementById('btn-toggle-server');
  const serverSection = document.getElementById('server-section');
  
  const btnOpenDonate = document.getElementById('btn-open-donate');
  const donateSection = document.getElementById('donate-section');

  const btnToggleService = document.getElementById('btn-toggle-service');
  const serviceSection = document.getElementById('service-section');

  // Xử lý bật / tắt nhạc đồng bộ
  function setMusicState(playing) {
    if (playing) {
      musicBtn.classList.remove('paused');
      musicBtn.querySelector('i').classList.add('fa-spin');
      playingStatus.classList.remove('paused');
    } else {
      musicBtn.classList.add('paused');
      musicBtn.querySelector('i').classList.remove('fa-spin');
      playingStatus.classList.add('paused');
    }
  }

  function playMusic() {
    music.play().then(() => {
      setMusicState(true);
    }).catch(err => {
      console.log("Autoplay bị chặn, chờ tương tác người dùng.");
      setMusicState(false);
    });
  }

  // Tự động phát khi chạm bất kỳ đâu lần đầu
  const handleFirstInteraction = () => {
    playMusic();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };

  document.addEventListener('click', handleFirstInteraction);
  document.addEventListener('touchstart', handleFirstInteraction);

  // Click nút tròn đĩa nhạc ở góc dưới
  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      setMusicState(false);
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
  // IMAGE VIEWER MODAL (ZOOM & DRAG)
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

  if (serverPreviewImg) {
    serverPreviewImg.addEventListener('click', () => {
      modalImg.src = serverPreviewImg.src;
      imageModal.classList.remove('hidden');
      resetZoom();
    });
  }

  modalCloseBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  document.querySelector('.modal-backdrop').addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  zoomInBtn.addEventListener('click', () => {
    scale += 0.25;
    updateTransform();
  });

  zoomOutBtn.addEventListener('click', () => {
    scale = Math.max(0.5, scale - 0.25);
    updateTransform();
  });

  zoomResetBtn.addEventListener('click', resetZoom);

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
