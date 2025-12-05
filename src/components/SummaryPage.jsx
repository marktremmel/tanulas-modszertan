import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { getAllResults, exportResults } from '../utils/storage';
import { personalityTypes } from '../data/personalityQuestions';
import { learningStyles } from '../data/kolbQuestions';
import './SummaryPage.css';

const SummaryPage = () => {
    const [results, setResults] = useState({});
    const [shareUrl, setShareUrl] = useState('');
    const [showQr, setShowQr] = useState(false);

    useEffect(() => {
        const data = getAllResults();
        setResults(data);

        // Generate share URL (simplified for now, just encodes basic stats)
        const shareData = {
            p: data.personality?.dominantType,
            k: data.kolb?.quadrant,
            t: data.time?.level?.level,
            s: data.study?.efficiency
        };
        const encoded = btoa(JSON.stringify(shareData));
        setShareUrl(`${window.location.origin}?share=${encoded}`);
    }, []);

    const getRPGClass = () => {
        try {
            if (!results.personality?.dominantType) return "Novice Adventurer";
            const type = personalityTypes[results.personality.dominantType]?.name || results.personality.dominantType;
            const kolb = results.kolb?.quadrant ? results.kolb.quadrant.split(' ')[0] : "";
            return `${kolb} ${type}`;
        } catch (e) {
            console.error("Error generating RPG class:", e);
            return "Adventurer";
        }
    };

    const getLevel = () => {
        try {
            if (!results.time?.level) return 1;
            const map = { "I": 1, "II": 5, "III": 10, "IV": 15, "V": 20 };
            return map[results.time.level.level] || 1;
        } catch (e) {
            return 1;
        }
    };

    const getStats = () => {
        try {
            return {
                INT: results.study ? Math.round(results.study.efficiency) : 0,
                WIS: results.kolb ? 85 : 0,
                CHA: results.cameron ? 85 : 0,
                DEX: results.time ? Math.round((results.time.totalScore / 240) * 100) : 0
            };
        } catch (e) {
            return { INT: 0, WIS: 0, CHA: 0, DEX: 0 };
        }
    };

    const stats = getStats();
    const hasAnyResults = results && Object.keys(results).length > 0;

    if (!results) return <div>Loading...</div>;

    return (
        <div className="summary-page fade-in">
            <h2>Összesített Eredmények</h2>

            {!hasAnyResults ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3>Még nincsenek eredmények</h3>
                    <p>Tölts ki legalább egy tesztet, hogy lásd az összesítést!</p>
                </div>
            ) : (
                <>
                    <div className="rpg-card">
                        <div className="rpg-header">
                            <div className="avatar-placeholder">
                                {results.personality?.dominantType ? results.personality.dominantType[0].toUpperCase() : "?"}
                            </div>
                            <div className="rpg-info">
                                <h3>{getRPGClass()}</h3>
                                <div className="rpg-level">Level {getLevel()}</div>
                            </div>
                        </div>

                        <div className="rpg-stats">
                            <div className="stat-row">
                                <span className="stat-label">INT (Tanulás):</span>
                                <div className="stat-bar"><div style={{ width: `${stats.INT}%` }}></div></div>
                                <span className="stat-val">{stats.INT}</span>
                            </div>
                            <div className="stat-row">
                                <span className="stat-label">DEX (Idő):</span>
                                <div className="stat-bar"><div style={{ width: `${stats.DEX}%` }}></div></div>
                                <span className="stat-val">{stats.DEX}</span>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-grid">
                        <div className="dash-card">
                            <h4>Kolb Stílus</h4>
                            <p>{results.kolb?.quadrant || "Nincs adat"}</p>
                        </div>
                        <div className="dash-card">
                            <h4>Cameron Stílus</h4>
                            <p>{results.cameron ? "Kitöltve" : "Nincs adat"}</p>
                        </div>
                        <div className="dash-card">
                            <h4>Tanulási Hatékonyság</h4>
                            <p>{results.study ? `${Math.round(results.study.efficiency)}%` : "Nincs adat"}</p>
                        </div>
                        <div className="dash-card">
                            <h4>Időgazdálkodás</h4>
                            <p>{results.time?.level ? `${results.time.level.level} szint` : "Nincs adat"}</p>
                        </div>
                        <div className="dash-card">
                            <h4>Személyiség</h4>
                            <p>{results.personality?.dominantType ? personalityTypes[results.personality.dominantType]?.name : "Nincs adat"}</p>
                        </div>
                    </div>

                    <div className="actions-row">
                        <button className="btn btn-secondary" onClick={exportResults}>
                            💾 Eredmények Mentése (JSON)
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowQr(!showQr)}>
                            📱 Megosztás QR Kóddal
                        </button>
                    </div>

                    {showQr && (
                        <div className="qr-modal">
                            <div className="qr-content">
                                <h3>Szkenneld be az eredményeid megosztásához!</h3>
                                <div className="qr-wrapper">
                                    <QRCode value={shareUrl} />
                                </div>
                                <p className="share-url">{shareUrl}</p>
                                <button className="btn btn-small" onClick={() => setShowQr(false)}>Bezárás</button>
                            </div>
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default SummaryPage;
