import React from 'react';
import { Scene, Router, Actions } from 'react-native-router-flux';
import Home from './Home';
import Registration from './Registration/Registration';
import Logout from './Logout';
import Elite from './Elite';
const Routercomp = () => {
  return (
      <Router sceneStyle={{ paddingTop: 55 }} navigationBarStyle={{ backgroundColor: '#cc0000' }} titleStyle={{ color: '#FFF', fontWeight: 'bold' }} barButtonIconStyle={{ tintColor: '#FFF' }} backButtonTextStyle={{ color: '#f9f9f9' }}>
        <Scene key='home' component={Home} rightTitle='Logout' title='Home' initial onRight={()=>{Actions.logout()}} rightButtonTextStyle={{color:'#FFF'}}  />
        <Scene key='registration' component={Registration} hideBackImage title='Registration' panHandlers={null} />
        <Scene key='logout' component={Logout} />
        <Scene key='elite' component={Elite} title='Elite'/>
      </Router>
  );
};

export default Routercomp;
