import { useState, useEffect } from 'react';
import { studyQuestions } from '../data/studyTechniquesQuestions';
import { saveResult } from '../utils/storage';
import './StudyTechniquesTest.css';

const StudyTechniquesTest = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [efficiency, setEfficiency] = useState(0);

    useEffect(() => {
        const handleFill = () => {
            const mockAnswers = {};
            studyQuestions.forEach(q => {
                mockAnswers[q.id] = 1;
            });
            setAnswers(mockAnswers);
        };

        window.addEventListener('fill-test-data', handleFill);
        return () => window.removeEventListener('fill-test-data', handleFill);
    }, []);

    const handleAnswer = (id, value) => {
        setAnswers(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const calculateResults = () => {
        let matches = 0;
        studyQuestions.forEach(q => {
            if (answers[q.id] === q.ideal) {
                matches++;
            }
        });

        const finalEfficiency = (matches / studyQuestions.length) * 100;
        setScore(matches);
        setEfficiency(finalEfficiency);

        saveResult('study', {
            score: matches,
            efficiency: finalEfficiency,
            totalQuestions: studyQuestions.length
        });

        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isFormComplete = () => {
        return studyQuestions.every(q => answers[q.id] !== undefined);
    };

    if (showResults) {
        return (
            <div className="results-container fade-in">
                <h2>Eredményeid - Tanulási Technikák</h2>

                <div className="score-summary card">
                    <h3>Munkaszervezési hatásfoka</h3>
                    <div className="efficiency-value">{efficiency.toFixed(1)}%</div>
                    <p>Ön {studyQuestions.length} kérdésből {score} esetben válaszolt úgy, ahogyan a sikeres tanulók.</p>
                </div>

                <div className="improvement-areas">
                    <h3>Fejlesztendő területek</h3>
                    <p>Az alábbi kérdéseknél érdemes változtatnia szokásain:</p>

                    <div className="mismatch-list">
                        {studyQuestions.filter(q => answers[q.id] !== q.ideal).map(q => (
                            <div key={q.id} className="mismatch-item card">
                                <h4>{q.id}. {q.text}</h4>
                                <div className="advice">
                                    <span className="your-answer">Ön válasza: {answers[q.id] === 1 ? 'Igen' : 'Nem'}</span>
                                    <span className="ideal-answer">Javasolt: {q.ideal === 1 ? 'Igen' : 'Nem'}</span>
                                </div>
                            </div>
                        ))}
                        {studyQuestions.every(q => answers[q.id] === q.ideal) && (
                            <p className="perfect-score">Gratulálunk! Tanulási szokásai megegyeznek a legsikeresebb tanulókéval.</p>
                        )}
                    </div>
                </div>

                <button className="btn btn-primary" onClick={() => setShowResults(false)}>Újra kitöltöm</button>
            </div>
        );
    }

    return (
        <div className="study-test fade-in">
            <div className="instructions card">
                <h3>Útmutató</h3>
                <p>
                    A következő kérdéseknél aszerint válaszoljon, ami inkább jellemző Önre.
                </p>
            </div>

            <div className="questions-list">
                {studyQuestions.map((q) => (
                    <div key={q.id} className="question-row">
                        <div className="question-text-wrapper">
                            <span className="q-num">{q.id}.</span>
                            <span className="q-text">{q.text}</span>
                        </div>
                        <div className="options-wrapper">
                            <button
                                className={`option-btn ${answers[q.id] === 1 ? 'selected yes' : ''}`}
                                onClick={() => handleAnswer(q.id, 1)}
                            >
                                Igen
                            </button>
                            <button
                                className={`option-btn ${answers[q.id] === 0 ? 'selected no' : ''}`}
                                onClick={() => handleAnswer(q.id, 0)}
                            >
                                Nem
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            <div className="actions">
                <button
                    className="btn btn-primary btn-lg"
                    disabled={!isFormComplete()}
                    onClick={calculateResults}
                >
                    Eredmény kiszámítása
                </button>
            </div>
        </div>
    );
};

export default StudyTechniquesTest;
