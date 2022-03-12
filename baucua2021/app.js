const $ = document.querySelector.bind(document);
const bowl = $('.bowl')
const plate = $('.plate')
const currentMoney = $('#money')
if (!sessionStorage.money)
    sessionStorage.money = 1000

var app = {
    render: function() {
        currentMoney.innerText = sessionStorage.money
    },
    handle: function() {
        that = this;
        bowl.onclick = function() {
            bowl.classList.toggle('active')
            sessionStorage.money = Number(sessionStorage.money) + 1;
            that.render()
        }
        plate.onclick = function() {
            bowl.click()
        }
    },
    start: function() {
        this.render()
        this.handle()
    }
}
app.start()