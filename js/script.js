
const title = document.querySelectorAll('.main-title h2');
console.log(title[0].offsetTop)

// 1.lush의 opcity를 0으로 바꾼다 서서히
//2.bath의 opcity를 1로 바꾼다.
window.addEventListener('scroll', () => {
  if (title[0].offsetTop > 10) {
    title[0].style.opacity = 0;
    title[1].style.opacity = 1;
  }
});
  // title[0].style.opacity = 0;
  // title[1].style.opacity = 1;
  // title[1].style.opacity = 0;
  // title[2].style.opacity = 1;);

