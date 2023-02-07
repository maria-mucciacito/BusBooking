var express = require('express');
var dbPool = require('../db');
var db = dbPool.getPool();

//router for page of total bus rows
const getPosto = 
    (req,res)=>{
        db.query('SELECT * FROM posto ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);

            }
        })
    };

const getPostoById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM posto WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);
                
            }
        })
    };

const createPosto = 
    (req,res)=>{
        const {numero, status, prenotazione,bus } = req.body
        db.query('INSERT INTO posto (numero, status, prenotazione,bus) VALUES ($1,$2,$3,$4) RETURNING id;', [numero, status, prenotazione,bus], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.status(201).send("Posto added with ID: " + results.rows);
            }
            
        })
    };

const updatePosto = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {numero, status, prenotazione, bus } = req.body
        db.query('UPDATE posto SET numero=$1, status=$2, prenotazione=$3, bus=$4 WHERE id=$5;',
        [numero, status, prenotazione,bus],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Posto modified with ID: " + id)
            }
        })
    };

const deletePosto= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM posto WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Posto deleted with ID: " + id)
            }
        })
    };

module.exports = {getPosto,getPostoById,createPosto,updatePosto,deletePosto};
