//#region Random

// For each type, ensure that the icon is not in a trivially impossible arrangement

function RandomLevelData(width, height) {
    const floor     = Array(height).fill().map(() => Array(width))
    const objects   = Array(height).fill().map(() => Array(width))
    const icons     = Array(height).fill().map(() => Array(width))
    const x         = Math.floor(Math.random() * width)
    const y         = Math.floor(Math.random() * height)

    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            floor[i][j] = Math.random() > 0.6 ? FloorTypes.Floor : FloorTypes.Water
            if (floor[i][j] === FloorTypes.Floor) {
                objects[i][j] = Math.random() > 0.75 ? ObjectTypes.Wall : ObjectTypes.None
            } else {
                objects[i][j] = ObjectTypes.None
            }
            if (objects[i][j] === ObjectTypes.None) {
                switch (Math.floor(Math.random() * 15.0)) {
                    case 0: {
                        icons[i][j] = IconTypes.Cover
                        break
                    }
                    case 1: {
                        icons[i][j] = IconTypes.Pair
                        break
                    }
                    case 2: {
                        icons[i][j] = IconTypes.Order + ' n ' + (Math.floor(Math.random() * 4.0) + 1)
                        break
                    }
                    case 3: {
                        icons[i][j] = IconTypes.Separate
                        break
                    }
                    case 4: {
                        icons[i][j] = IconTypes.Palindrome
                        break
                    }
                    case 5: {
                        icons[i][j] = IconTypes.Together
                        break
                    }
                    case 6: {
                        icons[i][j] = IconTypes.Symmetry + ' a ' + (Math.random() > 0.5 ? Axes.Horizontal : Axes.Vertical)
                        break
                    }
                    case 7: {
                        switch (Math.floor(Math.random() * 4.0)) {
                            case 0:
                                icons[i][j] = IconTypes.Direction + ' d ' + Directions.East
                                break
                            case 1:
                                icons[i][j] = IconTypes.Direction + ' d ' + Directions.South
                                break
                            case 2:
                                icons[i][j] = IconTypes.Direction + ' d ' + Directions.West
                                break
                            case 3:
                                icons[i][j] = IconTypes.Direction + ' d ' + Directions.North
                                break
                        }
                        break
                    }
                    case 8: {
                        icons[i][j] = IconTypes.Copy
                        break
                    }
                    default: {
                        icons[i][j] = IconTypes.None
                        break
                    }
                }
            } else {
                icons[i][j] = ObjectTypes.None
            }
        }
        floor[y][x] = FloorTypes.Floor
        objects[y][x] = ObjectTypes.None
    }

    return {
        name: 'Random 6x5 level',
        x: x,
        y: y,
        floor: floor,
        objects: objects,
        icons: icons
    }

}
//const randomLevel = RandomLevelData(6, 5)
//#endregion

const levelData = [
    //randomLevel,

// Player can move from spot to spot
//#region Cover
    {
        name: 'Enigma 1',
        x: 1,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Water', 'Floor', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'Cover', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Bridging the gap',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Cover', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Open water',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Floor', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'Wall'],
            ['None', 'None', 'None'],
            ['Wall', 'None', 'Wall']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'None', 'Cover'],
            ['None', 'Cover', 'None']
        ]
    },
    {
        name: 'Threading the needle',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Floor', 'Water', 'Floor', 'Floor'],
            ['Water', 'Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Wall', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'Cover', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Round trip',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water'],
            ['Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'Wall', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Cover'],
            ['None', 'None', 'None'],
            ['Cover', 'None', 'None']
        ]
    },
//#endregion

