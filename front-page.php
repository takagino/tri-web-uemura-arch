<?php get_header(); ?>
<main>
    <section class="hero">
        <div class="swiper js-hero-slider">
            <div class="swiper-wrapper">
                <?php
                $args = array(
                    'post_type'      => 'post',
                    'posts_per_page' => 5,
                    'category'            => 'pickup',
                );
                $hero_query = new WP_Query($args);
                if ($hero_query->have_posts()) : $index = 1;
                    while ($hero_query->have_posts()) : $hero_query->the_post();
                        $tags = get_the_tags();
                ?>
                        <div class="swiper-slide hero__slide">
                            <div class="hero__image">
                                <?php the_post_thumbnail('full'); ?>
                            </div>

                            <div class="hero__content">
                                <p class="hero__tips" data-animate>works</p>

                                <h2 class="hero__title" data-animate><?php the_title(); ?></h2>

                                <p class="hero__category" data-animate>
                                    <?php
                                    $categories = get_the_category();
                                    if ($categories) :
                                        foreach ($categories as $category) :
                                            if ($category->slug !== 'pickup') :
                                                echo '<span>' . esc_html($category->name) . '</span> ';
                                            endif;
                                        endforeach;
                                    endif;
                                    ?>
                                </p>

                                <div class="hero__link-wrap" data-animate>
                                    <a href="<?php the_permalink(); ?>" class="hero__link">view more</a>
                                </div>
                            </div>
                        </div>
                <?php $index++;
                    endwhile;
                    wp_reset_postdata();
                endif; ?>
            </div>

            <div class="hero__controls">
                <span class="hero__current">01</span>
                <div class="hero__bar">
                    <span class="hero__bar-inner js-hero-progress"></span>
                </div>
                <button type="button" class="hero__next js-hero-next">
                    <span class="hero__next-num">0<?php echo $hero_query->post_count; ?></span>
                </button>
            </div>

            <div class="hero__scroll">
                <a href="#works" class="hero__scroll-link">
                    <span class="hero__scroll-text">all works</span>
                    <div class="hero__scroll-line"></div>
                </a>
            </div>
        </div>
    </section>
    <section class="concept" data-animate="fade-up">
        <div class="concept__inner">
            <h2 class="concept__title">豊かな商い、快適な暮らしを育む、良質なデザイン</h2>
            <div class="concept__text">
                <p>建築は、場所に暮らしや商いを生み出し、その蓄積が都市をつくります。</p>
                <p>植村康平建築設計事務所では、良質な空間を提案し、暮らしを豊かにし、商いを支え、穏やかで住み心地の良い、やわらかな都市を目指します。</p>
                <p>当事務所は1名の建築家と2名のデザイナーからなる専門家集団で、アトリエとしての提案力とチームとしての組織力を活かし、100㎡から2,000㎡程度の建築を得意とし、どんな場所・どんな用途にも対応可能です。</p>
                <p>また、建築にとどまらない幅広いデザイン活動として、まちの仕組みづくりやアート企画に取り組んでおり、「ニシヤマナガヤ」や「暮らせる図書館」、「未完美術館」、「なごや裏山芸術祭」の運営などを通じて、まちづくりにも関わっています。</p>
                <p>パートナーとして、夢を膨らませ、唯一無二の空間を形にします。</p>
            </div>
        </div>
    </section>
    <section id="works" class="works" data-animate="fade-up">
        <div class="works__inner">
            <h2 class="works__title">all works</h2>
            <div class="works__tag">
                <a href="#" class="works__tag-link works__tag-current">
                    全て
                </a>
                <a href="#" class="works__tag-link">
                    住宅
                </a>

                <a href="#" class="works__tag-link">
                    店舗
                </a>

                <a href="#" class="works__tag-link">
                    リノベーション
                </a>

                <a href="#" class="works__tag-link">
                    まちづくり
                </a>

                <a href="#" class="works__tag-link">
                    その他
                </a>
            </div>
            <div class="works__posts">
                <article class="post">
                    <a href="content.html">
                        <div class="post__img">
                            <img src="./img/1.jpg" alt="へへへのお部屋の画像です">
                        </div>
                        <h3 class="post__title">へへへのお部屋</h3>
                        <p class="post__tag">category</p>
                    </a>
                </article>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>