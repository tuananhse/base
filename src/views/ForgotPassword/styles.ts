import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { Colors } from '../../utils';
import commonStyles from '../../utils/commonStyles';
const WIDTH_DIMENSION = Dimensions.get('window').width;
const forgotStyle = StyleSheet.create({
  ...commonStyles,
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  body: {
    paddingTop: 30,
    flex: 1
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: Colors.error_red,
  },


});

export default forgotStyle;
