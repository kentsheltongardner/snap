class LevelEngine {
//#region Constructor
    constructor(levelData) {
        this.name               = levelData.name
        this.width              = levelData.floor[0].length
        this.height             = levelData.floor.length
        this.size               = new Size(this.width, this.height)
        this.bounds             = new Rectangle(0, 0, this.width, this.height)
        this.inputQueue         = new InputQueue()
        this.snap               = new Snap(new Point(levelData.x, levelData.y))
        this.movementTree       = null
        this.floor              = null
        this.objects            = null
        this.icons              = null
        this.floorConnections   = null
        this.objectConnections  = null
        this.floorCorners       = null
        this.objectCorners      = null
        this.loadGrids(levelData)
        this.setConnections()
        this.setCorners()
    }
//#endregion

//#region Load
    loadGrids(levelData) {
        this.floor          = Array(this.width).fill().map(() => Array(this.height))
        this.objects        = Array(this.width).fill().map(() => Array(this.height))
        this.icons          = Array(this.width).fill().map(() => Array(this.height))
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                const floor                         = FloorTypes[levelData.floor[j][i]]
                const object                        = ObjectTypes[levelData.objects[j][i]]
                const iconString                    = levelData.icons[j][i]
                this.floor[i][j]                    = floor
                this.objects[i][j]                  = object
                this.icons[i][j]                    = this.buildIcon(iconString)
            }
        }
    }
    buildIcon(iconString) {
        const tokens    = iconString.split(' ')
        const type      = IconTypes[tokens[0]]
        let color       = Colors.Black
        let direction   = Directions.None
        let number      = 0
        let rotation    = Rotations.None
        let axis        = Axes.None
        for (let i = 1; i < tokens.length; i += 2) {
            const attribute = tokens[i]
            const value = tokens[i + 1]
            switch (attribute) {
                case 'c':
                    color = Colors[value]
                    break
                case 'd':
                    direction = Directions[value]
                    break
                case 'n':
                    number = Number.parseInt(value)
                    break
                case 'r':
                    rotation = Rotations[value]
                    break
                case 'a':
                    axis = Axes[value]
                    break
            }
        }
        return new Icon(type, color, direction, number, rotation, axis)
    }
//#endregion

//#region Connections
    setConnections() {
        this.floorConnections   = Array(this.width).fill().map(() => Array(this.height))
        this.objectConnections  = Array(this.width).fill().map(() => Array(this.height))
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.floorConnections[i][j]     = this.connectionData(i, j, this.floor)
                this.objectConnections[i][j]    = this.connectionData(i, j, this.objects)
            }
        }
    }
    connectionData(x, y, grid) {
        const type  = grid[x][y]
        const e     = x < this.width - 1
        const s     = y < this.height - 1
        const w     = x > 0
        const n     = y > 0
        const se    = s && e
        const sw    = s && w
        const nw    = n && w
        const ne    = n && e
        return new DirectionData(
            e   && type === grid[x + 1][y],
            se  && type === grid[x + 1][y + 1],
            s   && type === grid[x][y + 1],
            sw  && type === grid[x - 1][y + 1],
            w   && type === grid[x - 1][y],
            nw  && type === grid[x - 1][y - 1],
            n   && type === grid[x][y - 1],
            ne  && type === grid[x + 1][y - 1]
        )
    }
//#endregion

//#region Corners
    setCorners() {
        this.floorCorners   = Array(this.width).fill().map(() => Array(this.height))
        this.objectCorners  = Array(this.width).fill().map(() => Array(this.height))
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.floorCorners[i][j]     = this.cornerData(this.floorConnections[i][j])
                this.objectCorners[i][j]    = this.cornerData(this.objectConnections[i][j])
            }
        }
    }
    cornerData(connections) {
        return new CornerData(
            this.cornerType(connections.e, connections.s, connections.se),
            this.cornerType(connections.w, connections.s, connections.sw),
            this.cornerType(connections.w, connections.n, connections.nw),
            this.cornerType(connections.e, connections.n, connections.ne)
        )
    }
    cornerType(horizontal, vertical, diagonal) {
        if (horizontal && vertical) {
            if (diagonal) {
                return Corners.Full
            }
            return Corners.Interior
        }
        if (horizontal) {
            return Corners.Horizontal
        }
        if (vertical) {
            return Corners.Vertical
        }
        return Corners.Exterior
    }
