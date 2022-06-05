import * as React from 'react';
import Svg, { G, Path, Defs } from 'react-native-svg';
/* SVGR has dropped some elements not supported by react-native-svg: filter */

function AddSVG(props) {
	return (
		<Svg
			width={33}
			height={32}
			viewBox="0 0 33 32"
			fill="none"
			xmlns="http://www.w3.org/2000/svg"
			{...props}
		>
			<G filter="url(#filter0_d_31_36)">
				<Path
					d="M16.11 0C9.42 0 4 5.203 4 11.625S9.42 23.25 16.11 23.25c6.689 0 12.109-5.203 12.109-11.625S22.799 0 16.109 0zm7.03 12.938c0 .309-.263.562-.585.562h-4.492v4.313c0 .309-.264.562-.586.562h-2.735a.576.576 0 01-.586-.563V13.5H9.664a.576.576 0 01-.586-.563v-2.624c0-.31.264-.563.586-.563h4.492V5.437c0-.309.264-.562.586-.562h2.735c.322 0 .585.253.585.563V9.75h4.493c.322 0 .586.253.586.563v2.624z"
					fill="#C4F566"
				/>
			</G>
			<Defs></Defs>
		</Svg>
	);
}

export default AddSVG;
