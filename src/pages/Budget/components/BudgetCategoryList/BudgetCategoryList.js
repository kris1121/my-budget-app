import React from 'react'
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';

import ToggleableList from '../ToggleableList';
import ParentCategory from './ParentCategory';

const BudgetCategoryList = () => {

    const budgetedCategories = useSelector(state => state.budget.budgetCategories);
    const allCategories = useSelector(state => state.common.allCategories);

    const budgetedCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.id).parentCategory.name)

    console.log(budgetedCategoriesByParent);

    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
                name={parentName}
                onClick={onClick}
            />
        ),
        // children: categories.map(category => (

        // ))
    }));

    console.log(listItems)

  return (
    <div>
      <ToggleableList items={listItems}/>
    </div>
  )
}

export default BudgetCategoryList
