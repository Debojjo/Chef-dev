import { useState } from "react";
import Recipe from "./Recipe.jsx";
import { getRecipeFromAi } from "./ai";

export default function MainContent() {
  const [newIngredients, setNewIngredients] = useState([]);
  const [recipe, setRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const ingredientsList = newIngredients.map((ingredient) => (
    <li key={ingredient}>{ingredient}</li>
  ));

  function handleSubmit(formData) {
    const addedIngredients = formData.get("ingredient");

    setNewIngredients((prevIngridients) => [
      ...prevIngridients,
      addedIngredients,
    ]);
  }

  async function handleGenerateRecipe() {
    setLoading(true);
    setError(null);

    try {
      const generatedRecipe = await getRecipeFromAi(newIngredients);
      setRecipe(generatedRecipe);
      console.log(generatedRecipe);
    } catch (error) {
      setError("Failed to generate recipe.");
      console.error(error);
    } finally {
      setLoading(false); // ✅ This ensures loading ends even if there's an error
    }
  }

  return (
    <main>
      <form action={handleSubmit} className="ingredient-form">
        <input
          type="text"
          placeholder="e.g salt, pepper, garlic"
          aria-label="Add ingredients"
          name="ingredient"
        />
        <button type="submit"> + Add Ingredient</button>
      </form>
      {ingredientsList.length > 0 && (
        <section>
          <h2>Ingredients added:</h2>
          <ul className="ingredients-list">{ingredientsList}</ul>
          {ingredientsList.length > 4 && (
            <div className="recipe-container">
              <div>
                <h3>It's time to generate a recipe!</h3>
                <p>
                  You're all set! Tap the button below to generate your recipe!
                </p>
              </div>
              <button onClick={handleGenerateRecipe} disabled={loading}>
                {loading ? "Generating..." : "Get a recipe"}
              </button>
            </div>
          )}
        </section>
      )}
      {error && <p style={{ color: "red" }}>{error}</p>}
      {recipe && <Recipe recipeText={recipe} />}
    </main>
  );
}
