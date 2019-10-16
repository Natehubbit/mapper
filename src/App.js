import React from 'react';
import logo from './logo.svg';
import './App.css';
import { MAPBOX_TOKEN } from './redux/container'
import Map,{NavigationControl, Marker, Popup} from 'react-map-gl';

function App() {
  return (
    <Map
        width={'100%'}
        height={'100%'}
        mapStyle="mapbox://styles/natehubbit/cjp06l3t7f9gg2sl88tschgku"
        {...this.props.mapState.viewport}
        onViewStateChange={viewport=>viewport}
        mapboxApiAccessToken = {MAPBOX_TOKEN}
    >

        


    </Map>
  );
}

export default App;
