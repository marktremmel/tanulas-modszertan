import { useState } from 'react';
import './DebugFab.css';

const DebugFab = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleFill = () => {
        const event = new CustomEvent('fill-test-data');
        window.dispatchEvent(event);
        setIsOpen(false);
    };

    const handleClear = () => {
        if (confirm('Biztosan törölni akarod az összes eredményt?')) {
            localStorage.removeItem('self_discovery_results');
            window.location.reload();
        }
    };

    return (
        <div className="debug-fab-container">
            {isOpen && (
                <div className="debug-menu fade-in">
                    <button onClick={handleFill} className="debug-btn">🧪 Teszt Kitöltése</button>
                    <button onClick={handleClear} className="debug-btn delete">🗑️ Adatok Törlése</button>
                </div>
            )}
            <button
                className="debug-fab"
                onClick={() => setIsOpen(!isOpen)}
                title="Debug Menü"
            >
                🐞
            </button>
        </div>
    );
};

export default DebugFab;
