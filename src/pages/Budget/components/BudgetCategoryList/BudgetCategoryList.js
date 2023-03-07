import React from 'react'
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';

import ToggleableList from '../ToggleableList';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';

const BudgetCategoryList = () => {

    const budgetedCategories = useSelector(state => state.budget.budgetCategories);
    const allCategories = useSelector(state => state.common.allCategories);

    const budgetedCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.id).parentCategory.name)


    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={() => onClick(parentName)}
            />
        ),
        children: categories.map(budgetedCategories=> {
          const { name } = allCategories.find(category => category.id === budgetedCategories.categoryId);
          return (
            <CategoryItem name={name} key={budgetedCategories.id}/>
          )}
        )
    }));

  return (
    <div>
      <ToggleableList items={listItems}/>
    </div>
  )
}

export default BudgetCategoryList