//#endregion

//#region Mouse input
    mouseDown(e, canvasSize) {
        this.inputQueue.mouseDown(e, canvasSize, this.size)
    }
    mouseMove(e, canvasSize) {
        this.inputQueue.mouseMove(e, canvasSize, this.size)
    }
    mouseUp(e, canvasSize) {
        this.inputQueue.mouseUp(e, canvasSize, this.size)
    }

    down(gridPoint) {
        if (this.snap.state === SnapStates.Idle) {
            if (gridPoint.equals(this.snap.point)) {
                this.movementTree   = new MovementTree(gridPoint)
                this.snap.state     = SnapStates.Explore
            }
            return
        }
    }
    drag(gridPoint) {
        //  If there is no selection, you can't drag it
        if (this.snap.state === SnapStates.Idle) {
            if (gridPoint.equals(this.snap.point)) {
                this.movementTree   = new MovementTree(gridPoint)
                this.snap.state     = SnapStates.Explore
            }
            return
        }

        //  You can't drag out of bounds
        if (!inBounds(gridPoint, this.bounds)) {
            return
        }

        //  You can't drag into a wall
        if (this.objects[gridPoint.x][gridPoint.y] === ObjectTypes.Wall) {
            return
        }

        //  Dragging onto a cell in the control path trims the path
        if (this.movementTree.pointOnControlPath(gridPoint)) {
            let node = this.movementTree.controlNode
            while (node !== null) {
                if (node.point.equals(gridPoint)) {
                    this.movementTree.trim(node)
                    break
                }
                node = node.parent
            }
            return
        }

        // If the grid point is on the control path and is not the parent, return
        // if (this.movementTree.pointOnControlPath(gridPoint)) {
        //     const parent = this.movementTree.controlNode.parent
        //     if (parent === null || !gridPoint.equals(parent.point)) {
        //         return
        //     } else {
        //         this.movementTree.trim(this.movementTree.controlNode)
        //     }
        // }


        
        //  If there is a unique optimal path, create that path
        this.traverseOptimalPath(gridPoint)
        // If the active snap is still on the control path, update the guide node to be the new control node
        // If not on the control path, we need to keep the old guide node to properly move downward
        if (this.movementTree.nodeOnControlPath(this.movementTree.guideNode)) {
            this.movementTree.guideNode = this.movementTree.controlNode
        }
    }
    up() {
        // Finish current movement and evaluate
        if (this.snap.state === SnapStates.Explore) {
            this.snap.state = SnapStates.Wait
        }
    }
//#endregion

