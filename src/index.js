const express = require('express')
      , { initialize } = require('express-openapi')
      , fs = require('fs')
      , path = require('path')
      , jwt = require('jsonwebtoken')
      , bearerToken = require('express-bearer-token')

const PORT = process.env.PORT || 3002

// Should be replaced with certificates
const SECRET = 'secret'

const app = express()
app.use(bearerToken())

app.get('/', (req, res) => {
    let {username, password} = req.query

    let token = jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: username
    }, SECRET);

  res.status(200).send(token)
})

initialize({
    app: app,
    apiDoc: fs.readFileSync(path.resolve(__dirname, './api-v1/api-doc.yml'), 'utf8'),
    dependencies: {},
    paths: path.resolve(__dirname, './api-v1/paths'),
    securityHandlers: {
        Bearer: function(req, scopes, definition) {
            let decoded = jwt.verify(req.token, SECRET)
            req.uuid = decoded.data
            return Promise.resolve(true)
        }
    }
})

app.listen(PORT, () => console.log(`Listening on ${PORT}`))
