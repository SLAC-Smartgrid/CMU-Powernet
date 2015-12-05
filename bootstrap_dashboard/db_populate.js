/* Cory Pruce 
 *
 * Script to populate 
 * the database upon
 * initialization
 *
 * */

conn = new Mongo();
db = connect("PowernetDB");

// clear collections if already exist
//db.users.remove({});
db.homehubs.remove({});
db.hhstatus.remove({});
/*
db.homehubs.insert({"label" : "CMU-SV Building 23", "total_power" : 211, "location" : "CMU-SV", "callback_url" : "www_homehub1_com/callback_url", "state" : { "device_1" : { "power" : 1, "status" : "on", "type" : "Consumer", "name" : "Fan23" }, "device_2" : { "power" : 100, "status" : "on", "type" : "Consumer", "name" : "Light23" }, "device_3" : { "power" : 22, "status" : "on", "type" : "Generator", "name" : "Generator23" } }, "uuid" : "566207a5da7735881a517a79", "timestamp" : 1449274667363 });
db.homehubs.insert({"label" : "CMU-SV Building 19", "total_power" : 311, "location" : "CMU-SV", "callback_url" : "www_homehub2_com/callback_url", "state" : { "device_119" : { "power" : 100, "status" : "on", "type" : "Consumer", "name" : "Fan19" }, "device_219" : { "power" : 9, "status" : "on", "type" : "Consumer", "name" : "Light19" }, "device_319" : { "power" : 10, "status" : "on", "type" : "Generator", "name" : "Generator19" } }, "uuid" : "566207bfda7735881a517a7a", "timestamp" : 1449274645973 });
db.homehubs.insert({ "label" : "CIC 1121", "total_power" : 411, "location" : "Pittsburgh", "callback_url" : "www_homehub3_com/callback_url", "state" : { "device_11121" : { "power" : 500, "status" : "on", "type" : "Consumer", "name" : "Fan1121" }, "device_21121" : { "power" : 600, "status" : "on", "type" : "Consumer", "name" : "Light1121" }, "device_31121" : { "power" : 21, "status" : "on", "type" : "Generator", "name" : "Generator1121" } }, "uuid" : "566207d9da7735881a517a7b", "timestamp" : 1449274616152 });
db.homehubs.insert({ "label" : "CIC 2121", "total_power" : 511, "location" : "Pittsburgh", "callback_url" : "www_homehub3_com/callback_url", "state" : { "device_21121" : { "power" : 500, "status" : "on", "type" : "Consumer", "name" : "Fan1121" }, "device_31121" : { "power" : 600, "status" : "on", "type" : "Consumer", "name" : "Light1121" }, "device_41121" : { "power" : 21, "status" : "on", "type" : "Generator", "name" : "Generator1121" } }, "uuid" : "566213e33be9847621050eb3", "timestamp" : 1449274598979 });


db.hhstatus.insert({ "total_power" : 40, "uuid" : "566207a5da7735881a517a79", "timestamp" : 1449265191114 });
db.hhstatus.insert({ "total_power" : 70, "uuid" : "566207bfda7735881a517a7a", "timestamp" : 1449265233079 });
db.hhstatus.insert({ "total_power" : 90, "uuid" : "566207bfda7735881a517a7a", "timestamp" : 1449265239590 });
db.hhstatus.insert({ "total_power" : 90, "uuid" : "566207d9da7735881a517a7b", "timestamp" : 1449265253493 });
db.hhstatus.insert({ "total_power" : 165, "uuid" : "566207d9da7735881a517a7b", "timestamp" : 1449265258754 });
db.hhstatus.insert({ "total_power" : 165, "uuid" : "566213e33be9847621050eb3", "timestamp" : 1449268216870 });
db.hhstatus.insert({ "total_power" : 999, "uuid" : "566213e33be9847621050eb3", "timestamp" : 1449268230148 });
db.hhstatus.insert({ "total_power" : 111, "uuid" : "566207a5da7735881a517a79", "timestamp" : 1449274538954 });
db.hhstatus.insert({ "total_power" : 111, "uuid" : "566207bfda7735881a517a7a", "timestamp" : 1449274560044 });
db.hhstatus.insert({ "total_power" : 222, "uuid" : "566207d9da7735881a517a7b", "timestamp" : 1449274577690 });
db.hhstatus.insert({ "total_power" : 222, "uuid" : "566213e33be9847621050eb3", "timestamp" : 1449274590288 });
db.hhstatus.insert({ "total_power" : 511, "uuid" : "566213e33be9847621050eb3", "timestamp" : 1449274598979 });
db.hhstatus.insert({ "total_power" : 411, "uuid" : "566207d9da7735881a517a7b", "timestamp" : 1449274616152 });
db.hhstatus.insert({ "total_power" : 311, "uuid" : "566207bfda7735881a517a7a", "timestamp" : 1449274645973 });
db.hhstatus.insert({ "total_power" : 211, "uuid" : "566207a5da7735881a517a79", "timestamp" : 1449274667363 });
*/
