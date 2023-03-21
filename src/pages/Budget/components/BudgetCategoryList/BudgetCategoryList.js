import React from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components/macro'

import ToggleableList from '../ToggleableList';
import ParentCategory from './ParentCategory';
import CategoryItem from './CategoryItem';
import { SET_SELECTED_PARENT_CATEGORY_ID } from 'data/reducers/budget.slice';

const BudgetCategoryList = () => {

  const { t } = useTranslation();
  const dispatch = useDispatch();

    const budgetedCategories = useSelector(state => state.budget.budgetCategories);
    const allCategories = useSelector(state => state.common.allCategories);
    const budget = useSelector(state => state.budget.budget);

    const budgetedCategoriesByParent = groupBy(budgetedCategories, item => allCategories.find(category => category.id === item.id).parentCategory.name)


    const listItems = Object.entries(budgetedCategoriesByParent).map(([parentName, categories]) => ({
        id: parentName,
        Trigger: ({ onClick }) => (
            <ParentCategory
              name={parentName}
              onClick={() => {
                onClick(parentName);
                dispatch(SET_SELECTED_PARENT_CATEGORY_ID(parentName))
            }}
                categories={categories}
                transactions={budget.transactions}
            />
        ),
        children: categories.map(budgetedCategory => {
            const { name } = allCategories.find(category => category.id === budgetedCategory.categoryId);
            return (
              <CategoryItem
                name={name}
                key={budgetedCategories.id}
                item={budgetedCategory}
                transactions={budget.transactions}
              />
            )}
          )
    }));
  
  const totalSpent = budget.transactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  const restToSpent = budget.totalAmount - totalSpent;

  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions
      .filter(transaction => transaction.categoryId === budgetedCategory.id);
    const categoryExpenses = categoryTransactions
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransactions = budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    });
  
  const notBudgetedExpenses = notBudgetedTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0);
  
  const availableForRestCategories = budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <div>
      <div css={`
        border-bottom: 5px solid ${({theme}) => theme.colors.gray.light}
      `}>
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
        />
      </div>
      <ToggleableList items={listItems} />
      <div css={`
        border-top: 5px solid ${({theme}) => theme.colors.gray.light}
      `}>
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          />
      </div>
    </div>
  )
}

export default BudgetCategoryList
