class GameEngine {
//#region Constructor
    constructor() {
        this.canvas                 = document.getElementById('snap-canvas')
        this.context                = this.canvas.getContext('2d')
        this.levelNumber            = 0
        this.level                  = new LevelEngine(levelData[this.levelNumber])
        this.oldLevel               = null
        this.fpsTracker             = new FPSTracker()
        this.mousePressed           = false

        this.stateStartMillis       = performance.now()
        this.gameState              = GameStates.FadeIn
        
        // Use functions instead
        // this.transitionStart        = new Point(0, 0)
        // this.transitionEnd          = new Point(0, 0)
        // this.transitionRadiusStart  = 0.0
        // this.transitionRadiusEnd    = 0.0

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
        window.addEventListener('contextmenu',      e => { this.contextMenu(e)  })
        window.addEventListener('keydown',          e => { this.keyDown(e)      })
    }
    mouseDown(e) {
        const canvasSize = new Size(this.canvas.width, this.canvas.height)
        this.level.mouseDown(e, canvasSize, this.level.size)
    }
    mouseMove(e) {
        const canvasSize = new Size(this.canvas.width, this.canvas.height)
        this.level.mouseMove(e, canvasSize, this.level.size)
    }
    mouseUp(e) {
        const canvasSize = new Size(this.canvas.width, this.canvas.height)
        this.level.mouseUp(e, canvasSize)
    }
    mouseLeave(e) {
        
    }
    contextMenu(e) {
        e.preventDefault()
        e.stopPropagation()
    }
    keyDown(e) {
        switch (e.code) {
            case 'KeyR':
                this.level = new LevelEngine(levelData[this.levelNumber])
                break
            case 'Minus':
                if (this.levelNumber > 0) {
                    this.levelNumber--
                    this.level = new LevelEngine(levelData[this.levelNumber])
                }
                break
            case 'Equal':
                if (this.levelNumber < levelData.length - 1) {
                    this.levelNumber++
                    this.level = new LevelEngine(levelData[this.levelNumber])
                }
                break
            case 'KeyF':
                this.levelNumber = 0
                this.level = new LevelEngine(levelData[this.levelNumber])
                break
            case 'KeyL':
                this.levelNumber = levelData.length - 1
                this.level = new LevelEngine(levelData[this.levelNumber])
                break
        }
    }
//#endregion

//#region Update
    update() {
        const now                   = performance.now()
        const elapsedStateMillis    = now - this.stateStartMillis
        switch (this.gameState) {
            case GameStates.FadeIn: {
                if (elapsedStateMillis > FadeInMillis) {
                    this.gameState          = GameStates.Play
                }
                break
            }
            case GameStates.Play: {
                this.level.update(this.fpsTracker.elapsedTimeFrame)
                if (this.level.complete()) {
                    this.gameState          = GameStates.FadeOut
                    this.stateStartMillis   = now
                }
                break
            }
            case GameStates.FadeOut: {
                if (elapsedStateMillis > FadeOutMillis) {
                    this.gameState          = GameStates.Transition
                    this.stateStartMillis   = now
                    this.levelNumber++
                    this.oldLevel           = this.level
                    this.level              = new LevelEngine(levelData[this.levelNumber])
                    // Set transition start here
                }
                break
            }
            case GameStates.Transition: {
                if (elapsedStateMillis > TransitionMillis) {
                    this.gameState          = GameStates.FadeIn
                    this.stateStartMillis   = now
                }
                break
            }
        }
    }
//#endregion

//#region Render

