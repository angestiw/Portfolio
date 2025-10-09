document.addEventListener('DOMContentLoaded', function() {
    // Scroll to section
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Rotating interests text
    const interests = document.querySelectorAll('.interest-item');
    let currentInterest = 0;
    
    interests[0].classList.add('active');
    
    setInterval(() => {
        interests[currentInterest].classList.remove('active');
        currentInterest = (currentInterest + 1) % interests.length;
        interests[currentInterest].classList.add('active');
    }, 3000);

    // Tabs for work/project
    const tabs = document.querySelectorAll('.tab');
    
    tabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const currentActive = document.querySelector('.tab.active');
            const newIndex = Array.from(tabs).indexOf(this);
            const oldIndex = Array.from(tabs).indexOf(currentActive);
            const isMovingRight = newIndex > oldIndex;
            
            // Remove active class from all tabs
            tabs.forEach(t => t.classList.remove('active'));
            this.classList.add('active');
            
            // Handle content switching with animation
            const contents = document.querySelectorAll('.tab-content');
            contents.forEach(content => {
                content.classList.remove('active', 'slide-in-right', 'slide-in-left');
            });
            
            const targetContent = document.getElementById(`${this.getAttribute('data-tab')}-content`);
            targetContent.classList.add('active');
            targetContent.classList.add(isMovingRight ? 'slide-in-right' : 'slide-in-left');
        });
    });

    // Card expanding functionality - KODE INI YANG DIPERBAIKI
    const cards = document.querySelectorAll('.card');
    const expandedCard = document.getElementById('expanded-card');
    const overlay = document.getElementById('overlay');
    const closeButton = document.getElementById('close-expanded');
    
    cards.forEach(card => {
        // Tambahkan parameter 'event'
        card.addEventListener('click', function(event) {
            
            // Cek apakah elemen yang diklik adalah link (<a>) atau berada di dalam link
            if (event.target.closest('a')) {
                // Jika ya, biarkan link berjalan (tidak membuka modal)
                return; 
            }
            
            // Jika bukan link, jalankan logika untuk membuka modal
            const title = this.getAttribute('data-title');
            const role = this.getAttribute('data-role') || this.querySelector('h5').textContent; 
            const location = this.getAttribute('data-location');
            const tags = this.getAttribute('data-tags').split(',');
            const description = this.getAttribute('data-description');
            const image = this.querySelector('img').src;
            
            document.getElementById('expanded-title').textContent = title;
            document.getElementById('expanded-image').src = image;
            
            document.getElementById('expanded-content').innerHTML = `
                <div class="expanded-card-role-box">${role}</div>
                ${location ? `<div class="expanded-card-location">${location}</div>` : ''}
                <div class="expanded-card-description">
                    ${description}
                </div>
            `;
            
            document.getElementById('expanded-tags').innerHTML = tags.map(tag => 
                `<span class="tag">${tag}</span>`
            ).join('');
            
            overlay.style.display = 'block';
            expandedCard.style.display = 'block';
            document.body.style.overflow = 'hidden'; // Non-aktifkan scroll utama
        });
    });
    
    // Logika penutup modal
    function closeExpandedCard() {
        overlay.style.display = 'none';
        expandedCard.style.display = 'none';
        document.body.style.overflow = ''; // Aktifkan scroll utama
    }

    closeButton.addEventListener('click', closeExpandedCard);
    overlay.addEventListener('click', closeExpandedCard);
});