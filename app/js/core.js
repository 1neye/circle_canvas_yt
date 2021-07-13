let canvas = {
    c: null,
    width: window.innerWidth,
    height: window.innerHeight,
    circles: [],
    circleNum: 200,
    colorArr: [
        '#FFEE00',
        '#FFC200',
        '#FF9D00',
        '#FF7700',
        '#FF4800'
    ],
    init() {
        this.c = document.getElementById('mycanvas').getContext('2d')
        const can = document.getElementById('mycanvas')
        can.width = window.innerWidth
        can.height = window.innerHeight
    },
    createCircle() {
        for (let i = 0; i <= this.circleNum; i++) {
            this.circles.push({
                x: this.width * Math.random(),
                y: this.height * Math.random(),
                radius: 50 * Math.random(),
                sx: 5 * Math.random(),
                sy: 5 * Math.random(),
                color: this.colorArr[Math.floor(Math.random() * this.colorArr.length + 1)]
            })
        }
    },
    update() {
        for (let circle of this.circles) {
            circle.x += circle.sx
            circle.y += circle.sy

            if (circle.x > this.width || circle.x < 0) {
                circle.sx *= -1
            }
            else if (circle.y > this.height || circle.y < 0) {
                circle.sy *= -1
            }
        }
    },
    render() {
        this.c.clearRect(0, 0, this.width, this.height)
        for (let circle of this.circles) {
            this.c.beginPath()
            this.c.arc(circle.x, circle.y, circle.radius, 0, Math.PI * 2)
            this.c.fillStyle = circle.color
            this.c.fill()

        }
        let img = new Image()
        img.src = '../img/fanta.png'
        this.c.drawImage(img, (this.width / 2) - 200, (this.height / 2) - 112)
    },
    run() {
        window.requestAnimationFrame(() => {
            this.update()
            this.render()
            this.run()
        })
    },
    start() {
        this.init()
        this.createCircle()
        this.run()
    }
}



window.addEventListener('load', () => {

    window.onresize = () => {
        can.width = window.innerWidth
        can.height = window.innerHeight
    }
    canvas.start()
})