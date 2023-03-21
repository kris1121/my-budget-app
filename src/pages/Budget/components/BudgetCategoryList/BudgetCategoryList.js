import React, { useRef, useMemo, useCallback } from 'react'
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
  const handleClickParentCategoryRef = useRef(null);

    const budgetedCategories = useSelector(state => state.budget.budgetCategories);
    const allCategories = useSelector(state => state.common.allCategories);
    const budget = useSelector(state => state.budget.budget);


    const budgetedCategoriesByParent = useMemo(() => groupBy(budgetedCategories, item => allCategories
      .find(category => category.id === item.id).parentCategory.name), [budgetedCategories, allCategories]);

    const handleClearParentCategorySelect = useCallback(
      () => {
        dispatch(SET_SELECTED_PARENT_CATEGORY_ID());
        handleClickParentCategoryRef.current();
    }, [dispatch, handleClickParentCategoryRef])

    const handleSelectRestParentCategories = useCallback(
      () => {
        dispatch(SET_SELECTED_PARENT_CATEGORY_ID(null));
        handleClickParentCategoryRef.current();
    }, [dispatch, handleClickParentCategoryRef])


    const listItems = useMemo(() => Object.entries(budgetedCategoriesByParent)
    .map(([parentName, categories]) => ({
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
    })), [budgetedCategoriesByParent, allCategories, budget.transactions, dispatch, budgetedCategories.id]);
  
  const totalSpent = useMemo(() => budget.transactions
    .reduce((acc, transaction) => acc + transaction.amount, 0), [budget.transactions]);
  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [budget.totalAmount, totalSpent]);

  const amountTaken = useMemo(() => budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTransactions = budget.transactions
      .filter(transaction => transaction.categoryId === budgetedCategory.id);
    const categoryExpenses = categoryTransactions
      .reduce((acc, transaction) => acc + transaction.amount, 0);
    
    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0), [budgetedCategories, budget.transactions]);

  const notBudgetedTransactions = useMemo(() => budget.transactions
    .filter(transaction => {
      return !budgetedCategories
        .find(budgetedCategory => budgetedCategory.id === transaction.categoryId)
    }), [budget.transactions, budgetedCategories]);
  
  const notBudgetedExpenses = useMemo(() => notBudgetedTransactions
    .reduce((acc, transaction) => acc + transaction.amount, 0), [notBudgetedTransactions]);
  
  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses, [budget.totalAmount, amountTaken, notBudgetedExpenses]
  );

  return (
    <div>
      <div css={`
        border-bottom: 5px solid ${({theme}) => theme.colors.gray.light}
      `}>
        <ParentCategory
          name={budget.name}
          amount={restToSpent}
          onClick={handleClearParentCategorySelect}
        />
      </div>
      <ToggleableList 
        items={listItems} 
        clickRef={handleClickParentCategoryRef}
      />
      <div css={`
        border-top: 5px solid ${({theme}) => theme.colors.gray.light}
      `}>
        <ParentCategory
          name={t('Other categories')}
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
          />
      </div>
    </div>
  )
}

export default BudgetCategoryList
