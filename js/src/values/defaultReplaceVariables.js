import { __ } from "@wordpress/i18n";

// This const was created to populate the redux store with the default replace variables, while keeping the reducer clean.
const defaultReplaceVariables = [
	{
		name: "currentdate",
		label: __( "Current date", "wordpress-seo" ),
		value: "",
	},
	{
		name: "currentday",
		label: __( "Current day", "wordpress-seo" ),
		value: "",
	},
	{
		name: "currentmonth",
		label: __( "Current month", "wordpress-seo" ),
		value: "",
	},
	{
		name: "currenttime",
		label: __( "Current time", "wordpress-seo" ),
		value: "",
	},
	{
		name: "currentyear",
		label: __( "Current year", "wordpress-seo" ),
		value: "",
	},
	{
		name: "date",
		label: __( "Date", "wordpress-seo" ),
		value: "",
	},
	{
		name: "id",
		label: __( "Post ID", "wordpress-seo" ),
		value: "",
	},
	{
		name: "page",
		label: __( "Page number", "wordpress-seo" ),
		value: "",
	},
	{
		name: "searchphrase",
		label: __( "Search phrase", "wordpress-seo" ),
		value: "",
	},
	{
		name: "sitedesc",
		label: __( "Tagline", "wordpress-seo" ),
		value: "",
	},
	{
		name: "sitename",
		label: __( "Site title", "wordpress-seo" ),
		value: "",
	},
	{
		name: "category",
		label: __( "Category", "wordpress-seo" ),
		value: "",
	},
	{
		name: "focuskw",
		label: __( "Keyword", "wordpress-seo" ),
		value: "",
	},
	{
		name: "title",
		label: __( "Page title", "wordpress-seo" ),
		value: "",
	},
	{
		name: "parent_title",
		label: __( "Parent title", "wordpress-seo" ),
		value: "",
	},
	{
		name: "excerpt",
		label: __( "Excerpt", "wordpress-seo" ),
		value: "",
	},
	{
		name: "primary_category",
		label: __( "Primary category", "wordpress-seo" ),
		value: "",
	},
	{
		name: "sep",
		label: __( "Separator", "wordpress-seo" ),
		value: "",
	},
	{
		name: "excerpt_only",
		label: __( "Excerpt only", "wordpress-seo" ),
		value: "",
	},
	{
		name: "category_description",
		label: __( "Category description", "wordpress-seo" ),
		value: "",
	},
	{
		name: "tag_description",
		label: __( "Tag description", "wordpress-seo" ),
		value: "",
	},
	{
		name: "term_description",
		label: __( "Term description", "wordpress-seo" ),
		value: "",
	},
];

export default defaultReplaceVariables;
