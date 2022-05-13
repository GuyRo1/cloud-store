const parseUserId = async (req, res, next) => {
    if (!req.query.id && !req.params.id) return res.status(401).send({ message: 'unauthorized' })
    req.userId = req.query.id || req.params.id
    next()
}

export default parseUserId