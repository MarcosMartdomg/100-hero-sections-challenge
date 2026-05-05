document.addEventListener('DOMContentLoaded', () => {
    // Testimonial Carousel
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    const progress = document.querySelector('.progress');
    const cards = Array.from(document.querySelectorAll('.testimonial-card'));
    
    if (prevBtn && nextBtn && progress && cards.length === 3) {
        // cardIndices represents which card is at which position (0, 1, 2)
        let cardIndices = [0, 1, 2]; 

        function updateCarousel() {
            cardIndices.forEach((cardIdx, posIdx) => {
                const card = cards[cardIdx];
                // Remove all positional classes
                card.classList.remove('pos-0', 'pos-1', 'pos-2', 'center', 'side');
                // Add the specific positional class for this slot
                card.classList.add(`pos-${posIdx}`);
                
                // Keep center/side classes for specific typography styling if needed
                if (posIdx === 1) {
                    card.classList.add('center');
                } else {
                    card.classList.add('side');
                }
            });
            
            // Progress indicator (based on which card is in the center)
            const centerCardIdx = cardIndices[1];
            const progressWidth = ((centerCardIdx + 1) / cards.length) * 100;
            progress.style.width = `${progressWidth}%`;
        }

        prevBtn.addEventListener('click', () => {
            // [0, 1, 2] -> [2, 0, 1] (Rotate cards to the right visually)
            cardIndices.unshift(cardIndices.pop());
            updateCarousel();
        });

        nextBtn.addEventListener('click', () => {
            // [0, 1, 2] -> [1, 2, 0] (Rotate cards to the left visually)
            cardIndices.push(cardIndices.shift());
            updateCarousel();
        });

        // Initialize positions
        updateCarousel();
    }
});
