import './firebase';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './screens/Dashboard';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import SplashScreen from './screens/SplashScreen';
import DoingScreen from './screens/DoingScreen';
import DoneScreen from './screens/DoneScreen';

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<NavigationContainer>
			<Stack.Navigator>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Splash"
					component={SplashScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Register"
					component={RegisterScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Login"
					component={LoginScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Dashboard"
					component={Dashboard}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Doing"
					component={DoingScreen}
				/>
				<Stack.Screen
					options={{ headerShown: false }}
					name="Done"
					component={DoneScreen}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
});
