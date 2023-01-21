import { ThemeProvider } from 'styled-components';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import GlobalStyles from './index.css'
import theme from 'utils/theme';

import { Navigation, Wrapper } from 'components';
import React from 'react';




function App() {

  const { t, i18n } = useTranslation();

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyles />
      <Router>
        <Navigation items={[
          { content: t('Homepage'), to: "/" },
          { content: t('Budget'), to: "/budget" }
        ]}
        RightElement={(
          <div>
            <button onClick={() => i18n.changeLanguage('pl')}>pl</button>
            <button onClick={() => i18n.changeLanguage('en')}>en</button>
          </div>
        )}
        />
        <Wrapper>
          <Switch>
            <Route exact path="/">Homepage</Route>
            <Route path="/budget">Budget page</Route>
          </Switch>
        </Wrapper>

      </Router>
    </ThemeProvider>   
  );
}

const RootApp = () => {
  return (
    <React.Suspense fallback="Loading...">
      <App />
    </React.Suspense>
  ) 
}

export default RootApp;
