<?php
/*
Template Name: CONTACT
*/
get_header();
?>
<main class="contact">
  <h1 class="contact__title">お問い合わせ</h1>
  <p class="contact__desc">どんなことでもかまいません。あなたの「こうしたい」をお聞かせください。</p>

  <form class="contact__form">
    <section class="form-section">
      <h2 class="form-section__title">1.基本情報</h2>
      <label>お名前（必須）<input type="text" name="name" required></label>
      <label>ふりがな（必須）<input type="text" name="furigana" required></label>
      <label>メールアドレス（必須）<input type="email" name="email" required></label>
      <label>お電話番号（必須）<input type="tel" name="tel" required></label>
    </section>

    <section class="form-section">
      <h2 class="form-section__title">2.ご相談内容</h2>
      <label>ご相談種別（必須）</label>
      <div class="form-section__radio">
        <label><input type="radio" name="type" value="new" required> 新築住宅設計</label>
        <label><input type="radio" name="type" value="store"> 店舗・施設設計</label>
        <label><input type="radio" name="type" value="renovation"> リノベーション</label>
        <label><input type="radio" name="type" value="other"> その他</label>
      </div>
      <label>ご相談内容（必須）<textarea name="message" rows="5" required></textarea></label>
    </section>

    <section class="form-section">
      <h2 class="form-section__title">3.ご希望条件</h2>
      <label>建設予定地（任意）<input type="text" name="zipcode"></label>
      <label>予算（任意）<input type="text" name="address"></label>
      <label>完成時期（任意）<input type="text" name="building"></label>
    </section>

    <section class="form-section">
      <h2 class="form-section__title">4.その他</h2>
      <label>当事務所を知ったきっかけ（任意）</label>
      <div class="form-section__radio">
        <label><input type="radio" name="how" value="instagram"> Instagram</label>
        <label><input type="radio" name="how" value="web"> Web検索</label>
        <label><input type="radio" name="how" value="intro"> 知人からの紹介</label>
        <label><input type="radio" name="how" value="magazine"> 雑誌</label>
        <label><input type="radio" name="how" value="other"> その他</label>
      </div>
    </section>

    <label class="form-section__checkbox">
      <input type="checkbox" name="agree" required> 個人情報の取り扱いに同意する。
    </label>

    <button type="submit" class="submit-button">送信する</button>
  </form>
</main>
<?php get_footer(); ?>