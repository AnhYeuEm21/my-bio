document.addEventListener('DOMContentLoaded', () => {
  const music = document.getElementById('bg-music');
  const musicBtn = document.getElementById('music-toggle-btn');
  const playingStatus = document.getElementById('now-playing-status');
  
  // Nút mở các section xổ xuống
  const btnSocialDiscord = document.getElementById('btn-social-discord');
  const btnToggleServer = document.getElementById('btn-toggle-server');
  const serverSection = document.getElementById('server-section');
  
  const btnOpenDonate = document.getElementById('btn-open-donate');
  const donateSection = document.getElementById('donate-section');

  const btnToggleService = document.getElementById('btn-toggle-service');
  const serviceSection = document.getElementById('service-section');

  // Xử lý nhạc
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
      console.log("Autoplay bị chặn, chờ tương tác.");
      setMusicState(false);
    });
  }

  const handleFirstInteraction = () => {
    playMusic();
    document.removeEventListener('click', handleFirstInteraction);
    document.removeEventListener('touchstart', handleFirstInteraction);
  };

  document.addEventListener('click', handleFirstInteraction);
  document.addEventListener('touchstart', handleFirstInteraction);

  musicBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    if (music.paused) {
      playMusic();
    } else {
      music.pause();
      setMusicState(false);
    }
  });

  // Event toggle đóng/mở section
  if (btnSocialDiscord) {
    btnSocialDiscord.addEventListener('click', () => {
      serverSection.classList.toggle('hidden');
      if (!serverSection.classList.contains('hidden')) {
        setTimeout(() => {
          serverSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        }, 150);
      }
    });
  }

  btnToggleServer.addEventListener('click', () => {
    serverSection.classList.toggle('hidden');
    if (!serverSection.classList.contains('hidden')) {
      setTimeout(() => {
        serverSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  });

  btnOpenDonate.addEventListener('click', () => {
    donateSection.classList.toggle('hidden');
    if (!donateSection.classList.contains('hidden')) {
      setTimeout(() => {
        donateSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  });

  btnToggleService.addEventListener('click', () => {
    serviceSection.classList.toggle('hidden');
    if (!serviceSection.classList.contains('hidden')) {
      setTimeout(() => {
        serviceSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }, 150);
    }
  });

  // ==========================================
  // ALBUM GALLERY MODAL (5 ÁNH: pic1 -> pic5)
  // ==========================================
  const imageModal = document.getElementById('image-modal');
  const modalImg = document.getElementById('modal-img');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalBody = document.getElementById('modal-body');

  const zoomInBtn = document.getElementById('zoom-in-btn');
  const zoomOutBtn = document.getElementById('zoom-out-btn');
  const zoomResetBtn = document.getElementById('zoom-reset-btn');
  
  const modalPrevBtn = document.getElementById('modal-prev-btn');
  const modalNextBtn = document.getElementById('modal-next-btn');

  // Danh sách 5 ảnh
  const albumImages = ['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg'];
  let currentImageIndex = 0;

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

  function loadGalleryImage(index) {
    if (index < 0) index = albumImages.length - 1;
    if (index >= albumImages.length) index = 0;
    
    currentImageIndex = index;
    modalImg.src = albumImages[currentImageIndex];
    resetZoom();
  }

  // Click vào album để mở modal
  const discordAlbum = document.getElementById('discord-album');
  if (discordAlbum) {
    discordAlbum.addEventListener('click', () => {
      imageModal.classList.remove('hidden');
      loadGalleryImage(0);
    });
  }

  // Nút tới / lui ảnh
  modalPrevBtn.addEventListener('click', () => loadGalleryImage(currentImageIndex - 1));
  modalNextBtn.addEventListener('click', () => loadGalleryImage(currentImageIndex + 1));

  modalCloseBtn.addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  document.querySelector('.modal-backdrop').addEventListener('click', () => {
    imageModal.classList.add('hidden');
  });

  // Zoom / Drag
  zoomInBtn.addEventListener('click', () => { scale += 0.25; updateTransform(); });
  zoomOutBtn.addEventListener('click', () => { scale = Math.max(0.5, scale - 0.25); updateTransform(); });
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

  window.addEventListener('mouseup', () => { isDragging = false; });

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

  window.addEventListener('touchend', () => { isDragging = false; });
});
