import React, { Component } from 'react';
import { Alert, View, Text, Image, TouchableOpacity, ActivityIndicator, BackAndroid, ScrollView } from 'react-native';
import * as firebase from 'firebase';
import { Actions } from 'react-native-router-flux';
import Card from './Card';
import CardSection from './CardSection';
import Input from './Input';
import Button from './Button';
import Count from './Count';
import CountGPA from './CountGPA'

class Registration extends Component {

  state= {
          page: 0,
          signInEmail: '',
          signInPass: '',
          signInError: '',
          loading: null,
          hourStudy: 0,
          hourSport: 0,
          noOfLiquor: 0,
          noOfOuting: 0,
          noOfWorkshop: 0,
          lastSem: 0
         };

  // 0 mainpage
  // 1 firstpage
  // 2 secondpage
  // -1 sign in

  componentWillMount() {
    BackAndroid.addEventListener('hardwareBackPress', () => {
      if (this.state.page < 0) this.setState({ page: this.state.page + 1 });
      else if (this.state.page > 0) this.setState({ page: this.state.page - 1 });
      return true;
      }
    );
  }

  loader() {
    switch (this.state.loading) {
      case true:
        return (
          <ActivityIndicator size='small' />
          );
      case false:
        return (
          <Text style={{ color: '#cc0000' }}>{this.state.signInError}</Text>
          );
      default:
        return (null);

    }
  }
  signIn() {
      this.setState({ loading: true });
      console.log(this.state.signInEmail + this.state.signInPass);
      firebase.auth().signInWithEmailAndPassword(this.state.signInEmail, this.state.signInPass)
      .then(() => {
        this.setState({ loading: null });
        Actions.pop();
        }
      )
      .catch((error) => {
        this.setState({ loading: false });
        this.setState({ signInEmail: '', signInPass: '' });
        console.log(error.code);
        if (error.code === 'auth/invalid-email') this.setState({ signInError: 'Invalid email' });
        else if (error.code === 'auth/network-request-failed') this.setState({ signInError: 'Please Check Network' });
        else if (error.code === 'auth/user-not-found') this.setState({ signInError: 'This email is not registered' });
        else if (error.code === 'auth/wrong-password') this.setState({ signInError: 'Wrong Password' });
        else this.setState({ signInError: 'Authentication Failed, Try Again' });
      });
      }
      signUp() {
        this.setState({ page: -2 });
        firebase.auth().createUserWithEmailAndPassword(this.state.signInEmail, this.state.signInPass)
        .then(() => {
          let userId = firebase.auth().currentUser.uid;
          firebase.database().ref('QnA/' + userId).set({
            lastSem: this.state.lastSem,
            hourStudy: this.state.hourStudy,
            hourSport: this.state.hourSport,
            noOfLiquor: this.state.noOfLiquor,
            noOfOuting: this.state.noOfOuting,
            noOfWorkshop: this.state.noOfWorkshop,
            curGPA: this.state.lastSem,
            curStudy: 0,
            curSport: 0,
            curLiquor:0,
            curOuting: 0,
            curWorkshop: 0
          });
          Alert.alert(
            'Success',
             'Registration is Complete',
          );
          Actions.pop();
        }
        )
        .catch((error) => {
          this.setState({ page: 2 });
          Alert.alert(
            'Error While Registrating',
             error.code,
          );
  });
      }
  bottomButtons() {
    if (this.state.page === 2) return null;
    else if (this.state.page > 0) {
    return (
      <CardSection style={{ justifyContent: 'center' }}>
          <Button onPress={() => (this.setState({ page: this.state.page - 1 }))}> Prev </Button>
          <Button style={{ flex: 1 }} onPress={() => (this.setState({ page: this.state.page + 1 }))}> Next </Button>
      </CardSection>
    );
  }
  }

