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

export interface ForgotFormType {
  userName: string;
}

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Login'>;
}

const ForgotForm: React.FC<Props> = () => {
  const {handleSubmit} = useFormikContext();
  const {t} = useTranslation();

  return (
    <Container>
      <Header />
      <Layout style={styles.flex}>
        <Layout style={styles.body}>
          <Text style={styles.pt} category="h5">
            {t('forgot_input_title')}
          </Text>
          <Text style={styles.pv}>{t('forgot_input_des')}</Text>
          <FormTextField
            style={styles.mt2}
            name="phoneNumber"
            placeholder={t('forgot_input_placeholder')}
          />
        </Layout>
        <Button onPress={handleSubmit}>{t('button_text_confirm')}</Button>
      </Layout>
    </Container>
  );
};

export default ForgotForm;
