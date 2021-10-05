/*const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');
const AdminSchema =mongoose.Schema({
    name:String,
    email:{type: String,required:true,unique:true},
    password:{type :String,required:true}
})

AdminSchema.pre('save',function(next){
    if(!this.isModified('password')){
      return next();  
    }
bcrypt.genSalt(10,(err,salt) => {
if(err){
return next(erro);}
bcrypt.hash(this.password,salt,(err,hash)=>{
    if(err){
        return next(erro);}
        this.password=hash;
        next();
});

});
});

AdminSchema.methods.isPasswordMatch =function(plainPassword,hashed,callback){
    bcrypt.compare(plainPassword,hashed,(err,isMatch)=>{
if(err){
    next(err);
}
callback(null,isMatch);


    });
};

const Admin =mongoose.model('Admin',AdminSchema);

module.exports =Admin;
*/