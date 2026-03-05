<?php get_header(); ?>

<main class="single-project">
    <article <?php post_class(); ?>>
        <div class="single-project__inner">

            <div class="single-project__left" data-animate="fade-up">
                <div class="single-project__header">
                    <h1 class="single-project__title"><?php the_title(); ?></h1>
                </div>

                <div class="single-project__content">
                    <?php the_content(); ?>
                </div>
            </div>

            <div class="single-project__right">

                <div class="single-project__thumbnail" data-animate="fade-in">
                    <?php if (has_post_thumbnail()) : ?>
                        <?php the_post_thumbnail('full'); ?>
                    <?php else : ?>
                        <img src="<?php echo esc_url(get_theme_file_uri('/img/dummy.jpg')); ?>" alt="no-image">
                    <?php endif; ?>
                </div>

                <div class="single-project__meta" data-animate="fade-up" data-delay="300">
                    <dl class="meta-list">
                        <?php
                        // 出力したい項目を「ラベル名 => フィールド名」の配列にまとめる（DRY原則）
                        $meta_items = [
                            'type'       => 'works-type',
                            'at'         => 'works-at',
                            'size'       => 'works-size',
                            'date'       => 'works-date',
                            'contractor' => 'works-contractor',
                            'garden'     => 'works-garden', // 【修正】元のコードでdtがcontractorになっていたのを修正
                            'photo'      => 'works-photo',
                        ];

                        foreach ($meta_items as $label => $field_name) :
                            if ($value = get_field($field_name)) :
                        ?>
                                <div class="meta-list__item">
                                    <dt><?php echo esc_html($label); ?></dt>
                                    <dd><?php echo esc_html($value); ?></dd>
                                </div>
                        <?php
                            endif;
                        endforeach;
                        ?>
                    </dl>
                </div>

            </div>
        </div>

        <?php
        $images = get_field('works-gallery');
        if ($images) :
        ?>
            <div class="single-project__inner">
                <div class="single-project__gallery-wrapper">
                    <div class="single-project__gallery">
                        <?php foreach ($images as $image) : ?>
                            <div class="single-project__gallery-item" data-animate="fade-up">
                                <img src="<?php echo esc_url($image['sizes']['large']); ?>" alt="<?php echo esc_attr($image['alt']); ?>">
                            </div>
                        <?php endforeach; ?>
                    </div>
                </div>
            </div>
        <?php endif; ?>
    </article>

    <?php
    $current_categories = get_the_category();
    $cat_ids = [];

    if ($current_categories) {
        foreach ($current_categories as $cat) {
            // 早期コンティニューでネストを浅くする
            if ($cat->slug === 'pickup' || $cat->slug === 'exclude') continue;
            $cat_ids[] = $cat->term_id;
        }
    }

    if (!empty($cat_ids)) :
        $related_args = [
            'post_type'      => 'post',
            'posts_per_page' => 6,
            'category__in'   => $cat_ids,
            'post__not_in'   => [$post->ID],
            'orderby'        => 'rand',
        ];
        $related_query = new WP_Query($related_args);

        if ($related_query->have_posts()) :
    ?>
            <section class="related-works">
                <div class="inner related-works__inner">

                    <div class="related-works__header" data-animate="fade-up">
                        <div class="related-works__line"></div>
                        <a href="<?php echo esc_url(home_url('/#works')); ?>" class="related-works__link">view more</a>

                        <div class="related-works__nav">
                            <button type="button" class="js-related-prev"><i class="la la-angle-left"></i></button>
                            <button type="button" class="js-related-next"><i class="la la-angle-right"></i></button>
                        </div>
                    </div>

                    <div class="swiper js-related-slider" data-animate="fade-up" data-delay="200">
                        <div class="swiper-wrapper">
                            <?php while ($related_query->have_posts()) : $related_query->the_post(); ?>
                                <article class="swiper-slide related-works__slide post">
                                    <a href="<?php the_permalink(); ?>">
                                        <div class="post__img">
                                            <?php if (has_post_thumbnail()) : ?>
                                                <?php the_post_thumbnail('large'); ?>
                                            <?php else : ?>
                                                <img src="<?php echo esc_url(get_theme_file_uri('/img/dummy.jpg')); ?>" alt="no-image">
                                            <?php endif; ?>
                                        </div>
                                        <h3 class="post__title"><?php the_title(); ?></h3>
                                    </a>
                                </article>
                            <?php endwhile; ?>
                        </div>
                    </div>

                </div>
            </section>
    <?php
        endif;
        wp_reset_postdata();
    endif;
    ?>
</main>

<?php get_footer(); ?>