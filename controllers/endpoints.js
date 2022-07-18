function getAuth(req, res) {

    let auth = {auth: 'theCakeIsALie'}
    res.status(200).json(auth)

}

function getAuthPost(req, res) {
    res.status(200).send(`you are auth`)

}

function notAuth(req, res, next) {
    let auth = req.headers.authorization
    console.log(req.headers.authorization)
    console.log(JSON.stringify(req.headers))

    if (auth != 'theCakeIsALie') {
        res.status(401).send('Nice try')
    } 

    next()
}


module.exports = {getAuth, notAuth, getAuthPost}