document.documentElement.setAttribute('theme', localStorage.getItem('theme') || 'ligth');

const trocaTema = () => {
    const newTheme = document.documentElement.getAttribute('theme') == 'ligth' ? 'dark':'ligth';
    document.documentElement.setAttribute('theme', newTheme);
    localStorage.setItem('theme', newTheme);
} 
