import prisma from "./prisma/client"
import type { Map, Box, Timing } from '../shared/types';


async function getMaps(): Promise<Map[]> {
    const maps = await prisma.map.findMany({ select: {
        id: true,
        image: true,
        name: true,
        leaderboard: false,
        characters: {
            select: {
                id: true,
                name: true,
                image: true
            }
        }
    }});
    return maps;
}

async function getLeaderboard(id: string): Promise<Timing[]>{
    const leaderboard = await prisma.timing.findMany({
        where: {
            mapId: id
        },
        select: {
            id: false,
            uuid: true,
            username: true,
            time: true,
            mapId: false,
            map: false
        },
        orderBy: {
            time: 'asc',

        }
    })

    return leaderboard;
}

async function getCoord(id: string): Promise<Box> {
    const coord = await prisma.character.findUnique({
        where: {
            id
        },
        select: {
            xMax: true,
            xMin: true,
            yMax: true,
            yMin: true
        }
    });
    return coord as Box;
}

async function checkTiming(uuid: string) {
    const timing = await prisma.timing.findFirst({ where: { uuid: uuid }});
    return timing;
}

async function updateTiming(id: number, newTime: number){
    const timing = await prisma.timing.update({
        where: { id },
        data: {
            time: newTime
        }
    });
    return timing;
}

async function createTiming(uuid: string, username: string, time: number, mapId: string){
    const timing = await prisma.timing.create({
        data: {
            uuid,
            username,
            time,
            mapId
        }
    })

    return timing;
}




const Queries = {
    getMaps,
    getLeaderboard,
    getCoord,
    checkTiming,
    updateTiming,
    createTiming
}

export default Queries;

