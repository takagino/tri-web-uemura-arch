document.addEventListener('DOMContentLoaded', () => {
  // ハンバーガーメニュー
  const hamburger = document.getElementById('js-hamburger');
  const menu = document.getElementById('js-menu');
  const body = document.body;
  const links = document.querySelectorAll('.overlay__item a');

  const toggleMenu = () => {
    const isOpen = body.classList.contains('is-open');

    if (isOpen) {
      body.classList.remove('is-open');
      hamburger.setAttribute('aria-expanded', 'false');
      menu.setAttribute('aria-hidden', 'true');
    } else {
      body.classList.add('is-open');
      hamburger.setAttribute('aria-expanded', 'true');
      menu.setAttribute('aria-hidden', 'false');
    }
  };

  hamburger.addEventListener('click', toggleMenu);

  menu.addEventListener('click', (e) => {
    if (e.target === menu) {
      toggleMenu();
    }
  });

  links.forEach((link) => {
    link.addEventListener('click', () => {
      if (body.classList.contains('is-open')) {
        toggleMenu();
      }
    });
  });

  // スクロールアニメーション
  const animateElements = document.querySelectorAll('[data-animate]');
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
});

// 理念アニメーション
document.addEventListener('DOMContentLoaded', () => {
  const philosophyText = document.querySelector('.philosophy__text');
  const body = document.body;
  let unlocked = false;

  window.addEventListener('scroll', () => {
    if (unlocked) return;

    const triggerPoint = window.innerHeight / 1.3;
    const elementTop = philosophyText.getBoundingClientRect().top;

    if (elementTop < triggerPoint) {
      philosophyText.classList.add('scrolled');

      setTimeout(() => {
        body.classList.remove('lock-scroll');
        unlocked = true;
      }, 1500);
    }
  });
});

/*membersのborderアニメーション*/
document.addEventListener('DOMContentLoaded', function () {
  const target = document.querySelector('.career__list');

  const observer = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        target.classList.add('is-visible');
        observer.unobserve(target);
      }
    },
    {
      root: null,
      threshold: 0.1,
    },
  );

  if (target) {
    observer.observe(target);
  }
});

// membersフェードインアニメーション
document.addEventListener('DOMContentLoaded', () => {
  const target = document.querySelector('.profiles__container');

  if (!target) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.4,
    },
  );

  observer.observe(target);
});

/*プロセスアニメーション-スマホ-交互に現れる*/
document.addEventListener('DOMContentLoaded', () => {
  const flows = document.querySelectorAll('.process__flow');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        } else {
          entry.target.classList.remove('is-visible');
        }
      });
    },
    { threshold: 0.1 },
  );

  flows.forEach((el) => observer.observe(el));

  document.querySelectorAll('.process__item a').forEach((link) => {
    link.addEventListener('click', (e) => {
      const href = link.getAttribute('href');
      const target = document.querySelector(href);
      if (!target) return;

      target.classList.remove('is-visible');

      setTimeout(() => {
        target.classList.add('is-visible');
      }, 150);
    });
  });
});

// /*プロセスアニメーション-デスクトップ-ラインが出る*/
document.addEventListener('DOMContentLoaded', () => {
  const flows = document.querySelectorAll('.process__flow');
  const maxHeight = 150; // 線の最大の長さ(px)

  function onScroll() {
    const viewportHeight = window.innerHeight;

    flows.forEach((flow) => {
      const pic = flow.querySelector('.process__pic');
      if (!pic) return;

      const rect = pic.getBoundingClientRect();
      const elementTop = rect.top;
      const elementHeight = rect.height;

      // スクロールでどれくらい通過したかの割合を計算（0〜1）
      const visibleProgress =
        1 - (elementTop + elementHeight / 2) / viewportHeight;

      // 0未満は0に、1以上は1に制限
      const clampedProgress = Math.min(Math.max(visibleProgress, 0), 1);

      // その割合に応じた高さ
      const lineHeight = clampedProgress * maxHeight;

      pic.style.setProperty('--line-height', `${lineHeight}px`);
    });
  }

  window.addEventListener('scroll', onScroll);
  window.addEventListener('resize', onScroll);
  onScroll();
});

// モーダル
const modal = document.getElementById('modal');
const modalImg = document.getElementById('modalImg');
const closeBtn = document.querySelector('.modal__close');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

const images = Array.from(document.querySelectorAll('.content__img'));
let currentIndex = 0;

images.forEach((img, index) => {
  img.addEventListener('click', function () {
    currentIndex = index;
    showImage();
    modal.style.display = 'flex';
  });
});

function showImage() {
  modalImg.src = images[currentIndex].src;

  prevBtn.classList.toggle('hidden', currentIndex === 0);
  nextBtn.classList.toggle('hidden', currentIndex === images.length - 1);
}

closeBtn.onclick = function () {
  modal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === modal) {
    modal.style.display = 'none';
  }
};

nextBtn.onclick = function () {
  if (currentIndex < images.length - 1) {
    currentIndex++;
    showImage();
  }
};

prevBtn.onclick = function () {
  if (currentIndex > 0) {
    currentIndex--;
    showImage();
  }
};
