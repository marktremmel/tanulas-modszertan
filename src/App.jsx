import { useState, useEffect } from 'react';
import KolbTest from './components/KolbTest';
import CameronTest from './components/CameronTest';
import StudyTechniquesTest from './components/StudyTechniquesTest';
import TimeManagementTest from './components/TimeManagementTest';
import PersonalityTest from './components/PersonalityTest';
import SummaryPage from './components/SummaryPage';
import DebugFab from './components/DebugFab';
import { getAllResults } from './utils/storage';
import './index.css';

function App() {
  const [currentView, setCurrentView] = useState('home');
  const [completedTests, setCompletedTests] = useState({});

  useEffect(() => {
    const results = getAllResults();
    setCompletedTests(results);
  }, [currentView]); // Refresh when view changes

  const isCompleted = (id) => !!completedTests[id];

  return (
    <div className="App">
      <nav>
        <h1 className="logo" onClick={() => setCurrentView('home')}>Self-Discovery Hub</h1>
        <div className="nav-links">
          <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>Kezdőlap</button>
          <button className={`nav-link ${currentView === 'summary' ? 'active' : ''}`} onClick={() => setCurrentView('summary')}>Összesítés</button>
        </div>
      </nav>
      <main>
        {currentView === 'home' && (
          <div className="home-container fade-in">
            <div className="hero-section">
              <h2>Ismerd meg önmagad!</h2>
              <p>Válassz egy tesztet az alábbiak közül, és indulj el az önismeret útján.</p>
            </div>

            <div className="tests-grid">
              <div className={`test-card ${isCompleted('kolb') ? 'completed' : ''}`} onClick={() => setCurrentView('kolb')}>
                <div className="card-status">{isCompleted('kolb') ? '✅ Kitöltve' : '⭕ Kitöltetlen'}</div>
                <h3>Kolb-féle Tanulási Stílus</h3>
                <p>Tudd meg, hogyan dolgozod fel az információkat és milyen tanulási mód illik hozzád leginkább.</p>
              </div>

              <div className={`test-card ${isCompleted('cameron') ? 'completed' : ''}`} onClick={() => setCurrentView('cameron')}>
                <div className="card-status">{isCompleted('cameron') ? '✅ Kitöltve' : '⭕ Kitöltetlen'}</div>
                <h3>Cameron-féle Kultúra Teszt</h3>
                <p>Fedezd fel a szervezeti kultúrához való viszonyodat és preferenciáidat.</p>
              </div>

              <div className={`test-card ${isCompleted('study') ? 'completed' : ''}`} onClick={() => setCurrentView('study')}>
                <div className="card-status">{isCompleted('study') ? '✅ Kitöltve' : '⭕ Kitöltetlen'}</div>
                <h3>Tanulási Technikák</h3>
                <p>Mérd fel jelenlegi tanulási szokásaid hatékonyságát.</p>
              </div>

              <div className={`test-card ${isCompleted('time') ? 'completed' : ''}`} onClick={() => setCurrentView('time')}>
                <div className="card-status">{isCompleted('time') ? '✅ Kitöltve' : '⭕ Kitöltetlen'}</div>
                <h3>Időgazdálkodás</h3>
                <p>Elemezd, hogyan osztod be az idődet és hol tudnál fejlődni.</p>
              </div>

              <div className={`test-card ${isCompleted('personality') ? 'completed' : ''}`} onClick={() => setCurrentView('personality')}>
                <div className="card-status">{isCompleted('personality') ? '✅ Kitöltve' : '⭕ Kitöltetlen'}</div>
                <h3>Személyiségteszt</h3>
                <p>Ismerd meg domináns személyiségjegyeidet (Szangvinikus, Kolerikus, stb.).</p>
              </div>
            </div>
          </div>
        )}

        {currentView === 'kolb' && (
          <KolbTest />
        )}

        {currentView === 'cameron' && (
          <CameronTest />
        )}

        {currentView === 'study' && (
          <StudyTechniquesTest />
        )}

        {currentView === 'time' && (
          <TimeManagementTest />
        )}

        {currentView === 'personality' && (
          <PersonalityTest />
        )}

        {currentView === 'summary' && (
          <SummaryPage />
        )}
      </main>
      <DebugFab />
    </div>
  );
}

export default App;
