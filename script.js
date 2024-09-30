//Initial Data
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;

let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d');

// Flag to differentiate between touch and mouse events
let isTouch = false;

//Events
document.querySelectorAll('.color').forEach((color) => {
    color.addEventListener('click', clickColorEvent);
});

document.querySelector('.clear').addEventListener('click', (e) => {
    ctx.clearRect(0, 0, screen.width, screen.height);
});

screen.addEventListener('mousedown', mouseDownEvent);
screen.addEventListener('mousemove', mouseMoveEvent);
screen.addEventListener('mouseup', mouseUpEvent);

// Mobile events
screen.addEventListener('touchstart', touchStartEvent);
screen.addEventListener('touchmove', touchMoveEvent);
screen.addEventListener('touchend', touchEndEvent);

// Global event to stop when leaving canvas
document.addEventListener('mouseup', mouseUpEvent);

// Functions
function clickColorEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}

function mouseDownEvent(e) {
    if (isTouch) return; 
    canDraw = true;
    mouseX = e.pageX - screen.offsetLeft;
    mouseY = e.pageY - screen.offsetTop;
}

function mouseMoveEvent(e) {
    if (canDraw && !isTouch) { 
        draw(e.pageX, e.pageY);
    }
}

function mouseUpEvent() {
    canDraw = false;
}

function draw(x, y) {
    let pointX = x - screen.offsetLeft;
    let pointY = y - screen.offsetTop;

    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.lineJoin = 'round';
    ctx.strokeStyle = currentColor;
    ctx.moveTo(mouseX, mouseY);
    ctx.lineTo(pointX, pointY);
    ctx.closePath();
    ctx.stroke();

    mouseX = pointX;
    mouseY = pointY;
}

// Touch events
function touchStartEvent(e) {
    isTouch = true;  
    canDraw = true;
    e.preventDefault(); 
    mouseX = e.touches[0].pageX - screen.offsetLeft;
    mouseY = e.touches[0].pageY - screen.offsetTop;
}

function touchMoveEvent(e) {
    if (canDraw) {
        e.preventDefault(); 
        draw(e.touches[0].pageX, e.touches[0].pageY);
    }
}

function touchEndEvent() {
    canDraw = false;
    isTouch = false;  
}
