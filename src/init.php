<?php
// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Enqueue Gutenberg block assets for both frontend + backend.
 * 1. blocks.style.build.css - Frontend + Backend.
 * 2. blocks.build.js - Backend.
 * 3. blocks.editor.build.css - Backend.
 */
function my_block_cgb_block_assets() { // phpcs:ignore

	// Register block editor script for backend.
	wp_register_script(
		'my_block-cgb-block-js', // Handle.
		plugins_url( '/dist/blocks.build.js', dirname( __FILE__ ) ), // Block.build.js: We register the block here. Built with Webpack.
		array( 
			'wp-blocks', 
			'wp-i18n', 
			'wp-element', 
			'wp-editor', 
			'wp-components'
		), // Dependencies, defined above.
		null, // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.build.js' ), // Version: filemtime — Gets file modification time.
		true // Enqueue the script in the footer.
	);

	// WP Localized globals. Use dynamic PHP stuff in JavaScript via `cgbGlobal` object.
	wp_localize_script(
		'my_block-cgb-block-js',
		'cgbGlobal',
		[
			'pluginDirPath' => plugin_dir_path( __DIR__ ),
			'pluginDirUrl'  => plugin_dir_url( __DIR__ ),
		]
	);


	register_block_type(
		'myblock/block-heading',
		array(
			'editor_script' => 'my_block-cgb-block-js',
		)
	);

	register_block_type(
		'myblock/block-service',
		array(
			'editor_script' => 'my_block-cgb-block-js',
			
		)
	);

	register_block_type(
		'myblock/block-review',
		array(
			'editor_script' => 'my_block-cgb-block-js',
			
		)
	);	

	register_block_type(
		'myblock/block-featured',
		array(
			'editor_script' => 'my_block-cgb-block-js',
			
		)
	);
}
// Hook: Block assets.
add_action( 'init', 'my_block_cgb_block_assets' );
