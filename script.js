// ===== Portfolio Homepage JavaScript =====

document.addEventListener('DOMContentLoaded', function() {
    // Initialize components
    initFilterButtons();
    initSmoothScroll();
    initProjectHeroVideos();
});

// ===== Project Filtering =====
function initFilterButtons() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            // Filter projects
            const filter = this.dataset.filter;
            
            projectCards.forEach(card => {
                const category = card.dataset.category;
                const isHero = card.classList.contains('project-hero');
                const visibleDisplay = isHero ? 'flex' : 'block';
                
                if (filter === 'all' || category === filter) {
                    card.style.display = visibleDisplay;
                    // Add fade-in animation
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(10px)';
                    requestAnimationFrame(() => {
                        card.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    });
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
}

// ===== Smooth Scroll for Navigation =====
function initSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const headerOffset = 80;
                    const elementPosition = target.getBoundingClientRect().top;
                    const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
                    
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
}

// ===== Update Active Nav Link on Scroll =====
function updateActiveNavOnScroll() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    
    window.addEventListener('scroll', () => {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

// ===== Project hero video hover =====
function initProjectHeroVideos() {
  const frames = document.querySelectorAll('.project-hero-media-frame');
  frames.forEach(frame => {
    const video = frame.querySelector('.project-hero-video');
    if (!video) return;

    const play = () => {
      frame.classList.add('is-playing');
      const promise = video.play();
      if (promise && typeof promise.catch === 'function') {
        promise.catch(() => {});
      }
    };

    const pause = () => {
      frame.classList.remove('is-playing');
      video.pause();
      video.currentTime = 0;
    };

    frame.addEventListener('mouseenter', play);
    frame.addEventListener('mouseleave', pause);
    frame.addEventListener('focusin', play);
    frame.addEventListener('focusout', pause);
  });
}

