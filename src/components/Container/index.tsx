import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import commonStyles from '../../utils/commonStyles';
const Container = ({children}) => {
  return (
    <KeyboardAwareScrollView
      scrollEnabled={false}
      extraScrollHeight={80}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={commonStyles.contentContainerStyle}>
      {children}
    </KeyboardAwareScrollView>
  );
};

export default Container;
