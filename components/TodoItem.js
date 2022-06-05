import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {
	Ionicons,
	Entypo,
	FontAwesome,
	FontAwesome5,
} from '@expo/vector-icons';
import RenderDate from './RenderDate';
import { updateDoc, getFirestore, doc, deleteDoc } from 'firebase/firestore';

//init service
const db = getFirestore();

const TodoItem = ({ todo }) => {
	const { id, message, dueDate, status } = todo;
	const documentRef = doc(db, 'todo', id);
	const handleDoing = () => {
		updateDoc(documentRef, {
			status: 'doing',
		}).catch((e) => alert(e.message));
	};
	const handleDone = () => {
		updateDoc(documentRef, {
			status: 'done',
		}).catch((e) => alert(e.message));
	};
	const handlePending = () => {
		updateDoc(documentRef, {
			status: 'pending',
		}).catch((e) => alert(e.message));
	};
	const handleDelete = () => {
		deleteDoc(documentRef).catch((e) => alert(e.message));
	};

	return (
		<View style={styles.container}>
			<View>
				<Text style={styles.message}>{message}</Text>
				<View style={styles.actionIconsContainer}>
					<TouchableOpacity disabled style={styles.actionIcon}>
						<Entypo name="attachment" size={18} color="black" />
						<Text style={styles.actionIconText}>1 file</Text>
					</TouchableOpacity>
					<TouchableOpacity disabled style={styles.actionIcon}>
						<FontAwesome name="comment" size={18} color="black" />
						<Text style={styles.actionIconText}>0</Text>
					</TouchableOpacity>

					{status === 'done' ? (
						<TouchableOpacity onPress={handleDelete} style={styles.actionIcon}>
							<FontAwesome name="trash" size={18} color="black" />
						</TouchableOpacity>
					) : (
						<TouchableOpacity disabled style={styles.actionIcon}>
							<FontAwesome5 name="clock" size={18} color="black" />
							<RenderDate
								date={dueDate}
								style={styles.actionIconText}
								type="day"
							/>
						</TouchableOpacity>
					)}
				</View>
			</View>
			{status !== 'done' && (
				<View style={styles.buttonContainer}>
					{status === 'doing' ? (
						<TouchableOpacity onPress={handlePending}>
							<Ionicons name="chevron-down-circle" size={18} color="black" />
						</TouchableOpacity>
					) : (
						<TouchableOpacity onPress={handleDoing}>
							<Ionicons name="md-chevron-back-circle" size={18} color="black" />
						</TouchableOpacity>
					)}

					<TouchableOpacity onPress={handleDone}>
						<Ionicons name="md-checkmark-circle" size={18} color="#C92244" />
					</TouchableOpacity>
				</View>
			)}
		</View>
	);
};

export default TodoItem;

const styles = StyleSheet.create({
	container: {
		height: 57,
		width: '100%',
		borderRadius: 20,
		backgroundColor: '#EAC8C8',
		paddingLeft: 24,
		paddingRight: 8,
		paddingTop: 8,
		paddingBottom: 2,
		flexDirection: 'row',
		justifyContent: 'space-between',
		marginBottom: 10,
	},
	message: {
		fontSize: 9,
		fontWeight: '400',
		lineHeight: 14,
	},
	buttonContainer: {
		width: 20,
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	actionIconsContainer: {
		flexDirection: 'row',
		width: 200,
		justifyContent: 'space-between',
		marginTop: 5,
	},
	actionIcon: {
		flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
	},
	actionIconText: {
		fontSize: 9,
		fontWeight: '400',
		marginLeft: 5,
	},
});
