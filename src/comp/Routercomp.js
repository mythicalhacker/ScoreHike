import React from 'react';
import { Scene, Router } from 'react-native-router-flux';
import Home from './Home';
import Registration from './Registration/Registration';

const Routercomp = () => {
  return (
      <Router sceneStyle={{ paddingTop: 55 }} navigationBarStyle={{ backgroundColor: '#cc0000' }} titleStyle={{ color: '#FFF', fontWeight: 'bold' }} barButtonIconStyle={{ tintColor: '#FFF' }} backButtonTextStyle={{ color: '#f9f9f9' }}>
        <Scene key='home' component={Home} title='Home' initial />
        <Scene key='registration' component={Registration} hideBackImage title='Registration' panHandlers={null} />
      </Router>
  );
};

export default Routercomp;
