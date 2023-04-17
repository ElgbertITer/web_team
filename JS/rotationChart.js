// 轮播图

const carouselContainer = document.getElementById('carousel-container');
const carouselItems = carouselContainer.getElementsByTagName('a');
const prevButton = document.getElementById('prev-btn');
const nextButton = document.getElementById('next-btn');

// 初始化轮播图的当前索引
let currentIndex = 0;

// 点击事件处理函数
function prevSlide() {
    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = carouselItems.length - 1;
    }
    showSlide(currentIndex);
}

function nextSlide() {
    currentIndex++;
    if (currentIndex >= carouselItems.length) {
        currentIndex = 0;
    }
    showSlide(currentIndex);
}

// 显示当前轮播图内容
function showSlide(currentIndex) {
    // 排他思想——先清空所有图片
    for (let i = 0; i < carouselItems.length; i++) {
        carouselItems[i].style.display = 'none';
    }
    carouselItems[currentIndex].style.display = 'block';
}

// 给控制按钮添加点击事件处理函数
prevButton.addEventListener('click', prevSlide);
nextButton.addEventListener('click', nextSlide);

// 自动轮播 每个5000毫秒换下一张图片
setInterval(() => {
    nextSlide();
}, 5000);