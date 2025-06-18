class Rectangle {
    constructor(x, y, width, height) {
        this.x      = x
        this.y      = y
        this.width  = width
        this.height = height
    }
    contains(point) {
        return point.x >= this.x
            && point.y >= this.y
            && point.x < this.x + this.width
            && point.y < this.y + this.height
    }
}