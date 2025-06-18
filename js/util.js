function viewportSize() {
    return new Size(this.window.innerWidth, this.window.innerHeight)
}
function horizontalViewportRatio(viewportSize, gridSize) {
    return viewportSize.width * gridSize.height > gridSize.width * viewportSize.height
}
function displayScalar(viewportSize, gridSize) {
    if (horizontalViewportRatio(viewportSize, gridSize)) {
        return Math.floor(viewportSize.height / gridSize.height)
    }
    return Math.floor(viewportSize.width / gridSize.width)
}
function displaySize(viewportSize, gridSize) {
    const scalar    = displayScalar(viewportSize, gridSize)
    const width     = gridSize.width * scalar
    const height    = gridSize.height * scalar
    return new Size(width, height)
}
function displayOrigin(viewportSize, displaySize) {
    const x = Math.floor((viewportSize.width - displaySize.width) / 2)
    const y = Math.floor((viewportSize.height - displaySize.height) / 2)
    return new Point(x, y)
}
function displayRectangle(viewportSize, gridSize) {
    const size = displaySize(viewportSize, gridSize)
    const origin = displayOrigin(viewportSize, size)
    return new Rectangle(origin.x, origin.y, size.width, size.height)
}
function gamePoint(displayPoint, viewportSize, gridSize) {
    const rectangle = displayRectangle(viewportSize, gridSize)
    const scalar    = displayScalar(viewportSize, gridSize)
    const gameX     = (displayPoint.x - rectangle.x) / scalar
    const gameY     = (displayPoint.y - rectangle.y) / scalar
    return new Point(gameX, gameY)
}
function gridPoint(displayPoint, viewportSize, gridSize) {
    const point = gamePoint(displayPoint, viewportSize, gridSize)
    return new Point(Math.floor(point.x), Math.floor(point.y))
}
function displayPoint(gamePoint, viewportSize, gridSize) {
    const rectangle = displayRectangle(viewportSize, gridSize)
    const scalar    = displayScalar(viewportSize, gridSize)
    const displayX  = rectangle.x + gamePoint.x * scalar
    const displayY  = rectangle.y + gamePoint.y * scalar
    return new Point(displayX, displayY)
}
function inBounds(point, rectangle) {
    return  point.x >= rectangle.x
            && point.y >= rectangle.y
            && point.x < rectangle.x + rectangle.width
            && point.y < rectangle.y + rectangle.height
}
function gridAdjacent(p1, p2) {
    return Math.abs(p2.x - p1.x) + Math.abs(p2.y - p1.y) === 1
}
function gridDirection(p1, p2) {
    const dx = p2.x - p1.x
    const dy = p2.y - p1.y
    if (dx === 0) {
        if (dy > 0) {
            return Directions.South
        }
        if (dy < 0) {
            return Directions.North
        }
        return Directions.None
    }
    if (dy === 0) {
        if (dx > 0) {
            return Directions.East
        }
        if (dx < 0) {
            return Directions.West
        }
        return Directions.None
    }
    return Directions.None
}
function pointInDirection(point, direction) {
    const directionPoint = DirectionPoints[direction]
    const x = point.x + directionPoint.x
    const y = point.y + directionPoint.y
    return new Point(x, y)
}
function sinePosition(value) {
    const sine = Math.sin(Math.PI * value / 2)
    return sine * sine
}
function heartbeatPosition(value) {
    const sine1 = Math.sin(Math.PI * value)
    const sine2 = Math.sin(Math.PI * value - 5.8)
    return Math.pow(sine1, 16) - Math.pow(sine2, 32) / 2
}