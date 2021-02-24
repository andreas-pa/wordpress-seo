<?php

namespace Yoast\WP\SEO\Integrations\Front_End;

use Yoast\WP\SEO\Conditionals\Front_End_Conditional;
use Yoast\WP\SEO\Conditionals\WP_Robots_Conditional;
use Yoast\WP\SEO\Integrations\Integration_Interface;
use Yoast\WP\SEO\Memoizers\Meta_Tags_Context_Memoizer;
use Yoast\WP\SEO\Presenters\Robots_Presenter;

/**
 * Class WP_Robots_Integration
 *
 * @package Yoast\WP\SEO\Integrations\Front_End
 */
class WP_Robots_Integration implements Integration_Interface {

	/**
	 * The meta tags context memoizer.
	 *
	 * @var Meta_Tags_Context_Memoizer
	 */
	protected $context_memoizer;

	/**
	 * Sets the dependencies for this integration.
	 *
	 * @param Meta_Tags_Context_Memoizer $context_memoizer
	 */
	public function __construct( Meta_Tags_Context_Memoizer $context_memoizer ) {
		$this->context_memoizer = $context_memoizer;
	}

	/**
	 * Initializes the integration.
	 *
	 * This is the place to register hooks and filters.
	 *
	 * @return void
	 */
	public function register_hooks() {
		\add_filter( 'wp_robots', [ $this, 'add_robots' ], PHP_INT_MAX );
	}

	/**
	 * Returns the conditionals based on which this loadable should be active.
	 *
	 * @return array The conditionals.
	 */
	public static function get_conditionals() {
		return [
			Front_End_Conditional::class,
			WP_Robots_Conditional::class
		];
	}

	/**
	 * Adds our robots tag value to the WordPress robots tag output.
	 *
	 * @param array $robots The current robots data
	 *
	 * @return array The robots data.
	 */
	public function add_robots( $robots ) {
		if ( ! is_array( $robots ) ) {
			return $this->get_robots_value();
		}

		$merged_robots   = array_merge( $robots, $this->get_robots_value() );
		$filtered_robots = $this->filter_robots_no_index( $merged_robots );

		// Filter all falsy-null robot values.
		return array_filter( $filtered_robots );
	}

	/**
	 * Retrieves the robots presenter.
	 *
	 * @returns Robots_Presenter Instance of the robots presenter.
	 */
	protected function get_robots_value() {
		$context = $this->context_memoizer->for_current_page();

		$robots_presenter               = new Robots_Presenter();
		$robots_presenter->presentation = $context->presentation;

		return $this->format_robots( $robots_presenter->get() );
	}

	/**
	 * Formats our robots fields, to match the pattern WordPress is using.
	 *
	 * @param array $robots Our robots value.
	 *
	 * @return array The formatted robots.
	 */
	protected function format_robots( $robots ) {
		foreach ( $robots as $key => $value ) {
			// When the entry represents for example: max-image-preview:large.
			$colon_position = \strpos( $value, ':' );
			if ( $colon_position !== false ) {
				$robots[ $key ] = \substr( $value, $colon_position + 1 );

				continue;
			}

			// When index => noindex, we want a separate noindex as entry in array.
			if ( strpos( $value, 'no' ) === 0 ) {
				$robots[ $key ]   = false;
				$robots[ $value ] = true;

				continue;
			}

			// When the key is equal to the value, just make its value a boolean.
			if ( $key === $value ) {
				$robots[ $key ] = true;
			}
		}

		return $robots;
	}

	/**
	 * Filters robots value when page is set noindex.
	 *
	 * WordPress might add some robot values again.
	 * When the page is set to noindex we want to filter out these values.
	 *
	 * @param array $robots The robots.
	 *
	 * @return array The filtered robots.
	 */
	protected function filter_robots_no_index( $robots ) {
		if ( ! isset( $robots['noindex'] ) ) {
			return $robots;
		}

		$robots['imageindex']        = null;
		$robots['noimageindex']      = null;
		$robots['archive']           = null;
		$robots['noarchive']         = null;
		$robots['snippet']           = null;
		$robots['nosnippet']         = null;
		$robots['max-snippet']       = null;
		$robots['max-image-preview'] = null;
		$robots['max-video-preview'] = null;

		return $robots;
	}
}
