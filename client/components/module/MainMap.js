import React, {Component} from 'react'
import {CityMap} from '../mapCity'
import BarChart from '../chartBar'
import {LineChart} from '../chartLine'

// import NycMap from './NycMap' // map rendering using npm modules d3-geo and topojson-client
// import NycSimpleMap from './NycSimpleMap' // map rendering using npm module react-simple-maps

export default class MainMapContainer extends Component {
  componentDidMount() {}

  render = () => (
    <div className="main-map-container">
      <h1>Inside MainMap component</h1>
      <h1>CityMap component</h1>
      <CityMap />
      {/* <h1>NycMap component</h1>
      <NycMap /> */}
      {/* <h1>NycSimpleMap component</h1>
      <NycSimpleMap /> */}
      <h1>BarChart component</h1>
      <BarChart />
      <h1>LineChart component</h1>
      <LineChart />
    </div>
  )
}
