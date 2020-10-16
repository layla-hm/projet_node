const mongoose =require ('mongoose');
const Schema = mongoose.Schema;

//create admin
const AdminSchema = new Schema({
    FirstName: {
        type: String,
    },
    LastName: {
        type: String,   
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
    assurances: [{ type: Schema.Types.ObjectId, ref: 'assur'}],

});

var admin = mongoose.model('admin', AdminSchema);
module.exports=admin