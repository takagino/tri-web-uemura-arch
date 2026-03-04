document.addEventListener('DOMContentLoaded', () => {
  // --- ハンバーガーメニューの制御 ---
  const header = document.querySelector('.header');
  const hamburger = document.getElementById('js-hamburger');
  const menu = document.getElementById('js-menu');
  const body = document.body;
  const links = document.querySelectorAll('.overlay__item a');

  if (hamburger && menu) {
    const toggleMenu = () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';

      if (isOpen) {
        hamburger.setAttribute('aria-expanded', 'false');
        menu.setAttribute('aria-hidden', 'true');
        body.classList.remove('is-open');
      } else {
        hamburger.setAttribute('aria-expanded', 'true');
        menu.setAttribute('aria-hidden', 'false');
        body.classList.add('is-open');
      }
    };

    hamburger.addEventListener('click', toggleMenu);

    menu.addEventListener('click', (e) => {
      if (e.target === menu) {
        toggleMenu();
      }
    });

    if (links.length > 0) {
      links.forEach((link) => {
        link.addEventListener('click', () => {
          if (hamburger.getAttribute('aria-expanded') === 'true') {
            toggleMenu();
          }
        });
      });
    }
  }

  // スクロールアニメーション
  const animateElements = document.querySelectorAll('[data-animate]');
  if (animateElements.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2,
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    animateElements.forEach((el) => observer.observe(el));
  }

  const heroSlider = document.querySelector('.js-hero-slider');
  const currentNum = document.querySelector('.hero__current');
  const nextNum = document.querySelector('.hero__next-num');
  const progressBar = document.querySelector('.js-hero-progress');
  const nextBtn = document.querySelector('.js-hero-next');

  if (heroSlider) {
    const headerOptions = {
      root: null,
      rootMargin: '-80px 0px 0px 0px',
      threshold: 0,
    };

    const headerObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          header.classList.remove('is-scrolled');
        } else {
          header.classList.add('is-scrolled');
        }
      });
    }, headerOptions);

    headerObserver.observe(heroSlider);

    const swiper = new Swiper(heroSlider, {
      loop: true,
      speed: 1500,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: {
        delay: 6000,
        disableOnInteraction: false,
      },
      on: {
        init: function (s) {
          updateSliderNumbers(s);
        },
        slideChange: function (s) {
          updateSliderNumbers(s);
        },
        autoplayTimeLeft(s, time, progress) {
          progressBar.style.width = `${(1 - progress) * 100}%`;
        },
      },
    });

    // 番号を更新する共通関数
    function updateSliderNumbers(s) {
      const totalSlides = s.slides.filter(
        (slide) => !slide.classList.contains('swiper-slide-duplicate'),
      ).length;

      const current = s.realIndex + 1;
      const next = ((s.realIndex + 1) % totalSlides) + 1;

      currentNum.textContent = `0${current}`;
      nextNum.textContent = `0${next}`;
    }

    nextBtn.addEventListener('click', () => {
      swiper.slideNext();
    });
  }
});

// 理念アニメーション
// document.addEventListener('DOMContentLoaded', () => {
//   const philosophyText = document.querySelector('.philosophy__text');
//   const body = document.body;
//   let unlocked = false;

//   window.addEventListener('scroll', () => {
//     if (unlocked) return;

//     const triggerPoint = window.innerHeight / 1.3;
//     const elementTop = philosophyText.getBoundingClientRect().top;

//     if (elementTop < triggerPoint) {
//       philosophyText.classList.add('scrolled');

//       setTimeout(() => {
//         body.classList.remove('lock-scroll');
//         unlocked = true;
//       }, 1500);
//     }
//   });
// });

// /*membersのborderアニメーション*/
// document.addEventListener('DOMContentLoaded', function () {
//   const target = document.querySelector('.career__list');

//   const observer = new IntersectionObserver(
//     ([entry]) => {
//       if (entry.isIntersecting) {
//         target.classList.add('is-visible');
//         observer.unobserve(target);
//       }
//     },
//     {
//       root: null,
//       threshold: 0.1,
//     },
//   );

