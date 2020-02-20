import React, { Suspense } from 'react'
import { HashRouter as Router, Route, Switch } from "react-router-dom"

import Home from './pages/Home'
import Form from './pages/Form'
import Eligible from './pages/Eligible'
import Ineligible from './pages/Ineligible'
import { SchoolContactContextProvider } from './contexts/SchoolContactContext'

const Loader = () => (
  <div className="App">
    <div>loading...</div>
  </div>
)

const Page = () => {
  return (
    <Router>
      <div className="App">
        <div className="container mx-auto p-4">
          <div className="w-full">
            <SchoolContactContextProvider>
              <Switch>
                <Route path="/" exact component={Home} />
                <Route path="/form" exact component={Form} />
                <Route path="/eligible" exact component={Eligible} />
                <Route path="/ineligible" exact component={Ineligible} />
              </Switch>
            </SchoolContactContextProvider>
          </div>
        </div>
      </div>
    </Router>
  )
}

const App = () => (
  <Suspense fallback={<Loader />}>
    <Page />
  </Suspense>
)

export default App
