import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import LandingPage from './components/LandingPage/LandingPage';
import HomePage from './components/HomePage/HomePage';
import DetailPage from './components/DetailPage/Detail';
import ActivityPage from './components/FormPage/ActivityPage';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/countries/:id" element={<DetailPage />}/>
          <Route path='/activity' element={<ActivityPage />}/>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
