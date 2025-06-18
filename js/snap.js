const SnapStates = {
    Idle:       'idle',         // Not doing anything
    Explore:    'explore',      // Player selected and dragging
    Wait:       'wait',         // Player released mouse and waiting for point to reach control node
    Retreat:    'retreat',      // Invalid move, point returning to root
    Advance:    'advance',      // Valid move
}

class Snap {
    constructor(point) {
        this.point          = point.copy()
        this.distance       = 0.0
        this.state          = SnapStates.Idle
        this.scale          = 1.0
    }
    update(frameTimeMillis) {

    }
}

//return `rgb(${255 * this.r}, ${255 * this.g}, ${255 * this.b})`
 
// this.r              = 0.0
// this.g              = 0.0
// this.b              = 1.0

// #D82121 red 84.7, 12.9, 12.9
// #FFE679 yellow 100, 90.2, 47.5
// #B7F283 green 71.8, 94.9, 51.4
// #1C4F93 blue 11, 31, 57.6
//coolors
//www.colorhexa.com
// update() {
//     switch (this.state) {
//         case SnapStates.Idle:
//             this.r += (0.11 - this.r) * 0.03
//             this.g += (0.31 - this.g) * 0.03
//             this.b += (0.776 - this.b) * 0.03
//             break
//         case SnapStates.Explore:
//             this.r += (1.0 - this.r) * 0.02
//             this.g += (0.902 - this.g) * 0.02
//             this.b += (0.475 - this.b) * 0.02
//             break
//         case SnapStates.Retreat:
//             this.r += (0.847 - this.r) * 0.04
//             this.g += (0.129 - this.g) * 0.04
//             this.b += (0.129 - this.b) * 0.04
//             break
//         case SnapStates.Advance:
//             this.r += (0.618 - this.r) * 0.04
//             this.g += (0.949 - this.g) * 0.04
//             this.b += (0.414 - this.b) * 0.04
//             break
//     }
// }