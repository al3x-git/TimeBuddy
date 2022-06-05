import React, { useState } from 'react';
import {
	StyleSheet,
	TextInput,
	Text,
	TouchableOpacity,
	View,

} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import CalendarSVG from '../svg/CalendarSVG';
import { DateTimePickerAndroid } from '@react-native-community/datetimepicker';
import {
	addDoc,
	getFirestore,
	collection,
	serverTimestamp,
} from 'firebase/firestore';


//init service
const db = getFirestore();
const collectionRef = collection(db, 'todo');

const AddTodo = ({ closeForm }) => {
	const [todo, setTodo] = useState('');
	const [date, setDate] = useState(new Date());

	const onChange = (event, selectedDate) => {
		const currentDate = selectedDate;
		setDate(currentDate);
	};

	const showMode = (currentMode) => {
		DateTimePickerAndroid.open({
			value: date,
			onChange,
			mode: currentMode,
			is24Hour: true,
		});
	};

	const showDatepicker = () => {
		showMode('date');
	};

	const showTimepicker = () => {
		showMode('time');
	};

	const handleSubmit = () => {
		closeForm(false);
		addDoc(collectionRef, {
			dueDate: date,
			message: todo,
			status: 'pending',
			createdAt: serverTimestamp(),
		}).catch((e) => alert(e.message));
	};

	return (
	<View style={styles.container}>

			<View style={styles.inputContainer}>
				<TextInput
					style={styles.input}
					placeholder="Add Todo"
					value={todo}
					onChangeText={(text) => setTodo(text)}
					/>
				<View style={styles.inputIconContainer}>
					<TouchableOpacity style={styles.inputIcon} onPress={showDatepicker}>
						<CalendarSVG />
					</TouchableOpacity>
					<TouchableOpacity style={styles.inputIcon} onPress={showTimepicker}>
						<FontAwesome5 name="clock" size={30} color="black" />
					</TouchableOpacity>
				</View>
			</View>
			<TouchableOpacity onPress={handleSubmit} style={styles.addButton}>
				<Text>Add</Text>
			</TouchableOpacity>
	
					</View>
	);
};

export default AddTodo;

const styles = StyleSheet.create({
	container: {
		flexDirection: 'row',
		width: '100%',
		justifyContent: 'center',
		alignItems: 'center',
		marginBottom: 10,
	},
	inputContainer: {
		//backgroundColor: 'white',
		paddingHorizontal: 15,
		//paddingVertical: 10,
	//	borderRadius: 20,
	borderColor:'#5FD3EDA6',
	borderBottomWidth:2,
	
		width: '80%',
		height: 57,
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
	},
	input: {
		flex: 1,
		height: '100%',
	},
	inputIconContainer: {
		flexDirection: 'row',
		width:55,
	},
	inputIcon: {
		marginRight: 5,
	},
	addButton: {
		backgroundColor: '#5FD3EDA6',
		padding: 15,
		
		justifyContent: 'center',
		alignItems: 'center',
		width: '20%',
		height: 57,
	},
});
