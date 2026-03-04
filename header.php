<!DOCTYPE html>
<html <?php language_attributes(); ?>>

<head>
  <meta charset="<?php bloginfo('charset'); ?>">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <?php wp_head(); ?>
</head>

<body <?php body_class(); ?>>
  <header class="header">
    <div class="header__inner">
      <h1 class="header__title">
        <a href="<?php echo esc_url(home_url('/')); ?>">
          <img src="<?php echo esc_url(get_theme_file_uri('/img/logomobile.webp')); ?>" alt="植村康平建築設計事務所">
        </a>
      </h1>

      <button type="button" class="hamburger" id="js-hamburger" aria-controls="js-menu" aria-expanded="false" aria-label="メニューを開く">
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
        <span class="hamburger__line"></span>
      </button>

      <nav class="overlay" id="js-menu" aria-hidden="true">
        <div class="overlay__inner">
          <ul class="overlay__list">
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/')); ?>">top</a></li>
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/')); ?>#works">works</a></li>
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/company/')); ?>">company</a></li>
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/members/')); ?>">members</a></li>
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/process/')); ?>">process</a></li>
            <li class="overlay__item"><a href="<?php echo esc_url(home_url('/contact/')); ?>">contact</a></li>
          </ul>
          <div class="overlay__sns">

          </div>
        </div>
      </nav>
    </div>
  </header>