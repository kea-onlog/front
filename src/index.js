import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './components/style/GlobalStyled';
import theme from './components/common/theme';

import { Provider } from 'react-redux';
import { createStore } from 'redux';
import RootReducer from './store/reducers/Index';
import { composeWithDevTools } from 'redux-devtools-extension'; // 리덕스 개발자 도구

const root = ReactDOM.createRoot(document.getElementById('root'));

const store = createStore(RootReducer, composeWithDevTools());

root.render(
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle/>
        <App />
      </ThemeProvider>
    </Provider>
);
