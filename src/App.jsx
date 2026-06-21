import { useState } from 'react';
import './App.css';
import StepIngredients from './components/StepIngredients';
import StepPreferences from './components/StepPreferences';
import LoadingScreen from './components/LoadingScreen';
import ResultsPage from './components/ResultsPage';
import { generateRecipes } from './api';

const DEFAULT_PREFS = {
  portions: 2,
  people: 2,
  cookingTime: 'medium',
  cuisines: [],
  dietPreferences: [],
};

function StepIndicator({ current }) {
  return (
    <nav className="step-indicator" aria-label="Progress steps">
      <div className={`step-dot-wrap ${current === 1 ? 'active' : 'done'}`}>
        <div
          className={`step-dot ${current === 1 ? 'step-dot--active' : 'step-dot--done'}`}
          aria-current={current === 1 ? 'step' : undefined}
        >
          {current > 1 ? '✓' : '1'}
        </div>
        <span className="step-dot-label">Ingredients</span>
      </div>
      <div
        className={`step-connector ${current > 1 ? 'step-connector--done' : ''}`}
        aria-hidden="true"
      />
      <div className={`step-dot-wrap ${current === 2 ? 'active' : ''}`}>
        <div
          className={`step-dot ${current === 2 ? 'step-dot--active' : ''}`}
          aria-current={current === 2 ? 'step' : undefined}
        >
          2
        </div>
        <span className="step-dot-label">Preferences</span>
      </div>
    </nav>
  );
}

function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar-inner">
        <div className="navbar-side navbar-left" />
        <div className="navbar-center">
          <span className="nav-logo" aria-label="Code a Cuisine — home">
            Code a <em>Cuisine</em>
          </span>
        </div>
        <div className="navbar-side navbar-right">
          <button className="btn--nav" aria-label="Recipe Book — coming soon">
            Recipe Book
          </button>
        </div>
      </div>
    </header>
  );
}

function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="footer">
      <div className="footer-body">
        <div className="footer-brand">
          <p className="footer-logo">Code a <em>Cuisine</em></p>
          <p className="footer-desc">
            Turn your pantry into a plate — AI-powered recipes crafted
            from the ingredients you already have at home.
          </p>
        </div>
      </div>
      <div className="footer-divider" aria-hidden="true" />
      <div className="footer-bottom">
        <p className="footer-copy">
          © {year} Code a Cuisine. All rights reserved.
        </p>
        <nav className="footer-legal" aria-label="Legal links">
          <a href="#">Privacy Policy</a>
          <span aria-hidden="true">·</span>
          <a href="#">Terms of Service</a>
        </nav>
      </div>
    </footer>
  );
}

function App() {
  const [screen, setScreen] = useState('ingredients');
  const [ingredients, setIngredients] = useState([]);
  const [preferences, setPreferences] = useState(DEFAULT_PREFS);
  const [recipes, setRecipes] = useState([]);

  const handleGenerate = async () => {
    setScreen('loading');
    const payload = {
      ingredients: ingredients.map(({ name, quantity, unit }) => ({ name, quantity, unit })),
      ...preferences,
    };
    try {
      const data = await generateRecipes(payload);
      setRecipes(data.recipes);
      setScreen('results');
    } catch (err) {
      console.error('Recipe generation failed:', err);
      setScreen('preferences');
    }
  };

  const handleReset = () => {
    setIngredients([]);
    setPreferences(DEFAULT_PREFS);
    setRecipes([]);
    setScreen('ingredients');
  };

  if (screen === 'loading') {
    return <LoadingScreen />;
  }

  // Step indicator only on preferences (ingredients uses the hero left-column badge instead)
  const stepNum = screen === 'preferences' ? 2 : null;

  return (
    <div className="app">
      <Navbar />

      {stepNum !== null && <StepIndicator current={stepNum} />}

      <main className="app-main">
        <div key={screen} className={`screen-enter${screen === 'ingredients' ? ' screen-enter--hero' : ''}`}>
          {screen === 'ingredients' && (
            <StepIngredients
              ingredients={ingredients}
              setIngredients={setIngredients}
              onNext={() => setScreen('preferences')}
            />
          )}
          {screen === 'preferences' && (
            <StepPreferences
              preferences={preferences}
              setPreferences={setPreferences}
              onBack={() => setScreen('ingredients')}
              onGenerate={handleGenerate}
            />
          )}
          {screen === 'results' && (
            <ResultsPage recipes={recipes} onReset={handleReset} />
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default App;
