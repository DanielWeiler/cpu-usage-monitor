import axios from 'axios'
const baseUrl = '/api/cpu-data'

const getCpuUsage = async (endpoint) => {
  const response = await axios.get(`${baseUrl}${endpoint}`)
  return response.data
}

const cpuDataService = { getCpuUsage }

export default cpuDataService
