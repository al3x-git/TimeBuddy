import { initializeApp, getApps } from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
import Constants from 'expo-constants';

const apps = getApps();

const firebaseConfig = {
	apiKey: Constants.manifest?.extra?.firebaseApiKey,
	authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
	projectId: Constants.manifest?.extra?.firebaseProjectId,
	storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
	messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
	appId: Constants.manifest?.extra?.firebaseAppId,
};

let app;
//init app
if (!apps.length) {
	app = initializeApp(firebaseConfig);
} else {
	app = firebase.app();
}

export default app;
