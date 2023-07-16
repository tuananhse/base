import {StackNavigationProp} from '@react-navigation/stack';
import {Button, Icon, Layout, Text} from '@ui-kitten/components';
import {useFormikContext} from 'formik';
import React, {useState} from 'react';
import {useTranslation} from 'react-i18next';
import {TouchableOpacity, TouchableWithoutFeedback} from 'react-native';
import Container from '../../components/Container';
import FormTextField from '../../components/FormTextField';
import {TabNavigatorParamsList} from '../../utils/appNavigation';
import styles from './styles';

export interface LoginFormType {
  phoneNumber: string;
  password: string;
}

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Login'>;
}

const LoginForm: React.FC<Props> = ({onPressForgot}) => {
  const {handleSubmit, values, errors} = useFormikContext();
  const {t} = useTranslation();
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const toggleSecureEntry = (): void => {
    setSecureTextEntry(!secureTextEntry);
  };

  const renderIcon = (props): React.ReactElement => (
    <TouchableWithoutFeedback onPress={toggleSecureEntry}>
      <Icon {...props} name={secureTextEntry ? 'eye-off' : 'eye'} />
    </TouchableWithoutFeedback>
  );
  return (
    <Container>
      <Layout style={{flex: 1, justifyContent: 'center'}}>
        <Layout style={styles.logoContainer}>
          <Text>{t('login_title')}</Text>
        </Layout>
        <Layout style={styles.formInput}>
          <FormTextField name="phoneNumber" label="Số điện thoại" />
          <FormTextField
            style={styles.mv2}
            name="password"
            label="Mật khẩu"
            accessoryRight={renderIcon}
            secureTextEntry={secureTextEntry}
          />
          <Layout style={{alignItems: 'flex-end'}}>
            <TouchableOpacity onPress={onPressForgot}>
              <Text>{t('login_forgot_password')}</Text>
            </TouchableOpacity>
          </Layout>
        </Layout>
        <Button onPress={handleSubmit}>{t('login_buton')}</Button>
      </Layout>
    </Container>
  );
};

export default LoginForm;
