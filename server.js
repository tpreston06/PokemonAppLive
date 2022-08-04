const express = require('express');
require('dotenv').config()
const mongoose = require('mongoose')
const pokemon = require('./models/pokemon');
const app = express();
const {respone} = require('express')
const port = process.env.PORT || 3000;
const methodOverride = require('method-override');
const pokemonData = require('./utilities/pokemonData')

// DB Connection
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connection.once('open', ()=> {
    console.log('connected to mongo');
});

//middleware
app.use((req, res, next) => {
    next();
});
app.use(express.urlencoded({extended:false}));
app.use(methodOverride('_method'))

//setting up our views
app.set('view engine', 'jsx') //setting up our HTML template
app.engine('jsx', require('express-react-views').createEngine()) //Initializing our view engine

//route

//  app.get('/pokemon/:id', function(req, res) {
//     res.send(req.params.id)
// });

//Seed Route
app.get('/pokemon/seed', (req, res) => {
    // Comment the line below if you don't want to delete your whole entire collection
    // pokemon.deleteMany({}) -> not working for right now
    // Create a list of pokemon into our database
    pokemon.create(pokemonData)
})

app.get('/pokemon', (req, res) => {
    pokemon.find({},(err, allPokemon)=>{
        res.render('Index', {
            pokemon: allPokemon  
        })
    } )
});

app.get('/pokemon', (req, res) => {
    res.render('Index', {pokemon: pokemon});
});

app.get('/pokemon/new', (req, res) => {
    res.render('New')
})

//POST route
app.post('/pokemon/', (req,res) =>{
    let name=req.body.name.split('')
    name[0]=name[0].toUpperCase()
     req.body.name=name.join('')

    pokemon.create(req.body, (err, createdPokemon) => {
             res.redirect('/pokemon')
    })  
});

app.get('/', (req, res) => {
    res.send('Welcome to Pokemon App!');
});

app.get('/pokemon/:id', (req, res) => {
   // res.render('Show', {pokemon: pokemon[req.params.id]});
   pokemon.findById(req.params.id,(err,foundPokemon) => {
        res.render('Show', {
            pokemon: foundPokemon
        })
    })
});

app.get('/pokemon/:id/edit', (req, res) => {
    pokemon.findById(req.params.id, (err, foundPokemon) => {
        if(!error) {
            res.render('Edit', {
                pokemon: foundPokemon
            })
        } else{
            res.send({
                message: error.message
            })
        }
    })
    res.render()
})

//Update/Edit Route
app.put('/pokemon/:id', (req, res) => {
    pokemon.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    }, (error, pokemon) => {
        res.redirect(`/pokemon/${req.params.id}`)
    })
})

//Delete route
// app.delete('/pokemon/:id', (req, res) => {
//    console.log('We are Deleting');
//     Pokemon.findByIdAndRemove(req.params.id, (err, data) => {
//         res.redirect('/pokemon')
//     })
// })


// Tell the app to listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
   });