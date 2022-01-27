document.body.classList.add('preload');

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
        const $triggers = document.querySelectorAll('[data-accordion-trigger]');
    
        if ($triggers.length > 0) {
            $triggers.forEach(item => {
                item.addEventListener('click', function() {
                    item.closest('[data-accordion]').classList.toggle('active');
                })
            })
        }
    }

    function initSelects() {
        const $selects = document.querySelectorAll('.custom-select');
        if ($selects.length > 0) {
            $selects.forEach(select => {
                NiceSelect.bind(select);
            })
        }
    }

    function disableTransitionBeforeLoad() {
        document.body.classList.remove('preload');
    }

    function initFilterMore() {
        const $filterMoreBtn = document.querySelector('.filter__btn');

        if ($filterMoreBtn) {
            $filterMoreBtn.addEventListener('click', function(e) {
                $filterMoreBtn.classList.add('hidden');
                e.target.closest('.filter__categories').classList.add('active');
            })
        }
    }

    function initFilter() {
        const $filterSlider = document.querySelector('.filter__slider-element')
        const $filterFrom = document.querySelector('#filter-age-from')
        const $filterTo = document.querySelector('#filter-age-to')

        if ($filterSlider) {
            let min = Number($filterSlider.dataset.min);
            let max = Number($filterSlider.dataset.max);
    
            const filterSlider = noUiSlider.create($filterSlider, {
                start: [min + 4, max - 4],
                connect: true,
                step: 1,
                range: {
                    'min': min,
                    'max': max
                }
            });
    
            filterSlider.on('update', function (values, handle) {
                $filterFrom.value = Math.floor(values[0]);
                $filterTo.value = Math.floor(values[1]);
            });
    
            $filterFrom.addEventListener('change', function(e) {
                filterSlider.set([e.target.value, null]);
            })
            $filterTo.addEventListener('change', function(e) {
                filterSlider.set([null, e.target.value]);
            })
        }
    }

    function initCopyInputText() {
        const $copyButtons = document.querySelectorAll('.modal-payment__field button');

        if ($copyButtons.length > 0) {
            $copyButtons.forEach(item => {
                item.addEventListener('click', function(e) {
                    const input = item.nextElementSibling;
                    input.select();
                    input.setSelectionRange(0, 99999); /* For mobile devices */
                    navigator.clipboard.writeText(input.value);
                })
            })
        }
    }

    function initTabs() {
        const $tabs = document.querySelectorAll('[data-tab-title]');
    
        if (document.querySelector('[data-tab-container]')) {
            $tabs.forEach(tab => {
                tab.addEventListener('click', function(e) {
                    e.preventDefault();
    
                    const activeTab = document.querySelector('[data-tab-title].active');
                    const activeContent = document.querySelector('[data-tab-content].active');
                    const id = tab.getAttribute('data-tab');
            
                    if (activeTab) {
                        activeTab.classList.remove('active');
                        activeContent.classList.remove('active');
                    }
                    const content = document.querySelector('[data-tab-content][data-tab="'+id+'"]');
                    
                    tab.classList.add('active');
                    content.classList.add('active');
                })
            })
        }
    }

    function initMasks() {
        const $phones = document.querySelectorAll('.phone-mask');
        const $telegrams = document.querySelectorAll('.telegram-mask');
        const $dollars = document.querySelectorAll('.dollar-mask');

        if ($phones.length > 0) {
            $phones.forEach(item => {
                IMask(item, {
                    mask: '+380000000000' 
                });
            })
        }
        
        if ($telegrams.length > 0) {
            $telegrams.forEach(item => {
                IMask(item, {
                    mask: '@' 
                });
            })
            
        }
        if ($dollars.length > 0) {
            $dollars.forEach(item => {
                IMask(item, {
                    mask: '$num',
                    blocks: {
                        num: {
                            mask: Number,
                        }
                    }
                });
            })
        }
    }

    isWebp();
    initMenu();
    initModals();
    initAccordions();
    initSelects();
    initFilter();
    initFilterMore();
    initMasks();
    initCopyInputText();
    initTabs();
    disableTransitionBeforeLoad();
})