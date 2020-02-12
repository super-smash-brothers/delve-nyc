import React from 'react'
import CuisinesBarChart from './CuisinesBarChart'
import {FoodGradePieChart} from './GradePieChart'
import TopNoiseHierBarChart from './TopNoiseHierBarChart'
import RelativePopulationChart from './RelativePopulationChart'

const GraphSelector = ({filter, ntaCode, grades}) => {
  switch (filter) {
    case 'food':
      // Refactor this to break down graph items into further components
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">Top 5 Restaurants by Grade</h2>
            <CuisinesBarChart ntaCode={ntaCode} />
          </div>
          <div className="graph-item-container">
            <h2 className="graph-item__title">Top 5 Restaurants by Grade</h2>
            <FoodGradePieChart grades={grades} ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'population':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">Relative Population by NTA</h2>
            <RelativePopulationChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    case 'noise':
      return (
        <div className="graph-items-content">
          <div className="graph-item-container">
            <h2 className="graph-item__title">Top 5 Noise Complaints</h2>
            <TopNoiseHierBarChart ntaCode={ntaCode} />
          </div>
        </div>
      )
    default:
      return null
  }
}

export default GraphSelector
