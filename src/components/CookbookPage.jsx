import { useState, useMemo } from 'react';
import RecipeCard from './RecipeCard';
import { MOCK_RECIPES } from '../api';

const TIME_FILTERS = [
  { label: 'Any time', value: '' },
  { label: 'Under 20 min', value: 20 },
  { label: 'Under 30 min', value: 30 },
  { label: 'Under 45 min', value: 45 },
];

const ALL_CUISINES = [...new Set(MOCK_RECIPES.map((r) => r.cuisine))].sort();
const ALL_DIET_TAGS = [...new Set(MOCK_RECIPES.flatMap((r) => r.dietTags))].sort();

export default function CookbookPage() {
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedDiet, setSelectedDiet] = useState([]);

  const filtered = useMemo(() => {
    return MOCK_RECIPES.filter((r) => {
      if (selectedCuisine && r.cuisine !== selectedCuisine) return false;
      if (selectedTime && parseInt(r.cookTime) > selectedTime) return false;
      if (selectedDiet.length && !selectedDiet.every((d) => r.dietTags.includes(d))) return false;
      return true;
    });
  }, [selectedCuisine, selectedTime, selectedDiet]);

  const toggleDiet = (tag) => {
    setSelectedDiet((prev) =>
      prev.includes(tag) ? prev.filter((d) => d !== tag) : [...prev, tag]
    );
  };

  const hasActiveFilters = selectedCuisine || selectedTime || selectedDiet.length > 0;

  const clearFilters = () => {
    setSelectedCuisine('');
    setSelectedTime('');
    setSelectedDiet([]);
  };

  return (
    <section className="cookbook" aria-labelledby="cookbook-title">
      <div className="cookbook-hero">
        <h1 id="cookbook-title" className="step-title">The Recipe Book</h1>
        <p className="cookbook-desc">
          Every recipe crafted by Code a Cuisine — all in one place. Filter by cuisine,
          cooking time, or dietary preference to find exactly what you're after.
        </p>
      </div>

      <div className="cookbook-filters">
        <div className="filter-group">
          <span className="filter-label">Cuisine</span>
          <div className="chip-grid">
            <button
              className={`chip ${selectedCuisine === '' ? 'chip--active' : ''}`}
              onClick={() => setSelectedCuisine('')}
            >
              All
            </button>
            {ALL_CUISINES.map((c) => (
              <button
                key={c}
                className={`chip ${selectedCuisine === c ? 'chip--active' : ''}`}
                onClick={() => setSelectedCuisine(selectedCuisine === c ? '' : c)}
              >
                {c}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Cooking time</span>
          <div className="chip-grid">
            {TIME_FILTERS.map((t) => (
              <button
                key={t.label}
                className={`chip ${selectedTime === t.value ? 'chip--active' : ''}`}
                onClick={() => setSelectedTime(t.value)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="filter-group">
          <span className="filter-label">Dietary</span>
          <div className="chip-grid">
            {ALL_DIET_TAGS.map((tag) => (
              <button
                key={tag}
                className={`chip chip--diet ${selectedDiet.includes(tag) ? 'chip--active' : ''}`}
                onClick={() => toggleDiet(tag)}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {hasActiveFilters && (
          <button className="btn btn--ghost cookbook-clear" onClick={clearFilters}>
            Clear filters
          </button>
        )}
      </div>

      {filtered.length === 0 ? (
        <div className="cookbook-empty">
          <p className="cookbook-empty-title">No recipes match your filters.</p>
          <p className="cookbook-empty-sub">Try adjusting or clearing your filters above.</p>
          <button className="btn btn--ghost" onClick={clearFilters} style={{ marginTop: '16px' }}>
            Clear filters
          </button>
        </div>
      ) : (
        <>
          <p className="cookbook-count">{filtered.length} recipe{filtered.length !== 1 ? 's' : ''}</p>
          <div className="recipe-grid">
            {filtered.map((recipe, i) => (
              <RecipeCard key={recipe.id} recipe={recipe} index={i} />
            ))}
          </div>
        </>
      )}
    </section>
  );
}
