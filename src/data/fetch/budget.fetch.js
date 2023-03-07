export const fetchBudget = async (id) => {
    const promise = fetch(`${process.env.React_App_API_URL}/budgets/${id}/?_embed=transactions`);

    return await (await promise).json();
}

export const fetchBudgetedCategories = async (id) => {
    const promise = fetch(`${process.env.React_App_API_URL}/budgets/${id}/budgetCategories`);

    return await(await promise).json();
}
