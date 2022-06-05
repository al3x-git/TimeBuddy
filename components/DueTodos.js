import { StyleSheet, Text, View } from 'react-native';
import React from 'react';

const DueTodos = ({ index, length, message }) => {
	return (
		<View style={styles.container}>
			<View style={styles.counter}>
				<Text style={styles.counterText}>{`${index + 1}/${length}`}</Text>
			</View>
			<View style={styles.bodyContainer}>
				<Text style={styles.bodyText}>{message}</Text>
			</View>
		</View>
	);
};

export default DueTodos;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '70%',
		backgroundColor: '#EAC8C8',
		borderRadius: 100,
		marginBottom: 5,
	},
	counter: {
		backgroundColor: '#C4F566',
		height: 27,
		width: 30,
		borderRadius: 100,
		justifyContent: 'center',
		alignItems: 'center',
	},
	counterText: {
		fontWeight: '600',
		fontSize: 12,
	},
	bodyContainer: {
		height: 27,
		alignItems: 'flex-end',
		justifyContent: 'center',
		width: '80%',
	},
	bodyText: {
		fontWeight: '400',
		fontSize: 10,
	},
});
