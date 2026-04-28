document.addEventListener('DOMContentLoaded', () => {
    const categoryBlocks = document.querySelectorAll('.category-block');

    categoryBlocks.forEach(block => {
        const track = block.querySelector('.carousel-track');
        const prevBtn = block.querySelector('.carousel-btn.prev');
        const nextBtn = block.querySelector('.carousel-btn.next');

        if (!track || !prevBtn || !nextBtn) return;

        const updateArrows = () => {
            const scrollLeft = track.scrollLeft;
            const maxScroll = track.scrollWidth - track.clientWidth;

            // Update prev button
            if (scrollLeft <= 2) { // 2px margin for browser subpixel rounding
                prevBtn.classList.add('disabled');
            } else {
                prevBtn.classList.remove('disabled');
            }

            // Update next button
            if (scrollLeft >= maxScroll - 2) {
                nextBtn.classList.add('disabled');
            } else {
                nextBtn.classList.remove('disabled');
            }
        };

        nextBtn.addEventListener('click', () => {
            const itemWidth = track.querySelector('.carousel-item').offsetWidth + 32;
            track.scrollBy({ left: itemWidth, behavior: 'smooth' });
        });

        prevBtn.addEventListener('click', () => {
            const itemWidth = track.querySelector('.carousel-item').offsetWidth + 32;
            track.scrollBy({ left: -itemWidth, behavior: 'smooth' });
        });

        track.addEventListener('scroll', updateArrows);
        
        // Initial check
        setTimeout(updateArrows, 100); // Small delay to ensure layout is ready
    });
});
