import {TabNavigatorParamsList} from '../utils/appNavigation';

const url = {
  logout: 'auth/logout',
  login: 'login',
};

const screen: Record<string, keyof TabNavigatorParamsList> = {
  login: 'Login',
  forgot: 'ForgotPassword',
  verifyOtp: 'VerifyOTP',
  setting: 'Setting',
  profile: 'Profile',
  homeTab: 'HomeTab',
  homepage: 'HomePage',
};
export default {...url, screen};
