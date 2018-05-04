<?php
/**
 * Plugin Name: Wepress Lazy Load
 * Plugin URI: http://www.w3lab.com.br
 * Version: 2016.05.05
 * Author: Artus Rocha
 * Author URI: http://www.w3lab.com.br
 */

add_action( 'init', array('W3LAB_LAZYLOAD','init'), 0);

class W3LAB_LAZYLOAD {

  static private $class = null;

  public static function init() {
    if ( null === self::$class ) 
      self :: $class = new self;
    return self :: $class;
  }

  public function __construct() {
    add_action( 'init', array( $this, 'ob_start' ) );
  }


  public function head(){
    echo "\n"
       . '<!-- BEGIN W3LAB LAZYHEAD -->' . "\n"
       . '<style>img{transition: opacity 1s linear 0s;}img[data-lazy=set]{opacity:0;}</style>' . "\n"
       . '<script>'
       . file_get_contents( __DIR__ . '/w3lab-lazyload-min.js' )
       . '</script>'. "\n"
       . '<!-- END W3LAB LAZYHEAD -->' . "\n" ;
  }

  public function lazyload( $content ){
    $placeholder_image = plugin_dir_url( __FILE__ ) . '/pixel.png';
    $content = preg_replace( '#<img([^>]+?)src=[\'"]?([^\'"\s>]+)[\'"]?([^>]*)>#',
                 sprintf( '<img data-lazy="set"${1}src="%s" data-lazy-src="${2}"${3}><noscript><img${1}src="${2}"${3}></noscript>',
                   $placeholder_image ), $content );
    $content = preg_replace( '#<img data-lazy="set"([^>]+?)srcset=[\'"]?([^\'">]+)[\'"]?([^>]*)>#',
                             '<img data-lazy="set"${1}data-lazy-srcset="${2}"${3}>', $content );
    return $content;
  }

  function ob_start(){
    if ( is_user_logged_in() OR $_SERVER['REQUEST_METHOD'] == 'POST' )
      return;

    $request_uri = strtolower($_SERVER['REQUEST_URI']) ;
    if ( is_feed() OR preg_match( '/(xml)(feed)/', $preg_match) )
      return ;

    add_action( 'wp_head', array($this,'head') );
    ob_start( array($this,'lazyload') );
  }
}