//#region Validation
    validPath(points) {
        if (points.length === 1) {
            return false
        }

        const end = points[points.length - 1]
        if (this.floor[end.x][end.y] === FloorTypes.Water) {
            return false
        }

        const iconSequence = []
        const pointSequence = []
        for (const point of points) {
            const icon = this.icons[point.x][point.y]
            if (icon.type !== IconTypes.None && icon.active) {
                iconSequence.push(icon)
                pointSequence.push(point)
            }
        }

        // For copies
        const copies = Array(this.width).fill().map(() => Array(this.height))
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                copies[i][j] = this.icons[i][j]
            }
        }

        // Copy
        for (let i = iconSequence.length - 2; i >= 0; i--) {
            if (iconSequence[i].type === IconTypes.Copy) {
                const copy = iconSequence[i + 1].copy()
                const point = pointSequence[i]
                iconSequence[i] = copy
                copies[point.x][point.y] = copy
            }
        }

        // Cover

        // Pair
        let pairCount = 0
        let otherCount = 0
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Pair) {
                pairCount++
            } else {
                otherCount++
            }
        }
        if (pairCount > 0 && pairCount !== otherCount) {
            return false
        }

        // Order
        let order = 0
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Order) {
                if (order > 0 && icon.number !== order + 1) {
                    return false
                }
                order = icon.number
            }
        }

        // Separate
        let previous = IconTypes.None
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Separate && icon.type === previous) {
                return false
            }
            previous = icon.type
        }

        // Palindrome
        const halfSequenceLength = Math.floor(iconSequence.length / 2)
        for (let i = 0; i < halfSequenceLength; i++) {
            const icon1 = iconSequence[i]
            const icon2 = iconSequence[iconSequence.length - i - 1]
            if ((icon1.type === IconTypes.Palindrome || icon2.type === IconTypes.Palindrome)
                && icon1.type !== icon2.type) {
                return false
            }
        }

        // Together
        let together = false
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Together) {
                together = true
                break
            }
        }
        if (together) {
            let togetherSequence = 0
            let togetherLevel = 0
            for (const icon of iconSequence) {
                if (icon.type === IconTypes.Together) {
                    togetherSequence++
                }
            }
            for (let i = 0; i < this.width; i++) {
                for (let j = 0; j < this.height; j++) {
                    if (copies[i][j].type === IconTypes.Together) {
                        togetherLevel++
                    }
                }
            }
            if (togetherSequence !== togetherLevel) {
                return false
            }
        }

        // Symmetry
        const halfPathLength = Math.floor(points.length / 2)
        let symmetryHorizontal = false
        let symmetryVertical = false
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Symmetry) {
                if (icon.axis === Axes.Horizontal) {
                    symmetryHorizontal = true
                } else {
                    symmetryVertical = true
                }
            }
        }
        // Straight lines are special cases of symmetry where my 
        // (bad) algorithm doesn't work, so weed out straight lines
        // as satisfying either horizontal or vertical symmetry
        let horizontalLine = true
        let verticalLine = true
        for (let i = 1; i < points.length; i++) {
            if (points[i].y !== points[0].y) {
                horizontalLine = false
            }
            if (points[i].x !== points[0].x) {
                verticalLine = false
            }
        }
        if (!horizontalLine && !verticalLine) {
            if (symmetryHorizontal) {
                const doubleCenter = points[0].x + points[points.length - 1].x
                for (let i = 0, j = points.length - 1; i < halfPathLength; i++, j--) {
                    const start = points[i]
                    const end   = points[j]
                    if (start.y !== end.y) {
                        return false
                    }
                    if (start.x + end.x !== doubleCenter) {
                        return false
                    }
                }
            }
            if (symmetryVertical) {
                const doubleCenter = points[0].y + points[points.length - 1].y
                for (let i = 0, j = points.length - 1; i < halfPathLength; i++, j--) {
                    const start = points[i]
                    const end   = points[j]
                    if (start.x !== end.x) {
                        return false
                    }
                    if (start.y + end.y !== doubleCenter) {
                        return false
                    }
                }
            }
        }

        //Direction
        for (let i = 0; i < points.length - 1; i++) {
            const p1 = points[i]
            const icon = copies[p1.x][p1.y]
            if (icon.active && icon.type === IconTypes.Direction) {
                const p2 = points[i + 1]
                switch (icon.direction) {
                    case Directions.East: 
                        if (p2.y !== p1.y || p2.x !== p1.x + 1) {
                            return false
                        }
                        break
                    case Directions.South: 
                        if (p2.x !== p1.x || p2.y !== p1.y + 1) {
                            return false
                        }
                        break
                    case Directions.West: 
                        if (p2.y !== p1.y || p2.x !== p1.x - 1) {
                            return false
                        }
                        break
                    case Directions.North: 
                        if (p2.x !== p1.x || p2.y !== p1.y - 1) {
                            return false
                        }
                        break
                }
            }
        }
        const lastPoint = points[points.length - 1]
        const lastIcon = copies[lastPoint.x][lastPoint.y]
        if (lastIcon.active && lastIcon.type === IconTypes.Direction) {
            return false
        }

        //Turn
        let turns = 0
        for (const icon of iconSequence) {
            if (icon.type === IconTypes.Turn) {
                turns++
            }
        }
        if (turns > 0) {
            let pathTurns = 0
            for (let i = 1; i < points.length - 1; i++) {
                const p1 = points[i - 1]
                const p2 = points[i + 1]
                if (Math.abs(p2.x - p1.x) === 1 || Math.abs(p2.y - p1.y) === 1) {
                    pathTurns++
                }
            }
            if (pathTurns !== turns) {
                return false
            }
        }


        // Valid
        return true
    }

    iconsSatisfied() {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.icons[i][j].active) {
                    return false
                }
            }
        }
        return true
    }

    complete() {
        if (this.snap.state !== SnapStates.Idle) {
            return false
        }
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (!this.icons[i][j].complete()) {
                    return false
                }
            }
        }
        return true
    }
