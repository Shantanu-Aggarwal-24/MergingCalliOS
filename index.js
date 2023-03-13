import { registerRootComponent } from 'expo';
import { RNTwilioPhone } from 'react-native-twilio-phone';
import App from './src/App';

RNTwilioPhone.handleBackgroundState();

// registerRootComponent calls AppRegistry.registerComponent('main', () => App);
// It also ensures that whether you load the app in Expo Go or in a native build,
// the environment is set up appropriately
registerRootComponent(App);
