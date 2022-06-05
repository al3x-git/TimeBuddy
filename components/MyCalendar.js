import React, { useEffect, useState, useCallback, useMemo } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { getDocs, getFirestore, collection } from 'firebase/firestore';
import RenderDate from './RenderDate';
import DueTodos from './DueTodos';

//init service
const db = getFirestore();
const collectionRef = collection(db, 'todo');

const MyCalendar = () => {
	const [todos, setTodos] = useState([]);
	const [selected, setSelected] = useState();

	useEffect(() => {
		let isMounted = true;
		getDocs(collectionRef)
			.then((snapshot) => {
				let arr = [];
				snapshot.docs.forEach((doc) => arr.push({ id: doc.id, ...doc.data() }));
				if (isMounted) setTodos(arr);
			})
			.catch((e) => alert(e.message));
		return () => {
			isMounted = false;
		};
	}, [todos]);

	const handleDay = useCallback((day) => {
		setSelected(day.dateString);
	}, []);

	const marked = useMemo(() => {
		return {
			[selected]: {
				selected: true,
				disableTouchEvent: true,
				selectedColor: '#C4F566',
				selectedTextColor: '#000000',
			},
		};
	}, [selected]);

	const handleHeader = (date) => (
		<RenderDate style={styles.calendarHeaderText} date={date} />
	);

	return (
		<View style={styles.container}>
			<View style={styles.calendarContainer}>
				<Calendar
					style={styles.calendar}
					onDayPress={handleDay}
					markedDates={marked}
					//	hideArrows={true}
					//	renderArrow={(direction) => <Arrow />}
					hideExtraDays={true}
					onPressArrowLeft={(subtractMonth) => subtractMonth()}
					onPressArrowRight={(addMonth) => addMonth()}
					disableAllTouchEventsForDisabledDays={true}
					renderHeader={handleHeader}
					enableSwipeMonths={true}
					theme={{
						backgroundColor: '#6C63FF',
						calendarBackground: '#6C63FF',
						textSectionTitleColor: '#ffffff',
						todayTextColor: '#00adf5',
						dayTextColor: '#ffffff',
						arrowColor: '#ffffff',
						monthTextColor: '#ffffff',
						indicatorColor: '#C4F566',
						// textDayFontFamily: 'poppins',
						// textMonthFontFamily: 'poppins',
						// textDayHeaderFontFamily: 'poppins',
						textDayFontWeight: '600',
						textMonthFontWeight: '600',
						textDayHeaderFontWeight: '600',
						textDayFontSize: 12,
						textMonthFontSize: 12,
						textDayHeaderFontSize: 12,

						'stylesheet.calendar.main': {
							container: {
								paddingLeft: 5,
								paddingRight: 5,
								backgroundColor: '#6C63FF',
								height: 235,
								borderRadius: 31,
							},

							week: {
								marginVertical: 0,
								flexDirection: 'row',
								justifyContent: 'space-around',
								height: 28,
							},
						},
					}}
				/>
			</View>
			<View style={styles.dueTasksContainer}>
				{selected ? (
					todos
						.filter((todo) => {
							let d1 = new Date(todo.dueDate.toDate());
							let d2 = new Date(selected);

							return (
								todo.status !== 'done' &&
								d1.getFullYear() === d2.getFullYear() &&
								d1.getMonth() === d2.getMonth() &&
								d1.getDate() === d2.getDate()
							);
						})
						.map((todo, index, arr) => (
							<DueTodos
								key={todo.id}
								message={todo.message}
								index={index}
								length={arr.length}
							/>
						))
				) : (
					<Text style={{ alignSelf: 'center' }}>
						select a date to see assignments
					</Text>
				)}
			</View>
		</View>
	);
};

export default MyCalendar;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		width: '95%',
		alignItems: 'center',
	},
	calendarContainer: {
		width: '90%',
		height: 235,
	},
	calendar: {},
	calendarHeaderText: {
		color: 'white',
	},
	dueTasksContainer: {
		width: '90%',
		marginTop: 5,
	},
});
