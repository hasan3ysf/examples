exports.install = function(framework) {
	framework.route('/', view_homepage);
	framework.route('/', json_homepage, ['xhr', 'post']);
};

// Read all users
function view_homepage() {

	var self = this;
	var User = self.model('user');

	User.find(function(err, users) {
		self.view('homepage', users);
	});

}

// Add a new user
function json_homepage() {

	var self = this;
	var User = self.model('user');
	var model = self.post;

	var user = new User({ alias: model.alias, created: new Date() }).save(function() {

		// Read all users
		User.find(function(err, users) {
			self.content(self.template('users', users), 'text/html');
		});

	});

}