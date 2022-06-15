import { useEffect, useState } from 'react'
import { Line, LineChart, XAxis, YAxis } from 'recharts'
import './App.css'
import cpuDataService from './services/cpu-data.js'

function App() {
  const [cpuUsageHistory, setCpuUsageHistory] = useState([])

  useEffect(() => {
    async function fetchCpuData() {
      try {
        if (cpuUsageHistory.length === 100) {
          cpuUsageHistory.shift()
        }
        const usage = await cpuDataService.getCpuUsage('/usage')
        setCpuUsageHistory(cpuUsageHistory.concat(usage))
      } catch (error) {
        window.alert(`An error occurred while getting CPU usage data: ${error}`)
      }
    }
    fetchCpuData()
  }, [cpuUsageHistory])

  return (
    <div className="App">
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

export default App
