import React, { Component } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'
import NewsList from './components/NewsList/NewsList'
import Story from './components/Story/Story'


class App extends Component {
  render() {
    return (
      <div className='container'>
        <Switch>
          <Route path='/' exact component={NewsList} />
          <Route path='/story/:id' component={Story} />
          <Redirect to='/' component={NewsList} />
        </Switch>
      </div>
    )
  }
}

export default App