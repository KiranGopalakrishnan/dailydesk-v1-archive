import * as React from 'react';
import { Grid, MuiThemeProvider } from '@material-ui/core';
import { theme } from '@ui-kit/Theme';
import { Provider, useDispatch } from 'react-redux';
import { AppProps } from 'next/app';
import { store } from '@store';
import { createGlobalStyle } from 'styled-components';
import { useEffect } from 'react';
import { autoLogin } from '@store/user/user-thunk';
import { WithAutoLogin } from '../utils/WithAutoLogin';
import { Header } from '@shared/header/Header';

const GlobalStyle = createGlobalStyle`
html,body,#__next {
  height: 100%;
  margin: 0;
}
`;

const App: React.FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  return (
    <Provider store={store}>
      <WithAutoLogin>
        <MuiThemeProvider theme={theme}>
          <GlobalStyle />
          {/*<Grid container style={{ height: '72px' }}>*/}
          {/*  <Header />*/}
          {/*</Grid>*/}
          <Grid container style={{ height: '100%' }}>
            <Component />
          </Grid>
        </MuiThemeProvider>
      </WithAutoLogin>
    </Provider>
  );
};

export default App;
