import express from 'express'
import cpuDataController from '../controllers/cpu-data.controller.js'
const router = express.Router()

router.get('/usage', cpuDataController.getCpuUsage)

export default router
