import express from 'express'
import bodyParser from 'body-parser'
import https from 'https'

const app = express()

app.use(express.static("public"))
app.use(bodyParser.json())


app.get('/index.js', (req, res) => {
    const input = req.query.q
    if (input.substring(0, 5).toUpperCase() === 'TEMP:') {
        const key = 'ab28e45ca0eaab5d55bf13028d85183d'
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${input.substring(5).trim()}&appid=${key}`
        https.get(url, (response) => {
            let data = ""

            response.on('data', (chunk) => {
                data += chunk
            })

            response.on('end', () => {
                const weatherData = JSON.parse(data)
                res.json(weatherData)
            })
        }).on('error', (error) => {
            console.error(`Error: ${error.message}`)
        })
    }
    else {
        res.redirect(`https://www.google.com/search?q=${input}`)
    }
})

app.listen(8080)
console.log("Server running on port 8080")