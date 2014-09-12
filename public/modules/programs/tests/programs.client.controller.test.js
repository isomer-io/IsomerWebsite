'use strict';

(function() {
	// Programs Controller Spec
	describe('Programs Controller Tests', function() {
		// Initialize global variables
		var ProgramsController,
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

			// Initialize the Programs controller.
			ProgramsController = $controller('ProgramsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Program object fetched from XHR', inject(function(Programs) {
			// Create sample Program using the Programs service
			var sampleProgram = new Programs({
				name: 'New Program'
			});

			// Create a sample Programs array that includes the new Program
			var samplePrograms = [sampleProgram];

			// Set GET response
			$httpBackend.expectGET('programs').respond(samplePrograms);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.programs).toEqualData(samplePrograms);
		}));

		it('$scope.findOne() should create an array with one Program object fetched from XHR using a programId URL parameter', inject(function(Programs) {
			// Define a sample Program object
			var sampleProgram = new Programs({
				name: 'New Program'
			});

			// Set the URL parameter
			$stateParams.programId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/programs\/([0-9a-fA-F]{24})$/).respond(sampleProgram);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.program).toEqualData(sampleProgram);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Programs) {
			// Create a sample Program object
			var sampleProgramPostData = new Programs({
				name: 'New Program'
			});

			// Create a sample Program response
			var sampleProgramResponse = new Programs({
				_id: '525cf20451979dea2c000001',
				name: 'New Program'
			});

			// Fixture mock form input values
			scope.name = 'New Program';

			// Set POST response
			$httpBackend.expectPOST('programs', sampleProgramPostData).respond(sampleProgramResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Program was created
			expect($location.path()).toBe('/programs/' + sampleProgramResponse._id);
		}));

		it('$scope.update() should update a valid Program', inject(function(Programs) {
			// Define a sample Program put data
			var sampleProgramPutData = new Programs({
				_id: '525cf20451979dea2c000001',
				name: 'New Program'
			});

			// Mock Program in scope
			scope.program = sampleProgramPutData;

			// Set PUT response
			$httpBackend.expectPUT(/programs\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/programs/' + sampleProgramPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid programId and remove the Program from the scope', inject(function(Programs) {
			// Create new Program object
			var sampleProgram = new Programs({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Programs array and include the Program
			scope.programs = [sampleProgram];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/programs\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleProgram);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.programs.length).toBe(0);
		}));
	});
}());