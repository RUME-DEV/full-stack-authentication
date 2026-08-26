import mongoose from "mongoose";

const conToDB = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGODB_URL)

        console.log(`Successfully Connected: DBName: ${connect.connection.name}`)
    } catch(error) {
        console.error(error)
    }
}




export default conToDB