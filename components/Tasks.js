import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import TodoItem from './TodoItem';

//init service
const db = getFirestore();
const collectionRef = collection(db, 'todo');

const Tasks = () => {
	const [todos, setTodos] = useState([]);

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
			{todos.map(
				(todo) =>
					todo.status === 'pending' && <TodoItem key={todo.id} todo={todo} />
			)}
		</View>
	);
};

export default Tasks;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '95%',
		alignItems: 'center',
	},
});
