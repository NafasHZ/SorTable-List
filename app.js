const draggablelist = document.getElementById('draggable-list')
const check = document.getElementById('check')
const richestPeopel = [
    'Elon Musk',
    'jeff Bezos',
    'Warren Buffett',
    'Mark Zackerberg',
    'Bill Gates',
    'Bernard Arno and family',
    'Larry Ellison',
    'Michael Bloomberg',
    'Carlos Slim Peach and family',
    'Mishael Bloomber'
]
const listItems = []
let dragStartIndex;

creatList()
function creatList() {
    [...richestPeopel]
        .map(a => ({ value: a, sort: Math.random() }))
        .sort((a, b) => a.sort - b.sort)
        .map(a => a.value)
        .forEach((person, index) => {
            const listItem = document.createElement('li');
            listItem.setAttribute('data-index', index);

            listItem.innerHTML = `
                 <span class="number">${index + 1}</span>
                <div class="draggable" draggable="true">
                  <p class='person-name'>${person}</p>
                  <i class='fas fa-grip-lines'></i>
                </div>
                 `;
            listItems.push(listItem);
            draggablelist.appendChild(listItem);

        })
    addEventListeners()
}
function checkOrder() {
    listItems.forEach((listItem, index) => {
        const personName = listItem.querySelector('.draggable').innerText.trim()

        if (personName !== richestPeopel[index]) {
            listItem.classList.add('wrong')
        } else {
            listItem.classList.add('rigth')
            listItem.classList.remove('wrong')
            
        }
    })

}
function dragstart() {
    dragStartIndex = +this.closest('li').getAttribute('data-index')
}
function dragover(e) {
    e.preventDefault()
}
function drop() {
    let dragEndIndex = +this.getAttribute('data-index');
    let itemOne = listItems[dragStartIndex].querySelector('.draggable')
    let itemTwo = listItems[dragEndIndex].querySelector('.draggable')
    listItems[dragStartIndex].appendChild(itemTwo)
    listItems[dragEndIndex].appendChild(itemOne)
    this.classList.remove('over')
}
function dragEnter() {
    this.classList.add('over')
}
function dragleave() {
    this.classList.remove('over')
}

function addEventListeners() {
    const draggables = document.querySelectorAll('.draggable')
    // console.log(draggables);
    const draggablelistItems = document.querySelectorAll('.draggable-list li')
    // console.log(draggablelistItems);
    draggables.forEach(draggable => {
        draggable.addEventListener("dragstart", dragstart)
    });
    draggablelistItems.forEach(item => {
        item.addEventListener("dragover", dragover)
        item.addEventListener("drop", drop)
        item.addEventListener("dragenter", dragEnter)
        item.addEventListener("dragleave", dragleave)

    })
}
check.addEventListener('click', checkOrder)
