window.addEventListener('load', function () {
    const loader = document.getElementById('page-loader');
    setTimeout(() => {
        loader.classList.add('hidden');
    }, 500);
});

$(document).ready(function () {
    $('.mobile-menu-toggle').click(function () {
        $(this).toggleClass('active');
        $('.nav-mobile').toggleClass('active');
    });

    $('.nav-menu-mobile a').click(function () {
        $('.mobile-menu-toggle').removeClass('active');
        $('.nav-mobile').removeClass('active');
    });

    $(document).click(function (event) {
        if (!$(event.target).closest('.header').length) {
            $('.mobile-menu-toggle').removeClass('active');
            $('.nav-mobile').removeClass('active');
        }
    });
});

$('a[href^="#"]').on('click', function (e) {
    e.preventDefault();
    const target = $(this.getAttribute('href'));
    if (target.length) {
        $('.header').removeClass('header-hidden').addClass('header-visible');

        $('html, body').stop().animate({
            scrollTop: target.offset().top - 100
        }, 800);
    }
});

const lazyImages = document.querySelectorAll('img.lazy-load');

const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const img = entry.target;
            const src = img.getAttribute('data-src');

            if (src) {
                img.src = src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        }
    });
}, {
    rootMargin: '50px'
});

lazyImages.forEach(img => {
    imageObserver.observe(img);
});

$('.faq-question').click(function () {
    const faqItem = $(this).parent();

    $('.faq-item').not(faqItem).removeClass('active');

    faqItem.toggleClass('active');
});

$('.hero-carousel').owlCarousel({
    loop: true,
    margin: 0,
    nav: true,
    dots: true,
    items: 1,
    autoplay: true,
    autoplayTimeout: 5000,
    autoplayHoverPause: true,
    animateOut: 'fadeOut',
    animateIn: 'fadeIn',
    smartSpeed: 1000,
    navText: ['<i class="fas fa-chevron-left"></i>', '<i class="fas fa-chevron-right"></i>']
});

$('.newsletter-form').submit(function (e) {
    e.preventDefault();
    const email = $(this).find('input[type="email"]').val();

    if (email) {
        alert('Thank you for subscribing! We will send updates to: ' + email);
        $(this).find('input[type="email"]').val('');
    }
});

const animateOnScroll = () => {
    const elements = document.querySelectorAll('.eligibility-card, .care-card, .step-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
};

window.addEventListener('load', animateOnScroll);

let lastScrollTop = 0;
let scrollTimeout;
const header = $('.header');

$(window).scroll(function () {
    const scrollTop = $(this).scrollTop();

    clearTimeout(scrollTimeout);

    if (scrollTop <= 100) {
        header.removeClass('header-hidden').addClass('header-visible');
    }
    else if (scrollTop > lastScrollTop && scrollTop > 100) {
        header.addClass('header-hidden').removeClass('header-visible');
    }
    else if (scrollTop < lastScrollTop) {
        header.removeClass('header-hidden').addClass('header-visible');
    }
    lastScrollTop = scrollTop;
    const scrollPos = scrollTop + 150;
    $('.nav-menu a, .nav-menu-mobile a').each(function () {
        const currLink = $(this);
        const refElement = $(currLink.attr('href'));

        if (refElement.length && refElement.position().top <= scrollPos && refElement.position().top + refElement.height() > scrollPos) {
            $('.nav-menu a, .nav-menu-mobile a').removeClass('active');
            currLink.addClass('active');
        }
    });
});

$(document).mousemove(function (e) {
    if (e.clientY <= 100) {
        header.removeClass('header-hidden').addClass('header-visible');
    }
});