  mainpage() {
    return (
        <View style={Styles.mainViewStyle}>
          <View style={Styles.textViewStyle}>
              <Text style={Styles.textStyle}> SCORE HIKE </Text>
              <Image style={Styles.imageStyle} source={{ uri: 'https://www.toonpool.com/user/206/files/skyline_london_2068175.jpg' }} />
          </View>
            <View style={Styles.viewStyle}>
              <Button onPress={() => this.setState({ page: 1 })}>
                  New User ? Register
              </Button>
              <Button onPress={() => this.setState({ page: -1 })}>
                  Returning User ? Log In Here
              </Button>
              <TouchableOpacity style={{alignItems:'center' }}onPress={()=>{Actions.elite()}}>
                <Text style={{margin:10, color:'#cc0000'}}>
                  Have an accees token?
                </Text>
              </TouchableOpacity>
          </View>
        </View>
      );
  }
  signinpage() {
    return (
      <View style={Styles.mainViewStyle}>
        <View style={Styles.textViewStyle}>
            <Text style={Styles.textStyle}> SCORE HIKE </Text>
            <Image style={Styles.imageStyle} source={{ uri: 'https://www.toonpool.com/user/206/files/skyline_london_2068175.jpg' }} />
        </View>

          <View style={Styles.viewStyle}>
            <Card>
              <CardSection>
                  <Input
                    label='Email'
                    placeholder='Enter Registered email'
                    value={this.state.signInEmail}
                    onChangeText={signInEmail => this.setState({ signInEmail })}
                  />
              </CardSection>
              <CardSection>
                  <Input
                  secureTextEntry
                  label='Password'
                  placeholder='Enter Correct Password'
                  value={this.state.signInPass}
                  onChangeText={signInPass => (this.setState({ signInPass }))}
                  />
              </CardSection>
              <CardSection style={{ justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {this.loader()}
              <Button onPress={this.signIn.bind(this)}>
                  Sign In
              </Button>
              </CardSection>
            </Card>
          </View>
      </View>
    );
  }
  firstpage() {
    return (
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>

        <Card>
        <CardSection>
        <Text style={{ color: '#cc0000', fontSize: 10 }}> * </Text>
          <Input
          label='Email'
          placeholder="Enter valid email"
          value={this.state.signInEmail}
          onChangeText={signInEmail => this.setState({ signInEmail })}
          />
          </CardSection>
          <CardSection>
          <Text style={{ color: '#cc0000', fontSize: 10 }}> * </Text>
          <Input
          secureTextEntry
          label='Password'
          placeholder='Choose a Password'
          value={this.state.signInPass}
          onChangeText={signInPass => (this.setState({ signInPass }))}
          />
        </CardSection>
        <CardSection style={{ justifyContent: 'center' }}>
          <Text> <Text style={{ color: '#cc0000', fontSize: 10 }}> * </Text>   Mandatory Fields </Text>
        </CardSection>
        </Card>
      </View>
    );
  }
  secondpage() {
    return (
      <ScrollView>
        <Card>
          <CardSection style={{ flexDirection: 'column' }}>
          <Text
           style={{
            fontSize: 16,
            paddingLeft: 20,
            color: '#cc0000'
          }}
          >
              What is your last semester GPA?
           </Text>
          <CountGPA
              onValueChange={lastSem => (this.setState({ lastSem }))}
              selectedValue={this.state.lastSem}
          />
          </CardSection>
        </Card>
        <Card>
        <CardSection style={{ flexDirection: 'column' }}>

                  <Text
                   style={{
                    fontSize: 16,
                    paddingLeft: 20,
                    color: '#cc0000'
                  }}
                  >
                      How many hours did you used to study every day?
                   </Text>
                  <Count
                      onValueChange={hourStudy => (this.setState({ hourStudy }))}
                      selectedValue={this.state.hourStudy}
                  />
          </CardSection>
          </Card>
          <Card>
          <CardSection style={{ flexDirection: 'column' }}>

                    <Text
                     style={{
                      fontSize: 16,
                      paddingLeft: 20,
                      color: '#cc0000'
                    }}
                    >
                        How many hours did you play an outdoor sport every day?
                     </Text>
                    <Count
                        onValueChange={hourSport => (this.setState({ hourSport }))}
                        selectedValue={this.state.hourSport}
                    />
            </CardSection>
            </Card>
            <Card>
            <CardSection style={{ flexDirection: 'column' }}>

                      <Text
                       style={{
                        fontSize: 16,
                        paddingLeft: 20,
                        color: '#cc0000'
                      }}
                      >
                          How many workshops you attended in last semester?
                       </Text>
                      <Count
                          onValueChange={noOfWorkshop => (this.setState({ noOfWorkshop }))}
                          selectedValue={this.state.noOfWorkshop}
                      />
              </CardSection>
              </Card>
              <Card>
              <CardSection style={{ flexDirection: 'column' }}>

                        <Text
                         style={{
                          fontSize: 16,
                          paddingLeft: 20,
                          color: '#cc0000'
                        }}
                        >
                            How many times do you consume liquor in a week?
                         </Text>
                        <Count
                            onValueChange={noOfLiquor => (this.setState({ noOfLiquor }))}
                            selectedValue={this.state.noOfLiquor}
                        />
                </CardSection>
                </Card>
                <Card>
                <CardSection style={{ flexDirection: 'column' }}>

                          <Text
                           style={{
                            fontSize: 16,
                            paddingLeft: 20,
                            color: '#cc0000'
                          }}
                          >
                              How many outings you used to have every month?
                           </Text>
                          <Count
                              onValueChange={noOfOuting => (this.setState({ noOfOuting }))}
                              selectedValue={this.state.noOfOuting}
                          />
                  </CardSection>
                  </Card>
                  <Card>
              <CardSection style={{ flexDirection: 'column' }}>
                <Button onPress={this.signUp.bind(this)}>
                Sign Up
                </Button>
              </CardSection>

    </Card>
      </ScrollView>
    );
  }
  renderer() {
    switch (this.state.page) {
      case -2:
        return (<View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} />
        </View>);
      case -1:
        return (this.signinpage());
      case 0:
        return (this.mainpage());
      case 1:
        return (this.firstpage());
      case 2:
          return (this.secondpage());
      default:
        return (<Text> Error </Text>);

    }
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
          {this.renderer()}
          {this.bottomButtons()}
      </View>

    );
  }
}

const Styles = {

  textViewStyle: {
    flex: 2,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  viewStyle: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  mainViewStyle: {
    flex: 1,
    backgroundColor: '#fff'
  },
  imageStyle: {
    width: 300,
    height: 200,
    resizeMode: 'stretch'
  },
  textStyle: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#cc0000'
  }
};

export default Registration;
