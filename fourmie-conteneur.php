<?php
/**
 * Plugin Name:       Fourmie Conteneur
 * Description:       Conteneur est un block de contenu pouvant être positionné au sein d'un segement - la fourmi-e -.
 * Requires at least: 5.8
 * Requires PHP:      7.0
 * Version:           0.2.0
 * Author:            The WordPress Contributors
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       fourmie-conteneur
 *
 * @package           create-block
 */

/**
 * Registers the block using the metadata loaded from the `block.json` file.
 * Behind the scenes, it registers also all assets so they can be enqueued
 * through the block editor in the corresponding context.
 *
 * @see https://developer.wordpress.org/block-editor/tutorials/block-tutorial/writing-your-first-block-type/
 */
function create_block_fourmie_conteneur_block_init() {
	register_block_type( __DIR__ );
}
add_action( 'init', 'create_block_fourmie_conteneur_block_init' );
