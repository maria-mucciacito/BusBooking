var express = require('express');
var dbPool = require('../db');
var db = dbPool.getPool();

//router for page of total bus rows
const getBus = 
    (req,res)=>{
        db.query('SELECT * FROM bus ORDER BY id ASC;', (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);

            }
            //res.status(200).json(results.rows)
        })
    };

//router for find one bus by id
const getBusById = 
    (req,res)=>{
        var id = parseInt(req.params.id);
        db.query('SELECT * FROM bus WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error;
            } else {
                res.send(results.rows);
                
            }
            //res.status(200).json(results.rows)
        })
    };

//router for create a new row of bus
const createBus = 
    (req,res)=>{
        const {numero, targa, modello, capienza } = req.body
        db.query('INSERT INTO bus (numero,targa,modello,capienza) VALUES ($1,$2,$3,$4) RETURNING id;', [numero,targa,modello,capienza], (error,results)=>{
            if(error){
                throw error;
                //res.status(500).json({"message":error,"code":500,"result":results,"postdata":req.body});
            } else {
                //res.status(201).json({"result":results})
                //res.status(201).send("Taxi added with ID: " + results.rows)
                res.status(201).send("Bus added with ID: " + results.rows);
            }
            
        })
    };

//router for update a row of bus
const updateBus = 
    (req,res)=>{
        var id = parseInt(req.params.id)
        const {numero, targa, modello, capienza } = req.body
        db.query('UPDATE bus SET numero=$1, targa=$2, modello=$3, capienza=$4 WHERE id=$5;',
        [numero,targa,modello,capienza,id],
        (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Bus modified with ID: " + id)
            }
        })
    };

//router for delete a row of bus
const deleteBus= 
    (req,res)=>{
        var id = parseInt(req.params.id)
        db.query('DELETE FROM bus WHERE id=$1;',[id], (error,results)=>{
            if(error){
                throw error
            } else {
                res.status(200).send("Bus deleted with ID: " + id)
            }
        })
    };

module.exports = {getBus,getBusById,createBus,updateBus,deleteBus};
