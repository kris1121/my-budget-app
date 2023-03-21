import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';

import { List, ListItem } from './BudgetTransactionList.css';
import { formatCurrency, formatDate } from 'utils';


const BudgetTransactionList = () => {

  const transactions = useSelector(state => state.budget.budget.transactions);
  const allCategories = useSelector(state => state.common.allCategories);
  const selectedParentCategoryId = useSelector(state => state.budget.selectedParentCategoryId);
  const budgetedCategories = useSelector(state => state.budget.budgetCategories);

  const filteredTransactionsBySelectedParentCategory = useMemo(() => {

    if (typeof selectedParentCategoryId === 'undefined') {
      return transactions
    }
    if (selectedParentCategoryId === null) {
      return transactions.filter(transaction => {
       
        const hasBudgetedCategory = budgetedCategories.some(budgetedCategory => (budgetedCategory.categoryId === transaction.categoryId));

         return !hasBudgetedCategory;
      })
    }

    return transactions
      .filter(transaction => {

        try {

          const category = allCategories
            .find(category => category.id === transaction.categoryId);
          const parentCategoryName = category.parentCategory.name;

          return parentCategoryName === selectedParentCategoryId;

        } catch (error) {
          return false;
        }

      })
  }, [selectedParentCategoryId, budgetedCategories, transactions, allCategories]);
  

  const groupedTransactions = useMemo(() => groupBy(filteredTransactionsBySelectedParentCategory, transaction => {
    return new Date(transaction.date).getUTCDate();
  }), [filteredTransactionsBySelectedParentCategory])
  
  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li key={key}>
          <ul>
            {transactions.map(transaction => (
              <ListItem key={transaction.date}>
                <div>{transaction.description}</div>
                <div>{formatCurrency(transaction.amount)}</div>
                <div>{formatDate(transaction.date)}</div>
                <div>{allCategories
                  .find(category => transaction.categoryId === category.id)?.name
                }</div>
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  )
}

export default BudgetTransactionList