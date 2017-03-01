import mongoose from 'mongoose';

// Create schema
var Schema = mongoose.Schema;

/**
 * Room Schema
 */ 
var roomSchema = new Schema({
    name: String,
    status: String,
    lastVisit: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});

