const React = require('react')
const myStyle = {
    color: '#ffffff',
    backgroundColor: '#000000'
  };
class New extends React.Component {
    render() {
        
        return(
            <div style = {myStyle}>
                <h1> Name that Pokemon </h1>
               <form action='/pokemon'method='POST'>
                name: <input type="text" name="name"></input><br />
                image: <input type="text" name="img"></input>
                <input type="submit" name="" value="Submit"></input>
               </form>
                    <a href="/pokemon">Back to Index</a>
            </div>
        )
    }
}
module.exports = New
