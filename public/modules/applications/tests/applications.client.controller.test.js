'use strict';

(function() {
	// Applications Controller Spec
	describe('Applications Controller Tests', function() {
		// Initialize global variables
		var ApplicationsController,
		scope,
		$httpBackend,
		$stateParams,
		$location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function(util, customEqualityTesters) {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Set a new global scope
			scope = $rootScope.$new();

			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Applications controller.
			ApplicationsController = $controller('ApplicationsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Application object fetched from XHR', inject(function(Applications) {
			// Create sample Application using the Applications service
			var sampleApplication = new Applications({
				name: 'New Application'
			});

			// Create a sample Applications array that includes the new Application
			var sampleApplications = [sampleApplication];

			// Set GET response
			$httpBackend.expectGET('applications').respond(sampleApplications);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.applications).toEqualData(sampleApplications);
		}));

		it('$scope.findOne() should create an array with one Application object fetched from XHR using a applicationId URL parameter', inject(function(Applications) {
			// Define a sample Application object
			var sampleApplication = new Applications({
				name: 'New Application'
			});

			// Set the URL parameter
			$stateParams.applicationId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/applications\/([0-9a-fA-F]{24})$/).respond(sampleApplication);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.application).toEqualData(sampleApplication);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Applications) {
			// Create a sample Application object
			var sampleApplicationPostData = new Applications({
				name: 'New Application'
			});

			// Create a sample Application response
			var sampleApplicationResponse = new Applications({
				_id: '525cf20451979dea2c000001',
				name: 'New Application'
			});

			// Fixture mock form input values
			scope.name = 'New Application';

			// Set POST response
			$httpBackend.expectPOST('applications', sampleApplicationPostData).respond(sampleApplicationResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Application was created
			expect($location.path()).toBe('/applications/' + sampleApplicationResponse._id);
		}));

		it('$scope.update() should update a valid Application', inject(function(Applications) {
			// Define a sample Application put data
			var sampleApplicationPutData = new Applications({
				_id: '525cf20451979dea2c000001',
				name: 'New Application'
			});

			// Mock Application in scope
			scope.application = sampleApplicationPutData;

			// Set PUT response
			$httpBackend.expectPUT(/applications\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/applications/' + sampleApplicationPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid applicationId and remove the Application from the scope', inject(function(Applications) {
			// Create new Application object
			var sampleApplication = new Applications({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Applications array and include the Application
			scope.applications = [sampleApplication];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/applications\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleApplication);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.applications.length).toBe(0);
		}));
	});
}());