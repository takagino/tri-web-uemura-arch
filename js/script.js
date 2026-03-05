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

  // --- 実績一覧のAJAX（絞り込み＆ページネーション） ---
  const worksContainer = document.getElementById('js-works-container');
  const catButtons = document.querySelectorAll('.works__tag-link');

  if (worksContainer && catButtons.length > 0) {
    let currentCat = 0;
    let currentPage = 1;

    const fadeObserver = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-animated');
            obs.unobserve(entry.target);
          }
        });
      },
      { root: null, rootMargin: '0px', threshold: 0.1 },
    );

    // 初期ロード時のアニメーション監視
    document
      .querySelectorAll('[data-animate]')
      .forEach((el) => fadeObserver.observe(el));

    // データ取得用関数
    const fetchWorks = async () => {
      // ロード中の視覚効果（少し薄くする）
      worksContainer.style.opacity = '0.4';
      worksContainer.style.transition = 'opacity 0.3s';

      const formData = new FormData();
      formData.append('action', 'arc_load_works');
      formData.append('cat_id', currentCat);
      formData.append('paged', currentPage);

      try {
        // functions.phpで渡したarc_ajax.urlを使用
        const response = await fetch(arc_ajax.url, {
          method: 'POST',
          body: formData,
        });
        const data = await response.json();

        if (data.success) {
          // HTMLを書き換え
          worksContainer.innerHTML = data.data.html;

          // 新しく読み込まれた要素に再度アニメーションをセットする
          const newItems = worksContainer.querySelectorAll('[data-animate]');
          newItems.forEach((el) => fadeObserver.observe(el));
        }
      } catch (error) {
        console.error('通信エラー:', error);
      } finally {
        worksContainer.style.opacity = '1';
      }
    };

    // カテゴリーボタンのクリック処理
    catButtons.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        // カレントクラスの付け替え
        catButtons.forEach((b) => b.classList.remove('works__tag-current'));
        btn.classList.add('works__tag-current');

        currentCat = btn.dataset.catId;
        currentPage = 1; // カテゴリを変えたら1ページ目に戻す
        fetchWorks();
      });
    });

    // ページネーションのクリック処理（後から追加されたHTMLにも反応させるためイベント委譲を使用）
    worksContainer.addEventListener('click', (e) => {
      const pageLink = e.target.closest('.page-numbers:not(.current)');
      if (pageLink) {
        e.preventDefault();
        const href = pageLink.href;

        // URLの文字列（/page/2/ または ?paged=2）からページ番号を抽出
        const match = href.match(/paged=(\d+)/) || href.match(/\/page\/(\d+)/);
        currentPage = match ? match[1] : 1;

        fetchWorks();

        // 任意：ページを切り替えたら、一覧の少し上にスクロールさせる
        // const worksTop = document.getElementById('works').getBoundingClientRect().top + window.scrollY;
        // window.scrollTo({ top: worksTop - 100, behavior: 'smooth' });
      }
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
