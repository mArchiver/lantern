var co = require('co');
var LocalStrategy = require('passport-local').Strategy;
var Member = require('./member');

module.exports = {
	init: function(passport) {
		passport.serializeUser(function(user, done) {
			done(null, {
				id: user.id,
				name: user.name,
				email: user.email
			});
		})

		passport.deserializeUser(function(user, done) {
			done(null, user);
		})
	},
	local: function(passport) {

		passport.use(new LocalStrategy(function(username, password, done) {

			co(function *() {
				return yield Member.authorizeMember(username, password);
			}).then(function(member) {
				done(null, member);
			}, function(err) {
				done(err);
			});
		}));
	}
};