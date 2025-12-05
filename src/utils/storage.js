const STORAGE_KEY = 'self_discovery_results';

export const saveResult = (testId, data) => {
    try {
        const existing = getAllResults();
        const updated = {
            ...existing,
            [testId]: {
                ...data,
                timestamp: new Date().toISOString()
            }
        };
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        return true;
    } catch (error) {
        console.error('Failed to save result:', error);
        return false;
    }
};

export const getResult = (testId) => {
    const all = getAllResults();
    return all[testId] || null;
};

export const getAllResults = () => {
    try {
        const data = localStorage.getItem(STORAGE_KEY);
        return data ? JSON.parse(data) : {};
    } catch (error) {
        console.error('Failed to load results:', error);
        return {};
    }
};

export const clearResults = () => {
    localStorage.removeItem(STORAGE_KEY);
};

export const exportResults = () => {
    const data = getAllResults();
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `self-discovery-results-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
};
