import { Ball } from "./ball";

export class Renderer {
    $container: HTMLDivElement;
    $canvas: HTMLCanvasElement;
    $context: CanvasRenderingContext2D
    width: number;
    height: number;
    points: Ball[];
    distLimit = 100;//小球连线距离
    launch(area = 40000) {
        console.log(area)
        this.setData(area);
        this.setEvent();
        this.lockThis()
        this.render()
    }
    setData(area: number) {
        this.$container = document.getElementById("dot-line-container") as HTMLDivElement;
        this.$canvas = document.getElementById("dot-line-canvas") as HTMLCanvasElement;
        this.width = this.$container.clientWidth;
        this.height = this.$container.clientHeight;
        this.$canvas.width = this.width
        this.$canvas.height = this.height
        this.$context = this.$canvas.getContext("2d");
        //创建随机状态小球
        var num = Math.round(this.width * this.height / area)
        this.points = new Array(num)
        for (let i = 0; i < this.points.length; i++) {
            this.points[i] = new Ball(Math.random() * this.width, Math.random() * this.height, Math.random() > 0.5 ? -1 : 1, Math.random() > 0.5 ? -1 : 1, Math.random() * 1.5 + 0.5, this)
        }
    }
    lockThis() {
        this.render = this.render.bind(this)
    }
    setEvent() {
        window.onresize = () => {
            this.width = this.$container.clientWidth;
            this.height = this.$container.clientHeight;
            this.$canvas.width = this.width;
            this.$canvas.height = this.height;
        }
    }

    render() {
        requestAnimationFrame(this.render)
        this.$context.clearRect(0, 0, this.width, this.height)//清空canvas
        //绘制球
        for (let i = 0; i < this.points.length; i++) {
            this.points[i].updateStatus()
            this.points[i].render()
        }
        //绘制线条
        for (let i = 0; i < this.points.length; i++)
            for (let j = i + 1; j < this.points.length; j++) {
                let distance = Math.sqrt(Math.pow(this.points[i].x - this.points[j].x, 2) + Math.pow(this.points[i].y - this.points[j].y, 2))
                if (distance < this.distLimit) {
                    this.$context.beginPath()
                    let c = 255 * distance / this.distLimit//距离越长颜色越浅
                    this.$context.strokeStyle = `rgb(${c},${c},${c})`
                    this.$context.moveTo(this.points[i].x, this.points[i].y)
                    this.$context.lineTo(this.points[j].x, this.points[j].y);
                    this.$context.stroke();
                    this.$context.closePath()
                }
            }
    }
}