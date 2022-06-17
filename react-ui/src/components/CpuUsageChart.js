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
import io from 'socket.io-client'
import '../App.css'

const socket = io('http://localhost:4000')

const CpuUsageChart = () => {
  // The state array is declared with the amount of values to be recorded
  const [cpuUsageHistory, setCpuUsageHistory] = useState(Array(100).fill(0))

  useEffect(() => {
    // Listens for CPU usage data from the server and stores it in state
    socket.on('cpuUsage', (cpuUsage) => {
      try {
        setCpuUsageHistory((currentState) => {
          const updatedState = currentState.concat(cpuUsage)

          // Removes the least recent value so there is only a record of the
          // latest 100 values
          updatedState.shift()

          return updatedState
        })
      } catch (error) {
        window.alert(`An error occurred while getting CPU usage data: ${error}`)
      }
    })

    // Catches errors in connecting to the server
    socket.on('connect_error', (err) => {
      window.alert(
        `Server connection error due to: ${err.message} ${err.data.content}`
      )
    })
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
