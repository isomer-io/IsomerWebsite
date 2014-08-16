'use strict';

// Configuring the Articles module
angular.module('submissions').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Submissions', 'submissions', 'dropdown', '/submissions(/create)?');
		Menus.addSubMenuItem('topbar', 'submissions', 'List Submissions', 'submissions');
		Menus.addSubMenuItem('topbar', 'submissions', 'New Submission', 'submissions/create');
	}
]);