const path = require('path');
const express = require('express');
const hbs = require('hbs');

const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast.js');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials')

//set up hadlebars engine and views custom locations
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

//set up static directory to serve
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mircea Frandes'
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Mircea Frandes',
        pictureSource: 'https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTMZgnCn_YpNTvYDTyMjBVNW5nEgxr_CcapYArTR0IxFk6qdBTd&usqp=CAU'
    });
});

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Mircea Frandes',
        message: 'Help old peoples'
    });
});

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Address is required!'
        })
    }
    geocode(req.query.address, (error, { latitude, longitude, name: location } = {}) => {
        if (error) {
            return res.send({
                error
            });
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error
                });
            }
            res.send(
                {
                    forecast,
                    location,
                    address: req.query.address
                }
            );
        })
    })

});

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: "You must provide search term"
        });
    }
    console.log(req.query)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Help page not found',
        name: 'Mircea Frandes'
    });
});

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found',
        name: 'Mircea Frandes'
    });
});

app.listen(3000, () => {
    console.log('Server is on port 3000.');
});