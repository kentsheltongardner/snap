class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
    equals(point) {
        return this.x === point.x && this.y === point.y
    }
    copy() {
        return new Point(this.x, this.y)
    }
    // Assumes points are integers
    adjacent(p1, p2) {
        return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y) === 1
    }
}