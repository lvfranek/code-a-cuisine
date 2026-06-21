import { useState } from 'react';

function RecipeCard({ recipe }) {
  const [open, setOpen] = useState(false);

  return (
    <article className="recipe-card">
      <div className="recipe-card-header">
        <div className="recipe-meta-row">
          <span className="recipe-cuisine">{recipe.cuisine}</span>
          <span className="recipe-time">{recipe.cookTime}</span>
        </div>
        <h3 className="recipe-name">{recipe.name}</h3>
        <p className="recipe-desc">{recipe.description}</p>
        <div className="recipe-tags">
          {recipe.dietTags.map((tag) => (
            <span key={tag} className="diet-tag">{tag}</span>
          ))}
          <span className="portions-tag">{recipe.portions} portions</span>
        </div>
      </div>

      <button
        className="recipe-expand-btn"
        onClick={() => setOpen((o) => !o)}
        aria-expanded={open}
        aria-controls={`recipe-body-${recipe.id}`}
      >
        {open ? 'Hide full recipe' : 'View full recipe'}
      </button>

      {open && (
        <div
          id={`recipe-body-${recipe.id}`}
          className="recipe-body"
        >
          <div className="recipe-section">
            <h4>Ingredients</h4>
            <ul className="recipe-ingredients">
              {recipe.ingredients.map((ing, i) => (
                <li key={i}>{ing}</li>
              ))}
            </ul>
          </div>

          <div className="recipe-section">
            <h4>Instructions</h4>
            <ol className="recipe-instructions">
              {recipe.instructions.map((step, i) => (
                <li key={i}>{step}</li>
              ))}
            </ol>
          </div>
        </div>
      )}
    </article>
  );
}

export default function ResultsPage({ recipes, onReset }) {
  return (
    <section className="results" aria-labelledby="results-title">
      <div className="results-header">
        <h2 id="results-title" className="step-title">Your recipes are ready</h2>
        <p className="results-count">{recipes.length} recipes crafted just for you</p>
      </div>

      <div className="recipe-grid" role="list">
        {recipes.map((recipe) => (
          <div key={recipe.id} role="listitem">
            <RecipeCard recipe={recipe} />
          </div>
        ))}
      </div>

      <div className="step-footer">
        <button className="btn btn--ghost" onClick={onReset}>
          ← Start Over
        </button>
      </div>
    </section>
  );
}