//   if (target) {
//     observer.observe(target);
//   }
// });

// // membersフェードインアニメーション
// document.addEventListener('DOMContentLoaded', () => {
//   const target = document.querySelector('.profiles__container');

//   if (!target) return;

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('is-visible');
//           observer.unobserve(entry.target);
//         }
//       });
//     },
//     {
//       threshold: 0.4,
//     },
//   );

//   observer.observe(target);
// });

// /*プロセスアニメーション-スマホ-交互に現れる*/
// document.addEventListener('DOMContentLoaded', () => {
//   const flows = document.querySelectorAll('.process__flow');

//   const observer = new IntersectionObserver(
//     (entries) => {
//       entries.forEach((entry) => {
//         if (entry.isIntersecting) {
//           entry.target.classList.add('is-visible');
//         } else {
//           entry.target.classList.remove('is-visible');
//         }
//       });
//     },
//     { threshold: 0.1 },
//   );

//   flows.forEach((el) => observer.observe(el));

//   document.querySelectorAll('.process__item a').forEach((link) => {
//     link.addEventListener('click', (e) => {
//       const href = link.getAttribute('href');
//       const target = document.querySelector(href);
//       if (!target) return;

//       target.classList.remove('is-visible');

//       setTimeout(() => {
//         target.classList.add('is-visible');
//       }, 150);
//     });
//   });
// });

// // /*プロセスアニメーション-デスクトップ-ラインが出る*/
// document.addEventListener('DOMContentLoaded', () => {
//   const flows = document.querySelectorAll('.process__flow');
//   const maxHeight = 150; // 線の最大の長さ(px)

//   function onScroll() {
//     const viewportHeight = window.innerHeight;

//     flows.forEach((flow) => {
//       const pic = flow.querySelector('.process__pic');
//       if (!pic) return;

//       const rect = pic.getBoundingClientRect();
//       const elementTop = rect.top;
//       const elementHeight = rect.height;

//       // スクロールでどれくらい通過したかの割合を計算（0〜1）
//       const visibleProgress =
//         1 - (elementTop + elementHeight / 2) / viewportHeight;

//       // 0未満は0に、1以上は1に制限
//       const clampedProgress = Math.min(Math.max(visibleProgress, 0), 1);

//       // その割合に応じた高さ
//       const lineHeight = clampedProgress * maxHeight;

//       pic.style.setProperty('--line-height', `${lineHeight}px`);
//     });
//   }

//   window.addEventListener('scroll', onScroll);
//   window.addEventListener('resize', onScroll);
//   onScroll();
// });

// // モーダル
// const modal = document.getElementById('modal');
// const modalImg = document.getElementById('modalImg');
// const closeBtn = document.querySelector('.modal__close');
// const prevBtn = document.getElementById('prevBtn');
// const nextBtn = document.getElementById('nextBtn');

// const images = Array.from(document.querySelectorAll('.content__img'));
// let currentIndex = 0;

// images.forEach((img, index) => {
//   img.addEventListener('click', function () {
//     currentIndex = index;
//     showImage();
//     modal.style.display = 'flex';
//   });
// });

// function showImage() {
//   modalImg.src = images[currentIndex].src;

//   prevBtn.classList.toggle('hidden', currentIndex === 0);
//   nextBtn.classList.toggle('hidden', currentIndex === images.length - 1);
// }

// closeBtn.onclick = function () {
//   modal.style.display = 'none';
// };

// window.onclick = function (event) {
//   if (event.target === modal) {
//     modal.style.display = 'none';
//   }
// };

// nextBtn.onclick = function () {
//   if (currentIndex < images.length - 1) {
//     currentIndex++;
//     showImage();
//   }
// };

// prevBtn.onclick = function () {
//   if (currentIndex > 0) {
//     currentIndex--;
//     showImage();
//   }
// };
