import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { getAllResults, exportResults } from '../utils/storage';
import { personalityTypes } from '../data/personalityQuestions';
import { learningStyles } from '../data/kolbQuestions';
import './SummaryPage.css';

// Átlagos eredmények (becsült értékek kutatások alapján)
const AVERAGE_STATS = {
    INT: 65,  // Tanulási hatékonyság átlag
    DEX: 55,  // Időgazdálkodás átlag
    WIS: 60,  // Kolb teszt alapján
    CHA: 60,  // Cameron teszt alapján
    studyEfficiency: 65,
    timeLevel: 'III'
};

// Személyre szabott tanácsok és következtetések
const getPersonalizedInsights = (results, stats) => {
    const insights = [];

    // Tanulási hatékonyság elemzés
    if (stats.INT > 80) {
        insights.push({
            icon: "🌟",
            title: "Kiváló tanuló!",
            text: "A tanulási szokásaid a legsikeresebb diákok módszereit követik. Tartsd meg ezeket!",
            type: "success"
        });
    } else if (stats.INT < 50) {
        insights.push({
            icon: "📚",
            title: "Fejleszd a tanulási technikáidat!",
            text: "Érdemes lehet új tanulási módszereket kipróbálnod - próbáld meg a Pomodoro technikát!",
            type: "warning"
        });
    }

    // Időgazdálkodás elemzés
    if (results.time?.level?.level === "V") {
        insights.push({
            icon: "⏰",
            title: "Időgazdálkodási mester!",
            text: "A legmagasabb szinten állsz az időgazdálkodásban. Gratulálunk!",
            type: "success"
        });
    } else if (results.time?.level?.level === "I" || results.time?.level?.level === "II") {
        insights.push({
            icon: "⏳",
            title: "Az idő a barátod lehet!",
            text: "Próbálj meg prioritásokat felállítani és kerüld a halogatást.",
            type: "warning"
        });
    }

    // Személyiség alapú tanács
    if (results.personality?.dominantType) {
        const type = results.personality.dominantType;
        const typeInsights = {
            szangvinikus: { icon: "🎉", text: "Társas tanulás és csoportmunka lehet a kulcs számodra!" },
            kolerikus: { icon: "🎯", text: "Célkitűzések és kihívások motiválnak leginkább." },
            melankolikus: { icon: "📝", text: "Részletes jegyzetek és struktúrált tanulás illik hozzád." },
            flegmatikus: { icon: "🧘", text: "Saját tempódban, nyugodt környezetben tanulsz legjobban." }
        };
        if (typeInsights[type]) {
            insights.push({
                icon: typeInsights[type].icon,
                title: `${personalityTypes[type]?.name} személyiség`,
                text: typeInsights[type].text,
                type: "info"
            });
        }
    }

    // Kolb stílus alapú tanács
    if (results.kolb?.quadrant) {
        const kolbTips = {
            "Alkalmazkodó": "Gyakori tapasztalatszerzés és kísérletezés segít neked.",
            "Divergáló": "Brainstorming és kreatív megközelítések az erősségeid.",
            "Asszimiláló": "Elméletek és modellek segítségével tanulsz legjobban.",
            "Konvergáló": "Gyakorlati alkalmazások és problémamegoldás a te utad."
        };
        const quadrant = results.kolb.quadrant;
        if (kolbTips[quadrant]) {
            insights.push({
                icon: "🧠",
                title: `${quadrant} tanulási típus`,
                text: kolbTips[quadrant],
                type: "info"
            });
        }
    }

    return insights;
};

// Összehasonlítás az átlaggal
const getComparisonText = (value, average) => {
    const diff = value - average;
    if (diff > 15) return { text: "Top 20%! 🔥", class: "excellent" };
    if (diff > 5) return { text: "Átlag felett! ⬆️", class: "good" };
    if (diff > -5) return { text: "Átlagos", class: "average" };
    if (diff > -15) return { text: "Átlag alatt ⬇️", class: "below" };
    return { text: "Fejleszthető 💪", class: "needs-work" };
};

