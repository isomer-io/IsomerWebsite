'use strict';

// Configuring the Articles module
angular.module('subscribers').run(['Menus',
	function(Menus) {
		// Set top bar menu items
		Menus.addMenuItem('topbar', 'Subscribers', 'subscribers', 'dropdown', '/subscribers(/create)?');
		Menus.addSubMenuItem('topbar', 'subscribers', 'List Subscribers', 'subscribers');
		Menus.addSubMenuItem('topbar', 'subscribers', 'New Subscriber', 'subscribers/create');
	}
]);