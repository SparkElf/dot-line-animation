
import { Renderer } from "./renderer";

export class Ball {
    x: number;
    y: number;
    xDir: number//移动方向 按canvas坐标系 -1向左
    yDir: number;//移动方向 按canvas坐标系 -1向上 Dir是direction的缩写
    r = 2;
    speed: number
    renderer: Renderer
    constructor(x: number, y: number, xDir: number, yDir: number, speed: number, renderer: Renderer, r = 2) {
        this.x = x
        this.y = y
        this.xDir = xDir
        this.yDir = yDir
        this.speed = speed
        this.renderer = renderer
        this.r = r;
    }
    updateStatus() {
        this.x += this.xDir * this.speed
        this.y += this.yDir * this.speed
        if (this.x <= 0)
            this.xDir = 1
        else if (this.x > this.renderer.width)
            this.xDir = -1

        if (this.y <= 0)
            this.yDir = 1
        else if (this.y > this.renderer.height)
            this.yDir = -1
    }
    render() {
        let ctx = this.renderer.$context
        ctx.beginPath()
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
        ctx.fill()
        ctx.closePath()
    }
}