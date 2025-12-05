import { useState, useEffect } from 'react';
import QRCode from 'react-qr-code';
import { getAllResults, exportResults, clearResults } from '../utils/storage';
import { personalityTypes } from '../data/personalityQuestions';
import { learningStyles } from '../data/kolbQuestions';
import './SummaryPage.css';

// Átlagos eredmények - általános kutatási becslések alapján
// Forrás: Oktatási kutatások átlagai diákok körében
const AVERAGE_STATS = {
    INT: 65,  // Tanulási hatékonyság: átlagos diák ~65%
    DEX: 55,  // Időgazdálkodás: legtöbb ember a III. szinten (~55%)
    WIS: 60,  // Tanulási stílus tudatosság
    CHA: 60,  // Szociális készségek átlag
    STR: 60   // Személyiség kiegyensúlyozottság
};

// Funky tippek kategóriánként
const FUNKY_TIPS = {
    aktivista: [
        "🚀 Cselekvés közben tanulsz legjobban - próbálj ki mindent azonnal!",
        "🎲 Unatkozni tilos! Keress új kihívásokat folyamatosan.",
        "🏃 A halogatás a te ellenséged - ugorj fejest a dolgokba!",
        "💡 Brainstorming sessionök = a te szuperképességed"
    ],
    elemzo: [
        "🔍 Te vagy a megfigyelő mester - használd ki!",
        "📊 Adatok és tények a barátaid, gyűjtsd őket szorgalmasan.",
        "🧘 Ne rohanj - a gondolkodási idő számodra aranyat ér.",
        "📝 Jegyzetelj sokat, később hálás leszel magadnak!"
    ],
    elmeleti: [
        "🎓 Elméletek és modellek = a te játszótered!",
        "🔗 Mindig keresd az összefüggéseket, a nagy képet.",
        "📚 Olvasás, kutatás, mélyülés - ez a te utad.",
        "🧩 Logikai rejtvények és rendszerezés a hobbidat kellene legyenek!"
    ],
    pragmatikus: [
        "🛠️ 'Ez működik a gyakorlatban?' - ez legyen a mottód!",
        "🎯 Konkrét célok és azonnali haszon motivál téged.",
        "⚡ Gyors kipróbálás > hosszú tervezgetés neked.",
        "💼 A 'hogyan alkalmazom ezt?' kérdés a kulcs számodra."
    ]
};