//#region Together
    {
        name: 'Enigma 2',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Together', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'All for one',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Water'],
            ['Water', 'Water', 'Floor', 'Water'],
            ['Floor', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['Together', 'None', 'None', 'Together'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Ring around the rosie',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Floor', 'Water'],
            ['Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'Wall', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Together', 'None', 'None'],
            ['None', 'None', 'None'],
            ['Together', 'None', 'None']
        ]
    },
    {
        name: 'Hex',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'Wall'],
            ['None', 'None', 'None', 'None'],
            ['Wall', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'Together', 'Together', 'None'],
            ['None', 'Together', 'Together', 'None'],
            ['None', 'Together', 'Together', 'None']
        ]
    },
    {
        name: 'On the wrong foot',
        x: 0,
        y: 1,
        floor:
        [
            ['Floor', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Floor', 'Floor'],
            ['Floor', 'Floor', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'Wall', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Together', 'Together', 'Together'],
            ['None', 'Together', 'Together'],
            ['None', 'None', 'Together'],
            ['Together', 'Together', 'Together']
        ]
    },
//#endregion

//#region Order
    {
        name: 'Enigma 3',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Order n 1', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'The natural order',
        x: 0,
        y: 1,
        floor:
        [
            ['Floor', 'Floor', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'Wall', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Wall', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Order n 1', 'Order n 2', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'One-way street',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Floor', 'Floor', 'Floor'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'Wall', 'Wall', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'Order n 2', 'Order n 1', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Scenic route',
        x: 0,
        y: 2,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['Wall', 'None', 'None', 'Wall'],
            ['Wall', 'None', 'None', 'Wall'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'Order n 2', 'Order n 3', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Order n 1', 'Order n 4', 'None']
        ]
    },
    {
        name: 'Matryoshka',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Order n 3', 'None'],
            ['Order n 2', 'None', 'Order n 1'],
            ['None', 'Order n 4', 'None']
        ]
    },
    {
        name: 'Split decision',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Order n 1', 'Together'],
            ['Order n 2', 'Together', 'Order n 4'],
            ['Together', 'Order n 3', 'None']
        ]
    },
//#endregion

//#region Direction

{
    name: 'Enigma 4',
    x: 0,
    y: 1,
    floor:
    [
        ['Water', 'Water', 'Water'],
        ['Floor', 'Water', 'Floor'],
        ['Water', 'Water', 'Water']
    ],
    objects:
    [
        ['None', 'None', 'None'],
        ['None', 'None', 'None'],
        ['None', 'None', 'None']
    ],
    icons: [
        ['None', 'None', 'None'],
        ['None', 'Direction d East', 'None'],
        ['None', 'None', 'None']
    ]
},
{
    name: 'Enigma 4',
    x: 0,
    y: 0,
    floor:
    [
        ['Floor', 'Floor', 'Floor'],
        ['Water', 'Floor', 'Water'],
        ['Water', 'Water', 'Water']
    ],
    objects:
    [
        ['None', 'Wall', 'None'],
        ['None', 'Wall', 'None'],
        ['None', 'None', 'None']
    ],
    icons: [
        ['None', 'None', 'None'],
        ['None', 'None', 'None'],
        ['Direction d East', 'None', 'None']
    ]
},
{
    name: 'Eurus',
    x: 0,
    y: 1,
    floor:
    [
        ['Water', 'Water', 'Floor'],
        ['Floor', 'Water', 'Floor'],
        ['Water', 'Water', 'Floor']
    ],
    objects:
    [
        ['None', 'None', 'None'],
        ['None', 'None', 'Wall'],
        ['None', 'None', 'None']
    ],
    icons: [
        ['None', 'None', 'None'],
        ['None', 'Direction d West', 'None'],
        ['None', 'None', 'None']
    ]
},
{
    name: 'All turned around',
    x: 0,
    y: 1,
    floor:
    [
        ['Water', 'Water', 'Water'],
        ['Floor', 'Water', 'Floor'],
        ['Water', 'Water', 'Water']
    ],
    objects:
    [
        ['None', 'None', 'None'],
        ['None', 'None', 'None'],
        ['None', 'None', 'None']
    ],
    icons: [
        ['None', 'Direction d West', 'Direction d South'],
        ['None', 'None', 'None'],
        ['None', 'Direction d North', 'None']
    ]
},
{
    name: 'This way, please',
    x: 0,
    y: 1,
    floor:
    [
        ['Water', 'Water', 'Water', 'Water'],
        ['Floor', 'Water', 'Water', 'Floor'],
        ['Water', 'Water', 'Water', 'Water']
    ],
    objects:
    [
        ['None', 'None', 'None', 'None'],
        ['None', 'None', 'None', 'None'],
        ['None', 'None', 'None', 'None']
    ],
    icons: [
        ['None', 'Together', 'Together', 'None'],
        ['None', 'Direction d North', 'Together', 'None'],
        ['None', 'Together', 'Together', 'None']
    ]
},
//#endregion

//#region Pair
    {
        name: 'Enigma 5',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Cover', 'Pair', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'And 1',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['Cover', 'None', 'Pair'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'False start',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'Wall'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Pair', 'None', 'None'],
            ['None', 'None', 'None'],
            ['Cover', 'None', 'None']
        ]
    },
    {
        name: 'There and back again',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Cover', 'Cover', 'Cover'],
            ['None', 'None', 'None'],
            ['Pair', 'Pair', 'Pair']
        ]
    },
    {
        name: 'Crossing over',
        x: 1,
        y: 3,
        floor:
        [
            ['Water', 'Floor', 'Water'],
            ['Floor', 'Floor', 'Floor'],
            ['Water', 'Floor', 'Water'],
            ['Floor', 'Floor', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['Wall', 'None', 'Wall']
        ],
        icons: [
            ['None', 'Pair', 'Cover'],
            ['Pair', 'Together', 'Together'],
            ['Cover', 'Together', 'Pair'],
            ['None', 'None', 'None']
        ]
    },
//#endregion

//#region Separate
    {
        name: 'Enigma 6',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Separate', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'One at a time 1',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Separate', 'Separate', 'None'],
            ['None', 'None', 'None', 'None'],
        ]
    },
    {
        name: 'One at a time 2',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Floor', 'Floor']
        ],
        objects:
        [
            ['None', 'Wall', 'Wall'],
            ['None', 'None', 'None'],
            ['None', 'None', 'Wall']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Separate', 'Separate'],
            ['None', 'None', 'None'],
        ]
    },
    {
        name: 'Keep away',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Separate', 'None'],
            ['Separate', 'Cover', 'Separate'],
            ['None', 'Separate', 'None'],
        ]
    },
    {
        name: 'Narrow passage',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Floor', 'Floor', 'Floor'],
            ['Water', 'Water', 'Floor', 'Water'],
            ['Floor', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'Wall', 'Wall', 'None'],
            ['None', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Separate', 'Separate', 'None']
        ]
    },
    {
        name: 'Turbine',
        x: 2,
        y: 1,
        floor:
        [
            ['Water', 'Floor', 'Water', 'Water', 'Water'],
            ['Water', 'Floor', 'Floor', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Floor', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Wall', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['Separate', 'None', 'None', 'None', 'Together'],
            ['Together', 'None', 'None', 'None', 'Separate'],
            ['Separate', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Separation anxiety',
        x: 0,
        y: 3,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Floor', 'Floor', 'Water'],
            ['Floor', 'Floor', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Wall', 'Wall', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Separate', 'Separate', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Pair', 'Pair', 'None']
        ]
    },
    {
        name: 'Three strikes',
        x: 0,
        y: 2,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Separate', 'Separate', 'None'],
            ['Pair', 'Pair', 'Pair'],
            ['None', 'Separate', 'Separate']
        ]
    },
//#endregion

//#region Palindrome
    {
        name: 'Enigma 7',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Palindrome', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Twins',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'Wall', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Palindrome', 'Palindrome', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Baby steps 1',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'Wall', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'Wall', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Cover', 'Palindrome', 'Cover', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Baby steps 2',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'Wall', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'Wall', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Palindrome', 'Cover', 'Palindrome', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Imbalance',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Palindrome', 'Palindrome', 'Cover'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: "Hero's journey",
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Pair', 'None'],
            ['Palindrome', 'Palindrome', 'None', 'None'],
            ['None', 'None', 'Pair', 'None']
        ]
    },
    {
        name: 'Jailbreak',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Floor', 'Floor', 'Water'],
            ['Water', 'Water', 'Floor', 'Water'],
            ['Water', 'Floor', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water'],
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'Wall', 'Wall', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Wall', 'Wall', 'None'],
            ['None', 'None', 'None', 'None'],
        ],
        icons: [
            ['None', 'None', 'Cover', 'None'],
            ['None', 'None', 'None', 'None'],
            ['Palindrome', 'Cover', 'Palindrome', 'Palindrome'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'Cover', 'None'],
        ]
    },
//#endregion

//#region Symmetry
    {
        name: 'Enigma 8',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Symmetry a Horizontal', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'All the way',
        x: 0,
        y: 2,
        floor:
        [
            ['Floor', 'Water', 'Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Floor', 'Water', 'Water'],
            ['Floor', 'Floor', 'Floor', 'Floor', 'Floor']
        ],
        objects:
        [
            ['Wall', 'None', 'None', 'None', 'Wall'],
            ['None', 'None', 'Wall', 'None', 'None'],
            ['None', 'Wall', 'Wall', 'Wall', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Symmetry a Horizontal', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Overhang',
        x: 0,
        y: 2,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'Wall']
        ],
        icons: [
            ['None', 'Symmetry a Horizontal', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Both ways 1',
        x: 0,
        y: 2,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Symmetry a Horizontal', 'None'],
            ['None', 'Symmetry a Vertical', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Both ways 2',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Symmetry a Horizontal', 'Symmetry a Vertical', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Greener on the other side',
        x: 0,
        y: 2,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Symmetry a Horizontal', 'None'],
            ['Pair', 'None', 'Pair'],
            ['None', 'Symmetry a Vertical', 'None']
        ]
    },
    {
        name: 'Circuit 1',
        x: 2,
        y: 0,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor', 'Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Water', 'Floor', 'Water', 'Water', 'Floor', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['Wall', 'None', 'Wall', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None', 'Symmetry a Horizontal'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Circuit 2',
        x: 2,
        y: 0,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor', 'Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Water', 'Floor', 'Water', 'Water', 'Floor', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['Wall', 'None', 'Wall', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None', 'Symmetry a Horizontal'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'Pair', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'Circuit 3',
        x: 2,
        y: 0,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor', 'Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water', 'Water', 'Water'],
            ['Water', 'Floor', 'Water', 'Water', 'Floor', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['Wall', 'None', 'Wall', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None', 'Symmetry a Horizontal'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'Pair', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None', 'None', 'None']
        ]
    },
//#endregion

//#region Turn
    {
        name: 'Enigma 9',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Turn', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: 'Three in a row',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Turn', 'None'],
            ['None', 'None', 'Turn'],
            ['None', 'Turn', 'None']
        ]
    },
    {
        name: 'Taking turns',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Water'],
            ['Floor', 'Water', 'Water', 'Water'],
            ['Water', 'Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Turn', 'None'],
            ['None', 'None', 'Turn', 'Turn'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: 'All turned around',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Turn', 'Turn', 'None'],
            ['None', 'Turn', 'Turn'],
            ['Turn', 'Turn', 'None']
        ]
    },
    {
        name: 'Enigma 9',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Floor', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Floor', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['Turn', 'Together', 'Turn'],
            ['None', 'Turn', 'Turn'],
            ['Turn', 'Together', 'Turn']
        ]
    },

