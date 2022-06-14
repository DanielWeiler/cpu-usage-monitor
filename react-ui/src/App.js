import { useEffect } from 'react'
import './App.css'
import logo from './logo.svg'
import cpuDataService from './services/cpu-data.js'

function App() {

  useEffect(() => {
    async function fetchCpuData() {
      try {
        const usage = await cpuDataService.getCpuUsage('/usage')
        console.log(usage)
      } catch (error) {
        window.alert(`An error occurred while getting CPU usage data: ${error}`)
      }
    }
    fetchCpuData()
  }, [])

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  )
}

export default App
