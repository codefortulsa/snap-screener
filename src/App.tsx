import React, { Suspense } from 'react';
import './lib/i18n';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { ThemeProvider } from 'styled-components/macro';
import defaultTheme from './styles/defaultTheme';

import { SchoolInfoProvider } from './contexts/schoolInfo';
import { FormStateProvider } from './contexts/formState';

import PageWrapper from './components/PageWrapper';
import Loader from './components/Loader';

import Home from './pages/Home';
import Form from './pages/Form';
import Eligible from './pages/Eligible';
import Ineligible from './pages/Ineligible';

const App = () => {
  return (
    <Suspense fallback={Loader}>
      <SchoolInfoProvider>
        <FormStateProvider>
          <ThemeProvider theme={defaultTheme}>
            <Router>
              <PageWrapper>
                <Switch>
                  <Route path='/' exact component={Home} />
                  <Route path='/form' exact component={Form} />
                  <Route path='/eligible/:school?' exact component={Eligible} />
                  <Route path='/ineligible' exact component={Ineligible} />
                  <Redirect to='/' />
                </Switch>
              </PageWrapper>
            </Router>
          </ThemeProvider>
        </FormStateProvider>
      </SchoolInfoProvider>
    </Suspense>
  );
};

export default App;
