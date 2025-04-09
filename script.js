document.addEventListener('DOMContentLoaded', function() {
    // Elements
    const messageElement = document.getElementById('beautiful-message');
    const heartsContainer = document.querySelector('.hearts-container');
    const sliderContainer = document.querySelector('.slider-container');
    const prevButton = document.getElementById('prev-photo');
    const nextButton = document.getElementById('next-photo');
    const playButton = document.getElementById('play-music');
    const pauseButton = document.getElementById('pause-music');
    const increaseVolume = document.getElementById('increase-volume');
    const decreaseVolume = document.getElementById('decrease-volume');
    const backgroundMusic = document.getElementById('background-music');
    
    // Photo gallery (replace with your images)
    const photos = [
        '/assets/a1.jpg',
        '/assets/a2.jpg',
        '/assets/a3.jpg',
        '/assets/a4.jpg',
        '/assets/a5.jpg',
        '/assets/a6.jpg',
        '/assets/a7.jpg',
        '/assets/a8.jpg',
        '/assets/a9.jpg',
        '/assets/a10.jpg',
        '/assets/a11.jpg',
        '/assets/a13.jpg',
        '/assets/a12.jpg',
    ];
    
    let currentIndex = 0;
    let autoSlideInterval;
    
    // Initialize photo slider
    function initSlider() {
        photos.forEach((photo, index) => {
            const img = document.createElement('img');
            img.src = photo;
            img.alt = `Photo ${index + 1}`;
            img.classList.add('slider-image');
            if (index === 0) img.classList.add('active');
            sliderContainer.appendChild(img);
        });
    }
    
    // Change photo
    function changePhoto(direction) {
        const images = document.querySelectorAll('.slider-image');
        images[currentIndex].classList.remove('active');
        
        if (direction === 'next') {
            currentIndex = (currentIndex + 1) % photos.length;
        } else {
            currentIndex = (currentIndex - 1 + photos.length) % photos.length;
        }
        
        images[currentIndex].classList.add('active');
    }
    
    // Auto slide photos
    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            changePhoto('next');
        }, 4000);
    }
    
    // Create floating hearts
    function createHearts() {
        setInterval(() => {
            const heart = document.createElement('div');
            heart.innerHTML = '❤️';
            heart.classList.add('heart');
            heart.style.left = Math.random() * 100 + 'vw';
            heart.style.animationDuration = Math.random() * 3 + 3 + 's';
            heart.style.fontSize = Math.random() * 20 + 15 + 'px';
            heartsContainer.appendChild(heart);
            
            // Remove heart after animation
            setTimeout(() => {
                heart.remove();
            }, 6000);
        }, 200);
    }
    
    // Animate message text
    function animateMessage() {
        const messages = [
            "Kamu Cantik",
            "Kamu Menawan",
            "Kamu Mempesona",
            "Kamu Lucu",
            "Kamu Biancha"
        ];
        let index = 0;
        
        setInterval(() => {
            messageElement.style.animation = 'none';
            void messageElement.offsetWidth; // Trigger reflow
            messageElement.style.animation = null;
            
            index = (index + 1) % messages.length;
            messageElement.textContent = messages[index];
        }, 3000);
    }
    
    // Event listeners
    prevButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        changePhoto('prev');
        startAutoSlide();
    });
    
    nextButton.addEventListener('click', () => {
        clearInterval(autoSlideInterval);
        changePhoto('next');
        startAutoSlide();
    });
    
    playButton.addEventListener('click', () => {
        backgroundMusic.play();
    });
    
    pauseButton.addEventListener('click', () => {
        backgroundMusic.pause();
    });
    
    increaseVolume.addEventListener('click', () => {
        if (backgroundMusic.volume < 1) backgroundMusic.volume += 0.1;
    });
    
    decreaseVolume.addEventListener('click', () => {
        if (backgroundMusic.volume > 0) backgroundMusic.volume -= 0.1;
    });
    
    // Initialize everything
    initSlider();
    createHearts();
    animateMessage();
    startAutoSlide();
    
    // Try to autoplay music (may be blocked by browser)
    document.addEventListener('click', function initMusic() {
        backgroundMusic.play().catch(e => console.log("Autoplay prevented:", e));
        document.removeEventListener('click', initMusic);
    });
});