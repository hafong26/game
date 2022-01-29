const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('header')

const bowl = $('.bowl')
const plate = $('.plate')

const cubes = $$('.cube')
const coins = $$('.coin')
const boxs = $$('.box')
const currentMoney = $('#money')
if (!sessionStorage.money)
    sessionStorage.money = 1000

var app = {
    currentIndex: 0,
    isClone: false,
    render: function() {
        // currentMoney.innerText = sessionStorage.money
    },
    handle: function() {
        that = this;
        bowl.onclick = function() {
            // sessionStorage.money = Number(sessionStorage.money) + 1;
            // that.render()
            that.open()
        }
        plate.onclick = function() {
            that.open()
        }
        cubes.forEach(function(cube) {
            cube.onclick = function() {
                that.open()
            }
        })
        coins.forEach(function(coin, index) {
            coin.onclick = function() {
                for (i = 0; i < coins.length; i++) {
                    coins[i].classList.remove('active')
                }
                this.classList.add('active')
                that.currentIndex = index
                that.isClone = false;
            }
        });
        // boxs.forEach(function(box) {
        //     box.onclick = function() {
        //         that.isClone = true;
        //         if (that.isClone)
        //             coins[that.currentIndex].classList.add('active')

        //     }
        // })
    },
    open: function() {
        bowl.classList.toggle('open')
        header.classList.toggle('close')
        if (bowl.className == 'bowl open') {
            this.random()
        }
    },
    random: function() {
        cubes.forEach(function(cube, index) {
            const ran = Math.floor(Math.random() * 6 + 1)
            cube.src = `images/${ran}.png`
        })
    },
    start: function() {
        this.render()
        this.handle()
    }
}
app.start()