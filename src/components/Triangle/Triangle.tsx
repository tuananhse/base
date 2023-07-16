import React from 'react';
import { View, StyleSheet, StyleProp, ViewStyle, ColorValue } from 'react-native';
import colors from '../../utils/colors';

type TriangleProps = {
  pointerColor?: ColorValue;
  style?: StyleProp<ViewStyle>;
  isDown?: boolean;
};

const Triangle: React.FC<TriangleProps> = ({ style, pointerColor = colors.blue120, isDown }) => (
  <View
    testID="RNE__Tooltip_Triangle"
    style={StyleSheet.flatten([
      styles.triangle,
      {
        borderBottomColor: pointerColor,
      },
      style,
      isDown ? styles.down : {},
    ])}
  />
);

const styles = StyleSheet.create({
  down: {
    transform: [{ rotate: '180deg' }],
  },
  triangle: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 12,
    borderRightWidth: 12,
    borderBottomWidth: 15,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderBottomColor: 'white',
  },
});

export default React.memo(Triangle);
