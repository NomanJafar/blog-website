import React from 'react';
import { Routes, Route } from 'react-router-dom';
import appRoutes from './appRoutes';
import Home from '../views/Home';

const AppRouter = () => {
  return (
    <Routes>
      {appRoutes.map((route, index) => (
        <Route key={index} path={route.path} element={<route.Component />} />
      ))}
      <Route key='/' path="/" element={<Home />} />
    </Routes>
  );
};

export default AppRouter;
