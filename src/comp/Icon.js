import React from 'react';
import { Image, TouchableOpacity, Text, View } from 'react-native';
import Card from './Common/Card';
import CardSection from './Common/CardSection';

const Icon = (props) => {
//   return (
//       <TouchableOpacity onPress={props.onPress}>
//           <View>
//             <Card>
//                 <CardSection>
//
//                     <Text>{props.url}</Text>
//                 </CardSection>
//                 <CardSection>
//                       <Text style={Styles.textStyle}>{props.text} </Text>
//                 </CardSection>
//               </Card>
//           </View>
//       </TouchableOpacity>
//   );
// };
return (
        <Card style={{flex:1}}>
              <CardSection>
              <TouchableOpacity
              style={{

              }}
              onPress={props.onPress}>
              <Image
              style={{
                  width: 75,
                  height: 75,
                  backgroundColor:null,
                  justifyContent: 'center',
                  alignItems: 'center' }}
                  source={props.pic}  />
                  </TouchableOpacity>
              </CardSection>
              <CardSection>
                    <Text style={Styles.textStyle}>{props.url}</Text>
              </CardSection>
            </Card>
);
};

const Styles = {

	imageStyle: {
		resizeMode: 'stretch',
		height: 75,
		width: 75
	},
	textStyle: {
		fontSize: 18,
		fontWeight: '800',
    //BackgroundColor: null,
  //  backfaceVisibility: { false }
	}
};
//<Image style={Styles.imageStyle} source={props.url} >
export default Icon;
