import { useState, useEffect, useRef } from 'react';
import './DebugFab.css';

const DebugFab = () => {
    const [isOpen, setIsOpen] = useState(false);
    const menuRef = useRef(null);

    // Close menu when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (menuRef.current && !menuRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            // Delay adding listener to prevent immediate close
            setTimeout(() => {
                document.addEventListener('click', handleClickOutside);
            }, 100);
        }

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [isOpen]);

    const handleFill = (e) => {
        e.stopPropagation();
        const event = new CustomEvent('fill-test-data');
        window.dispatchEvent(event);
        setIsOpen(false);
        alert('✅ Tesztek kitöltve! Nézd meg az eredményeket.');
    };

    const handleClear = (e) => {
        e.stopPropagation();
        // Keep menu open during confirmation
        const confirmed = window.confirm('⚠️ Biztosan törölni akarod az összes eredményt?\n\nEz a művelet nem visszavonható!');
        if (confirmed) {
            localStorage.removeItem('self_discovery_results');
            alert('🗑️ Adatok törölve!');
            window.location.reload();
        }
        // Menu stays open if cancelled
    };

    return (
        <div className="debug-fab-container" ref={menuRef}>
            {isOpen && (
                <div className="debug-menu fade-in" onClick={e => e.stopPropagation()}>
                    <div className="debug-menu-title">🐞 Debug Menü</div>
                    <button onClick={handleFill} className="debug-btn fill">
                        🧪 Tesztek Kitöltése
                    </button>
                    <button onClick={handleClear} className="debug-btn delete">
                        🗑️ Adatok Törlése
                    </button>
                </div>
            )}
            <button
                className={`debug-fab ${isOpen ? 'active' : ''}`}
                onClick={(e) => {
                    e.stopPropagation();
                    setIsOpen(!isOpen);
                }}
                title="Debug Menü"
            >
                🐞
            </button>
        </div>
    );
};

export default DebugFab;
