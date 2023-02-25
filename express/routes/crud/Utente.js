var express = require('express');
var dbPool = require('../db');
var db = dbPool.getPool();

const getUtente = 
    (req,res)=>{
        db.query('SELECT * FROM utente ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);

            }
        })
    };

const getUtenteById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM utente WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);
            }
        })
    };

const createUtente = 
    (req,res)=>{
        const {first_name, last_name, phone, email } = req.body
        db.query('INSERT INTO utente (first_name, last_name, phone, email) VALUES ($1,$2,$3,$4) RETURNING id;', [first_name, last_name, phone, email], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.status(201).send(results.rows);
            }
            
        })
    };

const updateUtente = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {first_name, last_name, phone, email } = req.body
        db.query('UPDATE utente SET fisrt_name=$1, last_name=$2, phone=$3, email=$4 WHERE id=$5;',
        [first_name, last_name, phone, email],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Utente modified with ID: " + id)
            }
        })
    };

const deleteUtente= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM utente WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Utente deleted with ID: " + id)
            }
        })
    };

module.exports = {getUtente,getUtenteById,createUtente,updateUtente,deleteUtente};
