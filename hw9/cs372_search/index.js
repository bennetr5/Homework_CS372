import express from 'express'
import bodyParser from 'body-parser'
import https from 'https'
import mongoose from 'mongoose'

const app = express()

main().catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://localhost:27017/cs372_search')
    console.log('DB connected!')
}

const searchSchema = new mongoose.Schema({
    search: { type: String, required: true },
})

const luckySearch = mongoose.model('Search', searchSchema)

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
})

app.get('/search', async (req, res) => {
    const { q } = req.query
    console.log(`QUERY: ${q}`)

    try {
        let docs
        if (!q || !q.trim()) {
            docs = await luckySearch.find()
        } else {
            const searchTerm = q.trim()
            docs = await luckySearch.find({
                search: { $regex: searchTerm }
            })
        }
        res.json({
            message: docs.map(s => s.search)
        })
    } catch (err) {
        console.error(err)
        res.status(500).json({ error: 'Failed to fetch searches' })
    }
})


app.post('/lucky', async (req, res) => {
    const { search } = req.body
    try {
        const existing = await luckySearch.findOne({ search: search })
        if (!existing) {
            const searchToSave = new luckySearch({ search })
            await searchToSave.save()
        }
        res.json({
            message: `Saved ${search}`
        })
    } catch (err) {
        return res.sendStatus(400)
    }
})

app.listen(process.env.PORT || 8080)

export default app