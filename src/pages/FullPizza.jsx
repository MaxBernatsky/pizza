import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

export default function FullPizza() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [pizza, setPizza] = useState();

  useEffect(() => {
    async function fetchPizza() {
      try {
        const { data } = await axios.get(
          'https://647e7c3ac246f166da8f1d7f.mockapi.io/items/' + id,
        );

        setPizza(data);
      } catch (error) {
        alert('Такой пиццы нет, вернуться на главную?');
        navigate('/');
      }
    }
    fetchPizza();
  }, []);

  if (!pizza) {
    return 'Loading...';
  }

  return (
    <div className='container'>
      <img src={pizza.imageUrl} alt={pizza.title} />
      <h2>{pizza.title}</h2>

      <h4>{pizza.price} ₽</h4>
    </div>
  );
}
