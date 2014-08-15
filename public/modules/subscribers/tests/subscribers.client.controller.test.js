'use strict';

(function() {
	// Subscribers Controller Spec
	describe('Subscribers Controller Tests', function() {
		// Initialize global variables
		var SubscribersController,
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

			// Initialize the Subscribers controller.
			SubscribersController = $controller('SubscribersController', {
				$scope: scope
			});
		}));

		it('$scope.find() should create an array with at least one Subscriber object fetched from XHR', inject(function(Subscribers) {
			// Create sample Subscriber using the Subscribers service
			var sampleSubscriber = new Subscribers({
				name: 'New Subscriber'
			});

			// Create a sample Subscribers array that includes the new Subscriber
			var sampleSubscribers = [sampleSubscriber];

			// Set GET response
			$httpBackend.expectGET('subscribers').respond(sampleSubscribers);

			// Run controller functionality
			scope.find();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscribers).toEqualData(sampleSubscribers);
		}));

		it('$scope.findOne() should create an array with one Subscriber object fetched from XHR using a subscriberId URL parameter', inject(function(Subscribers) {
			// Define a sample Subscriber object
			var sampleSubscriber = new Subscribers({
				name: 'New Subscriber'
			});

			// Set the URL parameter
			$stateParams.subscriberId = '525a8422f6d0f87f0e407a33';

			// Set GET response
			$httpBackend.expectGET(/subscribers\/([0-9a-fA-F]{24})$/).respond(sampleSubscriber);

			// Run controller functionality
			scope.findOne();
			$httpBackend.flush();

			// Test scope value
			expect(scope.subscriber).toEqualData(sampleSubscriber);
		}));

		it('$scope.create() with valid form data should send a POST request with the form input values and then locate to new object URL', inject(function(Subscribers) {
			// Create a sample Subscriber object
			var sampleSubscriberPostData = new Subscribers({
				name: 'New Subscriber'
			});

			// Create a sample Subscriber response
			var sampleSubscriberResponse = new Subscribers({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscriber'
			});

			// Fixture mock form input values
			scope.name = 'New Subscriber';

			// Set POST response
			$httpBackend.expectPOST('subscribers', sampleSubscriberPostData).respond(sampleSubscriberResponse);

			// Run controller functionality
			scope.create();
			$httpBackend.flush();

			// Test form inputs are reset
			expect(scope.name).toEqual('');

			// Test URL redirection after the Subscriber was created
			expect($location.path()).toBe('/subscribers/' + sampleSubscriberResponse._id);
		}));

		it('$scope.update() should update a valid Subscriber', inject(function(Subscribers) {
			// Define a sample Subscriber put data
			var sampleSubscriberPutData = new Subscribers({
				_id: '525cf20451979dea2c000001',
				name: 'New Subscriber'
			});

			// Mock Subscriber in scope
			scope.subscriber = sampleSubscriberPutData;

			// Set PUT response
			$httpBackend.expectPUT(/subscribers\/([0-9a-fA-F]{24})$/).respond();

			// Run controller functionality
			scope.update();
			$httpBackend.flush();

			// Test URL location to new object
			expect($location.path()).toBe('/subscribers/' + sampleSubscriberPutData._id);
		}));

		it('$scope.remove() should send a DELETE request with a valid subscriberId and remove the Subscriber from the scope', inject(function(Subscribers) {
			// Create new Subscriber object
			var sampleSubscriber = new Subscribers({
				_id: '525a8422f6d0f87f0e407a33'
			});

			// Create new Subscribers array and include the Subscriber
			scope.subscribers = [sampleSubscriber];

			// Set expected DELETE response
			$httpBackend.expectDELETE(/subscribers\/([0-9a-fA-F]{24})$/).respond(204);

			// Run controller functionality
			scope.remove(sampleSubscriber);
			$httpBackend.flush();

			// Test array after successful delete
			expect(scope.subscribers.length).toBe(0);
		}));
	});
}());