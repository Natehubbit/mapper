import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { MAPBOX_TOKEN } from './redux/container'
import Map,{NavigationControl, Marker, Popup} from 'react-map-gl';
import {SVGOverlay} from 'react-map-gl';
import data from './data/bart-station.json'


const viewportState = {
    width: 400,
    height: 400,
    latitude: 5.603700,
    longitude: -0.187000,
    zoom: 13,
    // minZoom:15,
    maxZoom:13,
}



function App() {

    const [ viewport, setViewport ] = useState(viewportState);
    const [radius, setRadius] = useState(500)

    function fetchHospitals(){
      fetch('https://maps.googleapis.com/maps/api/place/findplacefromtext/output?hospitals%20in%20accra')
      .then(res=>res.json())
      .then(data=>console.log(data))
    }

    const handleRadius = (view) => {
      let rad = view.viewState.zoom/13 * 500
      setRadius(rad)
    }

    function redraw({project}) {
      
      return data.map((loc,i)=>{
        const [cx, cy] = project([loc.coordinates[0],loc.coordinates[1]]);
        return <circle key={i} cx={cx} cy={cy} r={radius} fill="blue" fillOpacity='0.05' strokeWidth='3' stroke='blue' strokeOpacity='0.4' />
      })
    }

    function redrawPoint({project}) {
      return data.map((loc,i)=>{
        const [cx, cy] = project([loc.coordinates[0],loc.coordinates[1]]);
        return <circle key={i} cx={cx} cy={cy} r={5} fill="blue"/>
      })
    }

    function displayMarker(){
      return(
        <div>
          <SVGOverlay redraw={redraw}/>
          <SVGOverlay redraw={redrawPoint}/>
        </div>
      )
    }

    fetchHospitals()

  return (
    <Map
        width={'100vw'}
        height={'100vh'}
        mapStyle="mapbox://styles/natehubbit/cjp06l3t7f9gg2sl88tschgku"
        onViewStateChange={viewport=>{setViewport(viewport);handleRadius(viewport)}}
        mapboxApiAccessToken = {MAPBOX_TOKEN}
        { ...viewport }
    >
        <div style={{padding:'5px',position:'absolute'}}>
            <NavigationControl
                showZoom
            />
        </div>
        {displayMarker()}
    </Map>
  );
}

export default App;
