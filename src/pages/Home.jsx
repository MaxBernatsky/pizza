import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import {
  selectFilter,
  setCategoryId,
  setCurrentPage,
} from '../redux/slices/filterSlice';

import { fetchPizza, selectPizzaData } from '../redux/slices/pizzaSlice';
import { Link } from 'react-router-dom';

function Home() {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useDispatch();

  const onChangePage = (number) => dispatch(setCurrentPage(number));

  const getPizza = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(fetchPizza({ category, search, order, sortBy, currentPage }));

    window.scrollTo(0, 0);
  };

  useEffect(() => {
    getPizza();
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  return (
    <div className='container'>
      <div className='content__top'>
        <Categories
          categoryId={categoryId}
          onChangeCategory={(index) => dispatch(setCategoryId(index))}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'loading'
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => (
              <Link to={`/pizza/${item.id}`} key={item.id}>
                <PizzaBlock {...item} />
              </Link>
            ))}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
}
export default Home;
