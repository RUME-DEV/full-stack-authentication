import jwt from 'jsonwebtoken'



const apiValidateToken = async(req, res, next) => {
    const token = req.cookies.token

    if (!token || token === 'null' || token === 'undefined') {
        console.log("Token Not Found")

        return res.status(400).json({
            message: "Token Not Found"
        })
    }

    jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
        if (error) {
            console.log(error)
            res.clearCookie('token')

            return res.status(401).json({
                message: "Invalid Token"
            })
        }
        console.log(decoded)

        req.user = decoded.user

        next()
    })
}




export { apiValidateToken } 