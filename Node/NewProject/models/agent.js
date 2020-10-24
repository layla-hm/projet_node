const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create agent
const AgentSchema = new Schema({
    FirstName: {
        type: String,
        required: [true, 'Name fiels is required']
    },
    LastName: {
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
    assurance: { type: Schema.Types.ObjectId, ref: 'assur'},


});

var agent = mongoose.model('agent', AgentSchema);
module.exports=agent