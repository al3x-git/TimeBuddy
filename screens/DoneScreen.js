import React, { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/core';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { getDocs, getFirestore, collection } from 'firebase/firestore';
import HomeSVG from '../svg/HomeSVG';
import TodoItem from '../components/TodoItem';

//init service
const db = getFirestore();
const collectionRef = collection(db, 'todo');

const DoneScreen = () => {
	const [todos, setTodos] = useState([]);
	const navigation = useNavigation();

	const handleLogout = async () => {
		try {
			await signOut(auth);
			navigation.replace('Login');
		} catch (error) {
			alert(error.message);
		}
	};

	useEffect(() => {
		let isMounted = true;
		getDocs(collectionRef)
			.then((snapshot) => {
				let arr = [];
				snapshot.docs.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
				arr.sort((x, y) => x.createdAt - y.createdAt).reverse();
				if (isMounted) setTodos(arr);
			})
			.catch((e) => alert(e.message));
		return () => {
			isMounted = false;
		};
	}, [todos]);

	return (
		<View style={styles.container}>
			<View style={styles.nav}>
				<TouchableOpacity
					style={styles.homeIconContainer}
					onPress={() => navigation.replace('Dashboard')}
				>
					<HomeSVG />
				</TouchableOpacity>
				<View style={styles.navTextContainer}>
					<Text style={styles.navText}>Done</Text>
				</View>
			</View>
			<View style={styles.todoContainer}>
				{todos.map(
					(todo) =>
						todo.status === 'done' && <TodoItem key={todo.id} todo={todo} />
				)}
			</View>
			<View style={styles.logOutContainer}>
				<TouchableOpacity onPress={handleLogout} style={styles.logOutButton}>
					<Text style={styles.logOutButtonText}>Log Out</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
};
export default DoneScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		alignItems: 'center',
	},
	homeIconContainer: {
		backgroundColor: '#EAC8C8',
		width: 52,
		height: 35,
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: 100,
	},
	nav: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		width: '90%',
		justifyContent: 'space-between',
		marginTop: 50,
		marginBottom: 30,
	},
	navTextContainer: {
		backgroundColor: '#EAC8C8',
		borderRadius: 14,
		height: 31,
		width: 68,
		justifyContent: 'center',
		alignItems: 'center',
	},
	navText: {
		fontWeight: '800',
		fontSize: 18,
	},
	logOutContainer: {
		position: 'absolute',
		width: '100%',
		flexDirection: 'row',
		justifyContent: 'center',
		bottom: '3%',
	},
	logOutButton: {
		backgroundColor: '#EAC8C8',
		borderRadius: 20,
		width: 72,
		height: 20,
		justifyContent: 'center',
		alignItems: 'center',
	},
	logOutButtonText: {
		fontWeight: '400',
		fontSize: 13,
		color: '#33966C',
	},
	todoContainer: {
		width: '90%',
	},
});
