//turn menu icon "≣" into "X" when opening menu

const toggler = document.querySelector('.navbar-toggler');
const icon = toggler.querySelector('.navbar-toggler-icon');

if (!icon.querySelector('span')) {
    const span = document.createElement('span');
    icon.appendChild(span);
}

toggler.addEventListener('click', () => {
    toggler.classList.toggle('open');
});