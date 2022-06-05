import { Text } from 'react-native';
import React from 'react';

const RenderDate = ({ style, date, type }) => {
	const month = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const myDate = new Date(date.toDate());

	if (type === 'day') {
		return (
			<Text style={style}>{`${
				month[myDate.getMonth()]
			} ${myDate.getDate()}`}</Text>
		);
	}
	return (
		<Text style={style}>{`${
			month[myDate.getMonth()]
		} ${myDate.getFullYear()}`}</Text>
	);
};

export default RenderDate;
