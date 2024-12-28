document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.getElementById('menu-toggle');
    const navUl = document.querySelector('nav ul');
    const audio = document.getElementById('audio');
    const playBtn = document.getElementById('play');
    const stopBtn = document.getElementById('stop');
    const prevBtn = document.getElementById('prev');
    const nextBtn = document.getElementById('next');
    const progressBar = document.querySelector('.progress-bar');
    const volumeSlider = document.getElementById('volume');
    const volumeIcon = document.getElementById('volume-icon');
    const songTitle = document.getElementById('song-title');
    const artist = document.getElementById('artist');
    const nasheedGrid = document.getElementById('nasheed-grid');
    const newsletterForm = document.getElementById('newsletter-form');

    const nasheeds = [
        {
            id: 1,
            title: "I Rise - Motivational Nasheed",
            artist: "Muhammad al Muqit",
            src: "/audio/I Rise - Motivational Nasheed - By Muhammad al Muqit.mp3",
            img: "/images/i-rise.jpg",
        },
        {
            id: 2,
            title: "Ya Ilahi - Powerful Nasheed",
            artist: "Ishaq Ayubi",
            src: "/audio/Ya Ilahi - Powerful Nasheed By Ishaq Ayubi.mp3",
            img: "/images/Yailahi.jpg",
        },
        // ...other nasheeds
    ];

    let currentNasheedIndex = 0;

    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    function loadNasheed(index) {
        const nasheed = nasheeds[index];
        if (!nasheed) return;

        audio.pause();
        audio.src = nasheed.src;
        audio.load();

        songTitle.textContent = nasheed.title;
        artist.textContent = nasheed.artist;

        const songImage = document.querySelector('.album-art');
        if (songImage) {
            songImage.src = nasheed.img;
            songImage.alt = nasheed.title;
        }

        currentNasheedIndex = index;

        updateMediaSessionMetadata(nasheed);
    }

    function updateMediaSessionMetadata(nasheed) {
        if ('mediaSession' in navigator) {
            navigator.mediaSession.metadata = new MediaMetadata({
                title: nasheed.title,
                artist: nasheed.artist,
                album: "Nasheed Haven",
                artwork: [
                    { src: nasheed.img, sizes: '96x96', type: 'image/png' },
                    { src: nasheed.img, sizes: '128x128', type: 'image/png' },
                    { src: nasheed.img, sizes: '192x192', type: 'image/png' },
                    { src: nasheed.img, sizes: '256x256', type: 'image/png' },
                    { src: nasheed.img, sizes: '512x512', type: 'image/png' },
                ]
            });

            navigator.mediaSession.setActionHandler('play', () => {
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });

            navigator.mediaSession.setActionHandler('pause', () => {
                audio.pause();
                playBtn.innerHTML = '<i class="fas fa-play"></i>';
            });

            navigator.mediaSession.setActionHandler('seekbackward', () => {
                audio.currentTime = Math.max(audio.currentTime - 10, 0);
            });

            navigator.mediaSession.setActionHandler('seekforward', () => {
                audio.currentTime = Math.min(audio.currentTime + 10, audio.duration);
            });
        }
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(err => console.error("Playback error:", err));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0;
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    prevBtn.addEventListener('click', () => {
        currentNasheedIndex = (currentNasheedIndex - 1 + nasheeds.length) % nasheeds.length;
        loadNasheed(currentNasheedIndex);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    nextBtn.addEventListener('click', () => {
        currentNasheedIndex = (currentNasheedIndex + 1) % nasheeds.length;
        loadNasheed(currentNasheedIndex);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    volumeSlider.addEventListener('input', () => {
        audio.volume = volumeSlider.value;
        updateVolumeIcon();
    });

    function updateVolumeIcon() {
        if (audio.volume > 0.5) {
            volumeIcon.className = 'fas fa-volume-up';
        } else if (audio.volume > 0) {
            volumeIcon.className = 'fas fa-volume-down';
        } else {
            volumeIcon.className = 'fas fa-volume-mute';
        }
    }

    volumeIcon.addEventListener('click', () => {
        if (audio.volume > 0) {
            audio.volume = 0;
            volumeSlider.value = 0;
        } else {
            audio.volume = 1;
            volumeSlider.value = 1;
        }
        updateVolumeIcon();
    });

    loadNasheed(currentNasheedIndex);

    nasheeds.forEach(nasheed => {
        const nasheedItem = document.createElement('div');
        nasheedItem.classList.add('nasheed-item');
        nasheedItem.innerHTML = `
            <img src="${nasheed.img}" alt="${nasheed.title}">
            <div class="nasheed-item-info">
                <h4>${nasheed.title}</h4>
                <p>${nasheed.artist}</p>
            </div>
        `;
        nasheedItem.addEventListener('click', () => {
            loadNasheed(nasheeds.indexOf(nasheed));
            audio.play();
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        });
        nasheedGrid.appendChild(nasheedItem);
    });
});
