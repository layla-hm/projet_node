const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create assurance
const AssuranceSchema = new Schema({
    Name: {
        type: String
    },
    
    address: {
        type: String
    },
    Email: {
        type: String
    },
    
    telephone: {
        type: Number
    },
    agents: [{ type: Schema.Types.ObjectId, ref: 'agent'}],
    clients: [{ type: Schema.Types.ObjectId, ref: 'client'}],
    boitiers: [{ type: Schema.Types.ObjectId, ref: 'boitier'}],
});

var assur = mongoose.model('assur', AssuranceSchema);
module.exports=assur