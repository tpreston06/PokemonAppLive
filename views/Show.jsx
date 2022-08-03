const React = require('react')
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000'
  };
class Show extends React.Component {
    render() {
        console.log(this.props)
        const pokemon = this.props.pokemon
        console.log(pokemon.img)
        return(
            <div style = {myStyle}>
                <h1> Gotta Catch Em All </h1>
                <h2> {pokemon.name} </h2>
                    <img src={pokemon.img + '.jpg'}></img>
                    <a href="/pokemon">Back to Index</a>
            </div>
        )
    }
}
module.exports = Show


              