//#endregion

//#region Pathfinding
// Build path
// If no path without backtracking, build path with backtracking
    pathGrid() {
        const pathGrid = Array(this.width).fill().map(() => Array(this.height).fill(Unreachable))
        // Set all walls to impassable
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.objects[i][j] === ObjectTypes.Wall) {
                    pathGrid[i][j] = Impassable
                }
            }
        }
        return pathGrid
    }

    traverseOptimalPath(endPoint) {
        // Create an integer longer than the longest possible path on the grid
        let pathGrid        = this.pathGrid()
        // Set the current control path (minus control point) to impassable
        const controlNode   = this.movementTree.controlNode
        const controlPoint  = controlNode.point
        const path          = controlNode.rootPath()
        for (const point of path) {
            pathGrid[point.x][point.y] = Impassable
        }
        // Current control point must must not be impassable for recursion to work
        pathGrid[controlPoint.x][controlPoint.y] = Unreachable
        // Build the optimal path grid
        this.buildOptimalPathGrid(pathGrid, endPoint.x, endPoint.y, 0)

        let x           = controlPoint.x
        let y           = controlPoint.y
        let distance    = pathGrid[controlPoint.x][controlPoint.y]

        // If no optimal path, try again with backtracking allowed
        if (distance === Unreachable) {
            pathGrid                    = this.pathGrid()
            const point                 = this.snap.point
            pathGrid[point.x][point.y]  = Unreachable
            this.buildOptimalPathGrid(pathGrid, endPoint.x, endPoint.y, 0)
            distance = pathGrid[controlPoint.x][controlPoint.y]
            if (distance === Unreachable) {
                return
            }
        }
        
        // If there are two options for advance with no differentiating characteristic, return
        const uniqueOptimalPath = []
        while (distance > 0) {
            distance--
            const e = x < this.width - 1
            const s = y < this.height - 1
            const w = x > 0
            const n = y > 0
            let pathFound = false
            let nextX = x
            let nextY = y
            if (e && pathGrid[x + 1][y] === distance) {
                if (pathFound) {
                    return
                }
                pathFound = true
                nextX++
            }
            if (s && pathGrid[x][y + 1] === distance) {
                if (pathFound) {
                    return
                }
                pathFound = true
                nextY++
            }
            if (w && pathGrid[x - 1][y] === distance) {
                if (pathFound) {
                    return
                }
                pathFound = true
                nextX--
            }
            if (n && pathGrid[x][y - 1] === distance) {
                if (pathFound) {
                    return
                }
                pathFound = true
                nextY--
            }
            x = nextX
            y = nextY
            uniqueOptimalPath.push(new Point(x, y))
        }

        for (const point of uniqueOptimalPath) {
            if (this.movementTree.pointOnControlPath(point)) {
                let node = this.movementTree.controlNode
                while (node !== null) {
                    if (node.point.equals(point)) {
                        this.movementTree.trim(node)
                        break
                    }
                    node = node.parent
                }
            } else {
                this.movementTree.grow(point)
            }
        }
    }
    buildOptimalPathGrid(pathGrid, x, y, distance) {
        if (pathGrid[x][y] === -1 || pathGrid[x][y] <= distance) return
        pathGrid[x][y] = distance
        if (x > 0)                  this.buildOptimalPathGrid(pathGrid, x - 1, y, distance + 1)
        if (y > 0)                  this.buildOptimalPathGrid(pathGrid, x, y - 1, distance + 1)
        if (x < this.width - 1)     this.buildOptimalPathGrid(pathGrid, x + 1, y, distance + 1)
        if (y < this.height - 1)    this.buildOptimalPathGrid(pathGrid, x, y + 1, distance + 1)
    }
    printPathGrid(pathGrid) {
        let string = ''
        for (let i = 0; i < this.height; i++) {
            for (let j = 0; j < this.width; j++) {
                string += pathGrid[j][i] + '\t'
            }
            string += '\n'
        }
        console.log(string)
    }
