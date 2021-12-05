const actionFromMethod = {
    'GET': 'reading',
    'PATCH': 'updating',
    'POST': 'adding',
    'DELETE': 'deleting'
}

const handleErrors = (err, req, res, next) => {
    const METHOD = req.actualOperation || req.METHOD
    const ERRORS = [
        {
            source: {
                title: `Error ${actionFromMethod[METHOD]} data`,
                detail: err.message
            }
        }
    ]
    req.bodyOut = { errors: ERRORS }
    res.setHeader('content-type', 'application/vnd.api+json.')
    res.send(JSON.stringify(req.bodyOut))
    next()
}

module.exports = handleErrors;