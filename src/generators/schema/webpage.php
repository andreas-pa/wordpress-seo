<?php

namespace Yoast\WP\SEO\Generators\Schema;

use WP_Post;

use const Yoast\WP\SEO\Constants\Schema\BREADCRUMB_HASH;
use const Yoast\WP\SEO\Constants\Schema\PRIMARY_IMAGE_HASH;
use const Yoast\WP\SEO\Constants\Schema\WEBPAGE_HASH;
use const Yoast\WP\SEO\Constants\Schema\WEBSITE_HASH;

/**
 * Returns schema WebPage data.
 */
class WebPage extends Abstract_Schema_Piece {

	/**
	 * Determines whether or not a piece should be added to the graph.
	 *
	 * @return bool
	 */
	public function is_needed() {
		return ! ( $this->context->indexable->object_type === 'system-page' && $this->context->indexable->object_sub_type === '404' );
	}

	/**
	 * Returns WebPage schema data.
	 *
	 * @return array WebPage schema data.
	 */
	public function generate() {
		$data = [
			'@type'      => $this->context->schema_page_type,
			'@id'        => $this->context->canonical . WEBPAGE_HASH,
			'url'        => $this->context->canonical,
			'name'       => $this->helpers->schema->html->smart_strip_tags( $this->context->title ),
			'isPartOf'   => [
				'@id' => $this->context->site_url . WEBSITE_HASH,
			],
		];

		if ( $this->helpers->current_page->is_front_page() ) {
			if ( $this->context->site_represents_reference ) {
				$data['about'] = $this->context->site_represents_reference;
			}
		}

		if ( $this->context->indexable->object_type === 'post' ) {
			$this->add_image( $data );

			$data['datePublished'] = $this->helpers->date->format( $this->context->post->post_date_gmt );
			$data['dateModified']  = $this->helpers->date->format( $this->context->post->post_modified_gmt );

			if ( $this->context->indexable->object_sub_type === 'post' ) {
				$data = $this->add_author( $data, $this->context->post );
			}
		}

		if ( ! empty( $this->context->description ) ) {
			$data['description'] = $this->helpers->schema->html->smart_strip_tags( $this->context->description );
		}

		if ( $this->add_breadcrumbs() ) {
			$data['breadcrumb'] = [
				'@id' => $this->context->canonical . BREADCRUMB_HASH,
			];
		}

		$data = $this->helpers->schema->language->add_piece_language( $data );
		$data = $this->add_potential_action( $data );

		return $data;
	}

	/**
	 * Adds an author property to the $data if the WebPage is not represented.
	 *
	 * @param array   $data The WebPage schema.
	 * @param WP_Post $post The post the context is representing.
	 *
	 * @return array The WebPage schema.
	 */
	public function add_author( $data, $post ) {
		if ( $this->context->site_represents === false ) {
			$data['author'] = [ '@id' => $this->helpers->schema->id->get_user_schema_id( $post->post_author, $this->context ) ];
		}

		return $data;
	}

	/**
	 * If we have an image, make it the primary image of the page.
	 *
	 * @param array $data WebPage schema data.
	 */
	public function add_image( &$data ) {
		if ( $this->context->has_image ) {
			$data['primaryImageOfPage'] = [ '@id' => $this->context->canonical . PRIMARY_IMAGE_HASH ];
		}
	}

	/**
	 * Determine if we should add a breadcrumb attribute.
	 *
	 * @return bool
	 */
	private function add_breadcrumbs() {
		if ( $this->context->indexable->object_type === 'home-page' || $this->helpers->current_page->is_home_static_page() ) {
			return false;
		}

		if ( $this->context->breadcrumbs_enabled ) {
			return true;
		}

		return false;
	}

	/**
	 * Adds the potential action property to the WebPage Schema piece.
	 *
	 * @param array $data The WebPage data.
	 *
	 * @return array $data The WebPage data with the potential action added.
	 */
	private function add_potential_action( $data ) {
		/**
		 * Filter: 'wpseo_schema_webpage_potential_action_target' - Allows filtering of the schema WebPage potentialAction target.
		 *
		 * @api array $targets The URLs for the WebPage potentialAction target.
		 */
		$targets = \apply_filters( 'wpseo_schema_webpage_potential_action_target', [ $this->context->canonical ] );

		$data['potentialAction'][] = [
			'@type'  => 'ReadAction',
			'target' => $targets,
		];

		return $data;
	}
}
