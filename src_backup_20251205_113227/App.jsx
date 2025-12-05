import { useState } from 'react';
import KolbTest from './components/KolbTest';
import CameronTest from './components/CameronTest';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home');

  return (
    <div className="app-container">
      <header className="main-header">
        <div className="container">
          <nav className="navbar">
            <h1 className="logo" onClick={() => setCurrentView('home')}>Self-Discovery Hub</h1>
            <div className="nav-links">
              <button className={`nav-link ${currentView === 'kolb' ? 'active' : ''}`} onClick={() => setCurrentView('kolb')}>Kolb Test</button>
              <button className={`nav-link ${currentView === 'cameron' ? 'active' : ''}`} onClick={() => setCurrentView('cameron')}>Cameron Test</button>
              <button className="nav-link" disabled>Study Tech</button>
            </div>
          </nav>
        </div>
      </header>

      <main className="main-content container">
        {currentView === 'home' && (
          <div className="hero-section">
            <h2>Ismerd meg önmagad!</h2>
            <p className="hero-subtitle">Fedezd fel tanulási stílusodat és személyiségedet tudományos tesztek segítségével.</p>

            <div className="test-grid">
              <div className="test-card" onClick={() => setCurrentView('kolb')}>
                <h3>Kolb-féle Tanulási Stílus</h3>
                <p>Tudd meg, hogyan dolgozod fel az információkat és hogyan tanulsz a leghatékonyabban.</p>
                <span className="start-btn">Teszt kitöltése &rarr;</span>
              </div>
              {/* More cards will go here */}
            </div>
          </div>
        )}

        {currentView === 'kolb' && (
          <KolbTest />
        )}

        {currentView === 'cameron' && (
          <CameronTest />
        )}
      </main>
    </div>
  );
}

export default App;
