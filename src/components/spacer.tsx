import {View} from 'react-native';
import React from 'react';

interface Props {
  height?: number;
  width?: number;
}

const Spacer = ({height, width}: Props) => {
  return <View style={{height: height, width: width}} />;
};

export default Spacer;
