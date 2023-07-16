import { Dimensions, StyleSheet } from 'react-native';
import colors from '../../utils/colors';
import { Colors } from '../../utils';
import commonStyles from '../../utils/commonStyles';
const WIDTH_DIMENSION = Dimensions.get('window').width;
const loginStyle = StyleSheet.create({
  ...commonStyles,
  container: {
    backgroundColor: colors.white,
    flex: 1,
    paddingHorizontal: 20,
  },
  safe: {
    flex: 1,
  },
  captionContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  captionIcon: {
    width: 10,
    height: 10,
    marginRight: 5,
  },
  captionText: {
    fontSize: 12,
    fontWeight: '400',
    fontFamily: 'opensans-regular',
    color: Colors.error_red,
  },
  labelStyles: {
    width: WIDTH_DIMENSION,
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  formInput: {
    flex: 1,
    flexDirection: 'column',
  },
  txtPassowrd: {
    paddingVertical: 10
  }
});

export default loginStyle;
