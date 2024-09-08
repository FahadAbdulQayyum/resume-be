const fss = require('fs');
const path = require('path');
const express = require('express');
import {Request, Response} from 'express'
const app = express();

const PORT = 4000 || process.env.PORT;

app.get("/", async (req: Request, res: Response) => {
    return res.send("Hello! Man.")
})

app.get("/data", async (req: Request, res: Response) => {
    // return res.text("Hello");
    // res.send("Hellos");
    // return res.json({msg:"Hello World"});
    // readData()
    try {
        const dt = await readData()
        console.log('dtt', dt)
        return res.json({data: dt});
    } catch (err) {
        console.error('Error reading data:', err);
        return res.status(500).json({ error: 'Failed to read data' });
    }
})

// app.listen(PORT, (req: Request, res: Response)=> {
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
})

function saveData(turnIntoJsonData: string){
    const filePath = './data.json';
    // const filePath = path.join(__dirname, 'data.json');

    fss.writeFile(filePath, JSON.stringify(turnIntoJsonData), 'utf8', (e:any) => {
        if(e){
            console.error('Error writing to file:', e);
        }else {
            console.log("Data Successfully saved")
        }
    })
}

function readData(): Promise<any>{
    // const filePath = path.join(__dirname, 'data.json');
    const filePath = './data.json';

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

readData()

module.exports = app