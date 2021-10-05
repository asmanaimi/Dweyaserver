const mongoose =require('mongoose');
const bcrypt=require('bcryptjs');

const pharmacienschema = mongoose.Schema({
    name:{ type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    cin: { type: String, required: true },
    tel: { type: String },
    adress: { type: String},
    listp: { type: String},
  });



pharmacienschema.pre('save',function(next){
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

pharmacienschema.methods.isPasswordMatch =function(plainPassword,hashed,callback){
    bcrypt.compare(plainPassword,hashed,(err,isMatch)=>{
if(err){
    next(err);
}
callback(null,isMatch);


    });
};
const pharmacien =mongoose.model('Pharmacien',pharmacienschema);

module.exports = pharmacien;