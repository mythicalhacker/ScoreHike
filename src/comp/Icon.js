import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Card from './Common/Card';
import CardSection from './Common/CardSection';

const Icon = (props) => {
  return (
      <TouchableOpacity onPress={props.onPress}>
          <View>
            <Card>
                <CardSection>
                    
                    <Text>{props.url}</Text>
                </CardSection>
                <CardSection>
                      <Text style={Styles.textStyle}>{props.text} </Text>
                </CardSection>
              </Card>
          </View>
      </TouchableOpacity>
  );
};

const Styles = {

	imageStyle: {
		resizeMode: 'stretch',
		height: 75,
		width: 75
	},
	textStyle: {
		fontSize: 13,
		fontWeight: '200'
	}
};
//<Image style={Styles.imageStyle} source={props.url} >
export default Icon;
