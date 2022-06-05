import { useNavigation } from '@react-navigation/core';
import React, { Fragment, useEffect } from 'react';
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
import { LinearGradient } from "expo-linear-gradient";
import MaskedView from "@react-native-masked-view/masked-view";
import {
	getAuth,
	createUserWithEmailAndPassword,
	updateProfile,
} from 'firebase/auth';

const auth = getAuth();

const formSchema = yup.object().shape({
	name: yup.string().min(2).required(),
	email: yup.string().email().required(),
	password: yup.string().min(8).max(32).required(),
	confirmPassword: yup
		.string()
		.required()
		.oneOf([yup.ref('password')], 'Passwords do not match'),
});

const RegisterScreen = () => {
	const navigation = useNavigation();
	const {
		handleSubmit,
		control,
		formState: { errors },
	} = useForm({
		mode: 'onTouched',
		resolver: yupResolver(formSchema),
	});

	const onSubmit = async ({ name, email, password }) => {
		try {
			const userCredential = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);

			const user = userCredential.user;
			console.log('Registered with:', user.email);
			return updateProfile(auth.currentUser, {
				displayName: name,
			});
		} catch (error) {
			alert(error.message);
		}
	};

	const onChange = (arg) => {
		return {
			value: arg.nativeEvent.text,
		};
	};

	useEffect(() => {
		const unsubscribe = auth.onAuthStateChanged((user) => {
			if (user) {
				navigation.replace('Dashboard');
			}
		});

		return unsubscribe;
	}, []);

	return (
		<KeyboardAvoidingView style={styles.container} behaviour="padding">
			<View style={styles.headerContainer}>
				<Text style={styles.registerText}>Welcome to</Text>
				<MaskedView
        style={{
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
        maskElement={<Text style={styles.timebuddy}>TimeBuddy</Text>}
      >
			   <LinearGradient
          colors={["#C4F566", "rgba(0, 0, 0, 0.3)"]}
          style={{ height: 45, width: 170 }}
        />
      </MaskedView>
			</View>
			<View style={styles.inputContainer}>
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Fragment>
							<TextInput
								placeholder="Enter Your Name"
								style={styles.input}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
							/>
							{errors.name && (
								<Text style={styles.errorText}>{errors.name.message}</Text>
							)}
						</Fragment>
					)}
					name="name"
				/>

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
				<Controller
					control={control}
					render={({ field: { onChange, onBlur, value } }) => (
						<Fragment>
							<TextInput
								placeholder="Confirm Password"
								style={styles.input}
								onBlur={onBlur}
								onChangeText={(value) => onChange(value)}
								value={value}
								secureTextEntry
							/>
							{errors.confirmPassword && (
								<Text style={styles.errorText}>
									{errors.confirmPassword.message}
								</Text>
							)}
						</Fragment>
					)}
					name="confirmPassword"
				/>
			</View>
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					onPress={handleSubmit(onSubmit)}
					style={styles.button}
				>
					<Text style={styles.buttonText}>Register</Text>
				</TouchableOpacity>
				<TouchableOpacity
					style={styles.footerButton}
					onPress={() => navigation.replace('Login')}
				>
					<Text style={styles.footerText}>Already have an account?</Text>
					<Text style={styles.footerTextBold}>Sign In</Text>
				</TouchableOpacity>
			</View>
		</KeyboardAvoidingView>
	);
};

export default RegisterScreen;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	headerContainer: {
		alignItems: 'center',
		width: '80%',
	},
	registerText: {
		fontWeight: '800',
		fontSize: 24,
		color:'rgba(0, 0, 0, 0.3)'
	},
	timebuddy: {
		fontWeight: '800',
		fontSize: 32,
		lineHeight: 48,
	},
	inputContainer: {
		width: '80%',
		marginTop: 25,
		height: 270,
		justifyContent: 'space-between',
	},
	input: {
		backgroundColor: '#E7E9DD',
		paddingHorizontal: 15,
		paddingVertical: 10,
		borderRadius: 100,
		marginTop: 10,
		textAlign:'center',
		fontSize:18,
		fontWeight:'800'
	},
	buttonContainer: {
		width: '80%',
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: 50,
	},
	button: {
		backgroundColor: 'rgba(95, 211, 237, 0.65)',
		width: '100%',
		height: 61,
		borderRadius: 5,
		alignItems: 'center',
		justifyContent: 'center',
	},
	buttonText: {
		color: 'black',
		fontSize: 30,
		fontWeight: '800',
		lineHeight: 45,
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
