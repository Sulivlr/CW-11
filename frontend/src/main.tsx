import {createRoot} from 'react-dom/client'
import App from './App'
import {Provider} from 'react-redux';
import {BrowserRouter} from 'react-router';
import {CssBaseline, ThemeProvider} from '@mui/material';
import theme from './theme';
import {persistor, store} from './app/store';
import {PersistGate} from 'redux-persist/integration/react';

createRoot(document.getElementById('root')!).render(
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline/>
          <App/>
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
