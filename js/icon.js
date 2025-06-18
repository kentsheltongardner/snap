const IconTypes = {
    None:       'None',
    // No icon is present

    Cover:      'Cover',
    // No requirement
    // Circle

    Pair:       'Pair',
    // The sum of Pair icons in a sequence must equal the sum of non-Pair icons
    // Create clusters of wall surrounded, floating Pair icons to enforce sequence length
    // Plus

    Order:      'Order',
    // The Order icon must be exactly one less than the next icon in the sequence
    // Squares of increasing size

    Separate:   'Separate',
    // Separate icons may not appear consecutively in the sequence
    // Kite

    Palindrome: 'Palindrome',
    // The icon opposite a Palindrome icon must also be a Palindrome icon
    // Sun

    Together: 'Together',
    // All together icons must be on the same path
    // Hexagon

    Group:      'Group',
    // Group icons of only one color may appear in a sequence
    // ?

    Symmetry:   'Symmetry',
    // The line must be bilaterally symmetrical
    // ?

    Direction:  'Direction',
    // The line must exit the Direction icon's cell in the indicated direction
    // Triangle

    Turn:  'Turn',
    // The number of turns in the line (1, -1 for cw, ccw) must equal the sum of turn icons
    // or...
    // The numbers of CW/CCW turns in the path must independently equal the sums of the CW/CCW turn icons
    // or...
    // Total number of turns, regardless of direction
    // Pinwheel
    // Four pointed star

    Orthogonal: 'Orthogonal',
    // The previous and next icons must be orthogonal to this icon
    // 

    Copy:       'Copy',
    // The Copy icon becomes an exact copy of the next icon in the sequence
    // Star

}

// Path in/out direction must be the same for all objects
// Exactly half of icons must be on line
// Each icon not on the line must be isolated from all others
// Must be furthest uncovered icon to be crossed
// Must not be last icon to be crossed

class Icon {
    constructor(type, color, direction, number, rotation, axis) {
        this.type       = type
        this.color      = color
        this.direction  = direction
        this.number     = number
        this.rotation   = rotation
        this.axis       = axis
        this.active     = type !== IconTypes.None
        this.alpha      = this.active ? 0.25 : 0.0
    }
    update(frameTimeMillis) {
        if (this.type !== IconTypes.None && !this.active) {
            const change = (frameTimeMillis / StandardFPSMillis) * (this.alpha - (this.alpha * 0.9))
            this.alpha -= change
            if (this.alpha < 0.001) {
                this.alpha = 0.0
            }
        }
    }
    complete() {
        return this.alpha === 0.0
    }
    copy() {
        const copy = new Icon(this.type, this.color, this.direction, this.number, this.rotation, this.axis)
        copy.active = this.active
        copy.alpha = this.alpha
        return copy
    }
}