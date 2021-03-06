require('dotenv').config();
const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

// Axios
const axios = require('axios');

const router = Router();

const { dataDB, apiData } = require( '../requests/requests')

router.get('/:id', async (req, res) => {
    const paras = req.params.id;
    try {
        // Obteniendo data si el largo del id es igual al generado por sequelize
        if (paras.length === 36) {
            const DB = await dataDB();
            const arrDB = DB.filter(e=>e.id === paras);
            if (arrDB.length > 0){
                return res.status(200).json(arrDB);
            }
            else {
                return res.status(400).json('Search failures');
            };
        }

        else {
            // Caso contrario
            const API = await apiData();
            const arrAPI = API.filter (e => e.id === paras);
            if (arrAPI.length > 0){
                return res.status(200).json(arrAPI);
            }
            else{
                return res.status(400).json('Search failures');
            };
        };
    }
    // Caso de error
    catch {
        res.status(400).json('Search failures');
    };
});

module.exports = router;