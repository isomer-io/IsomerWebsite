'use strict';

(function() {
	// Submissions Controller Spec
	describe('Submissions Controller Tests', function() {
		// Initialize global variables
		var SubmissionsController,
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

			// Initialize the Submissions controller.
			SubmissionsController = $controller('SubmissionsController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Submission object fetched from XHR', inject(function(Submissions) {
			// Create sample Submission using the Submissions service
			var sampleSubmission = new Submissions({
				name: 'New Submission'
			});

			// Create a sample Submissions array that includes the new Submission
			var sampleSubmissions = [sampleSubmission];

			// Set GET response
			$httpBackend.expectGET('submissions').respond(sampleSubmissions);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.submissions).toEqualData(sampleSubmissions);
		}));

		it('$scope.findOne() should create an array with one Submission object fetched from XHR using a submissionId URL parameter', inject(function(Submissions) {
			// Define a sample Submission object
			var sampleSubmission = new Submissions({
				name: 'New Submission'
			});

			// Set the URL parameter
			$stateParams.submissionId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/submissions\/([0-9a-fA-F]{24})$/).respond(sampleSubmission);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.submission).toEqualData(sampleSubmission);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Submissions) {
			// Create a sample Submission object
			var sampleSubmissionPostData = new Submissions({
				name: 'New Submission'
			});

			// Create a sample Submission response
			var sampleSubmissionResponse = new Submissions({
				_id: '525cf20451979dea2c000001',
				name: 'New Submission'
			});

			// Fixture mock form input values
			scope.name = 'New Submission';

			// Set POST response
			$httpBackend.expectPOST('submissions', sampleSubmissionPostData).respond(sampleSubmissionResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Submission was created
			expect($location.path()).toBe('/submissions/' + sampleSubmissionResponse._id);
		}));

		it('$scope.update() should update a valid Submission', inject(function(Submissions) {
			// Define a sample Submission put data
			var sampleSubmissionPutData = new Submissions({
				_id: '525cf20451979dea2c000001',
				name: 'New Submission'
			});

			// Mock Submission in scope
			scope.submission = sampleSubmissionPutData;

			// Set PUT response
			$httpBackend.expectPUT(/submissions\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/submissions/' + sampleSubmissionPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid submissionId and remove the Submission from the scope', inject(function(Submissions) {
			// Create new Submission object
			var sampleSubmission = new Submissions({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Submissions array and include the Submission
			scope.submissions = [sampleSubmission];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/submissions\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubmission);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.submissions.length).toBe(0);
		}));
	});
}());