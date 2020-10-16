const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create voiture
const VoitureSchema = new Schema({
    serialNumber: {
        type: String,
        
    },
   brand: {
       type: String,
   },
   model: {
       type: String,
   },
   clients: { type: Schema.Types.ObjectId, ref: 'client'},
   boitiers: { type: Schema.Types.ObjectId, ref: 'boitier'},


});

var voiture = mongoose.model('voiture', VoitureSchema);
module.exports=voiture