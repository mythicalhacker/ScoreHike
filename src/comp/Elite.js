import React,{Component} from 'react';
import {Text, View, ScrollView, Alert} from 'react-native';
import firebase from 'firebase';
import Input from './Registration/Input';
import Card from './Common/Card';
import Count from './Registration/Count';
import CountGPA from './Registration/CountGPA';
import Button from './Registration/Button';
import CardSection from './Common/CardSection';
import {Actions} from 'react-native-router-flux'; 
class Elite extends Component{
  state={
    hourStudy: 0,
  hourSport: 0,
  noOfLiquor: 0,
  noOfOuting: 0,
  noOfWorkshop: 0,
  lastSem: 0,
  token:''
};
  componentWillMount(){

  }
  signUp(){
    firebase.database().ref('elite').push().set({
      lastSem: this.state.lastSem,
      hourStudy: this.state.hourStudy,
      hourSport: this.state.hourSport,
      noOfLiquor: this.state.noOfLiquor,
      noOfOuting: this.state.noOfOuting,
      noOfWorkshop: this.state.noOfWorkshop,
      curGPA: this.state.lastSem
    }).then(()=>{
      Alert.alert(
        'Thanks, You Elite person',
         'Love u Loads',
         [
             { text: 'OK' }
           ]
      );
      Actions.registration();
    }).catch((error)=>{
      Alert.alert(
        'Error',
         error.message,
         [
             { text: 'OK' }
           ]
      );
    });
  }
  getToken(){
    return(
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
      <Input
        label='ENTER TOKEN'
        placeholder='Enter the TOKEN'
        value={this.state.token}
        keyboardType='numeric'
        onChangeText={token => this.setState({ token })}
      />

      </View>
    );
  }
  form(){
    return(
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
                Submit
                </Button>
              </CardSection>

    </Card>
      </ScrollView>
    );
  }
  renderer(){
   switch (this.state.token) {
     case '123456':
       return(this.form());
     default:
       return(this.getToken());
   }
  }
  render(){
    return(
        this.renderer()
    );
  }
}

export default Elite;
