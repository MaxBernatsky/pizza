import { useCallback, useEffect } from 'react';
import { useSelector } from 'react-redux';

import Categories from '../components/Categories/Categories';
import Sort from '../components/Sort/Sort';
import PizzaBlock from '../components/PizzaBlock/PizzaBlock';
import Skeleton from '../components/PizzaBlock/Skeleton';
import Pagination from '../components/Pagination/Pagination';

import { setCategoryId, setCurrentPage } from '../redux/filter/slice';

import { useAppDispatch } from '../redux/store';
import { selectFilter } from '../redux/filter/selectors';
import { selectPizzaData } from '../redux/pizza/selectors';
import { fetchPizza } from '../redux/pizza/asyncActions';

const Home: React.FC = () => {
  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);

  const { items, status } = useSelector(selectPizzaData);

  const dispatch = useAppDispatch();

  const onChangePage = (page: number) => dispatch(setCurrentPage(page));

  const onChangeCategory = useCallback((index: number) => {
    dispatch(setCategoryId(index));
  }, []);

  const getPizza = async () => {
    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const search = searchValue ? `&search=${searchValue}` : '';
    const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
    const sortBy = sort.sortProperty.replace('-', '');

    dispatch(
      fetchPizza({
        category,
        search,
        order,
        sortBy,
        currentPage: String(currentPage),
      }),
    );

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
          onChangeCategory={onChangeCategory}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'loading'
          ? [...new Array(9)].map((_, index) => <Skeleton key={index} />)
          : items.map((item: any) => <PizzaBlock key={item.id} {...item} />)}
      </div>
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </div>
  );
};
export default Home;
