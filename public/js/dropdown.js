const userBtn = document.getElementById('userBtn');
const dropdown = document.getElementById('userDropdown');

userBtn.addEventListener('click', () => {
    dropdown.classList.toggle('open');
});

document.addEventListener('click', (e) => {
    if (!userBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.classList.remove('open');
    }
});