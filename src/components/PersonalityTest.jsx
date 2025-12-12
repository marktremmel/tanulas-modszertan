import { useState, useEffect } from 'react';
import { personalityQuestions, personalityTypes } from '../data/personalityQuestions';
import { saveResult } from '../utils/storage';
import './PersonalityTest.css';

const PersonalityTest = () => {
    const [answers, setAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [scores, setScores] = useState({ szangvinikus: 0, kolerikus: 0, melankolikus: 0, flegmatikus: 0 });
    const [dominantType, setDominantType] = useState(null);

    useEffect(() => {
        const handleFill = () => {
            const mockAnswers = {};
            personalityQuestions.forEach(q => {
                mockAnswers[q.id] = q.options[0].type;
            });
            setAnswers(mockAnswers);
        };

        window.addEventListener('fill-test-data', handleFill);
        return () => window.removeEventListener('fill-test-data', handleFill);
    }, []);

    const handleSelect = (questionId, type) => {
        setAnswers(prev => ({
            ...prev,
            [questionId]: type
        }));
    };

    const calculateResults = () => {
        const newScores = { szangvinikus: 0, kolerikus: 0, melankolikus: 0, flegmatikus: 0 };

        Object.values(answers).forEach(type => {
            if (newScores[type] !== undefined) {
                newScores[type]++;
            }
        });

        // Find dominant type
        let maxScore = -1;
        let domType = null;
        Object.entries(newScores).forEach(([type, score]) => {
            if (score > maxScore) {
                maxScore = score;
                domType = type;
            }
        });

        setScores(newScores);
        setDominantType(domType);
        saveResult('personality', {
            scores: newScores,
            dominantType: domType
        });
        setShowResults(true);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    const isFormComplete = () => {
        return personalityQuestions.every(q => answers[q.id]);
    };

    if (showResults) {
        return (
            <div className="results-container fade-in">
                <h2>Eredményeid - Személyiségteszt</h2>

                <div className="dominant-card card">
                    <h3>Domináns típusod: {personalityTypes[dominantType]?.name}</h3>
                    <p className="dominant-desc">
                        Az eredményeid alapján a te személyiségedben a <strong>{personalityTypes[dominantType]?.name}</strong> vonások a legerősebbek.
                    </p>
                </div>

                <div className="scores-grid">
                    {Object.entries(scores).map(([type, score]) => (
                        <div key={type} className={`score-card ${type === dominantType ? 'dominant' : ''}`}>
                            <h4>{personalityTypes[type].name}</h4>
                            <div className="score-value">{score} / 40</div>
                            <div className="progress-bar-container">
                                <div
                                    className="progress-bar"
                                    style={{ width: `${(score / 40) * 100}%` }}
                                ></div>
                            </div>
                        </div>
                    ))}
                </div>

                <div className="type-descriptions">
                    {Object.entries(personalityTypes).map(([key, data]) => (
                        <div key={key} className={`type-block card ${key === dominantType ? 'highlight' : ''}`}>
                            <h3>{data.name}</h3>
                            <div className="traits-grid">
                                <div className="strengths">
                                    <h4>Erősségek</h4>
                                    <ul>
                                        {data.strengths.map((s, i) => <li key={i}>{s}</li>)}
                                    </ul>
                                </div>
                                <div className="weaknesses">
                                    <h4>Gyengeségek</h4>
                                    <ul>
                                        {data.weaknesses.map((w, i) => <li key={i}>{w}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                <button className="btn btn-primary" onClick={() => setShowResults(false)}>Újra kitöltöm</button>
            </div>
        );
    }

    return (
        <div className="personality-test fade-in">
            <div className="instructions card">
                <h3>Útmutató</h3>
                <p>
                    A sorok mindegyikében 4 szó található. Jelölje be azt, amelyiket a legjellemzőbbnek érzi saját magára!
                    Haladjon végig mind a 40 soron, ügyelve arra, hogy minden sorhoz kerüljön egy jelölés.
                </p>
            </div>

            <div className="questions-list">
                {personalityQuestions.map((q) => (
                    <div key={q.id} className="question-row-p card">
                        <div className="q-num">{q.id}.</div>
                        <div className="options-grid-p">
                            {q.options.map((opt, idx) => (
                                <button
                                    key={idx}
                                    className={`word-btn ${answers[q.id] === opt.type ? 'selected' : ''}`}
                                    onClick={() => handleSelect(q.id, opt.type)}
                                >
                                    {opt.text}
                                </button>
                            ))}
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

export default PersonalityTest;
