import express from 'express';
import path from 'path';
import cors from 'cors';
import Queries from './queries';
import { Request, Response } from 'express';


const app = express();
app.use(cors());
app.use('/assets', express.static(path.join(__dirname, 'assets')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());



app.get('/maps', async (req: Request, res: Response): Promise<Response> => {
    try {
        const maps = await Queries.getMaps();
        if(!maps) return res.status(500).json({ error: 'posts not found' });
        return res.status(200).json(maps);

    } catch(e: any){
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
})


app.post('/maps/checkChar/:id', async (req: Request, res: Response): Promise<Response> => {
    try {
        const coord = req.body;
        const boundingBox = await Queries.getCoord(req.params.id);
        if(!boundingBox) return res.status(500).json({ error: 'character does not exist' })
        if(
            coord.x <= boundingBox.xMax &&
            coord.x >= boundingBox.xMin &&
            coord.y <= boundingBox.yMax &&
            coord.y >= boundingBox.yMin
        ){
            return res.status(200).json({ message: 'character found' });
        }
        return res.status(200).json({ message: 'character not found' });
    } catch(e: any){
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
    
});

const currTime = new Map<string, { start: number }>();
let timeTaken: number;


app.post('/maps/:id/start', async (req: Request, res:Response): Promise<Response> => {
    try {
        const uuid = req.body;
        currTime.set(uuid, { start: Date.now() });
        return res.status(200).json({ message: 'time started for game play'})
    } catch(e: any) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
   
});

app.post('/maps/:id/end', async (req: Request, res: Response): Promise<Response> => {
    try{
        const uuid = req.body;
        const timing = currTime.get(uuid) as { start: number };
        timeTaken = Date.now() - timing.start;
        return res.status(200).json({ message: 'time ended for game play', timeTaken });
    } catch(e: any) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
    
});

app.post('/maps/:id/store', async (req: Request, res: Response): Promise<Response> => {
    try{
        const { uuid, username } = req.body;

        const check = await Queries.checkTiming(uuid);
        if(check && check.time > timeTaken){
            const updatedTiming = await Queries.updateTiming(check.id, timeTaken);
            return res.status(200).json({ message: 'updated timing', updatedTiming });
        } else {
            const newTiming = await Queries.createTiming(uuid, username, timeTaken, req.params.id);
            return res.status(200).json({ message: 'created new timing', newTiming})
        }
    } catch(e: any) {
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
})

app.get('/maps/:id/leaderboard', async (req: Request, res: Response): Promise<Response> => {
    try {
        const id = req.params.id;
        const leaderboard = await Queries.getLeaderboard(id);
        if(!leaderboard) return res.status(404).json({ error: 'leaderboard not found'});
        return res.status(200).json(leaderboard);
    } catch(e: any){
        console.error(e);
        return res.status(500).json({ error: e.message });
    }
})


app.listen(3000, () => console.log("Server listening on port 3000"));
