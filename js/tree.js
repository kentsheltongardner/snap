class MovementTree {
    constructor(point) {
        this.point          = point
        this.root           = new MovementNode(point)
        this.controlNode    = this.root
        this.guideNode      = this.root
    }
    grow(point) {
        for (const child of this.controlNode.children) {
            if (point.equals(child.point)) {
                this.controlNode = child
                return
            }
        }
        const node = new MovementNode(point, this.controlNode)
        this.controlNode.children.push(node)
        this.controlNode = node
    }
    trim(node) {
        this.controlNode = node
    }
    controlPoint() {
        return this.controlNode.point
    }
    pointOnControlPath(point) {
        let current = this.controlNode
        while (current !== null) {
            if (point.equals(current.point)) {
                return true
            }
            current = current.parent
        }
        return false
    }
    nodeOnControlPath(node) {
        let current = this.controlNode
        while (current !== null) {
            if (current === node) {
                return true
            }
            current = current.parent
        }
        return false
    }
    distanceOnControlPath(node) {
        let current = node
        while(current !== null) {
            if (this.nodeOnControlPath(current)) {
                return current.distanceFromRoot()
            }
            current = current.parent
        }
        return 0
    }
    reversedTree() {
        const controlPoints = this.controlNode.rootPath()
        const length        = controlPoints.length
        const reversedTree  = new MovementTree(controlPoints[length - 1])
        for (let i = length - 2; i >= 0; i--) {
            reversedTree.grow(controlPoints[i])
        }
        reversedTree.guideNode = reversedTree.controlNode
        reversedTree.controlNode = reversedTree.root
        return reversedTree
    }
    log() {
        const controlPoints = this.controlNode.rootPath()
        for (const point of controlPoints) {
            console.log(point)
        }
        console.log(`Root: ${this.root.point.x}, ${this.root.point.y}`)
        console.log(`Control: ${this.controlNode.point.x}, ${this.controlNode.point.y}`)
        console.log(`Guide: ${this.guideNode.point.x}, ${this.guideNode.point.y}`)
    }
}
class MovementNode {
    constructor(point, parent = null) {
        this.point      = point
        this.parent     = parent
        this.children   = []
    }
    distanceFromRoot() {
        let distance = 0
        let parent = this.parent
        while (parent !== null) {
            distance++
            parent = parent.parent
        }
        return distance
    }
    rootPath() {
        const path = []
        let current = this
        while (current !== null) {
            path.unshift(current.point)
            current = current.parent
        }
        return path
    }
}