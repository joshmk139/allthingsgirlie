// Mobile Menu Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    if (!menuToggle || !navMenu) {
        console.warn('Mobile menu elements not found');
        return;
    }
    
    let isMenuOpen = false;
    
    // Close menu function
    function closeMenu() {
        if (!isMenuOpen) return;
        
        isMenuOpen = false;
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.classList.remove('active');
        navMenu.classList.remove('active');
        document.body.classList.remove('menu-open');
        document.body.style.overflow = '';
    }
    
    // Open menu function
    function openMenu() {
        if (isMenuOpen) return;
        
        isMenuOpen = true;
        menuToggle.setAttribute('aria-expanded', 'true');
        menuToggle.classList.add('active');
        navMenu.classList.add('active');
        document.body.classList.add('menu-open');
        document.body.style.overflow = 'hidden';
    }
    
    // Toggle menu
    menuToggle.addEventListener('click', function(event) {
        event.preventDefault();
        event.stopPropagation();
        
        if (isMenuOpen) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    // Close menu when clicking on a navigation link
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Small delay to allow navigation
            setTimeout(closeMenu, 100);
        });
    });
    
    // Close menu when clicking on overlay (body::before)
    document.addEventListener('click', function(event) {
        // Only close if menu is open and click is outside menu and toggle
        if (isMenuOpen) {
            const isClickInsideMenu = navMenu.contains(event.target);
            const isClickOnToggle = menuToggle.contains(event.target);
            
            if (!isClickInsideMenu && !isClickOnToggle) {
                closeMenu();
            }
        }
    });
    
    // Close menu on escape key
    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape' && isMenuOpen) {
            closeMenu();
        }
    });
    
    // Close menu on window resize (if resizing to desktop)
    let resizeTimer;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(function() {
            if (window.innerWidth > 768 && isMenuOpen) {
                closeMenu();
            }
        }, 250);
    });
});

