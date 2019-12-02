const {userArray} = require('./staticArray');

const {utility} =  require('./utility');

UserProvider = function() {
    this.users = [...userArray];
    
    this.fetchAllUsers = function(cb) {
      cb(null, this.users);
    };

    this.addUsers = function(user, cb) {
        utility.add(this.users, user);
        cb(null, this.users);
    };

    this.findById = function(id, cb) {
        const user = utility.findById(this.users, id);
        cb(null, user);
    };

    this.updateById = function(id, newdata, cb) {
        const user = utility.updateById(this.users, id, newdata);
        cb(null, user);
    };

    this.deleteById = function(id, cb) {
        const user = utility.deleteById(this.users, id);
        cb(null, user);
    };
};

exports.UserProvider = UserProvider;