<?php get_header(); ?>
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
<?php get_footer(); ?>