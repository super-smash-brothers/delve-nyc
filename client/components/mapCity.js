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
  // console.log('hows the filter?', filter)
  const [data, setMap] = useState({})
  const [foodScores, setFoodScores] = useState({})
  const [noiseComplaints, setNoiseComplaints] = useState({})
  const [neighborhoodPopulation, setCityPopulation] = useState({})
  const [crime, setCrime] = useState({})
  const [barData, setBarData] = useState({})
  //for filtering out park multipolygons
  const parks = ['BK99', 'MN99', 'BX99', 'QN99', 'QN98', 'SI99', 'BX98']

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
        if (!parks.includes(d._id)) {
          d.passed = d.total / d.count
        } else d.passed = null
        d.nta_code = d._id
        return d
      })
      setFoodScores(averagFoodScores)
    }
    async function fetchNoiseData() {
      let noise311 = await axios.get('/api/noises')
      // const noiseData = data311.data.filter(d =>
      //   d.complaint_type.includes('Noise')
      // )
      const processedNoise = noise311.data.sumCount.map(n => {
        if (!parks.includes(n[0])) {
          n.passed = n[1]
        } else n.passed = null
        n.nta_code = n[0]
        const returnObj = Object.assign({}, n)
        return returnObj
      })
      setNoiseComplaints(processedNoise)
    }
    async function fetchPopulationData() {
      const rawPopData = await axios.get(
        'https://data.cityofnewyork.us/resource/swpk-hqdp.json'
      )
      const recentPopData = rawPopData.data.filter(p => p.year === '2010')
      const popWithPassed = recentPopData.map(d => {
        if (!parks.includes(d.nta_code)) {
          d.passed = d.population
        } else d.passed = null
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

  console.log('noise data:', noiseComplaints)
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
  const foodExtent = d3.extent(foodScores, f => f.passed)
  const popExtent = d3.extent(neighborhoodPopulation, l => parseInt(l.passed))
  const noiseExtent = d3.extent(noiseComplaints, n => n.passed)
  // console.log('extents', noiseExtent, popExtent, foodExtent)
  // console.log('pop extent: ', popExtent)

  const yScale = d3
    .scaleLinear()
    .domain([40.4961236003829, 40.9155410761847])
    .range([height, 0])

  const foodColorScale = d3
    .scaleLinear()
    .domain(foodExtent)
    .range(['white', 'brown'])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  const popColorScale = d3
    .scaleLinear()
    .domain(popExtent)
    .range(['white', 'purple'])
    .interpolate(d3.interpolateRgb.gamma(2.2))

  const noiseColorScale = d3
    .scaleLinear()
    .domain(noiseExtent)
    .range(['white', 'yellow'])
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
    population: popColorScale,
    noise: noiseColorScale
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
        <CuisinesBarChart ntaCode={barData} />
      ) : null}
    </Fragment>
  ) : (
    <h2>Loading&hellip;</h2>
  )
}
