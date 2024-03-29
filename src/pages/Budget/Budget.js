import React, { useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';

import { fetchBudgetAction, fetchBudgetedCategoriesAction } from 'data/actions/budget.actions'
import { fetchAllCategoriesAction } from 'data/actions/common.actions';
import { Grid } from './Budget.css';
import { Loadingindicator, Modal, Button } from 'components';
import BudgetCategoryList from './components/BudgetCategoryList';
import BudgetTransactionList from './components/BudgetTransactionList/BudgetTransactionList';
import AddTransactionForm from './components/AddTransactionForm';

const Budget = () => {

    const dispatch = useDispatch();

    const budgetIsLoaded = useSelector(state => state.budget.loadingState);
    const commonIsLoaded = useSelector(state => state.common.loadingState);
    const isLoaded = useMemo(() => (!!budgetIsLoaded && Object.keys(budgetIsLoaded).length === 0) && (!!commonIsLoaded && Object
    .keys(commonIsLoaded).length === 0), [budgetIsLoaded, commonIsLoaded]);
    const allCategories = useSelector(state => state.common.allCategories);


    useEffect(() => {
        dispatch(fetchBudgetAction(1));
        dispatch(fetchBudgetedCategoriesAction(1));
        dispatch(fetchAllCategoriesAction());
    }, [dispatch])

  return (
    <>
      <Grid>
      <section>
          {isLoaded ? <BudgetCategoryList /> : <Loadingindicator />}
        </section>
      <section>
          {isLoaded ? (
            <>
              <Button to={"/budget/transaction/new"}>Add new transaction</Button>
              <BudgetTransactionList />
            </>
         ): <Loadingindicator />}
        </section>
      </Grid>
      <Switch>
        <Route path="/budget/transaction/new">
          <Modal>
            <AddTransactionForm categories={allCategories} groupCategoriesBy="parentCategory.name"/>
          </Modal>
        </Route>
      </Switch>
    </>
  )
}

export default Budget
