import { useEffect, useState } from 'react';

import Header from './components/Header/Header';
import Categories from './components/Categories/Categories';
import Sort from './components/Sort/Sort';
import PizzaBlock from './components/PizzaBlock/PizzaBlock';
import Skeleton from './components/PizzaBlock/Skeleton';

import './scss/app.scss';

function App() {
  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch('https://647e7c3ac246f166da8f1d7f.mockapi.io/items')
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        setItems(obj);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className='wrapper'>
      <Header />
      <div className='content'>
        <div className='container'>
          <div className='content__top'>
            <Categories />
            <Sort />
          </div>
          <h2 className='content__title'>Все пиццы</h2>
          <div className='content__items'>
            {isLoading
              ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
              : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
