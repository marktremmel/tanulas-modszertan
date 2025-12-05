import { useState, useEffect } from 'react';
import { timeManagementData } from '../data/timeManagementData';
import { saveResult } from '../utils/storage';
import './TimeManagementTest.css';

const TimeManagementTest = () => {
    const [answers, setAnswers] = useState({});
    const [isManager, setIsManager] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState(null);

    useEffect(() => {
        const handleFill = () => {
            const mockAnswers = {};
            timeManagementData.questions.forEach(q => {
                mockAnswers[q.id] = 0; // Select first option
            });
            setAnswers(mockAnswers);
        };

        window.addEventListener('fill-test-data', handleFill);
        return () => window.removeEventListener('fill-test-data', handleFill);
    }, []);

    const { questions, categories, scoring_config, results_logic } = timeManagementData;

    const handleAnswer = (questionId, optionIndex) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: optionIndex
        }));
    };

    const calculateResults = () => {
        let totalScore = 0;
        let basicScore = 0;
        let supplementaryScore = 0;
        const categoryScores = {};

        // Initialize category scores
        categories.forEach(cat => {
            categoryScores[cat.id] = {
                name: cat.name,
                score: 0,
                maxScore: 0,
                type: cat.type
            };
        });

        questions.forEach(q => {
            // Skip supplementary questions if not manager
            if (!isManager && q.id > 48) return;

            const answerIndex = answers[q.id];
            if (answerIndex === undefined) return;

            // Determine points based on polarity
            // Option index 0 corresponds to first option in config
            const selectedOption = scoring_config.options[answerIndex];
            const pointKey = q.polarity === 'positive'
                ? selectedOption.value_key_positive
                : selectedOption.value_key_negative;

            const points = scoring_config.points_mapping[pointKey];

            // Add to totals
            totalScore += points;
            if (q.id <= 48) basicScore += points;
            else supplementaryScore += points;

            // Add to category
            if (categoryScores[q.category_id]) {
                categoryScores[q.category_id].score += points;
                categoryScores[q.category_id].maxScore += 4; // Max points per question is 4
            }
        });

        // Determine Level
        let levelData;
        let logicKey;
        if (isManager) {
            logicKey = 'combined';
            levelData = results_logic.combined.find(l => totalScore >= l.min && totalScore <= l.max);
        } else {
            logicKey = 'basic_only';
            levelData = results_logic.basic_only.find(l => totalScore >= l.min && totalScore <= l.max);
        }

        // Fallback if score is out of range (shouldn't happen with correct logic but good for safety)
        if (!levelData) {
            // If score is lower than min, take lowest level
            const levels = results_logic[logicKey];
            if (totalScore < levels[0].min) levelData = levels[0];
            else levelData = levels[levels.length - 1];
        }

        const finalResults = {
            totalScore,
            basicScore,
            supplementaryScore,
            level: levelData,
            categoryScores
        };

        setResults(finalResults);
        // Assuming saveResult is passed as a prop or available from context
        saveResult('time', finalResults);
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isFormComplete = () => {
        const requiredQuestions = isManager ? questions : questions.filter(q => q.id <= 48);
        return requiredQuestions.every(q => answers[q.id] !== undefined);
    };

    if (showResults) {
        return (
            <div className="results-container fade-in">
                <h2>Eredményeid - Időgazdálkodás</h2>

                <div className="score-summary card">
                    <h3>Időhasznosítási szint: {results.level.level}</h3>
                    <div className="total-score">{results.totalScore} pont</div>
                    {results.level.description && <p className="level-desc">{results.level.description}</p>}
                    <p className="score-range">
                        (Elért pontszám a {results.level.min}-{results.level.max} tartományban)
                    </p>
                </div>

                <div className="category-breakdown">
                    <h3>Részletes eredmények</h3>
                    <div className="category-grid">
                        {Object.values(results.categoryScores)
                            .filter(cat => cat.maxScore > 0)
                            .map(cat => (
                                <div key={cat.name} className="category-card">
                                    <h4>{cat.name}</h4>
                                    <div className="progress-bar-container">
                                        <div
                                            className="progress-bar"
                                            style={{ width: `${(cat.score / cat.maxScore) * 100}%` }}
                                        ></div>
                                    </div>
                                    <div className="cat-score">
                                        {cat.score} / {cat.maxScore} pont ({Math.round((cat.score / cat.maxScore) * 100)}%)
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>

                <button className="btn btn-primary" onClick={() => setShowResults(false)}>Újra kitöltöm</button>
            </div>
        );
    }

    return (
        <div className="time-test fade-in">
            <div className="instructions card">
                <h3>Útmutató</h3>
                <p>
                    Kérjük, jelölje be azt a választ, amelyik a legjobban leírja az Ön véleményét vagy szokásait.
                </p>

                <div className="manager-toggle">
                    <label className="toggle-label">
                        <input
                            type="checkbox"
                            checked={isManager}
                            onChange={(e) => setIsManager(e.target.checked)}
                        />
                        <span className="toggle-text">Vezetői beosztásban dolgozom (Kiegészítő kérdések megjelenítése)</span>
                    </label>
                </div>
            </div>

            <div className="questions-list">
                {questions.map((q) => {
                    if (!isManager && q.id > 48) return null;

                    return (
                        <div key={q.id} className="question-block card">
                            <div className="q-header">
                                <span className="q-id">{q.id}.</span>
                                <span className="q-text">{q.text}</span>
                            </div>
                            <div className="options-grid">
                                {scoring_config.options.map((opt, idx) => (
                                    <label key={idx} className={`option-label ${answers[q.id] === idx ? 'selected' : ''}`}>
                                        <input
                                            type="radio"
                                            name={`q-${q.id}`}
                                            checked={answers[q.id] === idx}
                                            onChange={() => handleAnswer(q.id, idx)}
                                        />
                                        <span className="radio-custom"></span>
                                        <span className="opt-text">{opt.label}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    );
                })}
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

export default TimeManagementTest;
