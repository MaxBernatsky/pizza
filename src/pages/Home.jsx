import { useEffect, useState } from 'react';
import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';
import { SearchContext } from '../App';

import { setCategoryId } from '../redux/slices/filterSlice';

function Home() {
  const { categoryId, sort } = useSelector((state) => state.filter);

  const dispatch = useDispatch();

  const { searchValue } = useContext(SearchContext);

  const [items, setItems] = useState([]);

  const [isLoading, setIsLoading] = useState(true);

  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    setIsLoading(true);

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');

    fetch(
      `https://647e7c3ac246f166da8f1d7f.mockapi.io/items?page=${currentPage}&limit=4&${category}&sortBy=${sortBy}&order=${order}${search}`,
    )
      .then((res) => {
        return res.json();
      })
      .then((obj) => {
        setItems(obj);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    window.scrollTo(0, 0);
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
        {isLoading
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.map((item) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination onChangePage={(num) => setCurrentPage(num)} />
    </div>
  );
}

export default Home;
