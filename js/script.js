document.addEventListener('DOMContentLoaded', () => {
  // --- スクロールアニメーション共通処理 ---
  const fadeObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const delay = entry.target.dataset.delay || 0;
          setTimeout(() => {
            entry.target.classList.add('is-animated');
          }, delay);
          observer.unobserve(entry.target);
        }
      });
    },
    { root: null, rootMargin: '0px', threshold: 0.2 },
  );

  const observeElements = (elements) => {
    elements.forEach((el) => fadeObserver.observe(el));
  };

  observeElements(document.querySelectorAll('[data-animate]'));

  // --- ハンバーガーメニューの制御 ---
  const initHamburger = () => {
    const hamburger = document.getElementById('js-hamburger');
    const menu = document.getElementById('js-menu');
    const body = document.body;
    const links = document.querySelectorAll('.overlay__item a');

    if (!hamburger || !menu) return;

    const toggleMenu = () => {
      const isOpen = hamburger.getAttribute('aria-expanded') === 'true';
      hamburger.setAttribute('aria-expanded', !isOpen);
      menu.setAttribute('aria-hidden', isOpen);
      isOpen ? body.classList.remove('is-open') : body.classList.add('is-open');
    };

    hamburger.addEventListener('click', toggleMenu);
    menu.addEventListener('click', (e) => {
      if (e.target === menu) toggleMenu();
    });

    links.forEach((link) => {
      link.addEventListener('click', () => {
        if (hamburger.getAttribute('aria-expanded') === 'true') toggleMenu();
      });
    });
  };
  initHamburger();

  // --- トップページ：ヒーロースライダー＆ヘッダー制御 ---
  const initHeroSlider = () => {
    const heroSlider = document.querySelector('.js-hero-slider');
    const header = document.querySelector('.header');

    if (!heroSlider) return;

    const currentNum = document.querySelector('.hero__current');
    const nextNum = document.querySelector('.hero__next-num');
    const progressBar = document.querySelector('.js-hero-progress');
    const nextBtn = document.querySelector('.js-hero-next');

    const headerObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.isIntersecting
            ? header.classList.remove('is-scrolled')
            : header.classList.add('is-scrolled');
        });
      },
      { root: null, rootMargin: '-80px 0px 0px 0px', threshold: 0 },
    );
    headerObserver.observe(heroSlider);

    const updateSliderNumbers = (s) => {
      const totalSlides = s.slides.filter(
        (slide) => !slide.classList.contains('swiper-slide-duplicate'),
      ).length;
      const current = s.realIndex + 1;
      const next = ((s.realIndex + 1) % totalSlides) + 1;

      currentNum.textContent = `0${current}`;
      nextNum.textContent = `0${next}`;
    };

    const swiper = new Swiper(heroSlider, {
      loop: true,
      speed: 1500,
      effect: 'fade',
      fadeEffect: { crossFade: true },
      autoplay: { delay: 6000, disableOnInteraction: false },
      on: {
        init: updateSliderNumbers,
        slideChange: updateSliderNumbers,
        autoplayTimeLeft(s, time, progress) {
          progressBar.style.width = `${(1 - progress) * 100}%`;
        },
      },
    });

    nextBtn.addEventListener('click', () => swiper.slideNext());
  };
  initHeroSlider();

  // --- 実績一覧：AJAX絞り込みとページネーション ---
  const initWorksAjax = () => {
    const worksContainer = document.getElementById('js-works-container');
    const catButtons = document.querySelectorAll('.works__tag-link');

    if (!worksContainer || catButtons.length === 0) return;

    let currentCat = 0;
    let currentPage = 1;

    const fetchWorks = async () => {
      worksContainer.style.opacity = '0.4';
      worksContainer.style.transition = 'opacity 0.3s';

      const formData = new FormData();
      formData.append('action', 'arc_load_works');
      formData.append('cat_id', currentCat);
      formData.append('paged', currentPage);

      try {
        const response = await fetch(arc_ajax.url, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          worksContainer.innerHTML = data.data.html;
          observeElements(worksContainer.querySelectorAll('[data-animate]'));
        }
      } catch (error) {
        console.error('通信エラー:', error);
      } finally {
        worksContainer.style.opacity = '1';
      }
    };

    catButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        catButtons.forEach((b) => b.classList.remove('works__tag-current'));
        btn.classList.add('works__tag-current');

        currentCat = btn.dataset.catId;
        currentPage = 1;
        fetchWorks();
      });
    });

    worksContainer.addEventListener('click', (e) => {
      const pageLink = e.target.closest('.page-numbers:not(.current)');
      if (pageLink) {
        e.preventDefault();
        const match =
          pageLink.href.match(/paged=(\d+)/) ||
          pageLink.href.match(/\/page\/(\d+)/);
        currentPage = match ? match[1] : 1;

        fetchWorks();
        const worksTop =
          document.getElementById('works').getBoundingClientRect().top +
          window.scrollY;
        window.scrollTo({ top: worksTop, behavior: 'smooth' });
      }
    });
  };
  initWorksAjax();

  // --- 詳細ページ：関連記事スライダー ---
  const initRelatedSlider = () => {
    const relatedSlider = document.querySelector('.js-related-slider');
    if (!relatedSlider) return;

    new Swiper(relatedSlider, {
      loop: true,
      speed: 800,
      spaceBetween: 20,
      slidesPerView: 1.5,
      autoplay: { delay: 4000, disableOnInteraction: false },
      navigation: {
        nextEl: '.js-related-next',
        prevEl: '.js-related-prev',
      },
      breakpoints: {
        768: { slidesPerView: 2.5, spaceBetween: 30 },
        1024: { slidesPerView: 3.5, spaceBetween: 40 },
      },
    });
  };
  initRelatedSlider();
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
