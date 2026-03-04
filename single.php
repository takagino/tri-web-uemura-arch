<!DOCTYPE html>
<html lang="ja">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>CONTENT | 植村康平建築設計事務所</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/the-new-css-reset/css/reset.min.css">
    <link rel="stylesheet" href="./css/content.min.css">
    <link rel="stylesheet" href="./css/style.min.css">
</head>

<body>
    <header class="header" id="main-header">
        <div class="header__inner">
            <h1 class="header__title">
                <a href="index.html">
                    <img class="header__logo" src="./img/logomobile.webp" alt="植村康平建築設計事務所">
                </a>
            </h1>
            <div class="hamburger" id="hamburger">
                <span></span>
                <span></span>
                <span></span>
            </div>
            <nav id="menu" class="menu">
                <ul class="menu__list">
                    <li class="menu__item"><a href="index.html" data-text="top"><span>top</span></a></li>
                    <li class="menu__item"><a href="index.html#works" data-text="works"><span>works</span></a></li>
                    <li class="menu__item"><a href="company.html" data-text="campany"><span>campany</span></a></li>
                    <li class="menu__item"><a href="members.html" data-text="members"><span>members</span></a></li>
                    <li class="menu__item"><a href="process.html" data-text="process"><span>process</span></a></li>
                    <li class="menu__item"><a href="contact.html" data-text="contact"><span>contact</span></a></li>
                    <li class="menu__link menu__item">
                        <img class="menu__inst" src="./img/instIcon.png" alt="">
                        <div class="menu__username">
                            <a href="https://www.instagram.com/k_uemura.archi/">植村康平建築設計事務所Instagram<br>@k_uemura.archi
                            </a>
                            <a href="https://www.instagram.com/koheiuemura/">Kohei Uemura
                                Instagram<br>@koheiuemura
                            </a>
                        </div>
                    </li>
                </ul>
            </nav>
        </div>
    </header>

    <main>

        <section class="content">
            <div class="content__top">
                <h2 class="content__title">へへへのおへや</h2>
                <a href="#" class="content__category">リノベーション</a>
            </div>

            <img src="./img/1.jpg" alt="" class="content__thumbnail">

            <div class="content__text">
                <p class="content__explain">
                    西山商店街の活動や、まちづくりに興味がある。
                    そんな「あたらしいことを始めてみたい」気持ちを持った、三人の女性が一緒に暮らすためのお部屋です。

                    築65年ほど経つRC造の建物をリノベーションし、商店街や地域とのつながりを感じながら、それぞれがやりたいことに挑戦したり、助け合ったりできる空間を目指しました。

                    古い建物ならではの落ち着きや、少しラフで肩の力を抜ける雰囲気を大切にしつつ、これからの暮らし方に合わせた設備や間取りを整えています。

                    「新しいことを始めたい」「地域に関わりたい」という思いを持つ人たちが、ここを拠点に活動を広げていけるように。
                    そんな暮らしの土台になる部屋を目指したリノベーションです。
                </p>

                <div class="content__detail">
                    <dl class="content__list">
                        <dt class="content__left">type : </dt>
                        <dd class="content__right">店舗</dd>
                    </dl>
                    <dl class="content__list">
                        <dt class="content__left">at : </dt>
                        <dd class="content__right">名古屋市名東区</dd>
                    </dl>
                    <dl class="content__list">
                        <dt class="content__left">size : </dt>
                        <dd class="content__right">100㎡</dd>
                    </dl>
                    <dl class="content__list">
                        <dt class="content__left">date : </dt>
                        <dd class="content__right">2024</dd>
                    </dl>
                    <dl class="content__list">
                        <dt class="content__left">constractior : </dt>
                        <dd class="content__right"><a href="#">誠和建設</a></dd>
                    </dl>
                    <dl class="content__list">
                        <dt class="content__left">photo : </dt>
                        <dd class="content__right"><a href="#">ToLoLo studio</a></dd>
                    </dl>

                </div>

            </div>

            <div class="content__picture">
                <!-- クリックしたら一個の画層を大きく表示できるように -->
                <div class="content__flex">
                    <img src="./img/11.jpg" alt="" class="content__img">
                    <img src="./img/2.jpg" alt="" class="content__img">
                    <img src="./img/3.jpg" alt="" class="content__img">
                    <img src="./img/4.jpg" alt="" class="content__img">
                    <img src="./img/5.jpg" alt="" class="content__img">
                    <img src="./img/6.jpg" alt="" class="content__img">
                </div>
                <div class="content__flex">
                    <img src="./img/7.jpg" alt="" class="content__img">
                    <img src="./img/8.jpg" alt="" class="content__img">
                    <img src="./img/9.jpg" alt="" class="content__img">
                    <img src="./img/10.jpg" alt="" class="content__img">
                    <img src="./img/11.jpg" alt="" class="content__img">
                    <img src="./img/7.jpg" alt="" class="content__img">
                </div>
                <div class="content__flex">
                    <img src="./img/3.jpg" alt="" class="content__img">
                    <img src="./img/4.jpg" alt="" class="content__img">
                    <img src="./img/5.jpg" alt="" class="content__img">
                    <img src="./img/6.jpg" alt="" class="content__img">
                    <img src="./img/2.jpg" alt="" class="content__img">
                    <img src="./img/8.jpg" alt="" class="content__img">
                    <img src="./img/9.jpg" alt="" class="content__img">
                </div>
            </div>

            <div id="modal" class="modal">
                <span class="modal__close">&times;</span>
                <span id="prevBtn" class="modal__nav modal__nav--prev">&lt;</span>
                <img class="modal__content" id="modalImg">
                <span id="nextBtn" class="modal__nav modal__nav--next">&gt;</span>
            </div>
        </section>



        <section class="more">
            <h3 class="more__title">view more</h3>

            <div class="more__wrapper">
                <div class="more__flex">
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe02.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe03.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe02.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe03.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe02.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>
                    <a class="more__link" href="#">
                        <img class="more__img" src="./img/hehehe03.jpg" alt="">
                        <p class="more__one">へへへのおへや</p>
                    </a>


                </div>
            </div>
        </section>

    </main>

    <button id="back-to-top">
        <img src="./img/arrow.svg" alt="">
    </button>


    <footer class="footer">
        <div class="footer__inner">
            <div class="footer__address">
                <address class="footer__address-text">
                    <p class="footer__address-line">〒465-0085</p>
                    <p class="footer__address-line">愛知県名古屋市名東区西山本通2-23ニシヤマナガヤ2F</p>
                    <p class="footer__address-line"><a href="tel:052-734-2408">tel：052-734-2408</a></p>
                    <p class="footer__address-line"><a href="mailto:info@uemura-arch.com">mail :
                            info@uemura-arch.com</a></p>
                </address>
            </div>
            <div class="footer__right">
                <!-- <nav class="footer__nav">
                        <ul class="footer__nav-list">
                            <li class="footer__nav-item"><a href="#" class="footer__nav-link">works</a></li>
                            <li class="footer__nav-item"><a href="#" class="footer__nav-link">members</a></li>
                            <li class="footer__nav-item"><a href="#" class="footer__nav-link">process</a></li>
                            <li class="footer__nav-item"><a href="#" class="footer__nav-link">contact</a></li>
                        </ul>
                    </nav> -->
                <div class="footer__copy">
                    <small class="footer__copy-text">&copy; Kohei Uemura Architects All Rights Reserved</small>
                </div>
            </div>
        </div>
    </footer>
    <script>
        document.addEventListener("DOMContentLoaded", () => {
            const container = document.querySelector(".more__flex");

            // 1セット分を複製（2セットにする）
            const clone = container.innerHTML;
            container.innerHTML += clone;

            let position = 0;
            const speed = 0.5;

            function animate() {
                position += speed;

                // スクロール位置を更新
                container.style.transform = `translateX(-${position}px)`;

                // 1セット分の幅を超えたら即座に戻す（無限ループ）
                const resetPoint = container.scrollWidth / 2;
                if (position >= resetPoint) {
                    position -= resetPoint;
                }

                requestAnimationFrame(animate);
            }

            animate();
        });
    </script>



    <script src="./script.js"></script>

</body>

</html>