import {View, TouchableWithoutFeedback} from 'react-native';
import React, {useState} from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import {TabNavigatorParamsList} from '../../utils/appNavigation';
import {SafeAreaView} from 'react-native-safe-area-context';
import styles from './styles';
import {
  Text,
  Layout,
  Input,
  Icon,
  IconElement,
  Button,
} from '@ui-kitten/components';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {Formik} from 'formik';
import LoginForm, {LoginFormType} from './LoginForm';
import * as Yup from 'yup';
import {regex} from '../../utils';
import Constant from '../../utils/constants';
import {useTranslation} from 'react-i18next';
import url from '../../services/url';
import {useStore} from '../../stores';

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Login'>;
}

const Login: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();

  const {loginObservable} = useStore();

  const validationSchema = Yup.object().shape({
    phoneNumber: Yup.string().trim().required(t('login_password_username')),
    password: Yup.string()
      .required(t('login_password_require'))
      .min(
        Constant.PASSWORD_MIN_LENGTH,
        t('login_password_invalid', {
          min: Constant.PASSWORD_MIN_LENGTH,
          max: Constant.PASSWORD_MAX_LENGTH,
        }),
      ),
  });

  const onPressLogin = async (values: LoginFormType): Promise<void> => {
    loginObservable.login(values.phoneNumber, values.password);
  };

  const onPressForgot = (): void => {
    navigation.navigate(url.screen.forgot);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          phoneNumber: '0986741436',
          password: '123123123',
        }}
        onSubmit={onPressLogin}
        validationSchema={validationSchema}>
        <LoginForm onPressForgot={onPressForgot} />
      </Formik>
    </SafeAreaView>
  );
};

export default Login;
