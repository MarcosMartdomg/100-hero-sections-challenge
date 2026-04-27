document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons if not already done in HTML
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Header scroll effect
    const header = document.querySelector('.main-header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5)';
            header.style.background = '#0b0c1b'; // Solid on scroll
        } else {
            header.style.boxShadow = 'none';
        }
    });

    // Drag-to-scroll logic for game rows
    const grids = document.querySelectorAll('.games-grid');
    grids.forEach(grid => {
        let isDown = false;
        let startX;
        let scrollLeft;

        grid.addEventListener('mousedown', (e) => {
            isDown = true;
            grid.classList.add('dragging');
            startX = e.pageX - grid.offsetLeft;
            scrollLeft = grid.scrollLeft;
            grid.style.scrollSnapType = 'none';
        });

        grid.addEventListener('mouseleave', () => {
            isDown = false;
            grid.classList.remove('dragging');
            grid.style.scrollSnapType = 'x proximity';
        });

        grid.addEventListener('mouseup', () => {
            isDown = false;
            grid.classList.remove('dragging');
            grid.style.scrollSnapType = 'x proximity';
        });

        grid.addEventListener('mousemove', (e) => {
            if (!isDown) return;
            e.preventDefault(); // Critical: prevent selection/image drag
            const x = e.pageX - grid.offsetLeft;
            const walk = (x - startX) * 2;
            grid.scrollLeft = scrollLeft - walk;
        });

        // Wheel scroll support
        grid.addEventListener('wheel', (evt) => {
            if (evt.deltaY !== 0) {
                evt.preventDefault();
                grid.scrollLeft += evt.deltaY;
            }
        });
    });

    // Dynamic Jackpot Counter with "Spinning" Effect
    const jackpotElement = document.querySelector('.jackpot-amount');
    if (jackpotElement) {
        let jackpotValue = 1640753;
        
        // Initialize the strips
        function initJackpot() {
            const strValue = jackpotValue.toString();
            jackpotElement.innerHTML = '';
            
            // Re-format with dots and add elements
            const formatted = jackpotValue.toLocaleString('de-DE');
            
            for (let char of formatted) {
                if (/\d/.test(char)) {
                    const container = document.createElement('div');
                    container.className = 'digit-container';
                    const strip = document.createElement('div');
                    strip.className = 'digit-strip';
                    for (let i = 0; i <= 9; i++) {
                        const span = document.createElement('span');
                        span.innerText = i;
                        strip.appendChild(span);
                    }
                    container.appendChild(strip);
                    jackpotElement.appendChild(container);
                    
                    // Set initial position
                    const digit = parseInt(char);
                    strip.style.transform = `translateY(-${digit * 1.8}rem)`;
                } else {
                    const separator = document.createElement('span');
                    separator.className = 'jackpot-separator';
                    separator.innerText = char;
                    jackpotElement.appendChild(separator);
                }
            }
            
            const symbol = document.createElement('span');
            symbol.className = 'jackpot-symbol';
            symbol.innerText = ' €';
            jackpotElement.appendChild(symbol);
        }

        function updateJackpotDisplay() {
            const formatted = jackpotValue.toLocaleString('de-DE');
            const strips = jackpotElement.querySelectorAll('.digit-strip');
            let stripIndex = 0;

            for (let char of formatted) {
                if (/\d/.test(char)) {
                    const digit = parseInt(char);
                    const strip = strips[stripIndex];
                    if (strip) {
                        strip.style.transform = `translateY(-${digit * 1.8}rem)`;
                    }
                    stripIndex++;
                }
            }
        }

        function runJackpot() {
            // Add a random integer amount
            const randomAdd = Math.floor(Math.random() * 5) + 1;
            jackpotValue += randomAdd;
            
            updateJackpotDisplay();
            
            const nextUpdate = Math.floor(Math.random() * 3000) + 1000;
            setTimeout(runJackpot, nextUpdate);
        }

        initJackpot();
        setTimeout(runJackpot, 2000);
    }

    // Category navigation active state toggle (for demo)
    const categoryCards = document.querySelectorAll('.category-card');
    categoryCards.forEach(card => {
        card.addEventListener('click', () => {
            categoryCards.forEach(c => c.classList.remove('active'));
            card.classList.add('active');
        });
    });
});
