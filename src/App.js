import React, { Fragment } from 'react';
import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import GlobalStyles from './index.css'
import theme from 'utils/theme';

import { Navigation, Wrapper, Loadingindicator, Button } from 'components';
import Budget from 'pages/Budget';



function App() {

  const { i18n } = useTranslation();


  return (
    <Fragment>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: 'Homepage', to: "/" },
          { content: 'Budget', to: "/budget" }
        ]}
        RightElement={(
          <div>
            <Button variant="regular" onClick={() => i18n.changeLanguage('pl')}>pl</Button>
            <Button variant="regular" onClick={() => i18n.changeLanguage('en')}>en</Button>
          </div>
        )}
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">Homepage</Route>
            <Route path="/budget">
              <Budget />
            </Route>
          </Switch>
        </Wrapper>

      </Router>
    </Fragment>
  );
}

const RootApp = () => {
  return (
    <ThemeProvider theme={theme}>
      <React.Suspense fallback={<Loadingindicator />}>
        <App />
      </React.Suspense>
    </ThemeProvider> 
  ) 
}

export default RootApp;
