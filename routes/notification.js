var FCM = require('fcm-node');
const User = require("../models/users");
const express = require("express");
const router = express.Router();

router.route("/send").post((req, res) => {

let fcm = new FCM('AAAAKGEZOR8:APA91bFTMqx_PNgPaMFr16P1ji7N8ZUXeTDmHiI_4o_oftqVveW-8wWDVM9sNJCba9lVd4jqmLU6gRsZUMKHquIwbsgI-JBSH9rzosQme-8NwWwkFxPc-_7RKbQ15OpBaAu2KoIPb5mq');
    let message = {
        to:"cr-CsuOwQb68_3a2bsxUo_:APA91bE0cxZbubAAF5dHMXnfm7bhcZnDP1e3a4hTeVkR64DKBIjzWALPpuChFH4AMJQA8qbSbo0LORxIe_hxlW3KdgF6rYI2M4G8CRfP-dB5DSg56JT75D2YTxtun-x0qmcDQD1rjDXe" ,
      
        notification:{
            title : req.body.title,
            body : req.body.body,
            "click_action":"FCM_PLUGIN_ACTIVITY",
            "icon":"fcm_push_icon",
        },
        };

        fcm.send(message, function(err, response) {
            if(err){
                console.log('error found', err);
            }else {
                console.log('response here', response);
            }
        })

});
module.exports = router;