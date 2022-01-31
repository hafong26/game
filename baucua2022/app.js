const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

const header = $('header')
const paper = $('.paper')
const rule = $('.rule')

const bowl = $('.bowl')
const plate = $('.plate')

const coins = $$('.coin')
const cubes = $$('.cube')
const boxs = $$('.box')

const moneyOuter = $('#money')
if (sessionStorage.money <= 0 || isNaN(sessionStorage.money))
    sessionStorage.money = 100000

var app = {
    isClone: false,
    isEach: false,
    indexCoin: 0,
    boxBox: 0,
    ranNum: [],
    prices: [5000, 20000, 50000, 100000, 500000],
    outMoney: [],
    outId: [],
    totalMoney: 0,
    render: function() {
        moneyOuter.innerText = numberFormat(sessionStorage.money)
    },
    handle: function() {
        that = this;
        $('.button-82-pushable').onclick = function() {
            $('.rule').remove()
            const audio = $('#audio')
            const ran = Math.floor(Math.random() * 2)
            audio.src = `./music/${ran}.mp3`
            audio.play()
        }
        bowl.onclick = function() {
            that.toggle()
        }
        plate.onclick = function() {
            that.toggle()
        }

        cubes.forEach(function(cube) {
            cube.onclick = function() {
                that.toggle()
            }
        })
        coins.forEach(function(coin, index) {
            coin.onclick = function() {
                that.isClone = true
                that.indexCoin = index
                that.selectedCoin()
            }
        })
        boxs.forEach(function(box, index) {
            box.onclick = function() {

                if (bowl.className != 'bowl open') {

                    if (that.isClone) {
                        that.isEach = false
                        that.indexBox = index
                        that.put();
                        if (that.isEach) {
                            that.clone()
                            that.outId.push(index)
                            that.outMoney.push(that.prices[that.indexCoin])
                        }
                    }
                }
            }
        })
    },

    selectedCoin: function() {
        for (i = 0; i < coins.length; i++) {
            coins[i].classList.remove('select')
        }
        coins[that.indexCoin].classList.add('select')
    },
    toggle: function() {
        bowl.classList.toggle('open')
        header.classList.toggle('close');
        if (bowl.className == 'bowl open') {
            this.open()
        } else {
            this.close()
        }
    },
    open: function() {
        $('.dialog').classList.remove('active')

        // Xử lý random
        this.random();
        // Thanh toán số tiền
        this.remaining();

        // Load lại số tiền
        this.render();

    },
    close: function() {

        // Reset
        this.outMoney = []
        this.outId = [];
        this.removeClone()
    },
    random: function() {
        cubes.forEach(function(cube, index) {
            that.ranNum[index] = Math.floor(Math.random() * 6)
            cube.src = `images/${that.ranNum[index] +1}.png`
        })
    },
    remaining: function() {
        for (i = 0; i < this.outId.length; i++) {
            for (j = 0; j < 3; j++) {
                if (this.outId[i] == this.ranNum[j]) {
                    sessionStorage.money = Number(sessionStorage.money) + this.outMoney[i] * 2
                }
            }
        }
    },
    put: function() {
        if (Number(sessionStorage.money) >= that.prices[that.indexCoin]) {
            sessionStorage.money = Number(sessionStorage.money) - that.prices[that.indexCoin]
            this.isEach = true;
            this.render()
            $('.dialog').classList.remove('active')
        } else {
            $('.dialog').classList.add('active')
        }
    },

    clone: function() {
        const cloneElement = coins[that.indexCoin].cloneNode(true)
        cloneElement.classList.add('clone')

        Object.assign(cloneElement.style, {
            left: boxs[that.indexBox].offsetLeft - boxs[that.indexBox].offsetWidth / 2 + Math.floor(Math.random() * 50) + 'px',
            top: boxs[that.indexBox].offsetTop + Math.floor(Math.random() * 50) + 'px'
        })
        paper.appendChild(cloneElement)
    },
    removeClone: function() {
        const coinClone = $$('.coin.clone')
        for (i = 0; i < coinClone.length; i++)
            coinClone[i].remove()
    },
    start: function() {
        this.render()
        this.handle()
    }
}
app.start()