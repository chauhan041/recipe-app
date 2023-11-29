import "./App.css";
import { FormEvent, useRef, useState } from "react";
import * as api from "./api";
import { Recipe } from "./types";
import RecipeCard from "./components/RecipeCard";
import RecipeModal from "./components/RecipeModal";

const App = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | undefined>(undefined);
  const pageNumber = useRef(1);

  const handleSearchSubmit = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const recipes = await api.searchRecipes(searchTerm, 1);
      setRecipes(recipes.results);
      pageNumber.current = 1;
    } catch (e) {
      console.log(e);
    }
  };

  const handleViewMoreClick = async () => {
    try {
      const nextPage = pageNumber.current + 1;
      const nextRecipes = await api.searchRecipes(searchTerm, nextPage);
      setRecipes((prevRecipes) => [...prevRecipes, ...nextRecipes.results]);
      pageNumber.current = nextPage;
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSearchSubmit}>
        <input type="text" required
          placeholder="Enter a search term" value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)} />
        <button type="submit">Submit</button>
      </form>

      {recipes.map((recipe) => (
        <RecipeCard key={recipe.id} recipe={recipe} onClick={() => setSelectedRecipe(recipe)} />))}

      <button className="view-more" onClick={handleViewMoreClick}>
        View More
      </button>

      {selectedRecipe ? (< RecipeModal recipeId={selectedRecipe.id.toString()}
        onClose={() => setSelectedRecipe(undefined)} />) : null
      }
    </div>
  );
};

export default App;