//#endregion

//#region Copy
    {
        name: 'Enigma 10',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Copy', 'None'],
            ['None', 'None', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Floor', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'Wall', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Copy', 'Cover', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Copy', 'Separate', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 1,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['Wall', 'None', 'None', 'Wall'],
            ['None', 'None', 'None', 'None'],
            ['Wall', 'None', 'None', 'Wall']
        ],
        icons: [
            ['None', 'None', 'None', 'None'],
            ['None', 'Copy', 'Palindrome', 'None'],
            ['None', 'None', 'None', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Floor', 'Water'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'Wall', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'Cover', 'Palindrome'],
            ['None', 'None', 'None'],
            ['None', 'Copy', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 1,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Floor', 'Floor'],
            ['Floor', 'Water', 'Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Water', 'Water', 'Water']
        ],
        objects:
        [
            ['Wall', 'None', 'None', 'Wall', 'None'],
            ['None', 'None', 'None', 'None', 'None'],
            ['Wall', 'None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None', 'None', 'None'],
            ['None', 'Copy', 'None', 'None', 'Direction d North'],
            ['None', 'None', 'None', 'None', 'None']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 1,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['Wall', 'None', 'None'],
            ['None', 'None', 'None'],
            ['Wall', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Pair'],
            ['None', 'Copy', 'Cover'],
            ['None', 'None', 'Palindrome']
        ]
    },
    {
        name: '#NAME',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water'],
            ['Water', 'Water', 'Water'],
            ['Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Copy'],
            ['Together', 'None', 'None'],
            ['None', 'Together', 'Pair']
        ]
    },

//#endregion

//#region Quiz
{
        name: 'Quiz 1',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor'],
            ['Floor', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'Together'],
            ['Direction d South', 'Palindrome', 'Direction d South'],
            ['Together', 'Together', 'Palindrome']
        ]
    },
    {
        name: 'Quiz 2',
        x: 0,
        y: 0,
        floor:
        [
            ['Floor', 'Water', 'Water', 'Water'],
            ['Water', 'Water', 'Water', 'Water'],
            ['Water', 'Water', 'Water', 'Water'],
            ['Water', 'Water', 'Water', 'Floor']
        ],
        objects:
        [
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None'],
            ['None', 'None', 'None', 'None']
        ],
        icons: [
            ['None', 'Palindrome', 'Together', 'None'],
            ['Together', 'Palindrome', 'Palindrome', 'Together'],
            ['Palindrome', 'Palindrome', 'Together', 'None'],
            ['Together', 'Together', 'Palindrome', 'None']
        ]
    },
    //#endregion

    {
        name: 'Stop',
        x: 0,
        y: 1,
        floor:
        [
            ['Water', 'Water', 'Water'],
            ['Floor', 'Water', 'Floor'],
            ['Water', 'Water', 'Water']
        ],
        objects:
        [
            ['None', 'None', 'None'],
            ['None', 'None', 'None'],
            ['None', 'None', 'None']
        ],
        icons: [
            ['None', 'None', 'None'],
            ['None', 'Pair', 'None'],
            ['None', 'None', 'None']
        ]
    },
]


    // {
    //     x: 0,
    //     y: 0,
    //     floor:
    //     [
    //         ['Floor', 'Water', 'Water', 'Water', 'Water', 'Floor', 'Water'],
    //         ['Water', 'Floor', 'Water', 'Floor', 'Floor', 'Floor', 'Water'],
    //         ['Water', 'Floor', 'Water', 'Floor', 'Water', 'Water', 'Water'],
    //         ['Water', 'Floor', 'Floor', 'Floor', 'Water', 'Floor', 'Water'],
    //         ['Water', 'Floor', 'Water', 'Water', 'Water', 'Floor', 'Water'],
    //         ['Water', 'Floor', 'Water', 'Floor', 'Floor', 'Floor', 'Water'],
    //         ['Water', 'Water', 'Water', 'Water', 'Water', 'Floor', 'Floor'],
    //     ],
    //     objects:
    //     [
    //         ['None', 'None', 'None', 'None', 'None', 'Wall', 'None'],
    //         ['None', 'Wall', 'None', 'Wall', 'Wall', 'Wall', 'None'],
    //         ['None', 'Wall', 'None', 'Wall', 'None', 'None', 'None'],
    //         ['None', 'Wall', 'Wall', 'Wall', 'None', 'Wall', 'None'],
    //         ['None', 'Wall', 'None', 'None', 'None', 'Wall', 'None'],
    //         ['None', 'Wall', 'None', 'Wall', 'Wall', 'Wall', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'Wall', 'None'],
    //     ],
    //     icons: [
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None', 'None', 'Cover'],
    //     ]
    // },

        // {
    //     name: 'Odd man out',
    //     x: 0,
    //     y: 1,
    //     floor:
    //     [
    //         ['Water', 'Water', 'Water'],
    //         ['Floor', 'Water', 'Floor'],
    //         ['Water', 'Water', 'Water']
    //     ],
    //     objects:
    //     [
    //         ['None', 'None', 'None'],
    //         ['None', 'None', 'None'],
    //         ['None', 'None', 'None']
    //     ],
    //     icons: [
    //         ['None', 'None', 'Cover'],
    //         ['None', 'Cover', 'None'],
    //         ['None', 'None', 'Pair']
    //     ]
    // },

    // {
    //     name: 'Quiz 1',
    //     x: 4, 
    //     y: 0,
    //     floor: 
    //     [
    //         ['Floor', 'Floor', 'Water', 'Water', 'Floor'],
    //         ['Floor', 'Water', 'Floor', 'Water', 'Floor'],
    //         ['Water', 'Water', 'Water', 'Water', 'Floor'],
    //         ['Water', 'Water', 'Floor', 'Floor', 'Floor'],
    //         ['Floor', 'Water', 'Water', 'Floor', 'Floor'],
    //     ],
    //     objects:
    //     [
    //         ['None', 'None', 'None', 'None', 'None'],
    //         ['Wall', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'Wall'],
    //         ['None', 'None', 'Wall', 'None', 'None'],
    //         ['Wall', 'None', 'None', 'None', 'Wall'],
    //     ],
    //     icons: [
    //         ['Cover',   'Together',     'None',     'None',         'None'],
    //         ['None',    'None',         'Together', 'None',    'None'],
    //         ['None',    'None',         'Symmetry a Vertical',     'None',         'None'],
    //         ['None',    'Palindrome',   'None',     'Together',     'None'],
    //         ['None',    'None',         'None',     'Symmetry a Horizontal', 'None'],
    //     ]
    // },
    // {
    //     name: 'Quiz 2',
    //     x: 2, 
    //     y: 1,
    //     floor: 
    //     [
    //         ['Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
    //         ['Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
    //         ['Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
    //         ['Floor', 'Floor', 'Floor', 'Floor', 'Floor'],
    //         ['Water', 'Water', 'Water', 'Water', 'Water'],
    //     ],
    //     objects:
    //     [
    //         ['None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None'],
    //         ['None', 'None', 'None', 'None', 'None'],
    //         ['None', 'Wall', 'Wall', 'Wall', 'None'],
    //         ['None', 'None', 'None', 'None', 'None'],
    //     ],
    //     icons: [
    //         ['None',    'Separate', 'None', 'None', 'None'],
    //         ['None',    'None', 'None', 'None', 'Palindrome'],
    //         ['None',    'Palindrome', 'None', 'Separate', 'None'],
    //         ['None',    'None', 'None', 'None', 'None'],
    //         ['Pair',    'Pair', 'None', 'Pair', 'Pair'],
    //     ]
    // },