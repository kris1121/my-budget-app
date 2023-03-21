import React from 'react';
import { useSelector } from 'react-redux';
import { groupBy } from 'lodash';

import { List, ListItem } from './BudgetTransactionList.css';
import { formatCurrency, formatDate } from 'utils';


const BudgetTransactionList = () => {

  const transactions = useSelector(state => state.budget.budget.transactions);
  const allCategories = useSelector(state => state.common.allCategories);

  const groupedTransactions = groupBy(transactions, transaction => {
    return new Date(transaction.date).getUTCDate();
  })
  
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