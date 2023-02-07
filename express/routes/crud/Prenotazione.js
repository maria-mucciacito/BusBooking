var express = require('express');
var dbPool = require('../db');
var db = dbPool.getPool();

const getPrenotazione = 
    (req,res)=>{
        db.query('SELECT * FROM prenotazione ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);

            }
        })
    };

const getPrenotazioneById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM prenotazione WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);              
            }
        })
    };

const createPrenotazione = 
    (req,res)=>{
        const {code, utente, tratta } = req.body
        db.query('INSERT INTO prenotazione (code, utente, tratta) VALUES ($1,$2,$3) RETURNING id;', [code, utente, tratta], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.status(201).send("Prenotazione added with ID: " + results.rows);
            }
            
        })
    };

const updatePrenotazione = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {code, utente, tratta } = req.body
        db.query('UPDATE prenotazione SET code=$1, utente=$2, tratta=$3 WHERE id=$4;',
        [code, utente, tratta,id],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Prenotazione modified with ID: " + id)
            }
        })
    };

const deletePrenotazione= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM prenotazione WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Prenotazione deleted with ID: " + id)
            }
        })
    };

module.exports = {getPrenotazione,getPrenotazioneById,createPrenotazione,updatePrenotazione,deletePrenotazione};
