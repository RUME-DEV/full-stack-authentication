

const logRoute = (req, res, next) => {
    console.log(req.url)

    next()
}

export default logRoute