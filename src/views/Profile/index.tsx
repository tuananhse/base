import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';
import Container from '../../components/Container';

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Homepage'>;
}

const ProfilePage: React.FC<Props> = ({navigation}) => {
  return (
    <Container>
      <Text>Profile page</Text>
    </Container>
  );
};

export default ProfilePage;
