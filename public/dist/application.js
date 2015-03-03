'use strict';
// Init the application configuration module for AngularJS application
var ApplicationConfiguration = function () {
    // Init module configuration options
    var applicationModuleName = 'mean';
    var applicationModuleVendorDependencies = [
        'ngResource',
        'ngAnimate',
        'ui.router',
        'ui.bootstrap',
        'ui.utils'
      ];
    // Add a new vertical module
    var registerModule = function (moduleName, dependencies) {
      // Create angular module
      angular.module(moduleName, dependencies || []);
      // Add the module to the AngularJS configuration file
      angular.module(applicationModuleName).requires.push(moduleName);
    };
    return {
      applicationModuleName: applicationModuleName,
      applicationModuleVendorDependencies: applicationModuleVendorDependencies,
      registerModule: registerModule
    };
  }();'use strict';
//Start by defining the main module and adding the module dependencies
angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);
// Setting HTML5 Location Mode
angular.module(ApplicationConfiguration.applicationModuleName).config([
  '$locationProvider',
  function ($locationProvider) {
    $locationProvider.hashPrefix('!');
  }
]);
//Then define the init function for starting up the application
angular.element(document).ready(function () {
  //Fixing facebook bug with redirect
  if (window.location.hash === '#_=_')
    window.location.hash = '#!';
  //Then init the app
  angular.bootstrap(document, [ApplicationConfiguration.applicationModuleName]);
});'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('applications');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('core');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('programs');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('submissions');'use strict';
// Use applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('subscribers');'use strict';
// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('users');'use strict';
//Setting up route
angular.module('applications').config([
  '$stateProvider',
  function ($stateProvider) {
    // Applications state routing
    $stateProvider.state('listApplications', {
      url: '/applications',
      templateUrl: 'modules/applications/views/list-applications.client.view.html'
    }).state('createApplication', {
      url: '/applications/create',
      templateUrl: 'modules/applications/views/create-application.client.view.html'
    }).state('viewApplication', {
      url: '/applications/:applicationId',
      templateUrl: 'modules/applications/views/view-application.client.view.html'
    }).state('editApplication', {
      url: '/applications/:applicationId/edit',
      templateUrl: 'modules/applications/views/edit-application.client.view.html'
    });
  }
]);'use strict';
// Applications controller
angular.module('applications').controller('ApplicationsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Applications',
  function ($scope, $stateParams, $location, Authentication, Applications) {
    $scope.authentication = Authentication;
    // Create new Application
    $scope.create = function () {
      // Create new Application object
      var application = new Applications({ name: this.name });
      // Redirect after save
      application.$save(function (response) {
        $location.path('applications/' + response._id);
        // Clear form fields
        $scope.name = '';
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Remove existing Application
    $scope.remove = function (application) {
      if (application) {
        application.$remove();
        for (var i in $scope.applications) {
          if ($scope.applications[i] === application) {
            $scope.applications.splice(i, 1);
          }
        }
      } else {
        $scope.application.$remove(function () {
          $location.path('applications');
        });
      }
    };
    // Update existing Application
    $scope.update = function () {
      var application = $scope.application;
      application.$update(function () {
        $location.path('applications/' + application._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Applications
    $scope.find = function () {
      $scope.applications = Applications.query();
    };
    // Find existing Application
    $scope.findOne = function () {
      $scope.application = Applications.get({ applicationId: $stateParams.applicationId });
    };
  }
]);'use strict';
//Applications service used to communicate Applications REST endpoints
angular.module('applications').factory('Applications', [
  '$resource',
  function ($resource) {
    return $resource('applications/:applicationId', { applicationId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Setting up route
angular.module('core').config([
  '$stateProvider',
  '$urlRouterProvider',
  function ($stateProvider, $urlRouterProvider) {
    // Redirect to home view when route not found
    $urlRouterProvider.otherwise('/');
    // Home state routing
    $stateProvider.state('home', {
      url: '/',
      templateUrl: 'modules/core/views/home.client.view.html'
    }).state('community', {
      url: '/community',
      templateUrl: 'modules/core/views/community.client.view.html'
    }).state('pricing', {
      url: '/pricing',
      templateUrl: 'modules/core/views/pricing.client.view.html'
    }).state('welcome', {
      url: '/welcome',
      templateUrl: 'modules/core/views/welcome.client.view.html'
    }).state('sitemap', {
      url: '/sitemap',
      templateUrl: 'modules/core/views/header2.client.view.html'
    }).state('experience', {
      url: '/experience',
      templateUrl: 'modules/core/views/instructors.client.view.html'
    }).state('curriculum', {
      url: '/curriculum',
      templateUrl: 'modules/core/views/curriculum.client.view.html'
    }).state('reviews', {
      url: '/reviews',
      templateUrl: 'modules/core/views/reviews.client.view.html'
    }).state('confirm', {
      url: '/confirmwebstorm',
      templateUrl: 'modules/core/views/confirmation.client.view.html'
    });
  }
]);'use strict';
angular.module('core').controller('FullScreenController', [
  '$scope',
  function ($scope) {
    // Using angular UIs nesting feature, this allows the child scope to
    // toggle whether or not the 'container' class is being added
    // for that view
    $scope.allowFullScreen = function (shouldAllow) {
      $scope.shouldAllowFullScreen = shouldAllow;
      this.$on('$destroy', function () {
        $scope.shouldAllowFullScreen = !shouldAllow;
      });
    };
  }
]);'use strict';
angular.module('core').controller('HeaderController', [
  '$scope',
  'Authentication',
  'Menus',
  function ($scope, Authentication, Menus) {
    $scope.authentication = Authentication;
    $scope.isCollapsed = false;
    $scope.menu = Menus.getMenu('topbar');
    $scope.toggleCollapsibleMenu = function () {
      $scope.isCollapsed = !$scope.isCollapsed;
    };
    // Collapsing the menu after navigation
    $scope.$on('$stateChangeSuccess', function () {
      $scope.isCollapsed = false;
    });
    $scope.myVar = false;
    $scope.toggle = function () {
      $scope.myVar = !$scope.myVar;
    };
    $scope.myVar1 = false;
    $scope.toggle1 = function () {
      $scope.myVar1 = !$scope.myVar1;
    };
    $scope.myVar2 = false;
    $scope.toggle2 = function () {
      $scope.myVar2 = !$scope.myVar2;
    };
    $scope.myVar3 = false;
    $scope.toggle3 = function () {
      $scope.myVar3 = !$scope.myVar3;
    };
    $scope.myVar4 = false;
    $scope.toggle4 = function () {
      $scope.myVar4 = !$scope.myVar4;
    };
    $scope.myVar5 = false;
    $scope.toggle5 = function () {
      $scope.myVar5 = !$scope.myVar5;
    };
    $scope.myVar6 = false;
    $scope.toggle6 = function () {
      $scope.myVar6 = !$scope.myVar6;
    };
  }
]);'use strict';
angular.module('core').controller('HomeController', [
  '$scope',
  'Authentication',
  function ($scope, Authentication) {
    // This provides Authentication context.
    $scope.authentication = Authentication;
    //$scope.open = function() {
    //    $scope.title ='Open';
    //    $scope.subtitle = 'Our curriculum is free and open source. We use agile development on all projects.';
    //};
    //
    //$scope.isomer = function() {
    //    $scope.title = 'Isomer';
    //    $scope.subtitle = 'The Open Source, blended classroom, non-profit, project-focused, community driven developer bootcamp.';
    //};
    //
    //$scope.fullStack = function() {
    //    $scope.title = 'Full-Stack';
    //    $scope.subtitle = 'Understanding the entire stack is an essential engineering skill. From Databases to client, we\'ve got you covered.';
    //};
    //
    //$scope.nonProfit = function() {
    //    $scope.title = 'Non-Profit';
    //    $scope.subtitle = 'Our aim is to provide the best education as accessibly as possible. Know that your tuition is only being allocated for as efficient of teaching as possible.';
    //};
    //
    //$scope.isomer();
    $scope.selection = {
      aboutIsomer: true,
      community: false,
      curriculum: false,
      realWorldApplication: false,
      students: false
    };
    $scope.selectContent = function (content) {
      if (content === 'About Isomer') {
        $scope.selection;
      }
      if (content === 'Community') {
      }
      if (content === 'Curriculum') {
      }
      if (content === 'Real-world Applications') {
      }
      if (content === 'Students') {
      }
    };
    $scope.detailView = '/modules/core/views/community.client.view.html';
    $scope.getView = function () {
      return '/modules/core/views/pricing.client.view.html';
    };
  }
]);'use strict';
angular.module('core').directive('tree', function () {
  return {
    restrict: 'A',
    link: function (scope, element) {
      var ctx = element[0].getContext('2d');
      //element[0].width;
      element[0].height;
      ctx.fillRect(50, 25, 150, 100);  //            // variable that decides if something should be drawn on mousemove
                                       //            var drawing = false;
                                       //
                                       //            // the last coordinates before the current move
                                       //            var lastX;
                                       //            var lastY;
                                       //
                                       //            element.bind('mousedown', function(event){
                                       //                if(event.offsetX!==undefined){
                                       //                    lastX = event.offsetX;
                                       //                    lastY = event.offsetY;
                                       //                } else { // Firefox compatibility
                                       //                    lastX = event.layerX - event.currentTarget.offsetLeft;
                                       //                    lastY = event.layerY - event.currentTarget.offsetTop;
                                       //                }
                                       //
                                       //                // begins new line
                                       //                ctx.beginPath();
                                       //
                                       //                drawing = true;
                                       //            });
                                       //            element.bind('mousemove', function(event){
                                       //                if(drawing){
                                       //                    // get current mouse position
                                       //                    if(event.offsetX!==undefined){
                                       //                        currentX = event.offsetX;
                                       //                        currentY = event.offsetY;
                                       //                    } else {
                                       //                        currentX = event.layerX - event.currentTarget.offsetLeft;
                                       //                        currentY = event.layerY - event.currentTarget.offsetTop;
                                       //                    }
                                       //
                                       //                    draw(lastX, lastY, currentX, currentY);
                                       //
                                       //                    // set current coordinates to last one
                                       //                    lastX = currentX;
                                       //                    lastY = currentY;
                                       //                }
                                       //
                                       //            });
                                       //            element.bind('mouseup', function(event){
                                       //                // stop drawing
                                       //                drawing = false;
                                       //            });
                                       //
                                       //            // canvas reset
                                       //            function reset(){
                                       //                element[0].width = element[0].width;
                                       //            }
                                       //
                                       //            function draw(lX, lY, cX, cY){
                                       //                // line from
                                       //                ctx.moveTo(lX,lY);
                                       //                // to
                                       //                ctx.lineTo(cX,cY);
                                       //                // color
                                       //                ctx.strokeStyle = "#4bf";
                                       //                // draw it
                                       //                ctx.stroke();
                                       //            }
    }
  };
});'use strict';
//Menu service used for managing  menus
angular.module('core').service('Menus', [function () {
    // Define a set of default roles
    this.defaultRoles = ['*'];
    // Define the menus object
    this.menus = {};
    // A private function for rendering decision 
    var shouldRender = function (user) {
      if (user) {
        if (!!~this.roles.indexOf('*')) {
          return true;
        } else {
          for (var userRoleIndex in user.roles) {
            for (var roleIndex in this.roles) {
              if (this.roles[roleIndex] === user.roles[userRoleIndex]) {
                return true;
              }
            }
          }
        }
      } else {
        return this.isPublic;
      }
      return false;
    };
    // Validate menu existance
    this.validateMenuExistance = function (menuId) {
      if (menuId && menuId.length) {
        if (this.menus[menuId]) {
          return true;
        } else {
          throw new Error('Menu does not exists');
        }
      } else {
        throw new Error('MenuId was not provided');
      }
      return false;
    };
    // Get the menu object by menu id
    this.getMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      return this.menus[menuId];
    };
    // Add new menu object by menu id
    this.addMenu = function (menuId, isPublic, roles) {
      // Create the new menu
      this.menus[menuId] = {
        isPublic: isPublic || false,
        roles: roles || this.defaultRoles,
        items: [],
        shouldRender: shouldRender
      };
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenu = function (menuId) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Return the menu object
      delete this.menus[menuId];
    };
    // Add menu item object
    this.addMenuItem = function (menuId, menuItemTitle, menuItemURL, menuItemType, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Push new menu item
      this.menus[menuId].items.push({
        title: menuItemTitle,
        link: menuItemURL,
        menuItemType: menuItemType || 'item',
        menuItemClass: menuItemType,
        uiRoute: menuItemUIRoute || '/' + menuItemURL,
        isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].isPublic : isPublic,
        roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].roles : roles,
        position: position || 0,
        items: [],
        shouldRender: shouldRender
      });
      // Return the menu object
      return this.menus[menuId];
    };
    // Add submenu item object
    this.addSubMenuItem = function (menuId, rootMenuItemURL, menuItemTitle, menuItemURL, menuItemUIRoute, isPublic, roles, position) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === rootMenuItemURL) {
          // Push new submenu item
          this.menus[menuId].items[itemIndex].items.push({
            title: menuItemTitle,
            link: menuItemURL,
            uiRoute: menuItemUIRoute || '/' + menuItemURL,
            isPublic: isPublic === null || typeof isPublic === 'undefined' ? this.menus[menuId].items[itemIndex].isPublic : isPublic,
            roles: roles === null || typeof roles === 'undefined' ? this.menus[menuId].items[itemIndex].roles : roles,
            position: position || 0,
            shouldRender: shouldRender
          });
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeMenuItem = function (menuId, menuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        if (this.menus[menuId].items[itemIndex].link === menuItemURL) {
          this.menus[menuId].items.splice(itemIndex, 1);
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    // Remove existing menu object by menu id
    this.removeSubMenuItem = function (menuId, submenuItemURL) {
      // Validate that the menu exists
      this.validateMenuExistance(menuId);
      // Search for menu item to remove
      for (var itemIndex in this.menus[menuId].items) {
        for (var subitemIndex in this.menus[menuId].items[itemIndex].items) {
          if (this.menus[menuId].items[itemIndex].items[subitemIndex].link === submenuItemURL) {
            this.menus[menuId].items[itemIndex].items.splice(subitemIndex, 1);
          }
        }
      }
      // Return the menu object
      return this.menus[menuId];
    };
    //Adding the topbar menu
    this.addMenu('topbar');
  }]);'use strict';
// Configuring the Articles module
angular.module('programs').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Programs', 'programs', 'dropdown', '/course(/create)?');
    Menus.addSubMenuItem('topbar', 'programs', 'List Programs', 'programs');
    Menus.addSubMenuItem('topbar', 'programs', 'New Program', 'course/create');
  }
]);'use strict';
//Setting up route
angular.module('programs').config([
  '$stateProvider',
  function ($stateProvider) {
    // Programs state routing
    $stateProvider.state('viewCourse', {
      url: '/program',
      templateUrl: 'modules/course/views/course.client.view.html'
    }).state('viewDeets', {
      url: '/deets',
      templateUrl: 'modules/course/views/deets.client.view.html'
    });
  }
]);'use strict';
// Programs controller
angular.module('programs').controller('ProgramsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Programs',
  function ($scope, $stateParams, $location, Authentication, Programs) {
    $scope.authentication = Authentication;
    $scope.setFull;
  }
]);'use strict';
// Configuring the Articles module
angular.module('submissions').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Submissions', 'submissions', 'dropdown', '/submissions(/create)?');
    Menus.addSubMenuItem('topbar', 'submissions', 'List Submissions', 'submissions');
    Menus.addSubMenuItem('topbar', 'submissions', 'New Submission', 'submissions/create');
  }
]);'use strict';
//Setting up route
angular.module('submissions').config([
  '$stateProvider',
  function ($stateProvider) {
    // Submissions state routing
    $stateProvider.state('listSubmissions', {
      url: '/submissions',
      templateUrl: 'modules/submissions/views/list-submissions.client.view.html'
    }).state('createSubmission', {
      url: '/submissions/create',
      templateUrl: 'modules/submissions/views/create-submission.client.view.html'
    }).state('viewSubmission', {
      url: '/submissions/:submissionId',
      templateUrl: 'modules/submissions/views/view-submission.client.view.html'
    }).state('editSubmission', {
      url: '/submissions/:submissionId/edit',
      templateUrl: 'modules/submissions/views/edit-submission.client.view.html'
    });
  }
]);'use strict';
// Submissions controller
angular.module('submissions').controller('SubmissionsController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Submissions',
  function ($scope, $stateParams, $location, Authentication, Submissions) {
    $scope.authentication = Authentication;
    // Create new Submission
    $scope.create = function () {
      // Create new Submission object
      var submission = new Submissions({ name: this.name });
      // Redirect after save
      submission.$save(function (response) {
        $location.path('submissions/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Submission
    $scope.remove = function (submission) {
      if (submission) {
        submission.$remove();
        for (var i in $scope.submissions) {
          if ($scope.submissions[i] === submission) {
            $scope.submissions.splice(i, 1);
          }
        }
      } else {
        $scope.submission.$remove(function () {
          $location.path('submissions');
        });
      }
    };
    // Update existing Submission
    $scope.update = function () {
      var submission = $scope.submission;
      submission.$update(function () {
        $location.path('submissions/' + submission._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Submissions
    $scope.find = function () {
      $scope.submissions = Submissions.query();
    };
    // Find existing Submission
    $scope.findOne = function () {
      $scope.submission = Submissions.get({ submissionId: $stateParams.submissionId });
    };
  }
]);'use strict';
//Submissions service used to communicate Submissions REST endpoints
angular.module('submissions').factory('Submissions', [
  '$resource',
  function ($resource) {
    return $resource('submissions/:submissionId', { submissionId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Configuring the Articles module
angular.module('subscribers').run([
  'Menus',
  function (Menus) {
    // Set top bar menu items
    Menus.addMenuItem('topbar', 'Subscribers', 'subscribers', 'dropdown', '/subscribers(/create)?');
    Menus.addSubMenuItem('topbar', 'subscribers', 'List Subscribers', 'subscribers');
    Menus.addSubMenuItem('topbar', 'subscribers', 'New Subscriber', 'subscribers/create');
  }
]);'use strict';
//Setting up route
angular.module('subscribers').config([
  '$stateProvider',
  function ($stateProvider) {
    // Subscribers state routing
    $stateProvider.state('listSubscribers', {
      url: '/subscribers',
      templateUrl: 'modules/subscribers/views/list-subscribers.client.view.html'
    }).state('createSubscriber', {
      url: '/subscribers/create',
      templateUrl: 'modules/subscribers/views/create-subscriber.client.view.html'
    }).state('viewSubscriber', {
      url: '/subscribers/:subscriberId',
      templateUrl: 'modules/subscribers/views/view-subscriber.client.view.html'
    }).state('editSubscriber', {
      url: '/subscribers/:subscriberId/edit',
      templateUrl: 'modules/subscribers/views/edit-subscriber.client.view.html'
    });
  }
]);'use strict';
// Subscribers controller
angular.module('subscribers').controller('SubscribersController', [
  '$scope',
  '$stateParams',
  '$location',
  'Authentication',
  'Subscribers',
  function ($scope, $stateParams, $location, Authentication, Subscribers) {
    $scope.authentication = Authentication;
    // Create new Subscriber
    $scope.create = function () {
      // Create new Subscriber object
      var subscriber = new Subscribers({ name: this.name });
      // Redirect after save
      subscriber.$save(function (response) {
        $location.path('subscribers/' + response._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
      // Clear form fields
      this.name = '';
    };
    // Remove existing Subscriber
    $scope.remove = function (subscriber) {
      if (subscriber) {
        subscriber.$remove();
        for (var i in $scope.subscribers) {
          if ($scope.subscribers[i] === subscriber) {
            $scope.subscribers.splice(i, 1);
          }
        }
      } else {
        $scope.subscriber.$remove(function () {
          $location.path('subscribers');
        });
      }
    };
    // Update existing Subscriber
    $scope.update = function () {
      var subscriber = $scope.subscriber;
      subscriber.$update(function () {
        $location.path('subscribers/' + subscriber._id);
      }, function (errorResponse) {
        $scope.error = errorResponse.data.message;
      });
    };
    // Find a list of Subscribers
    $scope.find = function () {
      $scope.subscribers = Subscribers.query();
    };
    // Find existing Subscriber
    $scope.findOne = function () {
      $scope.subscriber = Subscribers.get({ subscriberId: $stateParams.subscriberId });
    };
  }
]);'use strict';
//Subscribers service used to communicate Subscribers REST endpoints
angular.module('subscribers').factory('Subscribers', [
  '$resource',
  function ($resource) {
    return $resource('subscribers/:subscriberId', { subscriberId: '@_id' }, { update: { method: 'PUT' } });
  }
]);'use strict';
// Config HTTP Error Handling
angular.module('users').config([
  '$httpProvider',
  function ($httpProvider) {
    // Set the httpProvider "not authorized" interceptor
    $httpProvider.interceptors.push([
      '$q',
      '$location',
      'Authentication',
      function ($q, $location, Authentication) {
        return {
          responseError: function (rejection) {
            switch (rejection.status) {
            case 401:
              // Deauthenticate the global user
              Authentication.user = null;
              // Redirect to signin page
              $location.path('signin');
              break;
            case 403:
              // Add unauthorized behaviour 
              break;
            }
            return $q.reject(rejection);
          }
        };
      }
    ]);
  }
]);'use strict';
// Setting up route
angular.module('users').config([
  '$stateProvider',
  function ($stateProvider) {
    // Users state routing
    $stateProvider.state('profile', {
      url: '/settings/profile',
      templateUrl: 'modules/users/views/settings/edit-profile.client.view.html'
    }).state('password', {
      url: '/settings/password',
      templateUrl: 'modules/users/views/settings/change-password.client.view.html'
    }).state('accounts', {
      url: '/settings/accounts',
      templateUrl: 'modules/users/views/settings/social-accounts.client.view.html'
    }).state('signup', {
      url: '/signup',
      templateUrl: 'modules/users/views/authentication/signup.client.view.html'
    }).state('signin', {
      url: '/signin',
      templateUrl: 'modules/users/views/authentication/signin.client.view.html'
    }).state('forgot', {
      url: '/password/forgot',
      templateUrl: 'modules/users/views/password/forgot-password.client.view.html'
    }).state('reset-invlaid', {
      url: '/password/reset/invalid',
      templateUrl: 'modules/users/views/password/reset-password-invalid.client.view.html'
    }).state('reset-success', {
      url: '/password/reset/success',
      templateUrl: 'modules/users/views/password/reset-password-success.client.view.html'
    }).state('reset', {
      url: '/password/reset/:token',
      templateUrl: 'modules/users/views/password/reset-password.client.view.html'
    });
  }
]);'use strict';
angular.module('users').controller('AuthenticationController', [
  '$scope',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    // If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    $scope.signup = function () {
      $http.post('/auth/signup', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    $scope.signin = function () {
      $http.post('/auth/signin', $scope.credentials).success(function (response) {
        // If successful we assign the response to the global user model
        $scope.authentication.user = response;
        // And redirect to the index page
        $location.path('/');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('PasswordController', [
  '$scope',
  '$stateParams',
  '$http',
  '$location',
  'Authentication',
  function ($scope, $stateParams, $http, $location, Authentication) {
    $scope.authentication = Authentication;
    //If user is signed in then redirect back home
    if ($scope.authentication.user)
      $location.path('/');
    // Submit forgotten password account id
    $scope.askForPasswordReset = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/forgot', $scope.credentials).success(function (response) {
        // Show user success message and clear form
        $scope.credentials = null;
        $scope.success = response.message;
      }).error(function (response) {
        // Show user error message and clear form
        $scope.credentials = null;
        $scope.error = response.message;
      });
    };
    // Change user password
    $scope.resetUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/auth/reset/' + $stateParams.token, $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.passwordDetails = null;
        // Attach user profile
        Authentication.user = response;
        // And redirect to the index page
        $location.path('/password/reset/success');
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
angular.module('users').controller('SettingsController', [
  '$scope',
  '$http',
  '$location',
  'Users',
  'Authentication',
  function ($scope, $http, $location, Users, Authentication) {
    $scope.user = Authentication.user;
    // If user is not signed in then redirect back home
    if (!$scope.user)
      $location.path('/');
    // Check if there are additional accounts 
    $scope.hasConnectedAdditionalSocialAccounts = function (provider) {
      for (var i in $scope.user.additionalProvidersData) {
        return true;
      }
      return false;
    };
    // Check if provider is already in use with current user
    $scope.isConnectedSocialAccount = function (provider) {
      return $scope.user.provider === provider || $scope.user.additionalProvidersData && $scope.user.additionalProvidersData[provider];
    };
    // Remove a user social account
    $scope.removeUserSocialAccount = function (provider) {
      $scope.success = $scope.error = null;
      $http.delete('/users/accounts', { params: { provider: provider } }).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.user = Authentication.user = response;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
    // Update a user profile
    $scope.updateUserProfile = function (isValid) {
      if (isValid) {
        $scope.success = $scope.error = null;
        var user = new Users($scope.user);
        user.$update(function (response) {
          $scope.success = true;
          Authentication.user = response;
        }, function (response) {
          $scope.error = response.data.message;
        });
      } else {
        $scope.submitted = true;
      }
    };
    // Change user password
    $scope.changeUserPassword = function () {
      $scope.success = $scope.error = null;
      $http.post('/users/password', $scope.passwordDetails).success(function (response) {
        // If successful show success message and clear form
        $scope.success = true;
        $scope.passwordDetails = null;
      }).error(function (response) {
        $scope.error = response.message;
      });
    };
  }
]);'use strict';
// Authentication service for user variables
angular.module('users').factory('Authentication', [function () {
    var _this = this;
    _this._data = { user: window.user };
    return _this._data;
  }]);'use strict';
// Users service used for communicating with the users REST endpoint
angular.module('users').factory('Users', [
  '$resource',
  function ($resource) {
    return $resource('users', {}, { update: { method: 'PUT' } });
  }
]);
