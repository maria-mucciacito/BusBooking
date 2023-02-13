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
        const {status, prenotazione,bus } = req.body
        db.query('INSERT INTO posto (status, prenotazione,bus) VALUES ($1,$2,$3) RETURNING id;', [status, prenotazione,bus], (error,results)=>{
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
        const { status, prenotazione, bus } = req.body
        db.query('UPDATE posto SET status=$1, prenotazione=$2, bus=$3 WHERE id=$4;',
        [status, prenotazione,bus],
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
