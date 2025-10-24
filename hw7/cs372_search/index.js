import express from 'express'
import bodyParser from 'body-parser'
import https from 'https'

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())

app.post('/index.js', (req, res) => {
    const location = req.body.q
    const key = ab28e45ca0eaab5d55bf13028d85183d
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${key}`
    https.get(url, (response) => {
        let data = ""

        response.on('data', (chunk) => {
            data += chunk
        })

        response.on('end', () =>{
            const weatherData = JSON.parse(data)
            res.json(weatherData)
        })
    }).on('error', (error) => {
        console.error(`Error: ${error.message}`)
    })
})

app.listen(8080)
console.log("Server running on port 8080")