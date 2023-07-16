import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import url from '../../services/url';
import {TabNavigatorParamsList} from '../../utils/appNavigation';
import ForgotForm from './ForgotForm';
import styles from './styles';

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'ForgotPassword'>;
}

const ForgotPassword: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    userName: Yup.string().trim().required(t('login_password_username')),
  });

  const onPressVerify = (): void => {
    navigation.navigate(url.screen.verifyOtp);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          userName: '',
        }}
        onSubmit={onPressVerify}
        validationSchema={validationSchema}>
        <ForgotForm />
      </Formik>
    </SafeAreaView>
  );
};

export default ForgotPassword;
