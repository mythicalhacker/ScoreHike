
import React, { Component } from 'react';
import { View, ScrollView, ActivityIndicator, Text } from 'react-native';
import { Actions } from 'react-native-router-flux';
import firebase from 'firebase';
import Icon from './Icon';

class Home extends Component {

	state = { logged: null,
			  curGPA: 'Loading',
			  curStudy: 0,
              curSport: 0,
              curLiquor:0,
              curOuting: 0,
              curWorkshop: 0,
              userID: '',
              study: '',
              workshop: '',
              outing: '',
              sport: '',
              liquor: ''
					};
	componentWillMount() {
		firebase.initializeApp({
      apiKey: 'AIzaSyBH75fOq6LggpcrfXNOmT0bRTbG45CZStM',
     authDomain: 'scorehike.firebaseapp.com',
     databaseURL: 'https://scorehike.firebaseio.com',
     storageBucket: 'scorehike.appspot.com',
     messagingSenderId: '867124464424'
  });
	//firebase.auth().signOut();

		firebase.auth().onAuthStateChanged(user => {
		if (user) {
			this.setState({ logged: true });
			this.setState({ userID: user.uid});
			firebase.database().ref('/QnA/' + this.state.userID + '/').on('value',
					(snapshot) => {
							console.log(snapshot.val())
							this.setState({ curGPA: snapshot.val().curGPA,
											curStudy: snapshot.val().curStudy,
								            curSport: snapshot.val().curSport,
								            curLiquor: snapshot.val().curLiquor,
								            curOuting: snapshot.val().curOuting,
								            curWorkshop: snapshot.val().curWorkshop
											 })
					},
					(errorObject) => {
							console.log(errorObject);
					}
				);
			firebase.database().ref('/factor/').on('value',
					(snapshot) => {
							console.log(snapshot.val())
							this.setState({
														study: snapshot.val().study,
								            sport: snapshot.val().sport,
								            liquor: snapshot.val().liquor,
								            outing: snapshot.val().outing,
								            workshop: snapshot.val().workshop
											 })
					},
					(errorObject) => {
							console.log(errorObject);
					}
				);
		}	else {
			this.setState({ logged: false });
		}
		});

	}
	mainview() {
		return (
							<ScrollView>
									<View style={{ alignItems: 'center' }}>
									<Text style= {{marginTop:30, color: 'green', fontSize: 40 }}> {this.state.curGPA} </Text>
									</View>
									<View style={Styles.mainViewStyle}>
												<Icon onPress={ () => {
													firebase.database().ref('QnA/' + this.state.userID).update({
														curStudy: Math.round((this.state.curStudy+1)*100)/100,
														curGPA: Math.round((this.state.curGPA+this.state.study)*100)/100
													})
												}}
												pic={require('./../images/study.png')} url={this.state.curStudy} />
												<Icon onPress={ () => {
													firebase.database().ref('QnA/' + this.state.userID).update({
														curSport: Math.round((this.state.curSport+1)*100)/100,
														curGPA: Math.round((this.state.curGPA+this.state.sport)*100)/100
													})
												}}

											pic={require('./../images/sport.png')} 	url={this.state.curSport} />
												<Icon onPress={ () => {
													firebase.database().ref('QnA/' + this.state.userID).update({
														curWorkshop: Math.round((this.state.curWorkshop+1)*100)/100,
														curGPA: Math.round((this.state.curGPA+this.state.workshop)*100)/100
													})
												}}
												 pic={require('./../images/workshop.png')}  url={this.state.curWorkshop} />
												<Icon onPress={ () => {
													firebase.database().ref('QnA/' + this.state.userID).update({
														curLiquor: Math.round((this.state.curLiquor+1)*100)/100,
														curGPA: Math.round((this.state.curGPA+this.state.liquor)*100)/100
													})
												}}
											pic={require('./../images/liquor.png')} 	url={this.state.curLiquor} />
												<Icon onPress={ () => {
													firebase.database().ref('QnA/' + this.state.userID).update({
														curOuting: Math.round((this.state.curOuting+1)*100)/100,
														curGPA: Math.round((this.state.curGPA+this.state.outing)*100)/100
													})
												}}
									pic={require('./../images/outing.png')} url={this.state.curOuting} />
									</View>
								</ScrollView>
		);
	}
	renderer() {
		switch (this.state.logged) {
			case true:
				return (this.mainview());
			case false:
				Actions.registration();
				return (null);
			default:
				return (
					<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
						<ActivityIndicator size={'large'} />
					</View>);
		}
	}
	render() {
		return (
			this.renderer()
		);
	}
}

const Styles = {
	mainViewStyle: {
		flex:1,
		paddingTop: 10,
		paddingBottom: 100,
		paddingLeft: 2,
		paddingRight: 2,
		flexWrap: 'wrap',
		flexDirection: 'column',
		justifyContent: 'space-around',
		backgroundColor: '#f9f9f9'
	}
};
export default Home;
