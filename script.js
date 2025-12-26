// ハンバーガー
const hamburger = document.getElementById('hamburger');
const menu = document.getElementById('menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    menu.classList.toggle('active');
});

menu.querySelectorAll('a, button, img, li').forEach(el => {
    el.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

menu.addEventListener('click', () => {
    if (menu.classList.contains('active')) {
        hamburger.classList.remove('active');
        menu.classList.remove('active');
    }
});

const worksLink = document.querySelector('a[href$="#works"]');

if (worksLink) {
    worksLink.addEventListener('click', () => {
        const isTopPage = location.pathname.endsWith('top.html') || location.pathname === '/' || location.pathname === '/index.html';

        if (isTopPage && menu.classList.contains('active')) {
            hamburger.classList.remove('active');
            menu.classList.remove('active');
        }
    });
}

// トップボタン
document.addEventListener("DOMContentLoaded", () => {
    const backToTopButton = document.getElementById("back-to-top");
    const header = document.getElementById("main-header");
    const footer = document.querySelector("footer.footer");

    window.addEventListener("scroll", () => {
        const headerBottom = header.getBoundingClientRect().bottom;

        if (headerBottom < 0) {
            backToTopButton.classList.add("show");
        } else {
            backToTopButton.classList.remove("show");
        }

        const footerRect = footer.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (footerRect.top < windowHeight) {
            backToTopButton.style.position = "absolute";
            const offset = window.scrollY + footerRect.top - backToTopButton.offsetHeight - 10;
            backToTopButton.style.top = `${offset}px`;
            backToTopButton.style.right = "10px";
            backToTopButton.style.bottom = "auto";
        } else {
            backToTopButton.style.position = "fixed";
            backToTopButton.style.bottom = "0px";
            backToTopButton.style.top = "auto";
            backToTopButton.style.right = "10px";
        }
    });

    backToTopButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
});


// トップ-フェードインアニメーション
function fadeInOnScroll() {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(el => {
        const rect = el.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight - 100) {
            el.classList.add('in-view');
        }
    });
}

window.addEventListener('scroll', fadeInOnScroll);
window.addEventListener('load', fadeInOnScroll);


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
document.addEventListener("DOMContentLoaded", function () {
    const target = document.querySelector(".career__list");

    const observer = new IntersectionObserver(
        ([entry]) => {
            if (entry.isIntersecting) {
                target.classList.add("is-visible");
                observer.unobserve(target);
            }
        },
        {
            root: null,
            threshold: 0.1,
        }
    );

    if (target) {
        observer.observe(target);
    }
});

// membersフェードインアニメーション
document.addEventListener("DOMContentLoaded", () => {
    const target = document.querySelector('.profiles__container');

    if (!target) return;

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.4
    });

    observer.observe(target);
});

/*プロセスアニメーション-スマホ-交互に現れる*/
document.addEventListener("DOMContentLoaded", () => {
    const flows = document.querySelectorAll(".process__flow");

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("is-visible");
            } else {
                entry.target.classList.remove("is-visible");
            }
        });
    }, { threshold: 0.1 });

    flows.forEach(el => observer.observe(el));

    document.querySelectorAll('.process__item a').forEach(link => {
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

        flows.forEach(flow => {
            const pic = flow.querySelector('.process__pic');
            if (!pic) return;

            const rect = pic.getBoundingClientRect();
            const elementTop = rect.top;
            const elementHeight = rect.height;

            // スクロールでどれくらい通過したかの割合を計算（0〜1）
            const visibleProgress = 1 - (elementTop + elementHeight / 2) / viewportHeight;

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
const modal = document.getElementById("modal");
const modalImg = document.getElementById("modalImg");
const closeBtn = document.querySelector(".modal__close");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const images = Array.from(document.querySelectorAll('.content__img'));
let currentIndex = 0;

images.forEach((img, index) => {
    img.addEventListener('click', function () {
        currentIndex = index;
        showImage();
        modal.style.display = "flex";
    });
});

function showImage() {
    modalImg.src = images[currentIndex].src;

    prevBtn.classList.toggle('hidden', currentIndex === 0);
    nextBtn.classList.toggle('hidden', currentIndex === images.length - 1);
}

closeBtn.onclick = function () {
    modal.style.display = "none";
};

window.onclick = function (event) {
    if (event.target === modal) {
        modal.style.display = "none";
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