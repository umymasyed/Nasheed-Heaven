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

    // Nasheed data with updated paths
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
        {
            id: 3,
            title: "The Way of The Tears - Exclusive Nasheed",
            artist: "Muhammad al Muqit",
            src: "/audio/The Way of The Tears - Exclusive Nasheed - Muhammad al Muqit.mp3",
            img: "/images/tears.jpg",
        },
        {
            id: 4,
            title: "The Beauty of Existence - Heart Touching Nasheed",
            artist: "Muhammad al Muqit",
            src: "/audio/The Beauty of Existence - Heart Touching Nasheed.mp3",
            img: "/images/existence.jpg",
        },
        {
            id: 5,
            title: "My Hope (Allah) Nasheed",
            artist: "Muhammad al Muqit",
            src: "/audio/My Hope (Allah) Nasheed By Muhammad al Muqit.mp3",
            img: "/images/myhope.jpg",
        },
        {
            id: 6,
            title: "Loyalty Nasheed",
            artist: "Muhammad al Muqit",
            src: "/audio/Loyalty Nasheed by Muhammad al Muqit.mp3",
            img: "/images/loyalty.jpg",
        },
    ];

    let currentNasheedIndex = 0;

    // Toggle mobile menu
    menuToggle.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });

    // Initialize nasheed player
    function loadNasheed(index) {
        const nasheed = nasheeds[index];
        if (!nasheed) return;

        // Pause the current audio
        audio.pause();

        // Update audio source
        audio.src = nasheed.src;
        audio.load(); // Reload the audio file

        // Update song information
        songTitle.textContent = nasheed.title;
        artist.textContent = nasheed.artist;

        // Update the image dynamically
        const songImage = document.querySelector('.album-art');
        if (songImage) {
            songImage.src = nasheed.img;
            songImage.alt = nasheed.title;
        }

        // Update current nasheed index
        currentNasheedIndex = index;
    }

    loadNasheed(currentNasheedIndex);

    // Play/Pause functionality
    playBtn.addEventListener('click', () => {
        if (audio.paused) {
            audio.play().catch(err => console.error("Playback error:", err));
            playBtn.innerHTML = '<i class="fas fa-pause"></i>';
        } else {
            audio.pause();
            playBtn.innerHTML = '<i class="fas fa-play"></i>';
        }
    });

    // Stop functionality
    stopBtn.addEventListener('click', () => {
        audio.pause();
        audio.currentTime = 0; // Reset to the start
        playBtn.innerHTML = '<i class="fas fa-play"></i>';
    });

    // Previous nasheed
    prevBtn.addEventListener('click', () => {
        currentNasheedIndex = (currentNasheedIndex - 1 + nasheeds.length) % nasheeds.length;
        loadNasheed(currentNasheedIndex);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // Next nasheed
    nextBtn.addEventListener('click', () => {
        currentNasheedIndex = (currentNasheedIndex + 1) % nasheeds.length;
        loadNasheed(currentNasheedIndex);
        audio.play();
        playBtn.innerHTML = '<i class="fas fa-pause"></i>';
    });

    // Update progress bar
    audio.addEventListener('timeupdate', () => {
        if (audio.duration) {
            const progress = (audio.currentTime / audio.duration) * 100;
            progressBar.style.width = `${progress}%`;
        }
    });

    // Volume control
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

    // Mute/Unmute
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

    // Generate featured nasheeds
    function generateFeaturedNasheeds() {
        nasheeds.forEach(nasheed => {
            const nasheedItem = document.createElement('div');
            nasheedItem.classList.add('nasheed-item', 'animate-slide-in');
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
    }

    generateFeaturedNasheeds();

    // Newsletter form submission
    newsletterForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = newsletterForm.querySelector('input[type="email"]').value;
        console.log(`Subscribed with email: ${email}`);
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
    });
});