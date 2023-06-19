import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';

import MainLayout from './layout/MainLayout';
import Home from './pages/Home';

import './scss/app.scss';

const Cart = lazy(() => import(/* webpackChunkName: "Cart" */ './pages/Cart'));
const FullPizza = lazy(
  () => import(/* webpackChunkName: "FullPizza" */ './pages/FullPizza'),
);
const NotFound = lazy(
  () => import(/* webpackChunkName: "NotFound" */ './pages/NotFound'),
);

const App: React.FC = () => {
  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path='' element={<Home />} />
        <Route
          path='cart'
          element={
            <Suspense fallback={<div>Идёт загрузка корзины...</div>}>
              <Cart />
            </Suspense>
          }
        />
        <Route
          path='pizza/:id'
          element={
            <Suspense fallback={<div>Идёт загрузка пиццы...</div>}>
              <FullPizza />
            </Suspense>
          }
        />
        <Route
          path='*'
          element={
            <Suspense fallback={<div>Загрузка...</div>}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
};

export default App;
