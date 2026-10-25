import express from 'express'
import { createJobApplication, deleteJobApplication, getApplication, getApplications, getRecentApplication, updateJobApplication } from '../controller/jobController.js'
import { apiValidateToken } from '../middleware/validateToken.js'


const jobRouter = express.Router()

// MiddleWare
jobRouter.use(apiValidateToken)

// Routes
jobRouter.get('/applications', getApplications)
jobRouter.get('/application', getRecentApplication)
jobRouter.get('/application/:id', getApplication)
jobRouter.post('/application', createJobApplication)
jobRouter.put('/application/:id', updateJobApplication)
jobRouter.delete('/application/:id', deleteJobApplication)


export default jobRouter