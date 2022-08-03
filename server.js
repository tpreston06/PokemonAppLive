const express = require('express');
const pokemon = require('./models/pokemon');
const app = express();
const port = 3000;

//setting up our views
app.set('view engine', 'jsx') //setting up our HTML template
app.engine('jsx', require('express-react-views').createEngine()) //Initializing our view engine

//route

app.get('/pokemon/:id', (req, res) => {
     res.render('Show', {pokemon: pokemon[req.params.id]});
 });

//  app.get('/pokemon/:id', function(req, res) {
//     res.send(req.params.id)
// });

app.get('/pokemon', (req, res) => {
    res.render('Index', {pokemon: pokemon});
});

app.get('/', (req, res) => {
    res.send('Welcome to Pokemon App!');
});






// Tell the app to listen on port 3000
app.listen(port, function() {
    console.log('Listening on port', port);
   });