    // Still might want to implement softened corners
    render() {
        const size              = viewportSize()
        this.canvas.width       = size.width
        this.canvas.height      = size.height
        const rectangle         = displayRectangle(size, this.level.size)
        this.context.fillStyle  = WaterColor
        this.context.fillRect(rectangle.x, rectangle.y, rectangle.width, rectangle.height)

        this.renderFloors()
        this.renderObjects()
        this.renderIcons()

        this.renderOverlay()

        this.renderSnap()

        this.renderFPS()
        this.renderName()
    }
//#endregion

//#region Render floors
    renderFloors() {
        const size          = viewportSize()
        const rectangle     = displayRectangle(size, this.level.size)
        const cellSize      = displayScalar(size, this.level.size)
        const half          = cellSize / 2
        const sixth         = cellSize / 6

        this.context.fillStyle = FloorColor

        for (let i = 0; i < this.level.size.width; i++) {
            for (let j = 0; j < this.level.size.height; j++) {
                const floor = this.level.floor[i][j]
                if (floor === FloorTypes.Water) {
                    continue
                }

                const xw = rectangle.x + i * cellSize
                const yn = rectangle.y + j * cellSize
                const xe = xw + cellSize
                const ys = yn + cellSize

                const xc = xw + half
                const yc = yn + half

                const xcw = xw + sixth
                const ycn = yn + sixth
                const xce = xe - sixth
                const ycs = ys - sixth

                const corners = this.level.floorCorners[i][j]

                const outerPath = new Path2D()
                outerPath.moveTo(xe, yc)

                switch (corners.se) {
                    case Corners.Exterior:
                        outerPath.lineTo(xe, ycs)
                        outerPath.arc(xce, ycs, sixth, Angles.East, Angles.South)
                        break
                    case Corners.Horizontal:
                    case Corners.Vertical:
                    case Corners.Interior:
                    case Corners.Full:
                        outerPath.lineTo(xe, ys)
                        
                        break
                }
                outerPath.lineTo(xc, ys)

                switch (corners.sw) {
                    case Corners.Exterior:
                        outerPath.lineTo(xcw, ys)
                        outerPath.arc(xcw, ycs, sixth, Angles.South, Angles.West)
                        break
                    case Corners.Horizontal:
                    case Corners.Vertical:
                    case Corners.Interior:
                    case Corners.Full:
                        outerPath.lineTo(xw, ys)
                        break
                }
                outerPath.lineTo(xw, yc)

                switch (corners.nw) {
                    case Corners.Exterior:
                        outerPath.lineTo(xw, ycn)
                        outerPath.arc(xcw, ycn, sixth, Angles.West, Angles.North)
                        break
                    case Corners.Horizontal:
                    case Corners.Vertical:
                    case Corners.Interior:
                    case Corners.Full:
                        outerPath.lineTo(xw, yn)
                        break
                }
                outerPath.lineTo(xc, yn)

                switch (corners.ne) {
                    case Corners.Exterior:
                        outerPath.lineTo(xce, yn)
                        outerPath.arc(xce, ycn, sixth, Angles.North, Angles.East)
                        break
                    case Corners.Horizontal:
                    case Corners.Vertical:
                    case Corners.Interior:
                    case Corners.Full:
                        outerPath.lineTo(xe, yn)
                        break
                }
                outerPath.lineTo(xe, yc)

                this.context.fill(outerPath)
            }
        }
    }
//#endregion

//#region Render objects
    renderObjects() {
        const size          = viewportSize()
        const rectangle     = displayRectangle(size, this.level.size)
        const cellSize      = displayScalar(size, this.level.size)
        const half          = cellSize / 2
        const sixth         = cellSize / 6
        const twelfth       = cellSize / 12
        const twentyFourth  = cellSize / 24

        for (let i = 0; i < this.level.size.width; i++) {
            for (let j = 0; j < this.level.size.height; j++) {
                const object = this.level.objects[i][j]
                if (object === ObjectTypes.None) {
                    continue
                }
                
                this.context.fillStyle = WallColor

                // Cell outer edges
                const xw = rectangle.x + i * cellSize
                const yn = rectangle.y + j * cellSize
                const xe = xw + cellSize
                const ys = yn + cellSize

                // Cell center
                const xc = xw + half
                const yc = yn + half

                // Cell corner centers
                const xcw = xw + sixth
                const ycn = yn + sixth
                const xce = xe - sixth
                const ycs = ys - sixth

                // Cell inner edges
                const xiw = xw + twelfth
                const yin = yn + twelfth
                const xie = xe - twelfth
                const yis = ys - twelfth

                let se = false
                let sw = false
                let nw = false
                let ne = false

                const corners = this.level.objectCorners[i][j]
                const outerPath = new Path2D()

                if (this.level.objectConnections[i][j].e) {
                    outerPath.moveTo(xe, yc)
                } else {
                    outerPath.moveTo(xie, yc)
                }

                switch (corners.se) {
                    case Corners.Exterior:
                        outerPath.lineTo(xie, ycs)
                        outerPath.arc(xce, ycs, twelfth, Angles.East, Angles.South)
                        outerPath.lineTo(xc, yis)
                        se = true
                        break
                    case Corners.Horizontal:
                        outerPath.lineTo(xe, yis)
                        outerPath.lineTo(xc, yis)
                        break
                    case Corners.Vertical:
                        outerPath.lineTo(xie, ys)
                        outerPath.lineTo(xc, ys)
                        break
                    case Corners.Interior:
                        outerPath.lineTo(xe, yis)
                        outerPath.arc(xe, ys, twelfth, Angles.North, Angles.West, true)
                        outerPath.lineTo(xc, ys)
                        se = true
                        break
                    case Corners.Full:
                        outerPath.lineTo(xe, ys)
                        outerPath.lineTo(xc, ys)
                        break
                }

                switch (corners.sw) {
                    case Corners.Exterior:
                        outerPath.lineTo(xcw, yis)
                        outerPath.arc(xcw, ycs, twelfth, Angles.South, Angles.West)
                        outerPath.lineTo(xiw, yc)
                        sw = true
                        break
                    case Corners.Horizontal:
                        outerPath.lineTo(xw, yis)
                        outerPath.lineTo(xw, yc)
                        break
                    case Corners.Vertical:
                        outerPath.lineTo(xiw, ys)
                        outerPath.lineTo(xiw, yc)
                        break
                    case Corners.Interior:
                        outerPath.lineTo(xiw, ys)
                        outerPath.arc(xw, ys, twelfth, Angles.East, Angles.North, true)
                        outerPath.lineTo(xw, yc)
                        sw = true
                        break
                    case Corners.Full:
                        outerPath.lineTo(xw, ys)
                        outerPath.lineTo(xw, yc)
                        break
                }

                switch (corners.nw) {
                    case Corners.Exterior:
                        outerPath.lineTo(xiw, ycn)
                        outerPath.arc(xcw, ycn, twelfth, Angles.West, Angles.North)
                        outerPath.lineTo(xc, yin)
                        nw = true
                        break
                    case Corners.Horizontal:
                        outerPath.lineTo(xw, yin)
                        outerPath.lineTo(xc, yin)
                        break
                    case Corners.Vertical:
                        outerPath.lineTo(xiw, yn)
                        outerPath.lineTo(xc, yn)
                        break
                    case Corners.Interior:
                        outerPath.lineTo(xw, yin)
                        outerPath.arc(xw, yn, twelfth, Angles.South, Angles.East, true)
                        outerPath.lineTo(xc, yn)
                        nw = true
                        break
                    case Corners.Full:
                        outerPath.lineTo(xw, yn)
                        outerPath.lineTo(xc, yn)
                        break
                }

                switch (corners.ne) {
                    case Corners.Exterior:
                        outerPath.lineTo(xce, yin)
                        outerPath.arc(xce, ycn, twelfth, Angles.North, Angles.East)
                        outerPath.lineTo(xie, yc)
                        ne = true
                        break
                    case Corners.Horizontal:
                        outerPath.lineTo(xe, yin)
                        outerPath.lineTo(xe, yc)
                        break
                    case Corners.Vertical:
                        outerPath.lineTo(xie, yn)
                        outerPath.lineTo(xie, yc)
                        break
                    case Corners.Interior:
                        outerPath.lineTo(xie, yn)
                        outerPath.arc(xe, yn, twelfth, Angles.West, Angles.South, true)
                        outerPath.lineTo(xe, yc)
                        ne = true
                        break
                    case Corners.Full:
                        outerPath.lineTo(xe, yn)
                        outerPath.lineTo(xe, yc)
                        break
                }

                this.context.fill(outerPath)

                this.context.fillStyle = RivetColor
                if (se) {
                    this.context.beginPath()
                    this.context.arc(xce, ycs, twentyFourth, 0.0, Tau)
                    this.context.fill()
                }
                if (sw) {
                    this.context.beginPath()
                    this.context.arc(xcw, ycs, twentyFourth, 0.0, Tau)
                    this.context.fill()
                }
                if (nw) {
                    this.context.beginPath()
                    this.context.arc(xcw, ycn, twentyFourth, 0.0, Tau)
                    this.context.fill()
                }
                if (ne) {
                    this.context.beginPath()
                    this.context.arc(xce, ycn, twentyFourth, 0.0, Tau)
                    this.context.fill()
                }
            }
        }
    }
//#endregion

//#region Render icons
    renderIcons() {
        const size              = viewportSize()
        const rectangle         = displayRectangle(size, this.level.size)
        const cellSize          = displayScalar(size, this.level.size)
        const half              = cellSize / 2
        const third             = cellSize / 3
        const fourth            = cellSize / 4
        const fifth             = cellSize / 5
        const sixth             = cellSize / 6
        const eighth            = cellSize / 8
        const ninth             = cellSize / 9
        const twelfth           = cellSize / 12
        const eighteenth        = cellSize / 18
        const twentyFourth      = cellSize / 24
        const thirtySixth       = cellSize / 36

        for (let i = 0; i < this.level.size.width; i++) {
            for (let j = 0; j < this.level.size.height; j++) {
                const icon = this.level.icons[i][j]
                if (icon.type === IconTypes.None) {
                    continue
                }

                const x = rectangle.x + i * cellSize
                const y = rectangle.y + j * cellSize

                const xc = x + half
                const yc = y + half

                this.context.fillStyle = `rgba(255, 255, 255, ${icon.alpha})`
                this.context.strokeStyle = `rgba(255, 255, 255, ${icon.alpha})`
                this.context.lineWidth = twentyFourth

                //return

                switch (icon.type) {
                    // Circle
                    case IconTypes.Cover:
                        this.context.beginPath()
                        this.context.arc(xc, yc, eighth, 0, Tau)
                        this.context.fill()
                    break

                    // Concentric squares
                    case IconTypes.Order: {
                        const size = (icon.number + 1) * eighteenth
                        const halfSize = size / 2
                        this.context.fillRect(xc - halfSize, yc - halfSize, size, size)
                        break
                    }

                    // Plus
                    case IconTypes.Pair: {
                        const data = `M ${xc + sixth} ${yc + eighteenth} h ${-ninth} v \
                                        ${ninth} h ${-ninth} v ${-ninth} h ${-ninth} v \
                                        ${-ninth} h ${ninth} v ${-ninth} h ${ninth} v \
                                        ${ninth} h ${ninth} Z`
                        const path = new Path2D(data)
                        this.context.fill(path)
                        break
                    }

                    // Kite
                    case IconTypes.Separate: {
                        this.context.beginPath()
                        this.context.moveTo(xc + sixth, yc)
                        this.context.lineTo(xc, yc + sixth)
                        this.context.lineTo(xc - sixth, yc)
                        this.context.lineTo(xc, yc - sixth)
                        this.context.closePath()
                        this.context.fill()
                        break
                    }

                    // Sun
                    case IconTypes.Palindrome: {
                        this.context.beginPath()
                        this.context.moveTo(xc + sixth, yc)
                        for (let i = 1; i < 20; i++) {
                            const r     = i % 2 === 0 ? sixth : eighth
                            const cos   = xc + Math.cos(i * Tau / 20) * r
                            const sin   = yc + Math.sin(i * Tau / 20) * r
                            this.context.lineTo(cos, sin)
                        }
                        this.context.closePath()
                        this.context.fill()
                        break
                    }

                    // Mirror
                    case IconTypes.Symmetry: {
                        if (icon.axis === Axes.Horizontal) {
                            this.context.beginPath()
                            this.context.arc(xc + thirtySixth, yc, eighth, -0.25 * Tau, 0.25 * Tau)
                            this.context.closePath()
                            this.context.fill()
                            this.context.beginPath()
                            this.context.arc(xc - thirtySixth, yc, eighth, 0.25 * Tau, -0.25 * Tau)
                            this.context.closePath()
                            this.context.fill()
                        } else if (icon.axis === Axes.Vertical) {
                            this.context.beginPath()
                            this.context.arc(xc, yc + thirtySixth, eighth, 0.0, 0.5 * Tau)
                            this.context.closePath()
                            this.context.fill()
                            this.context.beginPath()
                            this.context.arc(xc, yc - thirtySixth, eighth, 0.5 * Tau, Tau)
                            this.context.closePath()
                            this.context.fill()
                        }
                        break
                    }

                    // Hexagon
                    case IconTypes.Together: {
                        this.context.beginPath()
                        this.context.moveTo(xc + Math.cos(-Tau / 4) * sixth, yc + Math.sin(-Tau / 4) * sixth)
                        for (let i = 1; i < 6; i++) {
                            const cos   = xc + Math.cos(i * Tau / 6 - Tau / 4) * sixth
                            const sin   = yc + Math.sin(i * Tau / 6 - Tau / 4) * sixth
                            this.context.lineTo(cos, sin)
                        }
                        this.context.closePath()
                        this.context.fill()
                        break
                    }

                    // Triangle
                    // Line must exit the cell in the indicated direction
                    case IconTypes.Direction: {
                        let theta = 0.0
                        switch (icon.direction) {
                            case Directions.East: 
                                theta = 0.0
                                break
                            case Directions.South: 
                                theta = Tau * 0.25
                                break
                            case Directions.West: 
                                theta = Tau * 0.5
                                break
                            case Directions.North: 
                                theta = Tau * 0.75
                                break
                        }
                        this.context.beginPath()
                        this.context.moveTo(xc + Math.cos(theta) * sixth, yc + Math.sin(theta) * sixth)
                        for (let i = 1; i < 3; i++) {
                            const cos   = xc + Math.cos(theta + i * Tau / 3) * sixth
                            const sin   = yc + Math.sin(theta + i * Tau / 3) * sixth
                            this.context.lineTo(cos, sin)
                        }
                        this.context.closePath()
                        this.context.fill()
                        break
                    }
                    
                    // Clover
                    // The number of turns in the path must equal the number of turn icons in the path
                    case IconTypes.Turn: {
                        this.context.beginPath()
                        this.context.moveTo(xc + twelfth, yc)
                        this.context.arc(xc + twelfth, yc + twelfth, twelfth, Tau * 0.75, Tau * 0.5)
                        this.context.arc(xc - twelfth, yc + twelfth, twelfth, 0, Tau * 0.75)
                        this.context.arc(xc - twelfth, yc - twelfth, twelfth, Tau * 0.25, 0)
                        this.context.arc(xc + twelfth, yc - twelfth, twelfth, Tau * 0.5, Tau * 0.25)
                        this.context.closePath()
                        this.context.fill()
                        break
                    }
                   
                    // Star
                    // Must satisfy the next requirement on the path
                    case IconTypes.Copy: {
                        this.context.beginPath()
                        this.context.moveTo(xc, yc - sixth)
                        for (let i = 1; i < 10; i++) {
                            const r     = i % 2 === 0 ? sixth : ninth
                            const cos   = xc + Math.cos(i * Tau / 10 - Tau / 4) * r
                            const sin   = yc + Math.sin(i * Tau / 10 - Tau / 4) * r
                            this.context.lineTo(cos, sin)
                        }
                        this.context.closePath()
                        this.context.fill()
                        break
                    }


                }
            }
        }
    }
//#endregion

//#region Render overlay
    renderOverlay() {
        const elapsedStateMillis = performance.now() - this.stateStartMillis
        switch (this.gameState) {
            case GameStates.FadeIn: {
                const value = sinePosition(1.0 - elapsedStateMillis / FadeInMillis)
                this.context.fillStyle = `rgba(0, 0, 0, ${value})`
                this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
                break
            }
            case GameStates.Play: {
                
                break
            }
            case GameStates.FadeOut: {
                const value = sinePosition(elapsedStateMillis / FadeOutMillis)
                this.context.fillStyle = `rgba(0, 0, 0, ${value})`
                this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
                break
            }
            case GameStates.Transition: {
                this.context.fillStyle = 'black'
                this.context.fillRect(0, 0, window.innerWidth, window.innerHeight)
                break
            }
        }
    }
//#endregion

//#region Render snap
    // Make corners quarter turn arcs instead of overlapping
    renderSnap() {
        const size          = viewportSize()
        const rectangle     = displayRectangle(size, this.level.size)
        const cellSize      = displayScalar(size, this.level.size)
        const snap          = this.level.snap
        const heartbeat     = 1.0 + 0.25 * heartbeatPosition(performance.now() % 800 / 800)

        if (this.gameState === GameStates.Transition) {
            const oldRectangle          = displayRectangle(size, this.oldLevel.size)
            const oldCellSize           = displayScalar(size, this.oldLevel.size)
            const oldSnap               = this.oldLevel.snap
            const startX                = oldRectangle.x + (oldSnap.point.x + 0.5) * oldCellSize
            const startY                = oldRectangle.y + (oldSnap.point.y + 0.5) * oldCellSize
            const startRadius           = oldCellSize
            const endX                  = rectangle.x + (snap.point.x + 0.5) * cellSize
            const endY                  = rectangle.y + (snap.point.y + 0.5) * cellSize
            const endRadius             = cellSize
            const elapsedStateMillis    = performance.now() - this.stateStartMillis
            const position              = sinePosition(elapsedStateMillis / TransitionMillis)
            const x                     = startX + (endX - startX) * position
            const y                     = startY + (endY - startY) * position
            const radius                = heartbeat * (startRadius + (endRadius - startRadius) * position)
            this.renderHead(x, y, radius)
            return
        }

        this.context.lineWidth      = SnapLineWidth * cellSize
        this.context.lineCap        = 'round'

        if (snap.state === SnapStates.Idle) {
            this.context.fillStyle      = SnapColor
            this.context.strokeStyle    = SnapColor
            const headX = rectangle.x + (snap.point.x + 0.5) * cellSize
            const headY = rectangle.y + (snap.point.y + 0.5) * cellSize
            this.renderHead(headX, headY, heartbeat * cellSize)
            return
        }

        this.context.fillStyle      = SnapColor
        this.context.strokeStyle    = SnapColor

        const movementTree = this.level.movementTree
        const guidePath = movementTree.guideNode.rootPath()
        if (snap.state === SnapStates.Advance) {
            guidePath.reverse()
        }
        let remainingDistance = snap.distance
        let movingX = rectangle.x + (snap.point.x + 0.5) * cellSize
        let movingY = rectangle.y + (snap.point.y + 0.5) * cellSize
        for (let i = 0; i < guidePath.length - 1 && remainingDistance > 0.0; i++) {
            const scalar = remainingDistance >= 1.0 ? 1.0 : remainingDistance
            const p1 = guidePath[i]
            const p2 = guidePath[i + 1]
            const dx = (p2.x - p1.x) * scalar
            const dy = (p2.y - p1.y) * scalar
            const x1 = rectangle.x + (p1.x + 0.5) * cellSize
            const y1 = rectangle.y + (p1.y + 0.5) * cellSize
            const x2 = rectangle.x + ((p1.x + dx) + 0.5) * cellSize
            const y2 = rectangle.y + ((p1.y + dy) + 0.5) * cellSize
            movingX = x2
            movingY = y2
            this.context.beginPath()
            this.context.moveTo(x1, y1)
            this.context.lineTo(x2, y2)
            this.context.stroke()
            remainingDistance--
        }

        let headX = movingX
        let headY = movingY
        if (snap.state === SnapStates.Advance) {
            headX = rectangle.x + (snap.point.x + 0.5) * cellSize
            headY = rectangle.y + (snap.point.y + 0.5) * cellSize
        }
        this.renderHead(headX, headY, heartbeat * cellSize)
    }