//#endregion

//#region Update

    updateIcons(frameTimeMillis) {
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                this.icons[i][j].update(frameTimeMillis)
            }
        }
    }
    processInputQueue() {
        if (this.iconsSatisfied()) {
            return
        }
        if (this.snap.state === SnapStates.Idle || this.snap.state === SnapStates.Explore) {
            while (this.inputQueue.length() > 0) {
                const input = this.inputQueue.dequeue()
                switch (input.type) {
                    case InputTypes.Down:
                        this.down(input.point)
                        break
                    case InputTypes.Drag:
                        this.drag(input.point)
                        break
                    case InputTypes.Up:
                        this.up()
                        break
                }
            }
        }
    }

    updateSnap(frameTimeMillis) {
        if (this.snap.state === SnapStates.Idle) {
            return
        }

        if ((this.snap.state === SnapStates.Advance || this.snap.state === SnapStates.Retreat)
            && this.snap.distance === 0) {
            this.snap.state   = SnapStates.Idle
            return
        }

        // Scales velocity for different framerates
        const velocityAdjustment = frameTimeMillis / StandardFPSMillis

        if (this.snap.state === SnapStates.Advance) {
            const velocity = velocityAdjustment * (0.025 + 0.1 * this.snap.distance)
            this.snap.distance -= velocity
            if (this.snap.distance < 0.0) {
                this.snap.state = SnapStates.Idle
            }
            return
        }

        const controlNode = this.movementTree.controlNode
        const guideNode = this.movementTree.guideNode
        const controlDistance = controlNode.distanceFromRoot()
        const guideNodePathDistance = this.movementTree.distanceOnControlPath(guideNode)

        if (this.snap.distance === controlDistance && controlNode === guideNode) {
            this.snap.velocity = 0.0
            if (this.snap.state === SnapStates.Wait) {
                const controlPoints = this.movementTree.controlNode.rootPath()

                if (this.validPath(controlPoints)) {
                    this.snap.state = SnapStates.Advance
                    this.snap.point = controlNode.point
                    for (const point of controlPoints) {
                        this.icons[point.x][point.y].active = false
                    }
                    return
                } else {
                    this.snap.state = SnapStates.Retreat
                }
                this.movementTree.controlNode = this.movementTree.root
            }
            return
        }

        if (this.snap.distance <= guideNodePathDistance) {
            this.movementTree.guideNode = controlNode
            const distance = Math.abs(this.snap.distance - guideNodePathDistance)
            const velocity = velocityAdjustment * (0.025 + 0.1 * distance)
            this.snap.distance += velocity
            if (this.snap.distance >= controlDistance) {
                this.snap.distance = controlDistance
            }
        } else {
            const distance = Math.abs(this.snap.distance - guideNodePathDistance) + Math.abs(controlDistance - guideNodePathDistance)
            const velocity = velocityAdjustment * (0.025 + 0.1 * distance)
            this.snap.distance -= velocity
            if (this.snap.distance <= guideNodePathDistance) {
                this.movementTree.guideNode = controlNode
                const remainingVelocity = guideNodePathDistance - this.snap.distance
                this.snap.distance += remainingVelocity
                if (this.snap.distance >= controlDistance) {
                    this.snap.distance = controlDistance
                }
            }
        }
    }
    update(frameTimeMillis) {
        this.updateIcons(frameTimeMillis)
        this.processInputQueue()
        this.updateSnap(frameTimeMillis)
    }
//#endregion
}