import mongoose from 'mongoose'


const jobSchema = new mongoose.Schema({
    company: {type: String, required: true},
    position: {type: String, required: true},
    status: {type: String, enum: ["Applied", "Interview", "Rejected", "Withdrawn"], required: true},
    appliedDate: {type: Date, required: true},
    jobUrl: String,
    notes: String,

    user: {type: mongoose.Schema.Types.ObjectId, ref: "User", required: true}
}, {timestamps: true})



export default mongoose.model("Job", jobSchema)