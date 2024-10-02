import mongoose from 'mongoose';
import { Watches } from '../models/Watch.model.js'
import fs from 'fs';


import dotenv from 'dotenv';

dotenv.config();




mongoose
    .connect(process.env.DB_URL)

    .then(async () => {
        const allWatches = await Watches.find()

        if (allWatches.length) {
            await Watches.collection.drop()
        }
    })
    .catch(err => console.error('Error connecting to the database:', err))
    .then(async () => {
        const filePath = path.join('utils', 'watch.json');
        fs.readFile(filePath, 'utf8', async (err, data) => {
            if (err) {
                console.error("Error al leer el archivo:", err)
                return;
            }
            const watches = JSON.parse(data)
            try {
                await Watches.insertMany(watches)
                console.log("WATCHES HAS BEEN ADDED TO THE DATABASE")
            } catch (error) {
                console.log('ERROR CREATING DATA:', error)

            } finally {
                mongoose.disconnect()

            }
        })
    })
