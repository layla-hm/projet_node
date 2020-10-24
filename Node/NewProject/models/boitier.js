const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create boitier
const boitierSchema = new Schema({
    reference: {
        type: String,
    },
    vitess: {
        type: Number,
    },
    RPM: {
        type: Number,
    },
    KM: {
        type: Number,
    },
    Knock: {
        type: Number, 
    },
    ABS: {
        type: Number
    },
    clients: { type: Schema.Types.ObjectId, ref: 'client'},
    voitures: { type: Schema.Types.ObjectId, ref: 'voiture'},
    assurance: { type: Schema.Types.ObjectId, ref: 'assur'},


});

var boitier = mongoose.model('boitier', boitierSchema);
module.exports=boitier