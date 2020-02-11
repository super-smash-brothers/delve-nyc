import React, {useState, useEffect, Fragment} from 'react'
import * as d3 from 'd3'
import {default as singleNeighborhood} from '../../public/sandbox/single.json'
import {default as allNeighborhoods} from '../../public/sandbox/NTA.json'
import {MapNeighborhood} from './mapNeighborhood'
import axios from 'axios'
import BarChart from './chartBar'
import {GraphContainer} from './containerGraphElements'
import {scaleLinear} from 'd3'
import CuisinesBarChart from './module/CuisinesBarChart'

//put a single neighborhood's coordinates in a json to use
// console.log('d3', d3)
export function CityMap(props) {
  const {filter} = props
  console.log('hows the filter?', filter)
  const [data, setMap] = useState({})
  const [foodScores, setFoodScores] = useState({})
  const [noiseComplaints, setNoiseComplaints] = useState({})
  const [neighborhoodPopulation, setCityPopulation] = useState({})
  const [crime, setCrime] = useState({})
  const [barData, setBarData] = useState({})
  useEffect(() => {
    async function fetchCrime() {
      const crimeData = await axios.get(
        'https://data.cityofnewyork.us/resource/uip8-fykc.json'
      )
      setCrime(crimeData.data)
    }
    async function fetchData() {
      const calledNeighborhood = await axios.get('/api/neighborhoods')
      setMap(calledNeighborhood.data)
    }
    async function fetchFoodScoreData() {
      const foodScoreData = await axios.get('/api/neighborhoods/foodscore')
      const averagFoodScores = foodScoreData.data.map(d => {
        d.passed = d.total / d.count
        d.nta_code = d._id
        return d
      })
      setFoodScores(averagFoodScores)
    }
    async function fetchNoiseData() {
      let data311 = await axios.get(
        'https://data.cityofnewyork.us/resource/erm2-nwe9.json'
      )
      const noiseData = data311.data.filter(d =>
        d.complaint_type.includes('Noise')
      )
      setNoiseComplaints(noiseData)
    }
    async function fetchPopulationData() {
      const rawPopData = await axios.get(
        'https://data.cityofnewyork.us/resource/swpk-hqdp.json'
      )
      const recentPopData = rawPopData.data.filter(p => p.year === '2010')
      const popWithPassed = recentPopData.map(d => {
        d.passed = d.population
        return d
      })
      setCityPopulation(popWithPassed)
    }
    fetchData()
    fetchFoodScoreData()
    fetchNoiseData()
    fetchPopulationData()
    fetchCrime()
  }, [])

  // console.log('noise data:', noiseComplaints)
  // console.log('food score data: ', foodScores)
  // console.log('neighborhood data: ', data)
  // console.log('pop data: ', neighborhoodPopulation)
  const height = Math.max(
    document.documentElement.clientHeight,
    window.innerHeight || 0
  )
  const width = height * 1.32465263323
  // console.log('bar data: ', barData)
  // The lines below are how we found our range of food grades, so that they could be used to set the domain and range of color values.
  // We decided to hard code the numbers to save time, since the numbers are static
  // let allAverages
  // if (Object.keys(foodScores).length) {
  //   allAverages = foodScores.map(element => element.total/element.count)
  //   const averagesHighLow = d3.extent(allAverages, l => l)
  //   console.log('our averages: ', averagesHighLow)
  //   console.log('all averages: ', allAverages.sort())
  // }
  const xScale = d3
    .scaleLinear()
    .domain([-74.2555928790719, -73.7000104153247])
    .range([0, width])

  const popExtent = d3.extent(neighborhoodPopulation, l => l.population)
  // console.log('pop extent: ', popExtent)

  const yScale = d3
    .scaleLinear()
    .domain([40.4961236003829, 40.9155410761847])
    .range([height, 0])

  const foodColorScale = d3
    .scaleLinear()
    .domain([13.119565217391305, 25.468926553672315])
    .range(['black', 'white'])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  const popColorScale = d3
    .scaleLinear()
    .domain(popExtent)
    .range(['white', 'purple'])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  // console.log('colorScale: ', colorScale(15))

  const line = d3
    .line()
    .x(d => {
      return xScale(d[0])
    })
    .y(d => {
      return yScale(d[1])
    })

  const dataSets = {
    food: foodScores,
    population: neighborhoodPopulation,
    noise: noiseComplaints,
    crime: crime
  }

  const colorFilters = {
    food: foodColorScale,
    population: popColorScale
  }
  // console.log('what data: ', dataSets[filter])
  return Object.keys(data).length ? (
    <Fragment>
      <svg width={width} height={height}>
        {data.features.map(neighborhood => {
          // console.log('in search of nta', neighborhood.properties.NTACode)
          return (
            <MapNeighborhood
              key={neighborhood.id}
              line={line}
              xScale={xScale}
              yScale={yScale}
              neighborhood={neighborhood}
              width={width}
              height={height}
              passedData={
                filter.length
                  ? dataSets[filter].find(
                      element =>
                        element.nta_code === neighborhood.properties.NTACode
                    )
                  : null
              }
              noiseComplaints={noiseComplaints}
              colorScale={colorFilters[filter]}
              setBarData={setBarData}
              barData={barData}
              // neighborhoodPopulation={neighborhoodPopulation.filter(
              //   n => n.nta_code === neighborhood.properties.NTACode
              // )}
            />
          )
        })}
      </svg>
      {Object.keys(barData).length ? (
        <CuisinesBarChart barData={barData} />
      ) : null}
    </Fragment>
  ) : (
    <h2>Loading&hellip;</h2>
  )
}
