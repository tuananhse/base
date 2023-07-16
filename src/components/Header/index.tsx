import {useNavigation} from '@react-navigation/native';
import {
  Icon,
  IconElement,
  Layout,
  TopNavigation,
  TopNavigationAction,
} from '@ui-kitten/components';
import React from 'react';
import {TouchableOpacity} from 'react-native-gesture-handler';
const BackIcon = (props): IconElement => <Icon {...props} name="arrow-back" />;

const Header = ({title = '', subtitle = '', rightComponent, leftComponent}) => {
  const navigation = useNavigation();

  const onPressGoback = () => {
    if (navigation.canGoBack()) {
      navigation?.goBack();
    }
  };

  const renderBackAction = () => (
    <TouchableOpacity onPress={() => onPressGoback()}>
      <TopNavigationAction icon={BackIcon} />
    </TouchableOpacity>
  );

  return (
    <Layout level="1">
      <TopNavigation
        alignment="center"
        title={title}
        subtitle={subtitle}
        accessoryLeft={renderBackAction}
        accessoryRight={rightComponent}
      />
    </Layout>
  );
};

export default Header;
