import {Dimensions} from 'react-native';
import {
  widthPercentageToDP,
  heightPercentageToDP,
} from 'react-native-responsive-screen';

export const WP = (percentage: string | number) =>
  widthPercentageToDP(percentage);
export const HP = (percentage: string | number) =>
  heightPercentageToDP(percentage);
const {width: mobileWidth, height: mobileHeight} = Dimensions.get('window');

export {mobileHeight, mobileWidth};
