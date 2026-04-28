document.addEventListener('DOMContentLoaded', () => {
    const track = document.querySelector('.missions-track');
    const sections = document.querySelectorAll('.mission-section');
    const upBtn = document.querySelector('.v-arrow.up');
    const downBtn = document.querySelector('.v-arrow.down');
    const counterText = document.querySelector('.mission-counter .count');

    let activeIndex = 0;
    const totalSections = sections.length;
    let isTransitioning = false;

    function updateSlider() {
        // Update track position
        track.style.transform = `translateY(-${activeIndex * 100}vh)`;

        // Update counter
        counterText.textContent = `${activeIndex + 1} / ${totalSections}`;

        // Update button states
        if (activeIndex === 0) {
            upBtn.classList.add('disabled');
        } else {
            upBtn.classList.remove('disabled');
        }

        if (activeIndex === totalSections - 1) {
            downBtn.classList.add('disabled');
        } else {
            downBtn.classList.remove('disabled');
        }

        // Optional: Update URL hash or mission names if needed
    }

    function goToNext() {
        if (activeIndex < totalSections - 1 && !isTransitioning) {
            activeIndex++;
            updateSlider();
            lockTransition();
        }
    }

    function goToPrev() {
        if (activeIndex > 0 && !isTransitioning) {
            activeIndex--;
            updateSlider();
            lockTransition();
        }
    }

    function lockTransition() {
        isTransitioning = true;
        setTimeout(() => {
            isTransitioning = false;
        }, 800); // Match CSS transition time
    }

    // Event Listeners
    upBtn.addEventListener('click', goToPrev);
    downBtn.addEventListener('click', goToNext);

    // Keyboard Navigation
    window.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowUp') goToPrev();
        if (e.key === 'ArrowDown') goToNext();
    });

    // Mouse Wheel Navigation
    window.addEventListener('wheel', (e) => {
        if (isTransitioning) return;
        if (e.deltaY > 0) {
            goToNext();
        } else {
            goToPrev();
        }
    });

    // Touch Support (Basic)
    let touchStartY = 0;
    window.addEventListener('touchstart', (e) => {
        touchStartY = e.touches[0].clientY;
    });

    window.addEventListener('touchend', (e) => {
        if (isTransitioning) return;
        const touchEndY = e.changedTouches[0].clientY;
        const deltaY = touchStartY - touchEndY;

        if (deltaY > 50) {
            goToNext();
        } else if (deltaY < -50) {
            goToPrev();
        }
    });

    // Initialize
    updateSlider();
});
