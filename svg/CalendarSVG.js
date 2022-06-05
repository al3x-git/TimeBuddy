import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function CalendarSVG(props) {
	return (
		<Svg
			width={28}
			height={31}
			viewBox="0 0 28 31"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<G filter="url(#filter0_i_61_25)">
				<Path
					d="M0 28.094A2.907 2.907 0 002.906 31H24.22a2.907 2.907 0 002.906-2.906V11.625H0v16.469zm19.375-11.867c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727h-2.421a.729.729 0 01-.727-.727v-2.421zm0 7.75c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727h-2.421a.729.729 0 01-.727-.727v-2.421zm-7.75-7.75c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727h-2.421a.729.729 0 01-.727-.727v-2.421zm0 7.75c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727h-2.421a.729.729 0 01-.727-.727v-2.421zm-7.75-7.75c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727H4.602a.729.729 0 01-.727-.727v-2.421zm0 7.75c0-.4.327-.727.727-.727h2.421c.4 0 .727.327.727.727v2.421c0 .4-.327.727-.727.727H4.602a.729.729 0 01-.727-.727v-2.421zM24.219 3.875h-2.907V.969A.972.972 0 0020.345 0h-1.938a.972.972 0 00-.968.969v2.906h-7.75V.969A.972.972 0 008.717 0H6.782a.972.972 0 00-.968.969v2.906H2.905A2.907 2.907 0 000 6.781v2.907h27.125V6.78a2.907 2.907 0 00-2.906-2.906z"
					fill="#33966C"
				/>
			</G>
			<Defs></Defs>
		</Svg>
	);
}

export default CalendarSVG;
