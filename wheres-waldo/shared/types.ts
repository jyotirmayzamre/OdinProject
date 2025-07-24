export type Map = {
    id: string,
    name: string,
    image: string,
    characters?: Character[] 
}

export type Character = {
    id: string,
    name: string,
    image: string,
}

export type Timing = {
    uuid: string,
    username: string,
    time: number
}


export type Coord ={
    x: number,
    y: number
}

export type Box = {
    xMax: number,
    xMin: number,
    yMax: number,
    yMin: number
}
