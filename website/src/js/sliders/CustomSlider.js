class CustomSlider {
    constructor() {
        const interval = 3000;
        const mobileBreakpoint = 960;

        let visibleAmount = document.documentElement.clientWidth >= mobileBreakpoint ? 3 : 1;
        let xAxis = 0;
        let counterIndex = 0;

        const articleList = document.querySelector('.article-list');

        let articles = articleList.querySelectorAll('.article');
        let articlesArr = Array.from(articles);
        articlesArr.slice(0, visibleAmount).forEach(el => articleList.appendChild(el.cloneNode(true)));
        articles = articleList.querySelectorAll('.article');

        const articleWidth = articles[0].clientWidth + parseFloat(window.getComputedStyle(articles[0]).marginRight);
        articleList.style.width = `${articleWidth * articles.length}px`;

        setInterval(function() {

            if (visibleAmount + counterIndex >= articles.length) {
                xAxis = 0;
                counterIndex = 0;
                articleList.classList.remove('transition');
                articleList.style.transform = `translate3d(0, 0, 0)`;

                setTimeout(function() {
                    articleList.classList.add('transition');
                });
            }

            setTimeout(function() {
                xAxis -= articleWidth;
                counterIndex++;
                articleList.style.transform = `translate3d(${xAxis}px, 0, 0)`;
            });

        }, interval);

    }

    init() {
        console.log('Custom Slider Init');
    }
}

export default CustomSlider;