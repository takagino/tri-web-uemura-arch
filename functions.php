<?php

/*--------------------------------------------
1. 初期設定とクリーンアップ
----------------------------------------------*/
function arc_theme_setup()
{
  // 基本サポート
  add_theme_support('title-tag');
  add_theme_support('post-thumbnails');
  add_theme_support('automatic-feed-links');
  add_theme_support('html5', array(
    'search-form',
    'comment-form',
    'comment-list',
    'gallery',
    'caption',
    'style',
    'script',
    'navigation-widgets',
  ));

  // メニューの登録
  add_theme_support('menus');
  register_nav_menus(array(
    'header' => 'Header Menu',
    'footer' => 'Footer Menu',
  ));

  // 不要なメタタグの削除（セキュリティ・パフォーマンス向上）
  remove_action('wp_head', 'wp_generator');
  remove_action('wp_head', 'rsd_link');
  remove_action('wp_head', 'wlwmanifest_link');
  remove_action('wp_head', 'index_rel_link');
}
add_action('after_setup_theme', 'arc_theme_setup');

// 絵文字機能・その他不要機能の削除
function arc_remove_extra_features()
{
  remove_action('wp_head', 'print_emoji_detection_script', 7);
  remove_action('admin_print_scripts', 'print_emoji_detection_script');
  remove_action('wp_print_styles', 'print_emoji_styles');
  remove_action('admin_print_styles', 'print_emoji_styles');
  remove_filter('the_content_feed', 'wp_staticize_emoji');
  remove_filter('comment_text_rss', 'wp_staticize_emoji');
  remove_filter('wp_mail', 'wp_staticize_emoji_for_email');

  // oEmbed関連の不要なタグを削除
  remove_action('wp_head', 'rest_output_link_wp_head');
  remove_action('wp_head', 'wp_oembed_add_discovery_links');
  remove_action('wp_head', 'wp_oembed_add_host_js');
  remove_action('template_redirect', 'rest_output_link_header', 11);
}
add_action('init', 'arc_remove_extra_features');


/*--------------------------------------------
2. CSS・JavaScriptの読み込み
----------------------------------------------*/
function arc_enqueue_scripts()
{
  // キャッシュバスティング（更新時の自動キャッシュクリア）を適用
  $css_path = filemtime(get_theme_file_path('/assets/css/style.css'));
  $js_path = filemtime(get_theme_file_path('/js/script.js'));

  // ファイルが存在する場合のみ更新日時を取得（Warning防止）
  $css_version = file_exists(get_theme_file_path($css_path))
    ? filemtime(get_theme_file_path($css_path))
    : '1.0.0';

  $js_version = file_exists(get_theme_file_path($js_path))
    ? filemtime(get_theme_file_path($js_path))
    : '1.0.0';

  // CSS
  wp_enqueue_style('reset', 'https://cdn.jsdelivr.net/npm/the-new-css-reset/css/reset.min.css');
  wp_enqueue_style('google-font', 'https://fonts.googleapis.com/css2?family=Zen+Kaku+Gothic+Antique:wght@300;400;500;700;900&display=swap');
  wp_enqueue_style('icon-font', 'https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css');
  wp_enqueue_style('arc-style', get_theme_file_uri('/assets/css/style.css'), array(), $css_version);

  wp_dequeue_style('wp-block-library');
  wp_dequeue_style('wp-block-library-theme');

  // JS
  wp_enqueue_script('arc-script', get_theme_file_uri('/js/script.js'), array('jquery'), $js_version, true);

  if (is_front_page()) {
    wp_enqueue_script('index-script', get_theme_file_uri('/js/index.js'), array('jquery'), $js_version, true);
    wp_enqueue_script('instagram-script', get_theme_file_uri('/js/instagram.js'), array('jquery'), $js_version, true);
  }
}
add_action('wp_enqueue_scripts', 'arc_enqueue_scripts');


/*--------------------------------------------
3. タイトル周りの最適化
----------------------------------------------*/
// セパレーターの変更
add_filter('document_title_separator', function ($sep) {
  return '|';
});

// キャッチフレーズの除去
add_filter('document_title_parts', function ($title) {
  if (isset($title['tagline'])) {
    unset($title['tagline']);
  }
  return $title;
});


/*--------------------------------------------
4. 管理画面・投稿タイプのカスタマイズ（クライアント向け配慮）
----------------------------------------------*/
// 「投稿」を「実績紹介」に変更
function arc_change_post_menu_label()
{
  global $menu;
  global $submenu;
  $menu[5][0] = '実績紹介';
  $submenu['edit.php'][5][0]  = '実績紹介一覧';
  $submenu['edit.php'][10][0] = '新規追加';
}
add_action('admin_menu', 'arc_change_post_menu_label');

