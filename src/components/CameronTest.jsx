
import { useState, useEffect } from 'react';
import { cameronQuestions, scoringKeys, preferenceThresholds, styleDescriptions } from '../data/cameronQuestions';
import { saveResult } from '../utils/storage';
import './CameronTest.css';

const CameronTest = () => {
    const [selectedAnswers, setSelectedAnswers] = useState(new Set());
    const [showResults, setShowResults] = useState(false);
    const [scores, setScores] = useState({ aktivista: 0, elemzo: 0, elmeleti: 0, pragmatikus: 0 });
    const [preferenceLevels, setPreferenceLevels] = useState({});

    useEffect(() => {
        const handleFill = () => {
            // Select first 20 items for a quick test
            const mockSelected = new Set();
            for (let i = 1; i <= 20; i++) {
                mockSelected.add(i);
            }
            setSelectedAnswers(mockSelected);
        };

        window.addEventListener('fill-test-data', handleFill);
        return () => window.removeEventListener('fill-test-data', handleFill);
    }, []);

    const toggleAnswer = (id) => {
        const newSelected = new Set(selectedAnswers);
        if (newSelected.has(id)) {
            newSelected.delete(id);
        } else {
            newSelected.add(id);
        }
        setSelectedAnswers(newSelected);
    };

    const calculateResults = () => {
        const newScores = { aktivista: 0, elemzo: 0, elmeleti: 0, pragmatikus: 0 };

        selectedAnswers.forEach(id => {
            // Check which category this question belongs to
            for (const [category, keys] of Object.entries(scoringKeys)) {
                if (keys.includes(id)) {
                    newScores[category]++;
                }
            }
        });

        // Determine levels
        const levels = {};
        Object.keys(newScores).forEach(cat => {
            levels[cat] = getPreferenceLevel(cat, newScores[cat]);
        });

        const finalResults = {
            scores: newScores,
            levels
        };

        setScores(newScores);
        setPreferenceLevels(levels);
        saveResult('cameron', finalResults);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getPreferenceLevel = (category, score) => {
        const thresholds = preferenceThresholds[category];
        if (score <= thresholds.veryLow) return "Nagyon alacsony";
        if (score <= thresholds.low) return "Alacsony";
        if (score <= thresholds.moderate) return "Közepes";
        if (score <= thresholds.strong) return "Erős";
        return "Nagyon erős";
    };

    const getPreferenceClass = (category, score) => {
        const thresholds = preferenceThresholds[category];
        if (score <= thresholds.veryLow) return "pref-very-low";
        if (score <= thresholds.low) return "pref-low";
        if (score <= thresholds.moderate) return "pref-moderate";
        if (score <= thresholds.strong) return "pref-strong";
        return "pref-very-strong";
    };

    if (showResults) {
        return (
            <div className="results-container fade-in">
                <h2>Eredményeid - Cameron Tanulási Stílus</h2>

                <div className="scores-grid">
                    {Object.entries(scores).map(([key, score]) => (
                        <div key={key} className={`score-card ${getPreferenceClass(key, score)}`}>
                            <h3>{styleDescriptions[key].title}</h3>
                            <div className="score-value">{score} / 20</div>
                            <div className="preference-label">{getPreferenceLevel(key, score)} preferencia</div>
                        </div>
                    ))}
                </div>

                <div className="descriptions-section">
                    {Object.entries(styleDescriptions).map(([key, data]) => (
                        <div key={key} className="style-block card">
                            <h3>{data.title}</h3>
                            <p>{data.description}</p>

                            <div className="tips-section">
                                <h4>Fejlesztési tippek:</h4>
                                <ul>
                                    {data.developmentTips.map((tip, idx) => (
                                        <li key={idx}>{tip}</li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary" onClick={() => setShowResults(false)}>Újra kitöltöm</button>
            </div>
        );
    }

    return (
        <div className="cameron-test fade-in">
            <div className="instructions card">
                <h3>Útmutató</h3>
                <p>
                    Az alábbiakban 80 állítást talál. Ha egy állítással inkább egyetért, mint nem, jelölje be a mellette lévő négyzetet.
                    Nincs jó vagy rossz válasz. Az eredmények pontossága az Ön őszinteségétől függ.
                </p>
            </div>

            <div className="questions-list">
                {cameronQuestions.map((q) => (
                    <div
                        key={q.id}
                        className={`question-item ${selectedAnswers.has(q.id) ? 'selected' : ''}`}
                        onClick={() => toggleAnswer(q.id)}
                    >
                        <div className="checkbox-wrapper">
                            <input
                                type="checkbox"
                                checked={selectedAnswers.has(q.id)}
                                readOnly // Handled by parent div click
                            />
                            <span className="checkmark"></span>
                        </div>
                        <span className="question-text">{q.id}. {q.text}</span>
                    </div>
                ))}
            </div>

            <div className="actions">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={calculateResults}
                >
                    Eredmény kiszámítása
                </button>
            </div>
        </div>
    );
};

export default CameronTest;
