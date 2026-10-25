import Job from '../model/jobModel.js'



// Create Job Application

const createJobApplication = async(req, res) => {
    try {
        const {company, position, status, appliedDate, jobUrl, notes} = req.body

        if (!company || !position || !status || !appliedDate ) {
            return res.status(400).json({
                message: "Required Field Missing"
            })
        }

        await Job.create({
            company,
            position,
            status,
            appliedDate,
            jobUrl,
            notes,
            user: req.user.id
        })

        return res.status(201).json({
            message: "Successfully Added"
        })
    } catch(err) {
        return res.status(500).json({
            message: "Could Not Create A Job Application"
        })
    }
}




// Get All User Applications

const getApplications = async(req, res) => {
    try {
        const allUserApplications = await Job.find({user: req.user.id}).sort({updatedAt: -1})

        return res.status(200).json(allUserApplications)

    } catch(err) {

        return res.status(500).json({
            message: "Could Not Get Job Applications"
        })
    }
}




// Get Most Recent Application

const getRecentApplication = async(req, res) => {
    try {

        const jobApplication = await Job.findOne({user: req.user.id}).sort({updatedAt: -1})

        return res.status(200).json(jobApplication)

    } catch(err) {

        return res.status(500).json({
            message: "Could Not Get Job Application"
        })
    }
}




// Get One Application

const getApplication = async(req, res) => {
    try {

        const application = await Job.findOne({
            _id: req.params.id,
            user: req.user.id
        })

        if (!application) {
            
            return res.status(404).json({
                message: "No Application Found"
            })
        }

        return res.status(200).json(application)

    } catch(err) {

        return res.status(500).json({
            message: "Could Not Find An Application"
        })
    }
}





// Update Job Application

const updateJobApplication = async(req, res) => {
    try {
        const {company, position, status, appliedDate, jobUrl, notes} = req.body

        const updatedJob = await Job.findOneAndUpdate({
            _id: req.params.id,
            user: req.user.id
        },
        {
            company, 
            position, 
            status, 
            appliedDate, 
            jobUrl, 
            notes
        }, 
        {
            runValidators: true
        })

        if (!updatedJob) {
            return res.status(404).json({
                message: "Job Application Not Found"
            })
        }

        return res.status(200).json({
            message: "Job Application Updated Successfully"
        })

    } catch(err) {
        return res.status(500).json({
            message: "Could Not Update Job Application"
        })
    }
}




// Delete Job Application

const deleteJobApplication = async(req, res) => {
    try {
        const jobApplication = await Job.findOneAndDelete({
            _id: req.params.id,
            user: req.user.id
        })

        if (!jobApplication) return res.status(404).json({
            message: "Job Application Not Found"
        })

        return res.status(200).json({
            message: "Job Application Deleted Successfully"
        })
        
    } catch(err) {
        return res.status(500).json({
            message: "Could Not Delete Job Application"
        })
    }
}






export { createJobApplication, getApplications, getRecentApplication, getApplication, updateJobApplication, deleteJobApplication } 