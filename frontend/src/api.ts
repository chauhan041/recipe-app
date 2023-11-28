const searchRecipes = async (searchTerm: string, page: number) => {
  // const baseURL = new URL("http://localhost:5000/api/recipes/search");
  const baseURL = new URL("https://424z4d-5000.csb.app/api/recipes/search");

  baseURL.searchParams.append("searchTerm", searchTerm);
  baseURL.searchParams.append("page", page.toString());

  const response = await fetch(baseURL.toString());

  if (!response.ok) {
    throw new Error(`HTTP Error: ${response.status}`);
  }

  return response.json();
};

export { searchRecipes };

