import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Layout, Text} from '@ui-kitten/components';
import {useFormikContext} from 'formik';
import React from 'react';
import {useTranslation} from 'react-i18next';
import Container from '../../components/Container';
import FormTextField from '../../components/FormTextField';
import Header from '../../components/Header';
import {TabNavigatorParamsList} from '../../utils/appNavigation';
import styles from './styles';

export interface VerifyOtpType {
  otp: string;
}

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Login'>;
}

const VerifyOTPForm: React.FC<Props> = () => {
  const {handleChange, handleBlur, handleSubmit, values, errors} =
    useFormikContext();
  const {t} = useTranslation();

  return (
    <Container>
      <Header />
      <Layout style={styles.flex}>
        <Layout style={styles.body}>
          <Text style={styles.pt} category="h5">
            {t('verify_otp_title')}
          </Text>
          <Text style={styles.pv}>{t('verify_otp_des')}</Text>
          <FormTextField
            style={styles.mt2}
            name="opt"
            placeholder={t('verify_otp_placeholder')}
          />
        </Layout>

        <Button onPress={handleSubmit}>{t('button_text_confirm')}</Button>
      </Layout>
    </Container>
  );
};

export default VerifyOTPForm;
