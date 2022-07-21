const express = require('express');
const router = express.Router();

const pool = require ('../database');

//CRUD Tribunal Control

router.get('/', (req, res) => {
    res.render('busqueda/busqueda')
});

router.post('/', async (req, res) => {
    const {id} = req.body;


    const expedientecontrol = await pool.query('SELECT  * FROM expedientecontrol WHERE id_expedientecontrol = ?', [id]);
    const expedienteejecucion = await pool.query('SELECT  * FROM expedienteejecucion WHERE id_expedienteejecucion = ?', [id]);
    const expedientejuicio = await pool.query('SELECT  * FROM expedientejuicio WHERE id_expedientejuicio = ?', [id]);

    if(id.length == 0){
        req.flash('message', 'Campo vacio');
        res.redirect('/busqueda');
    }else if (expedientecontrol.length > 0) {
        
        const {id_expedientecontrol, id_tribunal, ci, fecha_actuacion, descripcion_actuacion} = expedientecontrol[0];
        const ExpedientesC = {
        id_expedientecontrol,
        id_tribunal,
        ci,
        fecha_actuacion,
        descripcion_actuacion  
        };

        const intervinientec = await pool.query('SELECT  * FROM interviniente WHERE ci = ?', [ExpedientesC.ci]);
        res.render('busqueda/resultados_busquedacontrol', {expedientecontrol, intervinientec});

    }else if (expedientejuicio.length > 0){

        const {id_expedientejuicio, id_tribunal, fecha_actuacion, descripcion_actuacion, econtrol_referencia, ci} = expedientejuicio[0];
        const ExpedientesJ = {
        id_expedientejuicio,
        id_tribunal,
        fecha_actuacion,
        descripcion_actuacion,
        econtrol_referencia,
        ci
        };

        const intervinientej = await pool.query('SELECT  * FROM interviniente WHERE ci = ?', [ExpedientesJ.ci]);
        res.render('busqueda/resultados_busquedajuicio', {expedientejuicio, intervinientej});

    }else if (expedienteejecucion.length > 0){

        const {id_expedienteejecucion, id_tribunal, fecha_actuacion, descripcion_actuacion, econtrol_referencia, ci} = expedienteejecucion[0];
        const ExpedientesE = {
        id_expedienteejecucion,
        id_tribunal,
        fecha_actuacion,
        descripcion_actuacion,
        econtrol_referencia,
        ci
        };

        const intervinientee = await pool.query('SELECT  * FROM interviniente WHERE ci = ?', [ExpedientesE.ci]);
        res.render('busqueda/resultados_busquedaejecucion', {expedienteejecucion, intervinientee});
    }
});







module.exports = router; 