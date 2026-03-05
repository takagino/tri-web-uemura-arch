<button id="back-to-top">
  <img src="<?php echo esc_url(get_theme_file_uri('/img/arrow.svg')); ?>" alt="PAGE TOP">
</button>

<footer class="footer">
  <div class="footer__inner">
    <ul class="footer__address">

      <?php if ($postal_code = get_field('basic-postcode', 'option')) : ?>
        <li class="footer__address-line">〒<?php echo esc_html($postal_code); ?></li>
      <?php endif; ?>

      <?php if ($address = get_field('basic-address', 'option')) : ?>
        <li class="footer__address-line"><?php echo esc_html($address); ?></li>
      <?php endif; ?>

      <?php if ($tel = get_field('basic-tel', 'option')) : ?>
        <li class="footer__address-line">
          <a href="tel:<?php echo esc_attr(str_replace('-', '', $tel)); ?>">tel：<?php echo esc_html($tel); ?></a>
        </li>
      <?php endif; ?>

      <?php if ($email = get_field('basic-mail', 'option')) : ?>
        <li class="footer__address-line">
          <a href="mailto:<?php echo antispambot($email); ?>">mail : <?php echo antispambot($email); ?></a>
        </li>
      <?php endif; ?>

    </ul>
    <?php if ($copyright = get_field('basic-copyright', 'option')) : ?>
      <div class="footer__right">
        <div class="footer__copy">
          <small class="footer__copy-text"><?php echo esc_html($copyright); ?></small>
        </div>
      </div>
    <?php endif; ?>
  </div>
</footer>

<?php wp_footer(); ?>
</body>

</html>