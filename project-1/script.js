const block = document.getElementById('block');
const container = document.querySelector('.container');

let isDragging = false;
let offsetX, offsetY;

block.addEventListener('mousedown', (e) => {
    isDragging = true;
    offsetX = e.clientX - block.offsetLeft;
    offsetY = e.clientY - block.offsetTop;

    block.style.opacity = 0.5;  // 改变透明度

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
});

function onMouseMove(e) {
    if (!isDragging) return;

    let newLeft = e.clientX - offsetX;
    let newTop = e.clientY - offsetY;

    // 限制拖拽范围在父容器内
    const maxLeft = container.offsetWidth - block.offsetWidth;
    const maxTop = container.offsetHeight - block.offsetHeight;

    // 确保积木块不会拖出容器
    newLeft = Math.max(0, Math.min(newLeft, maxLeft));
    newTop = Math.max(0, Math.min(newTop, maxTop));

    block.style.left = `${newLeft}px`;
    block.style.top = `${newTop}px`;
}

function onMouseUp() {
    isDragging = false;
    block.style.opacity = 1;  // 恢复透明度

    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
}
