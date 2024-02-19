/* eslint-disable no-undef */
// server.mjs
import colors from 'colors'
import morgan from 'morgan'
import express from 'express';
import cors from 'cors'
import { promises as fsPromises } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import cookieParser from 'cookie-parser'

const { readFile, writeFile, unlink } = fsPromises;

import constants from './config/constants.js'
import { generateIDRandom, whatTimeIsIt } from './utils/functions.js'
import * as dotenv from 'dotenv'
dotenv.config()

/** ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
const myLocalHost = process.env.LOCALHOST || constants.webServer.myLocal_Host
const myPort = process.env.PORT || constants.webServer.myPort
//const myMongoDBConnection = process.env.DB_CONN || 'mongodb://localhost:27017/11_17_cookies2'
// const myCorsOptions = constants.corsOption
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
//const IDRANDOM_OF_SESSION = generateIDRandom()

/** Instantation vom WebServer Express   /////////////////////////////////////////////////////////////////////////////////////// */
const app = express()

app.use(express.json());

/** MIDDLEWARE  /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// Regelt die kommunikation zwischen BROWSER und Server. nur wenn die aktuelle
// url des Browsers gewhitelistet ist, darf der browser die antwort lesen
// Controla la comunicación entre el BROWSER y el servidor. Sólo si la url del navegador aparece en la lista,
// el navegador puede leer la respuesta.
app.use(cors({
  origin: 'http://localhost:3000', //  <<== url donde la politica cors del servidor es permitida
  credentials: true //  <<==  algo con las cookies
  // origin: '*'
}))

app.use(express.urlencoded({ extended: true })) //  <<==  Calling the express.urlencoded({ extended: true }) method //
//  middleware intern, for parsing
app.use(express.json({ limit: '50MB' })) //  <<==  Calling the express.json()
app.use(cookieParser()) //  <<==  Cookies are parsers
app.use(express.static('static'))
app.use(morgan('dev'))



const dataDirectory = join(__dirname, 'data');

//  GET DATA FROM JSON FILE
app.get('/data/json/:filename', async (req, res) => {
  console.log("Hola!");
  console.log("req.params.filename: ", req.params.filename);
  console.log("dataDirectory: ", dataDirectory);
  try {
    const filePath = join(dataDirectory, `${req.params.filename}.json`);
    const data = await readFile(filePath, 'utf8');
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(404).json({ error: 'File not found' });
  }
});

//  POST DATA TO JSON FILE
app.post('/data/json/:filename', async (req, res) => {
  try {
    const filePath = join(dataDirectory, `${req.params.filename}.json`);
    await writeFile(filePath, JSON.stringify(req.body, null, 2), 'utf8');
    res.json({ message: 'File saved successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to write file' });
  }
});

//  DELETE DATA FROM JSON FILE
app.delete('/data/json/:filename', async (req, res) => {
  try {
    const filePath = join(dataDirectory, `${req.params.filename}.json`);
    await unlink(filePath);
    res.json({ message: 'File deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Unable to delete file' });
  }
});


/**  METHOD LISTEN OF WEBSERVER EXPRESS  ///////////////////////////////////////////////////////////////////////////////// */
app.listen(process.env.PORT, () => {
  console.clear()
  console.log('')
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgYellow)
  console.log(`   WebServer Express Listening, listening on: "${process.env.LOCALHOST}:${process.env.PORT}"       `.bgYellow)
  console.log('                                                                     '.bgYellow)
  console.log('                                                                     '.bgRed)
  console.log('                                                                     '.bgRed)
  console.log('')
  console.log(`  ${whatTimeIsIt()} `.bgRed)
  console.log('')
})