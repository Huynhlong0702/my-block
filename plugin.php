<?php
/**
 * Plugin Name: Block Gtb
 * Plugin URI: 
 * Description: Đây là gì? Đây là Block, Block để làm gì, Block để thêm vào gutenberg.
 * Author: Huynh Long
 * Author URI: 
 * Version: 1.0.0
 *
 * @package CGB
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Block Initializer.
 */
require_once plugin_dir_path( __FILE__ ) . 'src/init.php';
