const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Express config
const publicDirectoryPath = path.join(__dirname,'../public');

// if we rename from views to templates
const viewsPath = path.join(__dirname,'../templates/views');

const partialsPath = path.join(__dirname,'../templates/partials')

// mandatory for dynamic pages
app.set('view engine', 'hbs');

// if we rename from views to templates
app.set('views',viewsPath);

// for static files ... can be html css or even js
app.use(express.static(publicDirectoryPath));

// for partials in hbs files  
hbs.registerPartials(partialsPath)


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather App',
        name : 'Ajitesh Kumar Singh',
        message : "Use this site to get your weather"
    })
});

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About Me',
        name:'Ajitesh Kumar Singh'
    })
});

app.get('/help',(req,res)=>{
    res.render('help',{
        message : "Need any help?",
        title : 'Help',
        name : 'Ajitesh'
    })
});


app.get('/weather',(req,res)=>{

    if(!req.query.address){
        return res.send({
            error : 'You must provide an address'
        })
    }

    const address = req.query.address;

    geocode(address, (error, {latitude,longitude,location}={}) => {

        if(error)
            return res.send({error});

        forecast(latitude,longitude, (error, {weather,temperature,feelsLike}={}) => {

            if(error)
                return res.send({error});

            res.send({
                forecast : weather,
                location,
                address: req.query.address,
                temperature,
                feelsLike
            })
        });

    });

});



// The query string in the url
app.get('/products',(req,res)=>{
// req.query is an object
    if(!req.query.search){
        res.send({
            error : 'You must provide a search term'
        })
    }

    // look in the terminal for the query string
    console.log(req.query);
    res.send({
        products : []
    })
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Ajitesh',
        error : 'Help article not found'

    })
})


app.get('/about/*',(req,res)=>{
    res.render('404'),{
        title : '404',
        name : 'Ajitesh',
        error : 'Profile  not found'

    }
})



app.get('*',(req,res)=>{
    res.render('404',{
        title : "404",
        name : "Ajitesh",
        error : "page not found!"
    })
})



app.listen(3000,()=>{
    console.log("Server is up on port 3000")
});






// req => request
// res => response
// app.get('',(req,res)=>{
//     res.send('<h1>Hello Express<h1>')
// })

// app.get('/about',(req,res)=>{
//     res.send([{
//         name:"Ajitesh",
//         age:"20"
//     },{
//         name:"Amitesh",
//         age:"18"
//     }
// ]);
// })

// app.get('/weather',(req,res)=>{
//     res.send("This is weather page")
// })

// app.com
// app.com/help
// app.com/about
