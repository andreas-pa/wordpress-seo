<?php

namespace Yoast\WP\SEO\Tests\Unit\Presenters\Admin;

use Brain\Monkey;
use Mockery;
use Yoast\WP\SEO\Presenters\Admin\Migration_Error_Presenter;
use Yoast\WP\SEO\Tests\Unit\TestCase;

/**
 * Class Migration_Error_Presenter_Test.
 *
 * @coversDefaultClass \Yoast\WP\SEO\Presenters\Admin\Migration_Error_Presenter
 *
 * @group presenters
 */
class Migration_Error_Presenter_Test extends TestCase {

	/**
	 * Tests the present method.
	 *
	 * @covers ::present
	 */
	public function test_present() {
		$this->stubEscapeFunctions();
		$this->stubTranslationFunctions();

		$migration_error = [ 'message' => 'test error' ];

		Monkey\Functions\expect( 'add_query_arg' )
			->andReturn( 'https://yoa.st/3-6' );

		$product_helper = Mockery::mock( \Yoast\WP\SEO\Helpers\Product_Helper::class );
		$product_helper->expects( 'is_premium' )->andReturn( false );
		$options_helper = Mockery::mock( \Yoast\WP\SEO\Helpers\Options_Helper::class );
		$options_helper->expects( 'get' )->with( 'first_activated_on', null )->andReturn( 0 );
		$helpers_mock = (object) [
			'product' => $product_helper,
			'options' => $options_helper,
		];
		Monkey\Functions\expect( 'YoastSEO' )->andReturn( (object) [ 'helpers' => $helpers_mock ] );

		$expected  = '<div class="notice notice-error">';
		$expected .= '<p>Yoast SEO had problems creating the database tables needed to speed up your site.</p>';
		$expected .= '<p>Please read <a href="https://yoa.st/3-6">this help article</a> to find out how to resolve this problem.</p>';
		$expected .= '<p>Your site will continue to work normally, but won\'t take full advantage of Yoast SEO.</p>';
		$expected .= '<details><summary>Show debug information</summary><p>test error</p></details>';
		$expected .= '</div>';

		$instance = new Migration_Error_Presenter( $migration_error );

		$this->assertSame( $expected, $instance->present() );
	}
}
