//#region Objects
class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}
class Size {
    constructor(width, height) {
        this.width  = width
        this.height = height
    }
}
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
//#endregion

//#region Const
const FPSMeasurementFrames  = 60
const GridWidth             = 4
const GridHeight            = 3
const GridSize              = new Size(GridWidth, GridHeight)
//#endregion

//#region Display
function horizontalViewportRatio(viewportSize, gridSize) {
    return viewportSize.width * gridSize.height > gridSize.width * viewportSize.height
}
function displayScalar(viewportSize, gridSize) {
    if (horizontalViewportRatio(viewportSize, gridSize)) {
        return viewportSize.height / gridSize.height
    }
    return viewportSize.width / gridSize.width
}
function displayRectangle(viewportSize, gridSize) {
    const scalar    = displayScalar(viewportSize, gridSize)
    const width     = gridSize.width * scalar
    const height    = gridSize.height * scalar
    const x         = (viewportSize.width - width) / 2
    const y         = (viewportSize.height - height) / 2
    return new Rectangle(x, y, width, height)
}
function gamePoint(displayPoint, viewportSize, gridSize) {
    const scalar    = displayScalar(viewportSize, gridSize)
    const gridX     = (displayPoint.x - (viewportSize.width - gridSize.width * scalar) / 2) / scalar
    const gridY     = (displayPoint.y - (viewportSize.height - gridSize.height * scalar) / 2) / scalar
    return new Point(gridX, gridY)
}
function gridPoint(displayPoint, viewportSize, gridSize) {
    const point = gamePoint(displayPoint, viewportSize, gridSize)
    return new Point(Math.floor(point.x), Math.floor(point.y))
}
function displayPoint(gamePoint, viewportSize, gridSize) {
    const scalar    = displayScalar(viewportSize, gridSize)
    const displayX  = (viewportSize.width - gridSize.width * scalar) / 2 + gamePoint.x * scalar
    const displayY  = (viewportSize.height - gridSize.height * scalar) / 2 + gamePoint.y * scalar
    return new Point(displayX, displayY)
}
//#endregion

class Game {
//#region Constructor
    constructor() {
        this.canvas             = document.getElementById('snap-canvas')
        this.context            = this.canvas.getContext('2d')
        this.frame              = 0
        this.framesPerSecond    = 0
        this.startTime          = performance.now()
        this.addEventListeners()
        this.mainLoop()
    }
//#endregion

//#region Input
    addEventListeners() {
        this.canvas.addEventListener('mousedown',   e => { this.mouseDown(e)    })
        this.canvas.addEventListener('mousemove',   e => { this.mouseMove(e)    })
        this.canvas.addEventListener('mouseup',     e => { this.mouseUp(e)      })
        this.canvas.addEventListener('mouseleave',  e => { this.mouseLeave(e)   })
        window.addEventListener('keydown',          e => { this.keyDown(e)      })
    }
    mouseDown(e) {
        const canvasSize = new Size(this.canvas.width, this.canvas.height)
        const click = new Point(e.offsetX, e.offsetY)
        const game = gamePoint(click, canvasSize, GridSize)
        const grid = gridPoint(click, canvasSize, GridSize)
        const display = displayPoint(game, canvasSize, GridSize)
    }
    mouseMove(e) {

    }
    mouseUp(e) {
        
    }
    mouseLeave(e) {
        
    }
    keyDown(e) {
        
    }
//#endregion

//#region Update
    update() {
        this.frame++
        this.x += 0.125
    }
//#endregion

//#region Render
    render() {
        const viewportSize      = new Size(window.innerWidth, window.innerHeight)
        this.canvas.width       = viewportSize.width
        this.canvas.height      = viewportSize.height
        const gameRectangle     = displayRectangle(viewportSize, GridSize)
        this.context.fillStyle  = '#111'
        this.context.fillRect(gameRectangle.x, gameRectangle.y, gameRectangle.width, gameRectangle.height)

        this.renderGrid()
        this.renderFPS()
    }
    renderGrid() {
        const viewportSize      = new Size(window.innerWidth, window.innerHeight)
        this.context.strokeStyle  = '#222'
        for (let i = 0; i <= GridSize.width; i++) {
            const gridStart = new Point(i, 0)
            const gridEnd   = new Point(i, GridSize.height)
            const start     = displayPoint(gridStart, viewportSize, GridSize)
            const end       = displayPoint(gridEnd, viewportSize, GridSize)
            this.context.beginPath()
            this.context.moveTo(start.x, start.y)
            this.context.lineTo(end.x, end.y)
            this.context.stroke()
        }
        for (let i = 0; i <= GridSize.height; i++) {
            const gridStart = new Point(0, i)
            const gridEnd   = new Point(GridSize.width, i)
            const start     = displayPoint(gridStart, viewportSize, GridSize)
            const end       = displayPoint(gridEnd, viewportSize, GridSize)
            this.context.beginPath()
            this.context.moveTo(start.x, start.y)
            this.context.lineTo(end.x, end.y)
            this.context.stroke()
        }
    }
    renderFPS() {
        this.context.fillStyle = '#444'
        this.context.font = '12px sans-serif'
        this.context.fillText(`FPS: ${this.framesPerSecond.toFixed(2)}`, 10, 20)
    }
//#endregion

//#region FPS
trackFPS() {
    if (this.frame % FPSMeasurementFrames === 0) {
        const currentTime       = performance.now()
        const elapsedTime       = currentTime - this.startTime
        this.startTime          = currentTime
        this.framesPerSecond    = 1000 * FPSMeasurementFrames / elapsedTime
    }
}
//#endregion

//#region Main loop
    mainLoop() {
        this.update()
        this.render()
        this.trackFPS()
        requestAnimationFrame(() => { this.mainLoop() })
    }
//#endregion
}

//#region Init
window.addEventListener('load', () => { new Game() })
//#endregion