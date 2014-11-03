'use strict';

(function() {
	// Applies Controller Spec
	describe('Applies Controller Tests', function() {
		// Initialize global variables
		var AppliesController,
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

			// Initialize the Applies controller.
			AppliesController = $controller('AppliesController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Apply object fetched from XHR', inject(function(Applies) {
			// Create sample Apply using the Applies service
			var sampleApply = new Applies({
				name: 'New Apply'
			});

			// Create a sample Applies array that includes the new Apply
			var sampleApplies = [sampleApply];

			// Set GET response
			$httpBackend.expectGET('applies').respond(sampleApplies);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.applies).toEqualData(sampleApplies);
		}));

		it('$scope.findOne() should create an array with one Apply object fetched from XHR using a applyId URL parameter', inject(function(Applies) {
			// Define a sample Apply object
			var sampleApply = new Applies({
				name: 'New Apply'
			});

			// Set the URL parameter
			$stateParams.applyId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/applies\/([0-9a-fA-F]{24})$/).respond(sampleApply);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.apply).toEqualData(sampleApply);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Applies) {
			// Create a sample Apply object
			var sampleApplyPostData = new Applies({
				name: 'New Apply'
			});

			// Create a sample Apply response
			var sampleApplyResponse = new Applies({
				_id: '525cf20451979dea2c000001',
				name: 'New Apply'
			});

			// Fixture mock form input values
			scope.name = 'New Apply';

			// Set POST response
			$httpBackend.expectPOST('applies', sampleApplyPostData).respond(sampleApplyResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Apply was created
			expect($location.path()).toBe('/applies/' + sampleApplyResponse._id);
		}));

		it('$scope.update() should update a valid Apply', inject(function(Applies) {
			// Define a sample Apply put data
			var sampleApplyPutData = new Applies({
				_id: '525cf20451979dea2c000001',
				name: 'New Apply'
			});

			// Mock Apply in scope
			scope.apply = sampleApplyPutData;

			// Set PUT response
			$httpBackend.expectPUT(/applies\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/applies/' + sampleApplyPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid applyId and remove the Apply from the scope', inject(function(Applies) {
			// Create new Apply object
			var sampleApply = new Applies({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Applies array and include the Apply
			scope.applies = [sampleApply];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/applies\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleApply);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.applies.length).toBe(0);
		}));
	});
}());