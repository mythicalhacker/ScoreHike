import React,{Component} from 'react';
import {Text} from 'react-native';
import firebase from 'firebase'
class Logout extends Component{
  componentWillMount(){
    firebase.auth().signOut();
  }
  render(){
    return(<Text> Sexy </Text>);
  }
}

export default Logout;
