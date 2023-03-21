export const fetchAllCategories = async () => {
    const promise = fetch(`${process.env.React_App_API_URL}/categories/?_expand=parentCategory`);
    
    return await (await promise).json();
}