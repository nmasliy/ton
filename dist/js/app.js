window.addEventListener('DOMContentLoaded', function() {
    function isWebp() {
        function testWebP(callback) {
            var webP = new Image();
            webP.onload = webP.onerror = function () {
                callback(webP.height == 2);
            };
            webP.src = "data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA";
        }
    
        testWebP(function (support) {
            if (support == true) {
                document.querySelector('body').classList.add('webp');
            } else{
                document.querySelector('body').classList.add('no-webp');
            }
        });
    }

    function initMenu() {
        const $html = document.querySelector('html');
        const $header = document.querySelector('.header');
        const $headerMenu = document.querySelector('.header__menu');
        const $headerBtn = document.querySelector('.header__burger');
        const $headerCloseBtn = document.querySelector('.header__close');
        const $headerOverlay = document.querySelector('.header__overlay');
        const TRANSITION_DELAY = 400; 
    
        let isInit = false;
    
        const checkScreenWidth = () => {
            const MOBILE_MENU_BREAKPOINT = 1024;
            // Активируем меню только на экранах <= 1024
            if (window.innerWidth <= MOBILE_MENU_BREAKPOINT && !isInit) {
                isInit = true;
                $headerBtn.addEventListener('click', openMenu)
                $headerCloseBtn.addEventListener('click', closeMenu)
                $headerOverlay.addEventListener('click', closeMenu);
            } else {
                window.addEventListener('resize', checkScreenWidth);
            }
        }
    
        checkScreenWidth();

        if (window.pageYOffset > 100) {
            $header.classList.add('fixed');
        }
        
        window.addEventListener('scroll', function(e) {
            if (window.pageYOffset > 100) {
                $header.classList.add('fixed');
            } else {
                $header.classList.remove('fixed');
            }
        })
    
        function openMenu() {
            $headerOverlay.style.display = 'block';
            $headerMenu.style.display = 'block';
            $html.classList.add('overflow-hidden');
    
            setTimeout(function() {
                $headerOverlay.classList.add('active');
                $header.classList.add('active');
            }, 50)
        }
    
        function closeMenu() {
            $headerOverlay.classList.remove('active');
            $header.classList.remove('active');
            $html.classList.remove('overflow-hidden');
            
            setTimeout(function() {
                $headerOverlay.style.display = '';
                $headerMenu.style.display = '';
            }, TRANSITION_DELAY)
        }
    }

    function initModals() {
        const $modals = document.querySelectorAll('.modal');
        const $modalsTriggers = document.querySelectorAll('[data-micromodal-trigger]');
    
        $modalsTriggers.forEach(item => {
            item.addEventListener('click', (e) => e.preventDefault());
        })
    
        if ($modals.length > 0) {
            MicroModal.init({
                onShow: (modal) => {
                    // Custom events
                },
                onClose: (modal) => {
                    // Custom events
                },
                disableFocus: true,
                openClass: 'is-open', 
                awaitOpenAnimation: true, 
                awaitCloseAnimation: true, 
                disableScroll: true
            });
        }
    }

    function initAccordions() {
        const $triggers = document.querySelectorAll('.accordion__item-head');
    
        if ($triggers.length > 0) {
            $triggers.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('.accordion__item').classList.toggle('active');
                    item.closest('.accordion__item').querySelector('.plus').classList.toggle('active');
                })
            })
        }
    }

    isWebp();
    initMenu();
    initModals();
    initAccordions();
})