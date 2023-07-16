import {StackActions} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';
import {Formik} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import {SafeAreaView} from 'react-native-safe-area-context';
import * as Yup from 'yup';
import url from '../../services/url';
import {TabNavigatorParamsList} from '../../utils/appNavigation';
import VerifyOTPForm, {VerifyOtpType} from './VerifyOTPForm';
import styles from './styles';

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Login'>;
}

const VerifyOTP: React.FC<Props> = ({navigation}) => {
  const {t} = useTranslation();
  const validationSchema = Yup.object().shape({
    userName: Yup.string().trim().required(t('login_password_username')),
  });

  const onSubmit = async (values: VerifyOtpType): Promise<void> => {
    navigation.dispatch(StackActions.replace(url.screen.login));
  };

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        initialValues={{
          opt: '',
        }}
        onSubmit={onSubmit}
        // validationSchema={validationSchema}
      >
        <VerifyOTPForm />
      </Formik>
    </SafeAreaView>
  );
};

export default VerifyOTP;
