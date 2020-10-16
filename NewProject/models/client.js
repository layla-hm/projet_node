const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create client
const ClientSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, 'Name fiels is required']
    },
    LastName: {
        type: String,
        required: [true, 'Name fiels is required']
    },
    address: {
        type: String
    },
    Email: {
        type: String
    },
    cin: {
        type: Number 
    },
    telephone: {
        type: Number
    },
    voitures: [{ type: Schema.Types.ObjectId, ref: 'voiture'}],
    boitiers: [{ type: Schema.Types.ObjectId, ref: 'boitier'}],

});

var client = mongoose.model('client', ClientSchema);
module.exports=client