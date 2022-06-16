import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'
import io from 'socket.io-client'

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

  return (
    <div>
      <h1>Real Time CPU Usage</h1>
      <LineChart width={600} height={400} data={cpuUsageHistory}>
        <XAxis dataKey="value" />
        <YAxis
          orientation="right"
          ticks={[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100]}
        />
        <Line type="monotone" dataKey="value" stroke="#8884d8" />
      </LineChart>
    </div>
  )
}

export default CpuUsageChart
