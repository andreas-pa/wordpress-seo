// External dependencies.
import PropTypes from "prop-types";
import { __, sprintf } from "@wordpress/i18n";
import { useCallback, useState, useMemo, useEffect } from "@wordpress/element";
import { useDispatch } from "@wordpress/data";
// Internal dependencies.
import { Button, ProgressBar } from "@yoast/components";

/**
 * The WorkoutCard component
 *
 * @param {Object} props The props object.
 *
 * @returns {WPElement} The WorkoutCard component
 */
export default function WorkoutCard( {
	title,
	subtitle,
	usps,
	image,
	steps,
	finishableSteps,
	finishedSteps,
	upsell,
	workout,
	badges,
} ) {
	const { openWorkout, toggleWorkout } = useDispatch( "yoast-seo/workouts" );

	const [ isUpsellOpen, setUpsellOpen ] = useState( false );
	const [ isToggle, setToggle ] = useState( false );

	const closeUpsell = useCallback( () => setUpsellOpen( false ), [] );
	const openUpsell = useCallback( () => setUpsellOpen( true ), [] );

	useEffect( () => {
		if ( finishedSteps.length === finishableSteps.length ) {
			setToggle( true );
		}
	}, [ finishedSteps, finishableSteps ] );

	const buttonText = useMemo( () => {
		if ( finishedSteps.length === 0 ) {
			return __( "Start workout!", "wordpress-seo" );
		} else if ( finishedSteps.length < finishableSteps.length ) {
			return __( "Continue workout!", "wordpress-seo" );
		}
		return __( "Do workout again", "wordpress-seo" );
	},
	  [ finishedSteps, finishableSteps ]
	);

	const onClick = useCallback(
		() => {
			if ( workout ) {
				openWorkout( workout );
				if ( isToggle ) {
					toggleWorkout( workout );
				}
			} else {
				openUpsell();
			}
		},
		[ workout, isToggle, openWorkout, toggleWorkout ]
	);

	return <div className={ "card card-small" }>
		<h2>{ title } { badges }</h2>
		<h3>{ subtitle }</h3>
		<ul>
			{
				usps.map( ( usp, index ) => <li key={ `${ title }-${ index }` }>{ usp }</li> )
			}
		</ul>
		<img src={ image } alt="" />
		<span>
			<Button onClick={ onClick }>{ buttonText }</Button>
			<ProgressBar
				id={ `${title}-workout-progress` }
				max={ finishableSteps.length }
				value={ finishedSteps.length }
			/>
			<label htmlFor={ `${title}-workout-progress` }><em>
				{
					sprintf(
						// translators: %1$s: number of finished steps, %2$s: number of finishable steps
						__(
							"%1$s/%2$s steps completed",
							"wordpress-seo"
						),
						finishedSteps.length,
						finishableSteps.length
					)
				}
			</em></label>
		</span>
		{ isUpsellOpen && upsell( closeUpsell ) }
	</div>;
}

WorkoutCard.propTypes = {
	title: PropTypes.string.isRequired,
	subtitle: PropTypes.string.isRequired,
	usps: PropTypes.arrayOf( PropTypes.string ).isRequired,
	finishableSteps: PropTypes.arrayOf( PropTypes.string ).isRequired,
	finishedSteps: PropTypes.arrayOf( PropTypes.string ).isRequired,
	image: PropTypes.string,
	steps: PropTypes.arrayOf( PropTypes.string ),
	upsell: PropTypes.func,
	workout: PropTypes.element,
	badges: PropTypes.arrayOf( PropTypes.element ),
};

WorkoutCard.defaultProps = {
	image: null,
	upsell: null,
	workout: null,
	badges: [],
	steps: [],
};
