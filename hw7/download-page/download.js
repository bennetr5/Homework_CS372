import { get } from 'https'
import { mkdir, mkdirSync, writeFileSync } from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { v4 as uuidv4 } from 'uuid'

const __filename = fileURLToPath(import.meta.url) // get the resolved path to the file
const __dirname = path.dirname(__filename) // get the directory name

const downloadPage = (url='https://google.com/') => {
    console.log('downloading ', url)
    const fetchPage = (urlF, callback) => {
        get(urlF, (response) => {
            let buff = ""
            response.on('data', (chunk) => {
                buff += chunk
            })
            response.on('end', () => {
                callback(null, buff)
            })
        }).on('error', (error) => {
            console.error(`Got error: ${error.message}`)
            callback(error)
        })
    }
    const folderName = uuidv4()
    mkdirSync(folderName)

    fetchPage(url, (error, data) => {
        if(error) { return console.log(error) }
        writeFileSync(path.join(__dirname, folderName, 'url.txt'), url)
        writeFileSync(path.join(__dirname, folderName, 'file.html'), data)
        console.log('downloading is done in folder ', folderName)
    })
}

downloadPage(process.argv[2])