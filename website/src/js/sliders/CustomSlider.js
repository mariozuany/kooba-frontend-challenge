class CustomSlider {
    constructor() {
        this.xAxis = 0;
        this.counterIndex = 0;
        this.interval = 3000;
        this.mobileBreakpoint = 960;
        this.visibleAmount = document.documentElement.clientWidth >= this.mobileBreakpoint ? 3 : 1;
        this.articleList = document.querySelector('.article-list');
        this.articles = document.querySelectorAll('.article');
        this.articlesArr = Array.from(this.articles);
        this.transformSettings = {
            reset: 'translate3d(0, 0, 0)',
            newAxis(xAxis) {
                return `translate3d(${xAxis}px, 0, 0)`
            }
        }
    }


    resetPosition() {
        console.log('reset position');

        this.xAxis = 0;
        this.counterIndex = 0;
        this.articleList.classList.remove('transition');

        setTimeout(() => {
            this.articleList.style.transform = this.transformSettings.reset;
            this.articleList.classList.add('transition');
        });
    }

    toggleTimerIndicator() {
        document.querySelector('.article.active').classList.remove('active');
        this.articles[this.counterIndex].classList.add('active');
    }

    init() {
        console.log('init customSlider');
        this.articlesArr.slice(0, this.visibleAmount).forEach(el => this.articleList.appendChild(el.cloneNode(true)));
        this.articles[0].classList.add('active');

        setInterval(() => {
            this.articles = this.articleList.querySelectorAll('.article');
            this.articleWidth = this.articles[0].clientWidth + parseFloat(window.getComputedStyle(this.articles[0]).marginRight);
            this.articleList.style.width = `${this.articleWidth * this.articles.length}px`;

            if (this.visibleAmount + this.counterIndex >= this.articles.length) {
                this.resetPosition();
            }

            setTimeout(() => {
                this.xAxis -= this.articleWidth;
                this.counterIndex++;
                this.articleList.style.transform = this.transformSettings.newAxis(this.xAxis);
                this.toggleTimerIndicator();
            });

        }, this.interval);
    }
}

export default CustomSlider;