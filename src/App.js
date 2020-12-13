import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsList from './components/NewsList/NewsList';


class App extends Component {



  render() {
    return (
      <div>

        <NewsList />

      </div>
    )
  }
}



export default App