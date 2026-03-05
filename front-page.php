<?php get_header(); ?>
<main>
    <section class="hero">
        <div class="swiper js-hero-slider">
            <div class="swiper-wrapper">
                <?php
                $args = [
                    'post_type'      => 'post',
                    'posts_per_page' => 5,
                    'category_name'  => 'pickup',
                ];
                $hero_query = new WP_Query($args);

                if ($hero_query->have_posts()) :
                    while ($hero_query->have_posts()) : $hero_query->the_post();
                ?>
                        <div class="swiper-slide hero__slide">
                            <div class="hero__image">
                                <?php if (has_post_thumbnail()) : ?>
                                    <?php the_post_thumbnail('full'); ?>
                                <?php else : ?>
                                    <img src="<?php echo esc_url(get_theme_file_uri('/img/dummy.jpg')); ?>" alt="no-image">
                                <?php endif; ?>
                            </div>

                            <div class="hero__content">
                                <p class="hero__tips" data-animate>works</p>
                                <h2 class="hero__title" data-animate><?php the_title(); ?></h2>

                                <p class="hero__category" data-animate>
                                    <?php
                                    $categories = get_the_category();
                                    if ($categories) {
                                        foreach ($categories as $category) {
                                            if ($category->slug === 'pickup') continue;
                                            echo '<span>' . esc_html($category->name) . '</span> ';
                                        }
                                    }
                                    ?>
                                </p>

                                <div class="hero__link-wrap" data-animate>
                                    <a href="<?php the_permalink(); ?>" class="hero__link">view more</a>
                                </div>
                            </div>
                        </div>
                <?php
                    endwhile;
                    wp_reset_postdata();
                endif;
                ?>
            </div>

            <div class="hero__controls">
                <span class="hero__current">01</span>
                <div class="hero__bar">
                    <span class="hero__bar-inner js-hero-progress"></span>
                </div>
                <button type="button" class="hero__next js-hero-next">
                    <span class="hero__next-num">0<?php echo esc_html($hero_query->post_count); ?></span>
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

    <?php
    $concept_title = get_field('concept-title');
    $concept_text  = get_field('concept-text');

    if ($concept_title || $concept_text) :
    ?>
        <section class="concept">
            <div class="concept__inner">
                <?php if ($concept_title) : ?>
                    <h2 class="concept__title" data-animate="fade-up"><?php echo esc_html($concept_title); ?></h2>
                <?php endif; ?>

                <?php if ($concept_text) : ?>
                    <div class="concept__text" data-animate="fade-up">
                        <?php echo wp_kses_post($concept_text); ?>
                    </div>
                <?php endif; ?>
            </div>
        </section>
    <?php endif; ?>

    <section id="works" class="works">
        <div class="works__inner">
            <div class="works__title-group" data-animate="fade-up">
                <h2 class="works__title">works</h2>
                <div class="works__all">
                    <button type="button" class="works__tag-link works__tag-current" data-cat-id="0">all</button>
                </div>
            </div>

            <div class="works__tag" data-animate="fade-up">
                <?php
                $exclude_slugs = ['exclude', 'pickup'];
                $exclude_ids   = array_reduce($exclude_slugs, function ($carry, $slug) {
                    $cat = get_category_by_slug($slug);
                    if ($cat) $carry[] = $cat->term_id;
                    return $carry;
                }, []);

                $parent_categories = get_categories([
                    'parent'     => 0,
                    'hide_empty' => false,
                    'exclude'    => $exclude_ids,
                ]);

                foreach ($parent_categories as $parent_cat) :
                    $child_categories = get_categories([
                        'parent'     => $parent_cat->term_id,
                        'hide_empty' => false,
                        'exclude'    => $exclude_ids,
                    ]);

                    if (!empty($child_categories)) :
                ?>
                        <div class="works__tag-group">
                            <span class="works__tag-label"><?php echo esc_html($parent_cat->name); ?></span>
                            <div class="works__tag-items">
                                <?php foreach ($child_categories as $child_cat) : ?>
                                    <button type="button" class="works__tag-link" data-cat-id="<?php echo esc_attr($child_cat->term_id); ?>">
                                        <?php echo esc_html($child_cat->name); ?>
                                    </button>
                                <?php endforeach; ?>
                            </div>
                        </div>
                <?php
                    endif;
                endforeach;
                ?>
            </div>

            <div id="js-works-container">
                <?php arc_get_works_html(0, 1); ?>
            </div>
        </div>
    </section>
</main>
<?php get_footer(); ?>