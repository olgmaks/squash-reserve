import mongoose from 'mongoose';

// Create schema
var Schema = mongoose.Schema;

/**
 * Order Schema
 */ 
var orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: 'UserModel' },
    room: { type: Schema.Types.ObjectId, ref: 'RoomModel' },
    status: String,
    reservedFrom: Date,
    reservedTo: Date,
    lastVisit: { type: Date, default: Date.now },
    created: { type: Date, default: Date.now },
    updated: { type: Date, default: Date.now }
});
