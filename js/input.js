const InputTypes = {
    Down:       'down',
    Drag:       'drag',
    Up:         'up'
}

class Input {
    constructor(type, point) {
        this.type   = type
        this.point  = point
    }
    equals(input) {
        return this.type === input.type && this.point.equals(input.point)
    }
}

// An input queue is used so that inputs entered while a snap advances are not lost
class InputQueue {
    constructor() {
        this.mousePressed = false
        this.inputs = []
    }
    mouseDown(e, canvasSize, levelSize) {
        if (e.button !== 0) {
            return
        }
        this.mousePressed   = true
        const mousePoint    = new Point(e.offsetX, e.offsetY)
        const point         = gridPoint(mousePoint, canvasSize, levelSize)
        this.enqueue(new Input(InputTypes.Down, point))
    }
    mouseMove(e, canvasSize, levelSize) {
        if (!this.mousePressed) {
            return
        }
        const mousePoint    = new Point(e.offsetX, e.offsetY)
        const point         = gridPoint(mousePoint, canvasSize, levelSize)
        this.enqueue(new Input(InputTypes.Drag, point))
    }
    mouseUp(e, canvasSize, levelSize) {
        if (e.button !== 0) {
            return
        }
        this.mousePressed   = false
        const mousePoint    = new Point(e.offsetX, e.offsetY)
        const point         = gridPoint(mousePoint, canvasSize, levelSize)
        this.enqueue(new Input(InputTypes.Up, point))
    }

    front() {
        if (this.inputs.length === 0) {
            return null
        }
        return this.inputs[0]
    }
    back() {
        if (this.inputs.length === 0) {
            return null
        }
        return this.inputs[this.inputs.length - 1]
    }
    length() {
        return this.inputs.length
    }

    enqueue(input) {
        const back = this.back()
        if (back !== null
            && (back.type === InputTypes.Down || InputTypes.Drag)
            && input.type === InputTypes.Drag
            && back.point.equals(input.point)) {
            return
        }
        this.inputs.push(input)
    }
    dequeue() {
        if (this.inputs.length === 0) {
            return null
        }
        return this.inputs.shift()
    }
}