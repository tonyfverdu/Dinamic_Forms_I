/* eslint-disable no-undef */
// backend/server.js
import colors from 'colors'
import morgan from 'morgan'
import express from 'express';
import cors from 'cors';
import { readFileSync, writeFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
// import { dirname, join } from 'path';
import path from 'path';
import bodyParser from 'body-parser';

import constants from './config/constants.js'
import { generateIDRandom, whatTimeIsIt } from './utils/functions.js'
import * as dotenv from 'dotenv'
dotenv.config()

const BASE_DATA_JSON = "data/json/data_ini.json"

/** ///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
const myLocalHost = process.env.LOCALHOST || constants.webServer.myLocal_Host
const myPort = process.env.PORT || constants.webServer.myPort

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDirectory = path.join(__dirname, 'data', 'json');
const dataFilePath = path.join(dataDirectory, 'data_ini.json')

const URL_BASE_UPDATED = "/home/user/Desktop/Dinamische_Forms/Dinamic_Forms_I/react_form_dinamic_1/backend/"
const dataFilePath_updated = path.join(URL_BASE_UPDATED, 'data_2.json')


/** Instantation vom WebServer Express   /////////////////////////////////////////////////////////////////////////////////////// */
const app = express()
app.use(express.json());

/** MIDDLEWARE  /////////////////////////////////////////////////////////////////////////////////////////////////////////////// */
// Regelt die kommunikation zwischen BROWSER und Server. nur wenn die aktuelle
// url des Browsers gewhitelistet ist, darf der browser die antwort lesen
// Controla la comunicación entre el BROWSER y el servidor. Sólo si la url del navegador aparece en la lista,
// el navegador puede leer la respuesta.
// app.use(cors({
//   origin: 'http://localhost:3001', //  <<== url donde la politica cors del servidor es permitida
//   credentials: true //  <<==  algo con las cookies
//   // origin: '*'
// }))
app.use(cors()); // Configurar CORS


//  1.- GET DATA FROM JSON FILE. READ FILE AND RETURN JSON
app.get('/api/dataini', (req, res) => {
  try {
    const jsonData = readFileSync(dataFilePath, 'utf-8');
    console.log(jsonData);
    res.status(200).json(JSON.parse(jsonData));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al leer el archivo JSON');
  }
});

//  1.1- GET DATA FROM JSON FILE. READ FILE AND RETURN JSON
app.get('/api/dataupdated', (req, res) => {
  try {
    console.log('En handleButtonUpdatelUser, dataFilePath_updated: ', dataFilePath_updated);
    const jsonData = readFileSync(dataFilePath_updated, 'utf-8');
    console.log('En handleButtonUpdatelUser, jsonData: ', jsonData);
    res.status(200).json(JSON.parse(jsonData));
  } catch (error) {
    console.error(error);
    res.status(500).send('Error interno del servidor al leer el archivo JSON');
  }
});


//  2.- SAVE DATA IN JSON FILE. READ FILE AND RETURN JSON
app.post('/api/data', (req, res) => {
  console.log("entro aqui, en el post del backend");
  const newData = req.body;
  console.log("newData: ", newData);

  try {
    console.log("entro en el try del post del backend");
    // console.log("dataFilePath: ", dataFilePath);
    writeFileSync('data_2.json', JSON.stringify(newData, null, 2), 'utf8');
    res.json({ message: 'Data saved successfully' });
  } catch (error) {
    console.error(error);
  }
});


//  3.- UPDATE DATA IN JSON FILE. READ FILE AND RETURN JSON
app.put('/api/data', (req, res) => {
  console.log("entro aqui, en el put del backend");
  const updatedData = req.body;
  console.log("updatedData: ", updatedData);
  try {
    console.log("entro en el try del put del backend");
    writeFileSync('data_2.json', JSON.stringify(updatedData, null, 2), 'utf8');
    res.json({ message: 'Data updated successfully' });
  } catch (error) {
    console.error(error);
  }
});


//  4.- DELETE DATA IN JSON FILE. READ FILE AND RETURN JSON
app.delete('/api/data', (req, res) => {
  unlinkSync('data.json');
  res.json({ message: 'Data deleted successfully' });
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