const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create table
const TableSchema = new Schema({
    Vitesse: {
        type: Number,
    },
    RPM: {
        type: Number,   
    },
    Temperature: {
        type: Number,
    },

    assurances: { type: Schema.Types.ObjectId, ref: 'assur'},
    boitiers: { type: Schema.Types.ObjectId, ref: 'boitier'},
    voitures: { type: Schema.Types.ObjectId, ref: 'voiture'},
    clients: { type: Schema.Types.ObjectId, ref: 'client'},

},{
    timestamps: {createdAt: 'created_at'}
});

var table = mongoose.model('table', TableSchema);
module.exports=table