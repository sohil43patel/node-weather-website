const express = require('express')
const path = require('path')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static directory to server
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather Application',
        name: 'Sohil Patel'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Sohil Patel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        helpText: 'This is some Helpful Text',
        name: 'Sohil Patel'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide the address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longitude, place} = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                forecast: forecastdata,
                location: place,
                address: address
            })
    
      })
    })

})

app.get('/products', (req, res) => {
    if ( !req.query.search ) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('error', 
        {
            title: '404',
            name: 'Sohil Patel',
            errorMessage: 'Help Article not Found'
        }
    )
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404',
        name: 'Sohil Patel',
        errorMessage: 'Page Not Found'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})



