class Vector {
    constructor(dx, dy) {
        this.dx = dx
        this.dy = dy
    }
}
class Size {
    constructor(width, height) {
        this.width  = width
        this.height = height
    }
}
class DirectionData {
    constructor(e, se, s, sw, w, nw, n, ne) {
        this.e      = e
        this.se     = se
        this.s      = s
        this.sw     = sw
        this.w      = w
        this.nw     = nw
        this.n      = n
        this.ne     = ne
    }
}
class CornerData {
    constructor(se, sw, nw, ne) {
        this.se = se
        this.sw = sw
        this.nw = nw
        this.ne = ne
    }
}