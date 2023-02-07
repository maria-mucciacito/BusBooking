var express = require('express');
var dbPool = require('../db');
var db = dbPool.getPool();

const getTratte = 
    (req,res)=>{
        db.query('SELECT * FROM tratta ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);

            }
        })
    };

const getTrattaById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM tratta WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows); 
            }
        })
    };

const createTratta = 
    (req,res)=>{
        const {arrivo, partenza, data, prezzo, bus,ora_partenza,ora_arrivo } = req.body
        db.query('INSERT INTO tratta (arrivo, partenza, data, prezzo, bus,ora_partenza,ora_arrivo) VALUES ($1,$2,$3,$4,$5) RETURNING id;', [arrivo, partenza, data, prezzo, bus,ora_partenza,ora_arrivo], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.status(201).send("Tratta added with ID: " + results.rows);
            }
            
        })
    };

const updateTratta = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {arrivo, partenza, data, prezzo, bus,ora_partenza,ora_arrivo } = req.body
        db.query('UPDATE tratta SET arrivo=$1, partenza=$2, data=$3, prezzo=$4, ora_partenza=$5, ora_arrivo=$6 bus=$7 WHERE id=$6;',
        [arrivo, partenza, data, prezzo, bus,ora_partenza,ora_arrivo,id],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Tratta modified with ID: " + id)
            }
        })
    };

const deleteTratta= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM tratta WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Tratta deleted with ID: " + id)
            }
        })
    };

module.exports = {getTratte,getTrattaById,createTratta,updateTratta,deleteTratta};