// Személyre szabott tanácsok és következtetések
const getPersonalizedInsights = (results, stats, cameronStyles) => {
    const insights = [];

    // Tanulási hatékonyság elemzés
    if (stats.INT > 80) {
        insights.push({
            icon: "🌟",
            title: "Szupersztár tanuló!",
            text: "A te tanulási technikáid a TOP 20%-ba tartoznak! Oszd meg másokkal a titkaidat!",
            type: "success"
        });
    } else if (stats.INT >= 60) {
        insights.push({
            icon: "📈",
            title: "Jó úton jársz!",
            text: "Szilárd tanulási alapjaid vannak. Egy-két apró változtatással még jobb lehetsz!",
            type: "info"
        });
    } else if (stats.INT < 50) {
        insights.push({
            icon: "🎮",
            title: "Level Up szükséges!",
            text: "Próbáld ki a Pomodoro technikát (25 perc tanulás, 5 perc szünet) - game changer!",
            type: "warning"
        });
    }

    // Időgazdálkodás - funky
    if (results.time?.level?.level === "V") {
        insights.push({
            icon: "⚡",
            title: "Time Lord státusz elérve!",
            text: "Az időgazdálkodásod legendás szinten van. Taníthatnád másoknak!",
            type: "success"
        });
    } else if (results.time?.level?.level === "IV") {
        insights.push({
            icon: "🏆",
            title: "Majdnem tökéletes!",
            text: "Nagyon közel vagy a csúcshoz! Még egy kis fókusz és ott vagy.",
            type: "info"
        });
    } else if (results.time?.level?.level === "I" || results.time?.level?.level === "II") {
        insights.push({
            icon: "⏰",
            title: "Procrastination Boss Fight!",
            text: "A halogatás a főellenséged. Tipp: Kezdd a nap legnehezebb feladatával!",
            type: "warning"
        });
    }

    // Cameron stílusok - részletes elemzés
    if (cameronStyles) {
        const dominant = Object.entries(cameronStyles).sort((a, b) => b[1] - a[1])[0];
        if (dominant) {
            const [style, score] = dominant;
            const tips = FUNKY_TIPS[style] || [];
            const randomTip = tips[Math.floor(Math.random() * tips.length)];

            const styleNames = {
                aktivista: "🔥 Aktivista",
                elemzo: "🔬 Elemző",
                elmeleti: "📐 Elméleti",
                pragmatikus: "🛠️ Pragmatikus"
            };

            insights.push({
                icon: styleNames[style]?.split(' ')[0] || "🎯",
                title: `Domináns stílusod: ${styleNames[style]?.split(' ')[1] || style}`,
                text: randomTip || "Használd ki az erősségeidet a tanulásban!",
                type: "info"
            });
        }
    }

    // Személyiség alapú tanács - funkybb
    if (results.personality?.dominantType) {
        const type = results.personality.dominantType;
        const typeInsights = {
            szangvinikus: {
                icon: "🎉",
                title: "Party Animal Learner!",
                text: "Csapatmunka, beszélgetés, vita - így szívod magadba a tudást! Keress tanulótársakat!"
            },
            kolerikus: {
                icon: "⚔️",
                title: "Born Leader!",
                text: "Kihívásokra van szükséged. Állíts fel nehéz célokat és hódítsd meg őket!"
            },
            melankolikus: {
                icon: "📖",
                title: "Deep Thinker!",
                text: "Részletes jegyzetek, csendes hely, mély koncentráció - ez a te zónád!"
            },
            flegmatikus: {
                icon: "🌿",
                title: "Zen Master!",
                text: "Saját tempó, nulla stressz. Ne hagyd, hogy mások siettessenek!"
            }
        };
        if (typeInsights[type]) {
            insights.push({
                icon: typeInsights[type].icon,
                title: typeInsights[type].title,
                text: typeInsights[type].text,
                type: "info"
            });
        }
    }

    // Kolb stílus alapú tanács - kreatívabb
    if (results.kolb?.quadrant) {
        const kolbTips = {
            "Alkalmazkodó": { icon: "🦎", text: "Próbálj ki új dolgokat bátran! A hibákból tanulsz a legtöbbet." },
            "Divergáló": { icon: "🎨", text: "Kreatív projektek és brainstorming = a te szuperképességed!" },
            "Asszimiláló": { icon: "🔮", text: "Elméletek, modellek, nagy kép - te látod át az egészet!" },
            "Konvergáló": { icon: "🎯", text: "Gyakorlati megoldások mestere vagy - alkalmazd a tudást azonnal!" }
        };
        const quadrant = results.kolb.quadrant;
        if (kolbTips[quadrant]) {
            insights.push({
                icon: kolbTips[quadrant].icon,
                title: `${quadrant} Tanulási Ninja`,
                text: kolbTips[quadrant].text,
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
    if (diff > 5) return { text: "Átlag felett ⬆️", class: "good" };
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
        // Use the full current URL (without query params) as the base
        const baseUrl = window.location.href.split('?')[0];
        setShareUrl(`${baseUrl}?share=${encoded}`);

        // Trigger stat bar animation
        setTimeout(() => setAnimateStats(true), 100);
    }, []);

    // Kreatív RPG kaszt generátor a tesztek kombinációja alapján
    const getRPGClass = () => {
        try {
            const personality = results.personality?.dominantType;
            const kolb = results.kolb?.quadrant;
            const cameron = cameronStyles ? Object.entries(cameronStyles).sort((a, b) => b[1] - a[1])[0]?.[0] : null;
            const timeLevel = results.time?.level?.level;

            // Ha nincs elég adat
            if (!personality && !kolb) return "🌱 Novice Adventurer";

            // Fantasy class kombinációk
            const classMatrix = {
                // Személyiség + Kolb kombinációk
                'szangvinikus': {
                    'Alkalmazkodó': '🎭 Chaos Bard',
                    'Divergáló': '✨ Dream Weaver',
                    'Asszimiláló': '📜 Storyteller Sage',
                    'Konvergáló': '🎪 Performance Artist',
                    'default': '🌟 Social Butterfly'
                },
                'kolerikus': {
                    'Alkalmazkodó': '⚔️ Battle Commander',
                    'Divergáló': '🔥 Visionary Warlord',
                    'Asszimiláló': '👑 Strategic Emperor',
                    'Konvergáló': '🛡️ Tactical Crusader',
                    'default': '⚡ Ambitious Leader'
                },
                'melankolikus': {
                    'Alkalmazkodó': '🔮 Mystic Scholar',
                    'Divergáló': '📖 Creative Philosopher',
                    'Asszimiláló': '🧙 Arcane Archivist',
                    'Konvergáló': '⚗️ Precision Alchemist',
                    'default': '🌙 Deep Thinker'
                },
                'flegmatikus': {
                    'Alkalmazkodó': '🌿 Zen Wanderer',
                    'Divergáló': '🎨 Peaceful Artist',
                    'Asszimiláló': '📚 Tranquil Sage',
                    'Konvergáló': '🏔️ Steady Guardian',
                    'default': '☯️ Calm Observer'
                }
            };

            // Fő kaszt meghatározása
            let baseClass = '🎮 Adventurer';
            if (personality && classMatrix[personality]) {
                baseClass = classMatrix[personality][kolb] || classMatrix[personality]['default'];
            }

            // Cameron alapú módosító
            const cameronModifiers = {
                'aktivista': ' of Action',
                'elemzo': ' of Wisdom',
                'elmeleti': ' of Knowledge',
                'pragmatikus': ' of Practice'
            };

            // Időgazdálkodás alapú rang
            const timeRanks = {
                'V': 'Legendary ',
                'IV': 'Master ',
                'III': '',
                'II': 'Apprentice ',
                'I': 'Novice '
            };

            const rank = timeRanks[timeLevel] || '';
            const modifier = cameron ? (cameronModifiers[cameron] || '') : '';

            return `${rank}${baseClass}${modifier}`.trim();
        } catch (e) {
            console.error('Error generating class:', e);
            return '🎮 Adventurer';
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
        let xp = 0;
        if (results.kolb) xp += 150;
        if (results.cameron) xp += 150;
        if (results.study) xp += Math.round(results.study.efficiency * 2);
        if (results.time) xp += Math.round((results.time.totalScore / 240) * 200);
        if (results.personality) xp += 150;
        return xp;
    };

    // Cameron stílusok kinyerése - tényleges adatok alapján
    const getCameronStyles = () => {
        if (!results.cameron?.scores) return null;
        const scores = results.cameron.scores;
        // Normalizálás 0-100 skálára (max 20 pont kategóriánként)
        return {
            aktivista: Math.round((scores.aktivista / 20) * 100),
            elemzo: Math.round((scores.elemzo / 20) * 100),
            elmeleti: Math.round((scores.elmeleti / 20) * 100),
            pragmatikus: Math.round((scores.pragmatikus / 20) * 100)
        };
    };

    const cameronStyles = getCameronStyles();

    // Stats - tényleges adatokból számolva (nem random!)
    const getStats = () => {
        try {
            // INT: Tanulási hatékonyság tesztből
            const INT = results.study ? Math.round(results.study.efficiency) : 0;

            // DEX: Időgazdálkodás tesztből (pontszám/max * 100)
            const DEX = results.time ? Math.round((results.time.totalScore / 240) * 100) : 0;

            // WIS: Kolb teszt kitöltöttség + elméleti/reflektív irányultság
            let WIS = 0;
            if (results.kolb) {
                // Magasabb bölcsesség, ha reflektív (B) és absztrakt (C) irányban erős
                const b = results.kolb.sums?.B || 0;
                const c = results.kolb.sums?.C || 0;
                WIS = Math.min(100, Math.round(((b + c) / 96) * 100 + 20));
            }

            // CHA: Cameron teszt - aktivista + pragmatikus kombináció
            let CHA = 0;
            if (cameronStyles) {
                CHA = Math.round((cameronStyles.aktivista + cameronStyles.pragmatikus) / 2);
            }

            // STR: Személyiség teszt - domináns típus erőssége
            let STR = 0;
            if (results.personality?.scores) {
                const maxScore = Math.max(...Object.values(results.personality.scores));
                STR = Math.round((maxScore / 40) * 100);
            }

            return { INT, DEX, WIS, CHA, STR };
        } catch (e) {
            return { INT: 0, DEX: 0, WIS: 0, CHA: 0, STR: 0 };
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
    const insights = hasAnyResults ? getPersonalizedInsights(results, stats, cameronStyles) : [];
    const completedTests = Object.keys(results).length;

    // Stat leírások (mi alapján számoljuk)
    const statDescriptions = {
        INT: "Tanulási Technikák teszt eredménye",
        DEX: "Időgazdálkodás teszt eredménye",
        WIS: "Kolb teszt reflektív/absztrakt irányultsága",
        CHA: "Cameron teszt aktivista/pragmatikus átlaga",
        STR: "Személyiségteszt domináns típus erőssége"
    };

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
                                    { key: 'INT', label: '🧠 Intelligencia', color: '#667eea', desc: statDescriptions.INT },
                                    { key: 'DEX', label: '⚡ Gyorsaság', color: '#f093fb', desc: statDescriptions.DEX },
                                    { key: 'WIS', label: '📚 Bölcsesség', color: '#4facfe', desc: statDescriptions.WIS },
                                    { key: 'CHA', label: '💫 Karizma', color: '#43e97b', desc: statDescriptions.CHA },
                                    { key: 'STR', label: '💪 Erő', color: '#fa709a', desc: statDescriptions.STR }
                                ].map(stat => (
                                    <div className="stat-row" key={stat.key} title={stat.desc}>
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

                        {/* Disclaimer */}
                        <div className="rpg-disclaimer">
                            ⚠️ <strong>Fun mód:</strong> Az RPG statisztikák szórakoztató célú becslések a teszt eredményeid alapján.
                            Az "átlag" értékek általános oktatási kutatások becsült átlagai (nem egyéni mérés).
                        </div>
                    </div>

                    {/* Cameron Stílusok - ha van */}
                    {cameronStyles && (
                        <div className="cameron-section">
                            <h3>🎨 Tanulási Stílusok (Cameron)</h3>
                            <div className="cameron-grid">
                                <div className="cameron-card aktivista">
                                    <div className="cameron-icon">🔥</div>
                                    <div className="cameron-name">Aktivista</div>
                                    <div className="cameron-score">{cameronStyles.aktivista}%</div>
                                    <div className="cameron-bar">
                                        <div style={{ width: `${cameronStyles.aktivista}%` }}></div>
                                    </div>
                                </div>
                                <div className="cameron-card elemzo">
                                    <div className="cameron-icon">🔬</div>
                                    <div className="cameron-name">Elemző</div>
                                    <div className="cameron-score">{cameronStyles.elemzo}%</div>
                                    <div className="cameron-bar">
                                        <div style={{ width: `${cameronStyles.elemzo}%` }}></div>
                                    </div>
                                </div>
                                <div className="cameron-card elmeleti">
                                    <div className="cameron-icon">📐</div>
                                    <div className="cameron-name">Elméleti</div>
                                    <div className="cameron-score">{cameronStyles.elmeleti}%</div>
                                    <div className="cameron-bar">
                                        <div style={{ width: `${cameronStyles.elmeleti}%` }}></div>
                                    </div>
                                </div>
                                <div className="cameron-card pragmatikus">
                                    <div className="cameron-icon">🛠️</div>
                                    <div className="cameron-name">Pragmatikus</div>
                                    <div className="cameron-score">{cameronStyles.pragmatikus}%</div>
                                    <div className="cameron-bar">
                                        <div style={{ width: `${cameronStyles.pragmatikus}%` }}></div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Personalized Insights */}
                    {insights.length > 0 && (
                        <div className="insights-section">
                            <h3>🔮 Személyre Szabott Tippek</h3>
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
                        <button
                            className="btn btn-danger"
                            onClick={() => {
                                if (window.confirm('⚠️ Biztosan törölni akarod az összes eredményt?\n\nEz a művelet nem visszavonható!')) {
                                    clearResults();
                                    window.location.reload();
                                }
                            }}
                        >
                            🗑️ Adatok Törlése
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
