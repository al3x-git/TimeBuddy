import { useNavigation } from '@react-navigation/core';
import React, { useEffect, Fragment } from 'react';
import {
	StyleSheet,
	Text,
	View,
	KeyboardAvoidingView,
	TextInput,
	TouchableOpacity,
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import LoginSVG from '../svg/LoginSVG';
import {
	getAuth,
	signInWithEmailAndPassword,
	sendPasswordResetEmail,
} from 'firebase/auth';
const auth = getAuth();

const formSchema = yup.object().shape({
	email: yup.string().email().required(),
	password: yup.string().required(),
});

const LoginScreen = () => {
	const navigation = useNavigation();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(formSchema),
	});

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('Dashboard');
			}
		});

		return unsubscribe;
	}, []);

	const onSubmit = async ({ email, password }) => {
		try {
			const userCredential = await signInWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			console.log('Logged in with:', user.email);
		} catch (error) {
			alert(error.message);
		}
	};

	const onChange = (arg) => {
		return {
			value: arg.nativeEvent.text,
		};
	};

	const onResetPassword = ({ email }) => {
		sendPasswordResetEmail(auth, email)
			.then(() => {
				alert(`a password reset email was sent to ${email}`);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding">
			<View style={styles.headerContainer}>
				<Text style={styles.loginText}>Welcome!</Text>
			</View>
			<View>
				<LoginSVG />
			</View>
			<View style={styles.inputContainer}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Fragment>
							<TextInput
								placeholder="Enter Email"
								style={styles.input}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
							{errors.email && (
								<Text style={styles.errorText}>{errors.email.message}</Text>
							)}
						</Fragment>
					)}
					name="email"
				/>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Fragment>
							<TextInput
								placeholder="Enter Password"
								style={styles.input}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
								secureTextEntry
							/>
							{errors.password && (
								<Text style={styles.errorText}>{errors.password.message}</Text>
							)}
						</Fragment>
					)}
					name="password"
				/>
				<TouchableOpacity
					onPress={handleSubmit(onResetPassword)}
					style={[styles.button, styles.buttonOutline]}
				>
					<Text style={styles.buttonOutlineText}>Forgot Password?</Text>
				</TouchableOpacity>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Login</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.footerButton}
					onPress={() => navigation.replace('Register')}
				>
					<Text style={styles.footerText}>You do not have an account?</Text>
					<Text style={styles.footerTextBold}>Sign Up</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default LoginScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		alignItems: 'center',
		width: '80%',
		marginBottom: 30,
	},
	loginText: {
		fontSize: 36,
		fontWeight: '800',
		lineHeight: 54,
		color:'rgba(0, 0, 0, 0.5)'
	},
	inputContainer: {
		width: '80%',
		marginTop: 30,
	},
	input: {
		backgroundColor: '#E7E9DD',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 100,
		marginTop: 16,
		textAlign:'center',
		fontSize:18,
		fontWeight:'800'
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 14,
	},
	button: {
		backgroundColor: '#5FD3EDA6',
		width: '100%',
		padding: 15,
		borderRadius: 10,
		alignItems: 'center',
	},
	buttonOutline: {
		backgroundColor: 'white',
		marginTop: 5,
		borderColor: 'rgba(95, 211, 237, 0.65)',
		borderWidth: 2,
		marginTop: 15,
	},
	buttonText: {
		color: 'white',
		fontSize: 16,
		fontWeight: '700',
	},
	buttonOutlineText: {
		color: 'rgba(95, 211, 237, 0.65)',
		fontSize: 16,
		fontWeight: '700',
	},
	footerButton: {
		flexDirection: 'row',
		justifyContent: 'center',
		backgroundColor: 'rgba(28, 226, 179, 0.12)',
		width: '100%',
		height: 50,
		marginTop: 19,
		alignItems: 'center',
	},
	footerText: {
		fontWeight: '400',
		marginRight: 5,
	},
	footerTextBold: {
		fontWeight: '800',
	},
	errorText: {
		fontSize: 9,
		fontWeight: '400',
		color: 'red',
		marginLeft: 15,
		textAlign:'center'
	},
});
