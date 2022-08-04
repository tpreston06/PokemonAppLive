const React = require('react')
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000'
  };
class Edit extends React.Component {
    render() {
        const pokemon = this.props.pokemon
        return(
            <div style = {myStyle}>
                <h1> Edit that Pokemon </h1>
               <form action={`/pokemon/${pokemon.id}?_method=PUT`}method='POST'>
                name: <input type="text" name="name"></input><br />
                image: <input type="text" name="img"></input>
                <input type="submit" name="" value="Edit Pokemon"></input>
               </form>
                    <a href="/pokemon">Back to Index</a>
            </div>
        )
    }
}
module.exports = Edit
