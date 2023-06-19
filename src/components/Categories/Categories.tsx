import React from 'react';

type CategoriesProps = {
  categoryId: number;
  onChangeCategory: (index: number) => void;
};

const categories = [
  'Все',
  'Мясные',
  'Вегетарианская',
  'Гриль',
  'Острые',
  'Закрытые',
];

const Categories: React.FC<CategoriesProps> = React.memo(
  ({ categoryId, onChangeCategory }) => {
    return (
      <div className='categories'>
        <ul>
          {categories.map((category, index) => (
            <li
              key={category}
              onClick={() => onChangeCategory(index)}
              className={categoryId === index ? 'active' : ''}>
              {category}
            </li>
          ))}
        </ul>
      </div>
    );
  },
);

export default Categories;