    renderHead(x, y, scale) {
        // const path = new Path2D("M 0 0.45 \
        //                             C 0 0.45 -0.35 0.25 -0.475 -0.05 \
        //                             C -0.6 -0.4 -0.2 -0.6 0 -0.3 \
        //                             C 0.2 -0.6 0.6 -0.4 0.475 -0.05 \
        //                             C 0.35 0.25 0 0.45 0 0.45 Z")
        // this.context.fillStyle = SnapColor
        // this.context.translate(x, y)
        // this.context.scale(scale * 0.4, scale * 0.4)
        // this.context.fill(path)
        // this.context.setTransform(1, 0, 0, 1, 0, 0)

        this.context.fillStyle = SnapColor
        this.context.beginPath()
        this.context.arc(x, y, scale * 0.16666666666, 0, Tau)
        this.context.fill()
    }
//#endregion

//#region Render text
    renderFPS() {
        this.context.fillStyle = '#888'
        this.context.font = '12px sans-serif'
        this.context.fillText(`FPS: ${this.fpsTracker.framesPerSecond.toFixed(2)}`, 10, 20)
    }
    renderName() {
        this.context.fillStyle = '#FFF'
        this.context.font = '16px sans-serif'
        this.context.fillText(this.level.name, 10, 50);
    }
//#endregion

//#region Main loop
    mainLoop() {
        this.update()
        this.render()
        this.fpsTracker.trackFPS()
        requestAnimationFrame(() => { this.mainLoop() })
    }
//#endregion
}