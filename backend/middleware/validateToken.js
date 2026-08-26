import jwt from 'jsonwebtoken'

// const pagesValidateToken = async(req, res, next) => {
//     const token = req.cookies.token

//     if (!token || token === 'null' || token === 'undefined') {
//         console.log("Token Not Found")

//         return res.redirect('/login')
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (error, decoded) => {
//         if (error) {
//             console.log(error)
//             res.clearCookie('token')    

//             return res.redirect('/login')
//         }
//         console.log(decoded)

//         req.user = decoded.user

//         next()
//     })
// }

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


// const redirectIfAuthenticated = async(req, res, next) => {
//     const token = req.cookies?.token

//     if (!token || token === 'null' || token === 'undefined') {
//         console.log("No Token")
//         return next()
//     }

//     jwt.verify(token, process.env.SECRET_KEY, (err) => {
//         if (err) {
//             console.log('Invalid Token')
//             res.clearCookie('token')
//             return next()
//         }

//         return res.redirect('/')
//     })
// }


export { apiValidateToken } 