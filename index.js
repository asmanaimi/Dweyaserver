const express = require("express");
require('dotenv').config();
const mongoose = require("mongoose");
const userRoute=require('./routes/user');
//const AdminRoutes=require('./routes/admins');
const PharmacienRoutes=require('./routes/pharmaciens');
const TechnicienRoutes=require('./routes/techniciens');
const ProfileRoutes=require('./routes/profiles');
const OrdonnancesRoutes=require('./routes/ordonnances');
const NotificationRoutes=require('./routes/notification');

const cors = require('cors');
const bodyParser = require ('body-parser');
const passport=require('passport');
const path = require('path');
////mongodb+srv://patientapp:patient1234@cluster0.jez3f.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"

const app = express();
const port = process.env.PORT||3000;
mongoose.connect("mongodb://localhost:27017/Data",{
    useNewUrlParser : true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDb connected");
});
//middleware
app.use(cors());
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());
//app.use(express.static(path.join(__dirname, 'public')));
//app.use("/uploads", express.static(path.join("uploads")));  

app.use("/uploads", express.static("uploads"));
app.use(express.json());
app.use("/user", userRoute);
//app.use('/admins',AdminRoutes);
app.use('/pharmaciens',PharmacienRoutes);
app.use('/techniciens',TechnicienRoutes);
app.use('/profile',ProfileRoutes);
app.use('/ordonnances',OrdonnancesRoutes);
app.use('/notification',NotificationRoutes);
app.listen(port,"192.168.43.145",()=>console.log(`welcome your listinnig at port ${port}`));