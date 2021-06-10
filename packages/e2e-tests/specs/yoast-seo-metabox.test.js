/**
 * WordPress e2e utilities
 */
import {
	trashAllPosts,
	createNewPost,
	visitAdminPage,
	pressKeyWithModifier,
	installPlugin,
	activatePlugin
} from "@wordpress/e2e-test-utils";

import { deleteExistingTaxonomies } from "../src/helpers/utils";
import { addQueryArgs } from '@wordpress/url';

describe( "Yoast SEO plugin metabox", () => {

	it( "shows correctly the Yoast SEO metabox should be present when editing a post", async () => {
		await trashAllPosts();
		await createNewPost();

		await page.waitForSelector( ".postbox.yoast.wpseo-metabox" );
		const yoastSeoPostMetabox = await page.$x(
			`//div[contains( @class, "wpseo-metabox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoPostMetabox.length ).toBe( 1 );
	} );

	it( "shows correctly the Yoast SEO metabox should be present when editing a page", async () => {
		await trashAllPosts( "page" );
   		await createNewPost( { postType: "page" } );

		await page.waitForSelector( ".postbox.yoast.wpseo-metabox" );
		const yoastSeoPostMetabox = await page.$x(
			`//div[contains( @class, "wpseo-metabox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoPostMetabox.length ).toBe( 1 );
	} );

	it( "shows correctly the Yoast SEO metabox should be present when editing a custom post", async () => {
		await trashAllPosts( "yoast_post_type" );
		await createNewPost( { postType: "yoast_post_type" } );

		await page.waitForSelector( ".postbox.yoast.wpseo-metabox" );
		const yoastSeoPostMetabox = await page.$x(
			`//div[contains( @class, "wpseo-metabox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoPostMetabox.length ).toBe( 1 );
	} );

	it( "shows correctly the Yoast SEO metabox should be present when editing a post category page", async () => {
		const postCategoryQuery = addQueryArgs( '', {
			taxonomy: 'category',
		} );
	
		await visitAdminPage( 'edit-tags.php', postCategoryQuery );
		await page.waitForSelector( '#the-list tr' );
	
		const [ uncategorizedLink ] = await page.$x(
			`//a[contains( @class, "row-title" )][contains( text(), "Uncategorized" )]`
		);
		await uncategorizedLink.click();
	
		await page.waitForSelector( ".postbox.yoast.wpseo-taxonomy-metabox-postbox" );
		const yoastSeoTaxonomyMetabox = await page.$x(
			`//div[contains( @class, "wpseo-taxonomy-metabox-postbox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoTaxonomyMetabox.length ).toBe( 1 );
	} );

	it( "shows correctly the Yoast SEO metabox should be present when editing a post tag page", async () => {
		const tagTitle = "New Tag";

		await deleteExistingTaxonomies( 'post_tag' );

		// Create a new post tag
		await page.waitForSelector( '#tag-name' );
		await page.focus( '#tag-name' );
		await pressKeyWithModifier( 'primary', 'a' );
		await page.type( '#tag-name', tagTitle );
		await page.click( '#submit' );

		// Go to the new created post tag page
		const [ newCreatedTag ] = await page.$x(
			`//a[contains( @class, "row-title" )][contains( text(), "${ tagTitle }" )]`
		);
		await newCreatedTag.click();
	
		await page.waitForSelector( ".postbox.yoast.wpseo-taxonomy-metabox-postbox" );
		const yoastSeoTaxonomyMetabox = await page.$x(
			`//div[contains( @class, "wpseo-taxonomy-metabox-postbox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoTaxonomyMetabox.length ).toBe( 1 );
	} );

	it( "shows correctly the Yoast SEO metabox should be present when editing a custom post taxonomy page", async () => {
		const taxonomyTitle = "New Taxonomy";

		await deleteExistingTaxonomies( 'yoast_simple_posts_taxonomy' );
	
		// Create a new post taxonomy
		await page.waitForSelector( '#tag-name' );
		await page.focus( '#tag-name' );
		await pressKeyWithModifier( 'primary', 'a' );
		await page.type( '#tag-name', taxonomyTitle );
		await page.click( '#submit' );
	
		// Go to the new created post taxonomy page
		const [ newCreatedTaxonomy ] = await page.$x(
			`//a[contains( @class, "row-title" )][contains( text(), "${ taxonomyTitle }" )]`
		);
		await newCreatedTaxonomy.click();
	
		await page.waitForSelector( ".postbox.yoast.wpseo-taxonomy-metabox-postbox" );
		const yoastSeoTaxonomyMetabox = await page.$x(
			`//div[contains( @class, "wpseo-taxonomy-metabox-postbox" )][contains( .//h2, "Yoast SEO" )]`
		);
		expect( yoastSeoTaxonomyMetabox.length ).toBe( 1 );
	} );

} );
