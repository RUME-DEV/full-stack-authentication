import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import User from './../model/usermodel.js'



// Register

const registerUser = async(req, res) => {
    const {username, email, password} = req.body
    const userExist = await User.findOne({email})

    if (!username || !email || !password) {
        return res.status(400).json({
            message: "All Fields Are Required"
        })
    } else if (userExist) {
        return res.status(409).json({
            message: "User Already Exist"
        })
    } else if (password.length < 6) {
        return res.status(400).json({
            message: "Password Should Be At Least 6 Characters"
        })
    }

    const hashedPass = await bcrypt.hash(password, 10)

    await User.create({
        username,
        email,
        password: hashedPass
    })

    console.log({
        username,
        email,
        hashedPass
    })

    return res.status(201).json({
        name: username,
        message: "User Created Successfully"
    })
}




//Login

const loginUser = async(req, res) => {
    const {email, password} = req.body
    const userExist = await User.findOne({email})

    if (!email || !password) {
        return res.status(400).json({
            message: "All Fields Are Required"
        })
    } else if (!userExist) {
        return res.status(404).json({
            message: "User Not Found, Go To Register"
        })
    }

    const comparePass = await bcrypt.compare(password, userExist.password)

    if (!comparePass) {
        return res.status(400).json({
            message: "Password Does Not Match"
        })
    }

    const jwtPayload = {
        user: {
            id: userExist._id,
            username: userExist.username
        }
    }


    if (userExist && comparePass) {
        const token = jwt.sign(jwtPayload, process.env.SECRET_KEY, {expiresIn: "1d"})

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        })


        return res.status(200).json({
            message: "Login Successfull",
            user: {
                id: userExist._id,
                username: userExist.username,
                email: userExist.email
            }
        })
    }
}





// Delete User

const deleteUser = async(req, res) => {
    const userExist = await User.findById(req.user.id)
    if (!userExist) {
        return res.status(404).json({
            message: "User Doesn't Exist"
        })
    } 
    await User.deleteOne({
        _id: req.user.id
    })

    res.clearCookie("token")

    return res.status(200).json({
        message: "User Deleted Successfully"
    })
}




// Get Current User


const getCurrentUser = async(req, res) => {
    const user = await User.findById(req.user.id)
    return res.status(200).json({
        user: {
            id: user._id,
            username: user.username,
            email: user.email
        }
    })
}




// Log Out


const logOut = (req, res) => {
    res.clearCookie("token")

    return res.status(200).json({
        message: "Log Out Successful"
    })
} 

const sendData = (req, res) => {
    console.log(req.body)

    return res.status(200).json({
        message: "Name Successful"
    })
}



export { sendData, registerUser, loginUser, deleteUser, getCurrentUser, logOut }