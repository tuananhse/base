import {Layout, Text} from '@ui-kitten/components';
import React from 'react';
import {StackNavigationProp} from '@react-navigation/stack';

export interface Props {
  navigation: StackNavigationProp<TabNavigatorParamsList, 'Homepage'>;
}

const HomePage: React.FC<Props> = ({navigation}) => {
  return (
    <Layout>
      <Text>Home page</Text>
    </Layout>
  );
};

export default HomePage;
