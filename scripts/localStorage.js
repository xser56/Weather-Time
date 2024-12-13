function saveToLocalStorage(key, value) 
{
    localStorage.setItem(key, JSON.stringify(value));
}

function getFromLocalStorage(key) 
{
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : null;
}

export {saveToLocalStorage, getFromLocalStorage}