function arc_change_post_object_label()
{
  global $wp_post_types;
  $labels = &$wp_post_types['post']->labels;
  $labels->name               = '実績紹介';
  $labels->singular_name      = '実績紹介';
  $labels->add_new            = '新規追加';
  $labels->add_new_item       = '実績紹介を追加';
  $labels->edit_item          = '実績紹介の編集';
  $labels->new_item           = '新規実績紹介';
  $labels->view_item          = '実績紹介を表示';
  $labels->search_items       = '実績紹介を検索';
  $labels->not_found          = '実績紹介が見つかりませんでした';
  $labels->not_found_in_trash = 'ゴミ箱に実績紹介は見つかりませんでした';
}
add_action('init', 'arc_change_post_object_label');

// 管理者以外はメニュー非表示
add_action('admin_menu', function () {
  if (! current_user_can('administrator')) {
    remove_menu_page('upload.php'); // メディア（必要に応じて残す）
    remove_menu_page('edit-comments.php');
    remove_menu_page('themes.php');
    remove_menu_page('plugins.php');
    remove_menu_page('users.php');
    remove_menu_page('tools.php');
    remove_menu_page('options-general.php');
    remove_menu_page('edit.php?post_type=acf-field-group');
  }
}, 999);

// 管理者以外は管理バー項目を非表示
add_action('admin_bar_menu', function ($wp_admin_bar) {
  if (! current_user_can('administrator')) {
    $wp_admin_bar->remove_menu('wp-logo');
    $wp_admin_bar->remove_menu('comments');
    $wp_admin_bar->remove_menu('updates');
  }
}, 999);

// ダッシュボードウィジェットの整理
add_action('wp_dashboard_setup', function () {
  if (! current_user_can('administrator')) {
    remove_meta_box('dashboard_site_health', 'dashboard', 'normal');
    remove_meta_box('dashboard_right_now', 'dashboard', 'normal');
    remove_meta_box('dashboard_activity', 'dashboard', 'normal');
    remove_meta_box('dashboard_quick_press', 'dashboard', 'side');
    remove_meta_box('dashboard_primary', 'dashboard', 'side');
    remove_action('welcome_panel', 'wp_welcome_panel');
  }
});

// 一覧画面の不要なカラムを削除
function arc_delete_columns($columns)
{
  unset($columns['author']);
  unset($columns['comments']);
  return $columns;
}
add_filter('manage_posts_columns', 'arc_delete_columns');
add_filter('manage_pages_columns', 'arc_delete_columns');

// 管理者以外はビジュアルエディタのタグを制限
add_filter('wp_editor_settings', function ($settings) {
  if (! current_user_can('administrator') && user_can_richedit()) {
    $settings['quicktags'] = false;
  }
  return $settings;
});


/*--------------------------------------------
5. ACF設定 & 外部API
----------------------------------------------*/
// ACFオプションページの追加
if (function_exists('acf_add_options_page')) {
  acf_add_options_page(array(
    'page_title' => 'サイトの基本情報設定',
    'menu_title' => '基本情報',
    'menu_slug'  => 'basic-information',
    'capability' => 'edit_posts',
    'redirect'   => false,
    'position'   => 30,
    'icon_url'   => 'dashicons-admin-home', // 建築サイト向けのアイコン
  ));
}

// Instagram API ルートの登録
add_action('rest_api_init', function () {
  register_rest_route('custom/v1', '/instagram', array(
    'methods'             => 'GET',
    'callback'            => 'arc_get_instagram_feed',
    'permission_callback' => '__return_true',
  ));
});

function arc_get_instagram_feed()
{
  $postCount  = 8;
  $token      = defined('INSTAGRAM_ACCESS_TOKEN') ? INSTAGRAM_ACCESS_TOKEN : '';
  $businessId = '';

  if (empty($token)) {
    return new WP_REST_Response(array('error' => 'Token not defined'), 500);
  }

  $query = array(
    'fields'       => 'media.limit(' . $postCount . '){media_type,media_url,caption,permalink,thumbnail_url}',
    'access_token' => $token,
  );

  $url = 'https://graph.facebook.com/v15.0/' . $businessId . '?' . http_build_query($query);
  $response = wp_remote_get($url);

  if (is_wp_error($response)) {
    return new WP_REST_Response(array('error' => 'Failed to fetch data'), 500);
  }

  return json_decode(wp_remote_retrieve_body($response));
}
