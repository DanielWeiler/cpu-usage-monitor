import { useEffect, useState } from 'react'
import {
  CartesianGrid,
  Label,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis
} from 'recharts'
import '../App.css'
import cpuDataService from '../services/cpu-data.js'

const CpuUsageChart = () => {
  // The state array is declared with the amount of values to be recorded
  const [cpuUsageHistory, setCpuUsageHistory] = useState(Array(100).fill(0))

  useEffect(() => {
    try {
      // Every second, gets the CPU usage data from the server and stores it in state 
      setInterval(async () => {
        const cpuUsage = await cpuDataService.getCpuUsage('/usage')

        setCpuUsageHistory((currentState) => {
          const updatedState = currentState.concat(cpuUsage)

          // Removes the least recent value so there is only a record of the
          // latest 100 values
          updatedState.shift()

          return updatedState
        })
      }, 1000)
    } catch (error) {
      window.alert(`An error occurred while getting CPU usage data: ${error}`)
    }
  }, [])

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return <div>{<p>{`${payload[0].value}%`}</p>}</div>
    }
    return null
  }

  return (
    <div className="chart-container">
      <h2>Real Time CPU Usage</h2>
      <ResponsiveContainer height="100%" width="100%">
        <LineChart data={cpuUsageHistory}>
          <XAxis tick={false}>
            <Label value="100 seconds" position="insideBottomLeft" />
          </XAxis>
          <YAxis
            orientation="right"
            label={{ value: '%', offset: '0', position: 'insideTopRight' }}
            ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
          />
          <Line type="monotone" dataKey="value" stroke="#8884d8" />
          <Tooltip content={<CustomTooltip />} />
          <CartesianGrid stroke="#bcd4e6" strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
      <div style={{ fontSize: '0.9em' }}>(Hover over line to see values)</div>
    </div>
  )
}

export default CpuUsageChart
