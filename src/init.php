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
	// Register block styles for both frontend + backend.
	// wp_register_style(
	// 	'my_block-cgb-style-css', // Handle.
	// 	plugins_url( 'dist/blocks.style.build.css', dirname( __FILE__ ) ), // Block style CSS.
	// 	is_admin() ? array( 'wp-editor' ) : null, // Dependency to include the CSS after it.
	// 	null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.style.build.css' ) // Version: File modification time.
	// );

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

	// Register block editor styles for backend.
	// wp_register_style(
	// 	'my_block-cgb-block-editor-css', // Handle.
	// 	plugins_url( 'dist/blocks.editor.build.css', dirname( __FILE__ ) ), // Block editor CSS.
	// 	array( 'wp-edit-blocks' ), // Dependency to include the CSS after it.
	// 	null // filemtime( plugin_dir_path( __DIR__ ) . 'dist/blocks.editor.build.css' ) // Version: File modification time.
	// );

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

	register_block_type(
		'myblock/block-test',
		array(
			
			'editor_script' => 'my_block-cgb-block-js',
			// 'render_callback' => function( $attributes ){
			// 	ob_start();
			// 	var_dump($attributes);
			// 	return ob_get_clean();
			// }
		)
	);

	register_block_type(
		'myblock/block-blog',
		array(
			
			'editor_script' => 'my_block-cgb-block-js',
			'editor_style'  => 'my_block-cgb-block-editor-css',
			'style'         => 'my_block-cgb-style-css',

			// attributes: {
		 //        title: {
		 //            type: 'string',
		 //            source: 'text',
		 //            default: '',
		 //            selector: '.title',
		 //        },
		 //        position: {
		 //            type: 'string',
		 //            source: 'text',
		 //            default: '',
		 //            selector: '.position',
		 //        },
		 //        content: {
		 //            type: 'string',
		 //            source: 'text',
		 //            default: '',
		 //            selector: '.description',
		 //        },
		 //        icon: {
		 //            type: 'string',
		 //            attribute: 'src',
		 //            selector: '.number-icon',
		 //        }
		 //    },

			'attributes' => array(
				'title' => array(
					'type' => 'string'
				),
			),

			'render_callback' => function( $attributes ){
				$args = array(
					'posts_per_page' => ($attributes['postPerPage']) ? $attributes['postPerPage'] : '6',
					'oder' =>($attributes['order']) ? $attributes['order'] : 'none',
					'oder_by' =>($attributes['orderBy']) ? $attributes['orderBy'] : 'none',
					'post_type' => 'post',
				);
				ob_start();
				$enouvo_post = new WP_Query($args);
				if ($enouvo_post->have_posts()){ ?>
					<div class="enouvo-blog-grid">
						<div class="row">
						<?php while( $enouvo_post->have_posts() ){
							$enouvo_post->the_post();
							?>
							<div class="col-md-4">
								<?php if (has_post_thumbnail()){ ?>
								<div class="blog-thumbnail">
									<a href="<?php the_permalink(); ?>">
										<?php 
											the_thumbnail('full');
										?>
									</a>
								</div>
								<?php } ?>
								<div class="blog-footer">
									<h3 class="blog-title">
										<a href="<?php the_permalink(); ?>">
											<?php the_title(); ?>
										</a>
									</h3>
								</div>
							</div>
							<?php
						}
						wp_reset_postdata();
						?>
						</div>
					</div>
				<?php
				}else{
					echo 'post not found';
				}
				return ob_get_clean();
			}
		)
	);
}

// Hook: Block assets.
add_action( 'init', 'my_block_cgb_block_assets' );
