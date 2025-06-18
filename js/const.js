const FPSMeasurementFrames  = 60
const StandardFPSMillis     = 1 / 60 * 1000
const FadeInMillis          = 250
const TransitionMillis      = 400
const FadeOutMillis         = 350
const Tau                   = Math.PI * 2.0
const SnapLineWidth         = 1 / 6
const SnapHeadRadius        = 1 / 6

// const WaterColor            = '#111'
// const FloorColor            = '#555'=
// const WallColor             = '#aaa'

const WaterColor            = '#2C5A90'
const FloorColor            = '#72A049'
const DirtColor             = '#B0662E'
const WallColor             = '#B6B6B6'
const RivetColor            = '#969696'
const SnapColor             = '#FFF9E7'//'#C4414F'

// const WaterColor            = '#202020'
// const FloorColor            = '#808080'
// const DirtColor             = '#B0662E'
// const WallColor             = '#c0c0c0'
// const RivetColor            = '#404040'
// const SnapColor             = '#ffffff'//'#C4414F'

const Unreachable           = 999 // Distinct and larger than any map
const Impassable            = -1
const Angles = {
    East:   0,
    South:  Tau * 0.25,
    West:   Tau * 0.5,
    North:  Tau * 0.75,
}
const Corners = {
    Exterior:           'Exterior',
    Vertical:           'Vertical',
    Horizontal:         'Horizontal',
    Interior:           'Interior',
    Full:               'Full',
}
const Directions = {
    East:               'East',
    Southeast:          'Southeast', 
    South:              'South',
    Southwest:          'Southwest',
    West:               'West',
    Northwest:          'Northwest',
    North:              'North',
    Northeast:          'Northeast',
    None:               'None',
}
const Rotations = {
    Clockwise:          'Clockwise',
    Counterclockwise:   'Counterclockwise',
    None:               'None',
}
const Axes = {
    Horizontal:         'Horizontal',
    Vertical:           'Vertical',
    None:               'None',
}
const Colors = {
    Black:              'Black',
    White:              'White',
    Red:                'Red',
    Orange:             'Orange',
    Yellow:             'Yellow',
    Green:              'Green',
    Blue:               'Blue',
    Purple:             'Purple',
    Magenta:            'Magenta',
    Gray:               'Gray',
    Brown:              'Brown',
    Pink:               'Pink',
}
const DirectionPoints = {
    [Directions.East]:      new Point(1, 0),
    [Directions.Southeast]: new Point(1, 1),
    [Directions.South]:     new Point(0, 1),
    [Directions.Southwest]: new Point(-1, 1),
    [Directions.West]:      new Point(-1, 0),
    [Directions.Northwest]: new Point(-1, -1),
    [Directions.North]:     new Point(0, -1),
    [Directions.Northeast]: new Point(1, -1),
    [Directions.None]:      new Point(0, 0),
}

const FloorTypes = {
    Floor:      'Floor',
    Water:      'Water',
}
const ObjectTypes = {
    Wall:       'Wall',
    None:       'None',
}
const LevelStates = {
    Begin:      'Begin',
    Idle:       'Idle',
    Move:       'Move',
    Hold:       'Hold',
    Retreat:    'Retreat',
    Advance:    'Advance',
    End:        'End',
}
const GameStates = {
    FadeIn:     'FadeIn',
    Play:       'Play',
    FadeOut:    'FadeOut',
    Transition: 'Transition',
}
