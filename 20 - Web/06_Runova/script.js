document.addEventListener('DOMContentLoaded', () => {
    const navbar = document.querySelector('.navbar');
    const playBtn = document.querySelector('.play-btn');
    const searchBtn = document.querySelector('.search-btn');
    const testimonialArrows = document.querySelectorAll('.testimonial-arrow');
    const dots = document.querySelectorAll('.dot');
    const joinBtn = document.querySelector('.join-btn');

    let currentTestimonial = 0;
    const testimonials = [
        {
            quote: '"Las mejores instalaciones de la ciudad. El equipo es increíble y las clases son muy divertidas."',
            author: '- Carlos García',
            img: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop'
        },
        {
            quote: '"Un ambiente increíble. Me encanta venir cada semana a jugar alパッド con amigos."',
            author: '- María López',
            img: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop'
        },
        {
            quote: '"Los profesionales son muy atentos. Mi hijo ha mejorado mucho en natación en solo 3 meses."',
            author: '- Pedro Sánchez',
            img: 'https://images.unsplash.com/photo-1500648767791-00bccd44d0f9?w=150&h=150&fit=crop'
        }
    ];

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    playBtn.addEventListener('click', () => {
        alert('🎬 Reproduciendo video de presentación de RUNOVA...\n\nEn una implementación real, esto abriría un modal con el video.');
    });

    searchBtn.addEventListener('click', () => {
        const query = prompt('🔍 Buscar en RUNOVA:\n\nIngresa tu búsqueda (instalaciones, clases, eventos...):');
        if (query) {
            alert(` búsqueda por: "${query}"\n\nEn una implementación real, esto mostraría los resultados.`);
        }
    });

    joinBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('🎯 ÚNETE A UN SPORT\n\nSerás redirigido al formulario de registro para unirte a nuestras instalaciones.');
    });

    function updateTestimonial(index) {
        const card = document.querySelector('.testimonial-card');
        const quote = card.querySelector('.testimonial-quote');
        const author = card.querySelector('.testimonial-author');
        const img = card.querySelector('.testimonial-img');

        if (testimonials[index]) {
            quote.textContent = testimonials[index].quote;
            author.textContent = testimonials[index].author;
            img.style.backgroundImage = `url('${testimonials[index].img}')`;
        }

        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });

        currentTestimonial = index;
    }

    testimonialArrows.forEach(arrow => {
        arrow.addEventListener('click', () => {
            if (arrow.classList.contains('left')) {
                currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
            } else {
                currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            }
            updateTestimonial(currentTestimonial);
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            updateTestimonial(index);
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                alert(`Navigating to: ${href}\n\nEn una implementación real, esto redirigiría a la sección correspondiente.`);
            }
        });
    });

    const ctaBtn = document.querySelector('.cta-btn');
    ctaBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('📅 RESERVAR AHORA\n\nSerás redirigido al sistema de reservas para elegir tu horario.');
    });

    const experienceBtn = document.querySelector('.experience-btn');
    experienceBtn.addEventListener('click', (e) => {
        e.preventDefault();
        alert('ℹ️ CONOCER MÁS\n\nEn una implementación real, esto mostraría más información sobre las instalaciones.');
    });

    console.log('🏃 RUNOVA - Sports Club loaded successfully!');
    console.log('使用提示: 点击导航按钮体验交互功能');
});