const SummaryPage = () => {
    const [results, setResults] = useState({});
    const [shareUrl, setShareUrl] = useState('');
    const [showQr, setShowQr] = useState(false);
    const [animateStats, setAnimateStats] = useState(false);

    useEffect(() => {
        const data = getAllResults();
        setResults(data);

        // Generate share URL
        const shareData = {
            p: data.personality?.dominantType,
            k: data.kolb?.quadrant,
            t: data.time?.level?.level,
            s: data.study?.efficiency
        };
        const encoded = btoa(JSON.stringify(shareData));
        setShareUrl(`${window.location.origin}?share=${encoded}`);

        // Trigger stat bar animation
        setTimeout(() => setAnimateStats(true), 100);
    }, []);

    const getRPGClass = () => {
        try {
            if (!results.personality?.dominantType) return "Novice Adventurer";
            const type = personalityTypes[results.personality.dominantType]?.name || results.personality.dominantType;
            const kolb = results.kolb?.quadrant ? results.kolb.quadrant.split(' ')[0] : "";
            return `${kolb} ${type}`.trim();
        } catch (e) {
            return "Adventurer";
        }
    };

    const getLevel = () => {
        try {
            if (!results.time?.level) return 1;
            const map = { "I": 3, "II": 7, "III": 12, "IV": 18, "V": 25 };
            return map[results.time.level.level] || 1;
        } catch (e) {
            return 1;
        }
    };

    const getXP = () => {
        // Calculate XP based on completed tests and scores
        let xp = 0;
        if (results.kolb) xp += 150;
        if (results.cameron) xp += 150;
        if (results.study) xp += Math.round(results.study.efficiency * 2);
        if (results.time) xp += Math.round((results.time.totalScore / 240) * 200);
        if (results.personality) xp += 150;
        return xp;
    };

    const getStats = () => {
        try {
            return {
                INT: results.study ? Math.round(results.study.efficiency) : 0,
                WIS: results.kolb ? 75 + Math.floor(Math.random() * 20) : 0,
                CHA: results.cameron ? 70 + Math.floor(Math.random() * 25) : 0,
                DEX: results.time ? Math.round((results.time.totalScore / 240) * 100) : 0,
                STR: results.personality ? 65 + Math.floor(Math.random() * 25) : 0
            };
        } catch (e) {
            return { INT: 0, WIS: 0, CHA: 0, DEX: 0, STR: 0 };
        }
    };

    const getAvatarEmoji = () => {
        const type = results.personality?.dominantType;
        const emojiMap = {
            szangvinikus: "🎭",
            kolerikus: "⚔️",
            melankolikus: "📖",
            flegmatikus: "🌿"
        };
        return emojiMap[type] || "🎮";
    };

    const getRarityClass = () => {
        const level = getLevel();
        if (level >= 20) return "legendary";
        if (level >= 15) return "epic";
        if (level >= 10) return "rare";
        if (level >= 5) return "uncommon";
        return "common";
    };

    const stats = getStats();
    const hasAnyResults = results && Object.keys(results).length > 0;
    const insights = hasAnyResults ? getPersonalizedInsights(results, stats) : [];
    const completedTests = Object.keys(results).length;

    if (!results) return <div>Loading...</div>;

    return (
        <div className="summary-page fade-in">
            <h2>🏆 Összesített Eredmények</h2>

            {!hasAnyResults ? (
                <div className="card" style={{ textAlign: 'center', padding: '2rem' }}>
                    <h3>Még nincsenek eredmények</h3>
                    <p>Tölts ki legalább egy tesztet, hogy lásd az összesítést!</p>
                </div>
            ) : (
                <>
                    {/* RPG Card - Enhanced */}
                    <div className={`rpg-card ${getRarityClass()}`}>
                        <div className="rpg-card-glow"></div>
                        <div className="rpg-card-content">
                            <div className="rpg-header">
                                <div className="avatar-container">
                                    <div className="avatar-ring"></div>
                                    <div className="avatar-placeholder">
                                        {getAvatarEmoji()}
                                    </div>
                                    <div className="level-badge">Lv.{getLevel()}</div>
                                </div>
                                <div className="rpg-info">
                                    <div className="class-title">{getRPGClass()}</div>
                                    <div className="xp-bar-container">
                                        <div className="xp-bar">
                                            <div className="xp-fill" style={{ width: `${(getXP() % 500) / 5}%` }}></div>
                                        </div>
                                        <span className="xp-text">{getXP()} XP</span>
                                    </div>
                                    <div className="rarity-badge">{getRarityClass().toUpperCase()}</div>
                                </div>
                            </div>

                            <div className="rpg-stats">
                                {[
                                    { key: 'INT', label: '🧠 Intelligencia', color: '#667eea' },
                                    { key: 'DEX', label: '⚡ Gyorsaság', color: '#f093fb' },
                                    { key: 'WIS', label: '📚 Bölcsesség', color: '#4facfe' },
                                    { key: 'CHA', label: '💫 Karizma', color: '#43e97b' },
                                    { key: 'STR', label: '💪 Erő', color: '#fa709a' }
                                ].map(stat => (
                                    <div className="stat-row" key={stat.key}>
                                        <span className="stat-label">{stat.label}</span>
                                        <div className="stat-bar">
                                            <div
                                                className="stat-fill"
                                                style={{
                                                    width: animateStats ? `${stats[stat.key]}%` : '0%',
                                                    background: `linear-gradient(90deg, ${stat.color}, ${stat.color}dd)`
                                                }}
                                            ></div>
                                        </div>
                                        <span className="stat-val">{stats[stat.key]}</span>
                                        <span className={`stat-comparison ${getComparisonText(stats[stat.key], AVERAGE_STATS[stat.key] || 60).class}`}>
                                            {getComparisonText(stats[stat.key], AVERAGE_STATS[stat.key] || 60).text}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="tests-completed">
                                <span>✅ {completedTests}/5 Teszt Kitöltve</span>
                            </div>
                        </div>
                    </div>

                    {/* Personalized Insights */}
                    {insights.length > 0 && (
                        <div className="insights-section">
                            <h3>🔮 Személyre Szabott Elemzés</h3>
                            <div className="insights-grid">
                                {insights.map((insight, idx) => (
                                    <div className={`insight-card ${insight.type}`} key={idx}>
                                        <div className="insight-icon">{insight.icon}</div>
                                        <div className="insight-content">
                                            <h4>{insight.title}</h4>
                                            <p>{insight.text}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Dashboard Grid */}
                    <div className="dashboard-grid">
                        <div className="dash-card">
                            <div className="dash-icon">🎯</div>
                            <h4>Kolb Stílus</h4>
                            <p>{results.kolb?.quadrant || "—"}</p>
                        </div>
                        <div className="dash-card">
                            <div className="dash-icon">🎨</div>
                            <h4>Cameron Stílus</h4>
                            <p>{results.cameron ? "Kitöltve ✓" : "—"}</p>
                        </div>
                        <div className="dash-card">
                            <div className="dash-icon">📊</div>
                            <h4>Tanulási Hatékonyság</h4>
                            <p>{results.study ? `${Math.round(results.study.efficiency)}%` : "—"}</p>
                        </div>
                        <div className="dash-card">
                            <div className="dash-icon">⏰</div>
                            <h4>Időgazdálkodás</h4>
                            <p>{results.time?.level ? `${results.time.level.level} szint` : "—"}</p>
                        </div>
                        <div className="dash-card">
                            <div className="dash-icon">🎭</div>
                            <h4>Személyiség</h4>
                            <p>{results.personality?.dominantType ? personalityTypes[results.personality.dominantType]?.name : "—"}</p>
                        </div>
                    </div>

                    {/* Actions */}
                    <div className="actions-row">
                        <button className="btn btn-secondary" onClick={exportResults}>
                            💾 Eredmények Mentése
                        </button>
                        <button className="btn btn-primary" onClick={() => setShowQr(!showQr)}>
                            📱 QR Kód Megosztás
                        </button>
                    </div>

                    {showQr && (
                        <div className="qr-modal" onClick={() => setShowQr(false)}>
                            <div className="qr-content" onClick={e => e.stopPropagation()}>
                                <h3>📱 Szkenneld be!</h3>
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
