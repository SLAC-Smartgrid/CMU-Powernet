/* Cory Pruce 
 *
 * Script to populate 
 * the database upon
 * initialization
 *
 * */

conn = new Mongo();
db = connect("powernet_db");

// clear collections if already exist
db.users.remove({});
db.homehubs.remove({});

db.users.insert({'surname' : 'Pruce','email' : 'corypruce@gmail.com','givenName' : 'Cory Pruce', 'password': 'a13raKadabra', 'age' : 23,'location' : 'Sunnyvale','gender' : 'Male'});
db.users.insert({'surname' : 'Chen','email' : 'test1@test.com','givenName' : 'Kevin Chang','password': 'a13raKadabra','age' : 23,'location' : 'San Francisco','gender' : 'Male'});
db.users.insert({'surname' : 'Bao','email' : 'test2@test.com','givenName' : 'Aaron Nozaki','password': 'a13raKadabra','age' : 30,'location' : 'San Francisco','gender' : 'Male'});
db.users.insert({'surname' : 'Reddy','email' : 'test3@test.com','givenName' : 'Kevin Tong','password': 'a13raKadabra','age' : 30,'location' : 'San Francisco','gender' : 'Male'});

db.homehubs.insert({'hh_id':'rpi1', 'long':'fdfsfd', 'lat': 'fdsf', 'devices': {}, 'prices_level': 'gf', 'power_level':'fds'});
db.homehubs.insert({'hh_id':'rpi1', 'long':'fdfsfd', 'lat': 'fdsf', 'devices': {}, 'prices_level': 'gf', 'power_level':'fds'});
db.homehubs.insert({'hh_id':'rpi1', 'long':'fdfsfd', 'lat': 'fdsf', 'devices': {}, 'prices_level': 'gf', 'power_level':'fds'});
db.homehubs.insert({'hh_id':'rpi1', 'long':'fdfsfd', 'lat': 'fdsf', 'devices': {}, 'prices_level': 'gf', 'power_level':'fds'});
