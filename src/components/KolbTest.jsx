import { useState, useEffect } from 'react';
import { kolbQuestions, learningStyles } from '../data/kolbQuestions';
import { saveResult } from '../utils/storage';
import './KolbTest.css';

const KolbTest = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [scores, setScores] = useState({ A: 0, B: 0, C: 0, D: 0 });
    const [coordinates, setCoordinates] = useState({ x: 0, y: 0 });
    const [results, setResults] = useState(null);

    useEffect(() => {
        const handleFill = () => {
            const mockAnswers = {};
            kolbQuestions.forEach(q => {
                // Valid pattern: 1, 2, 3, 4 for options A, B, C, D
                mockAnswers[q.id] = { A: 1, B: 2, C: 3, D: 4 };
            });
            setAnswers(mockAnswers);
        };

        window.addEventListener('fill-test-data', handleFill);
        return () => window.removeEventListener('fill-test-data', handleFill);
    }, []);

    const handleRankChange = (questionId, optionId, value) => {
        const rank = parseInt(value);
        setAnswers(prev => ({
            ...prev,
            [questionId]: {
                ...prev[questionId],
                [optionId]: isNaN(rank) ? '' : rank
            }
        }));
    };

    const validateRow = (questionId) => {
        const rowAnswers = answers[questionId] || {};
        const values = Object.values(rowAnswers).filter(v => v !== '' && v >= 1 && v <= 4);
        if (values.length !== 4) return false;
        const uniqueValues = new Set(values);
        return uniqueValues.size === 4;
    };

    const isFormValid = () => {
        return kolbQuestions.every(q => validateRow(q.id));
    };

    const calculateResults = () => {
        const newScores = { A: 0, B: 0, C: 0, D: 0 };

        kolbQuestions.forEach(q => {
            const row = answers[q.id];
            if (row) {
                Object.keys(row).forEach(key => {
                    newScores[key] += row[key] || 0;
                });
            }
        });

        setScores(newScores);

        // Coordinate calculation based on uploaded image:
        // X = Passive (B) - Active (D)
        // Y = Concrete (A) - Abstract (C)
        const xCoord = newScores.B - newScores.D;
        const yCoord = newScores.A - newScores.C;

        setCoordinates({ x: xCoord, y: yCoord }); // Keep for backward compatibility if needed, or remove if `results` state is sufficient
        const quadrant = getLearningStyle(xCoord, yCoord);

        const finalResults = {
            scores: newScores,
            coordinates: { x: xCoord, y: yCoord },
            quadrant
        };
        setResults(finalResults);
        saveResult('kolb', finalResults);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const getLearningStyle = (x, y) => {
        // Top-Right (Y+, X+): Concrete + Passive -> Diverging
        if (x >= 0 && y >= 0) return "Diverging (Divergens) - A & B";
        // Bottom-Right (Y-, X+): Abstract + Passive -> Assimilating
        if (x >= 0 && y < 0) return "Assimilating (Asszimilátor) - C & B";
        // Bottom-Left (Y-, X-): Abstract + Active -> Converging
        if (x < 0 && y < 0) return "Converging (Konvergens) - C & D";
        // Top-Left (Y+, X-): Concrete + Active -> Accommodating
        if (x < 0 && y >= 0) return "Accommodating (Akkomodátor) - A & D";
        return "Balanced";
    };

    if (showResults) {
        const style = getLearningStyle(coordinates.x, coordinates.y);

        return (
            <div className="results-container fade-in">
                <h2>Eredményeid</h2>

                <div className="scores-grid">
                    <div className="score-card">
                        <h3>A - Konkrét Tapasztalat</h3>
                        <div className="score-value">{scores.A}</div>
                    </div>
                    <div className="score-card">
                        <h3>B - Tudatos Megfigyelés</h3>
                        <div className="score-value">{scores.B}</div>
                    </div>
                    <div className="score-card">
                        <h3>C - Elvont Fogalomalkotás</h3>
                        <div className="score-value">{scores.C}</div>
                    </div>
                    <div className="score-card">
                        <h3>D - Aktív Kísérletezés</h3>
                        <div className="score-value">{scores.D}</div>
                    </div>
                </div>

                <div className="chart-section">
                    <h3>Tanulási Stílus Rács</h3>
                    <p><strong>{style}</strong></p>
                    <p className="calc-details">
                        X tengely (B - D): {coordinates.x} <br />
                        Y tengely (A - C): {coordinates.y}
                    </p>

                    <div className="coordinate-system">
                        {/* Simple SVG Chart */}
                        <svg viewBox="0 0 400 400" className="chart-svg">
                            {/* Grid lines */}
                            <line x1="200" y1="0" x2="200" y2="400" stroke="#cbd5e1" strokeWidth="2" />
                            <line x1="0" y1="200" x2="400" y2="200" stroke="#cbd5e1" strokeWidth="2" />

                            {/* Labels */}
                            <text x="200" y="20" className="chart-label" textAnchor="middle" fontWeight="bold">(+) KONKRÉT (A)</text>
                            <text x="200" y="390" className="chart-label" textAnchor="middle" fontWeight="bold">(-) ELVONT (C)</text>
                            <text x="10" y="200" className="chart-label" textAnchor="start" fontWeight="bold">(-) AKTÍV (D)</text>
                            <text x="390" y="200" className="chart-label" textAnchor="end" fontWeight="bold">(+) PASSZÍV (B)</text>

                            {/* Quadrant Labels */}
                            <text x="300" y="100" className="quadrant-label">DIVERGENS</text>
                            <text x="300" y="300" className="quadrant-label">ASSZIMILÁTOR</text>
                            <text x="100" y="300" className="quadrant-label">KONVERGENS</text>
                            <text x="100" y="100" className="quadrant-label">AKKOMODÁTOR</text>

                            {/* Point */}
                            {/* 
                               Center is 200, 200. 
                               X positive is Right. 
                               Y positive is Top (SVG Y is down, so we subtract Y).
                            */}
                            <circle
                                cx={200 + (coordinates.x * 5)}
                                cy={200 - (coordinates.y * 5)}
                                r="8"
                                fill="#6366f1"
                                stroke="white"
                                strokeWidth="2"
                            />
                        </svg>
                    </div>
                </div>

                <div className="style-description">
                    <h3>Domináns Tanulási Módok</h3>
                    <div className="modes-list">
                        {Object.entries(learningStyles).map(([key, mode]) => (
                            <div key={key} className="mode-item">
                                <h4>{mode.title} (Pontszám: {scores[key]})</h4>
                                <p>{mode.description}</p>
                            </div>
                        ))}
                    </div>
                </div>

                <button className="btn btn-primary" onClick={() => setShowResults(false)}>Újra kitöltöm</button>
            </div>
        );
    }

    return (
        <div className="kolb-test fade-in">
            <div className="instructions card">
                <h3>Útmutató</h3>
                <p>
                    Az alábbiakban 12 mondatot talál, mindegyiknek 4 befejezése van.
                    Rangsorolja a befejezéseket aszerint, hogy mennyire jellemzőek Önre tanulás közben!
                </p>
                <ul>
                    <li><strong>4</strong> = legjobban jellemző</li>
                    <li><strong>3</strong> = második legjobban jellemző</li>
                    <li><strong>2</strong> = harmadik legjobban jellemző</li>
                    <li><strong>1</strong> = legkevésbé jellemző</li>
                </ul>
                <p className="warning-text">
                    Figyelem: Minden sorban minden számot (1, 2, 3, 4) pontosan egyszer használhat fel!
                </p>
            </div>

            <div className="questions-list">
                {kolbQuestions.map((q) => {
                    const isValid = validateRow(q.id);
                    return (
                        <div key={q.id} id={`question-${q.id}`} className={`question-card card ${isValid ? 'valid' : 'invalid'}`}>
                            <h4>{q.id}. {q.prompt}</h4>
                            <div className="options-grid">
                                {q.options.map((opt) => (
                                    <div key={opt.id} className="option-row">
                                        <div className="input-wrapper">
                                            <input
                                                type="number"
                                                min="1"
                                                max="4"
                                                value={answers[q.id]?.[opt.id] || ''}
                                                onChange={(e) => handleRankChange(q.id, opt.id, e.target.value)}
                                                className={`rank-input ${answers[q.id]?.[opt.id] ? 'filled' : ''}`}
                                            />
                                            <span className="option-id">{opt.id}</span>
                                        </div>
                                        <span className="option-text">{opt.text}</span>
                                    </div>
                                ))}
                            </div>
                            {!isValid && Object.keys(answers[q.id] || {}).length > 0 && (
                                <div className="error-msg">Használja az 1, 2, 3, 4 számokat, mindegyiket egyszer!</div>
                            )}
                        </div>
                    );
                })}
            </div>

            <div className="actions">
                <button
                    className="btn btn-primary btn-lg"
                    onClick={() => {
                        if (isFormValid()) {
                            calculateResults();
                        } else {
                            // Find first invalid row for better feedback
                            const firstInvalid = kolbQuestions.find(q => !validateRow(q.id));
                            if (firstInvalid) {
                                alert(`Hiba a ${firstInvalid.id}. kérdésnél: Kérjük, használja az 1, 2, 3, 4 számokat pontosan egyszer!`);
                                const element = document.getElementById(`question-${firstInvalid.id}`);
                                if (element) element.scrollIntoView({ behavior: 'smooth', block: 'center' });
                            } else {
                                alert("Kérjük, töltsön ki minden sort helyesen!");
                            }
                        }
                    }}
                >
                    Eredmény kiszámítása
                </button>
            </div>
        </div>
    );
};

export default KolbTest;
