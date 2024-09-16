
let currentContentIndex = 0;
const contentArray = [
    'Content 1',
    'Content 2',
    'Content 3',
    'Content 4',
    'Content 5'
];

function showContent(index) {
    const centerBox = document.getElementById('centerBoxContent');
    centerBox.innerHTML = contentArray[index];
}

function nextContent() {
    currentContentIndex = (currentContentIndex + 1) % contentArray.length;
    showContent(currentContentIndex);
}

function prevContent() {
    currentContentIndex = (currentContentIndex - 1 + contentArray.length) % contentArray.length;
    showContent(currentContentIndex);
}
