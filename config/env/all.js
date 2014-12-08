'use strict';

module.exports = {
	app: {
		title: 'Isomer',
		description: 'Learn to code with exceptional software engineers at Isomer Academy -- Utah\'s most ambitious dev bootcamp.',
		keywords: 'mongodb, express, angularjs, node.js, dev bootcamp, utah, web development, learn to code'
	},
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	assets: {
		lib: {
			css: [
//				'public/lib/bootstrap/dist/css/bootstrap.css',
//				'public/lib/bootstrap/dist/css/bootstrap-theme.css',
                'public/lib/bootswatch/paper/bootstrap.css',
                'public/lib/fontawesome/css/font-awesome.css'
			],
			js: [
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/prefixfree/prefixfree.min.js',
                'http://codepen.io/assets/libs/fullpage/jquery.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};