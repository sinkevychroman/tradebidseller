import {StyleSheet, Platform} from 'react-native';
import createStyles, {fonts, colors, dimensions} from '../../styles/base.js';

const styles = createStyles({
  body: {
    backgroundColor: 'white',
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 50,
  },
  vehicleNameText: {
    fontSize: 26,
    alignSelf: 'center',
    color: colors.text,
    fontWeight: 'bold',
    justifyContent: 'center',
    letterSpacing: 0.5,
    paddingBottom: 16,
    paddingHorizontal: 16,
    textAlign: 'center',
  },
  vehicleVinText: {
    fontSize: 16,
    alignSelf: 'center',
    textTransform: 'uppercase',
    color: '#000',
    fontWeight: 'normal',
    justifyContent: 'center',
    letterSpacing: 0.5,
    marginBottom: -5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  vehicleThumbnailUrl: {
    width: '100%',
    height: undefined,
    alignSelf: 'center',
    resizeMode: 'contain',
    aspectRatio: 16 / 9,
  },
  rowTextBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  rowTextBox2: {
    flexDirection: 'row',
    justifyContent: 'center',
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  rowTextBox3: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderColor: colors.border,
  },
  textBoxContent: {
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textBoxContent2: {
    borderLeftWidth: 1,
    borderBottomWidth: 1,
    borderColor: colors.border,
    height: 70,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleTextVehicle: {
    color: colors.text,
    letterSpacing: 2,
    fontSize: 14,
    marginBottom: 5,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  dividerBoxContent: {
    borderRightWidth: 1,
    borderColor: colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageLogo: {
    height: 40,
    width: 80,
    resizeMode: 'contain',
    marginLeft: 20,
    marginBottom: 10,
  },
  container: {
    width: dimensions.fullWidth,
    height: dimensions.fullHeight - 100, // offset iphone X
    alignContent: 'center',
    marginTop: Platform.OS === 'ios' ? 10 : 0,
    // marginBottom: Platform.OS === 'ios' ? 1000 : 0,
    justifyContent: 'center',
    backgroundColor: 'white',
    marginEnd: 200,
  },
});

export default styles;
