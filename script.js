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
        { id: 1, title: "I Rise - Motivational Nasheed", artist: "Muhammad al Muqit", src: "/audio/I Rise - Motivational Nasheed - By Muhammad al Muqit.mp3", img: "/images/i-rise.jpg" },
        { id: 2, title: "Ya Ilahi - Powerful Nasheed", artist: "Ishaq Ayubi", src: "/audio/Ya Ilahi - Powerful Nasheed By Ishaq Ayubi.mp3", img: "/images/Yailahi.jpg" },
        { id: 3, title: "The Way of The Tears - Exclusive Nasheed", artist: "Muhammad al Muqit", src: "/audio/The Way of The Tears - Exclusive Nasheed - Muhammad al Muqit.mp3", img: "/images/tears.jpg" },
        { id: 4, title: "The Beauty of Existence - Heart Touching Nasheed", artist: "Muhammad al Muqit", src: "/audio/The Beauty of Existence - Heart Touching Nasheed.mp3", img: "/images/existence.jpg" },
        { id: 5, title: "My Hope (Allah) Nasheed", artist: "Muhammad al Muqit", src: "/audio/My Hope (Allah) Nasheed By Muhammad al Muqit.mp3", img: "/images/myhope.jpg" },
        { id: 6, title: "Loyalty Nasheed", artist: "Muhammad al Muqit", src: "/audio/Loyalty Nasheed by Muhammad al Muqit.mp3", img: "/images/loyalty.jpg" },
        { id: 7, title: "Maher Zain - Assalamu Alayka (Arabic)", artist: "Maher Zain", src: "/audio/Maher Zain - Assalamu Alayka (Arabic)  ماهر زين - السلام عليك  Official Lyric Video.mp3", img: "/images/asslam.jpg" },
        { id: 8, title: "My Dream - Short Nasheed", artist: "Muhammad al Muqit", src: "/audio/My Dream - Short Nasheed By_ Muhammad al Muqit.mp3", img: "/images/dream.jpg" },
        { id: 9, title: "Muhammad Nabina - Hamada Helal", artist: "Hamada Helal", src: "/audio/Muhammad Nabina - Hamada Helal - Lirik dan Terjemahan Indonesia Sholawat Nabi.mp3", img: "/images/nabina.jpg" },
        { id: 10, title: "Al Quds Lana Aqsa Nasheed 2023", artist: "Abdullah Mehboob Faris", src: "/audio/Al Quds Lana  Aqsa Nasheed 2023  Labbaik  Abdullah Mehboob  Faris.mp3", img: "/images/Quds.jpg" },
        { id: 11, title: "ANTA NUURUL LAAHI FAJRAN", artist: "Maher Zain", src: "/audio/ANTA NUURUL LAAHI FAJRAN.mp3", img: "/images/anta-noor.jpg" },
    ];

    let currentNasheedIndex = 0;

    menuToggle.addEventListener('click', () => navUl.classList.toggle('show'));

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
                album: 'Nasheed Haven',
                artwork: [{ src: nasheed.img, sizes: '512x512', type: 'image/png' }]
            });
        }
    }

    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
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
    });

    volumeIcon.addEventListener('click', () => {
        audio.volume = audio.volume > 0 ? 0 : 1;
        volumeSlider.value = audio.volume;
    });

    function generateFeaturedNasheeds() {
        nasheeds.forEach(nasheed => {
            const nasheedItem = document.createElement('div');
            nasheedItem.classList.add('nasheed-item');
            nasheedItem.innerHTML = `<img src="${nasheed.img}" alt="${nasheed.title}"><h4>${nasheed.title}</h4><p>${nasheed.artist}</p>`;
            nasheedItem.addEventListener('click', () => {
                loadNasheed(nasheeds.indexOf(nasheed));
                audio.play();
                playBtn.innerHTML = '<i class="fas fa-pause"></i>';
            });
            nasheedGrid.appendChild(nasheedItem);
        });
    }

    generateFeaturedNasheeds();

    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });

    loadNasheed(currentNasheedIndex);

    const loader = document.getElementById('loader');
    setTimeout(() => loader.classList.add('hidden'), 500);
});
