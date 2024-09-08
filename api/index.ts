const fss = require('fs');
const path = require('path');
const express = require('express');
import {Request, Response} from 'express'
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));


const PORT = 4000 || process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
    return res.send("Hello! Man.")
})

app.get("/data", async (req: Request, res: Response) => {
    try {
        const dt = await readData()
        console.log('dtt', dt)
        return res.json({data: dt});
    } catch (err) {
        console.error('Error reading data:', err);
        return res.status(500).json({ error: 'Failed to read data' });
    }
})

app.post("/data", async (req: Request, res: Response) => {
    const {username, name} = req.body;
    // console.log('req...', req.body)
    try {
        if (!username || !name) {
            return res.status(400).json({ error: 'Username and name are required' });
        }
        const data = {username, name}
        const dt = await saveData(data)
        console.log('dtt', dt)
        return res.json({msg: "Data Added Successfully!"});
    } catch (err) {
        console.error('Error reading data:', err);
        return res.status(500).json({ error: 'Failed to read data' });
    }
})

// app.listen(PORT, (req: Request, res: Response)=> {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

async function saveData(turnIntoJsonData: {username:string, name: string}){
    // const filePath = './data.json';
    // const filePath = path.join(__dirname, 'data.json');
    const filePath = path.join(process.cwd(), 'data.json');

    const getExistingData = await readData();
    console.log('getExistingData...', getExistingData);
    const updateData = [...getExistingData, turnIntoJsonData];

    console.log('udptedddData...', updateData);
    
    fss.writeFile(filePath, JSON.stringify(updateData), 'utf8', (e:any) => {
        if(e){
            console.error('Error writing to file:', e);
        }else {
            console.log("Data Successfully saved")
        }
    })
}

function readData(): Promise<any>{
    // const filePath = path.join(__dirname, 'data.json');
    const filePath = path.join(process.cwd(), 'data.json');
    // const filePath = './data.json';


    return new Promise((resolve, reject) => {
        fss.readFile(filePath, 'utf8', (e:any, data: string) => {
        if(e){
            console.error('Error writing to file:', e);
            reject(e);
        }else {
            // const parsedData = JSON.parse(data);
            // console.log("Data Successfully retrieved", parsedData)
            // return parsedData;
            try {
                const parsedData = JSON.parse(data);
                console.log("Data successfully retrieved", parsedData);
                resolve(parsedData);
            } catch (parseErr) {
                reject(parseErr);
            }
        }
    })
})
}

// saveData("Hello")
// saveData({"username": "fahaddd", "name":"Fahaddd"})

// readData()

module.exports = app