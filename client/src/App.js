import React from 'react';
import AppRouter from './routes/AppRouter';
import Header from './components/Header';
import { Provider } from 'react-redux';
import store from './store';
const App = () => {
  return (
    <div>

      <Provider store={store}>
        <Header />
        <AppRouter />
      </Provider>

    </div>
  );
};

export default App;
