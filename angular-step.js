/**
 * author zdzDesigner on 2015.09.06
 * 测试routeProvider中的resolve
 */


var RouteApp = angular.module('RouteApp', ['ngRoute'])
	
	.config(['$routeProvider', function($routeProvider) {
		// console.log(messageService);
		$routeProvider
			.when('/Book/:bookId', {
				templateUrl: 'tpl/book.html',
				controller: 'BookController',
				resolve: {
					// I will cause a 1 second delay
					delay: function($q, $timeout) {
						var delay = $q.defer();
						$timeout(delay.resolve, 3000);
						return delay.promise;
					}
				}
			})
			.when('/Book/:bookId/ch/:chapterId', {
				templateUrl: 'tpl/chapter.html',
				controller: 'ChapterController'
			})
			.when("/news", {        
				templateUrl: "tpl/newsView.html",
				controller: "newsController",
				resolve: {        
					message8: function(messageService) { 
						// console.log('messageService : ',messageService.getMessage());               
						return messageService.getMessage();        
					},
					greeting:function(greetingService){
						return greetingService.getGreeting();
					}
				}
			});
	}])
	.factory("testIndex", function($q, $timeout) {   
		return {       
			getGreeting: function() {           
				var deferred = $q.defer();           
				$timeout(function() {               
					deferred.resolve("Allo!");           
				}, 2000);           
				return deferred.promise;       
			}   
		}
	})
	.factory("messageService", ['$q', function($q) {
		return {
			getMessage: function() {
				// return $q.when("Hello World!");
				// return '可以返回String类似数据';
				return $q.when(function () {
					return '返回一个函数';
				});
			},
			setMessage:function () {
				console.log('auto execute');
			}
		};
	}])
	.factory("greetingService", ['$q','$timeout',function($q, $timeout) {   
		return {       
			getGreeting: function() {           
				var deferred = $q.defer();           
				$timeout(function() {               
					deferred.resolve("Allo!");           
				}, 2000);           
				return deferred.promise;       
			}   
		}
	}])
	.run(['$rootScope', '$location', function($rootScope, $location) {
		console.log('run');
		// console.log('$q',$q.when('value')); // Promise {$$state: Object}
		// console.log('messageService', messageService.getMessage());

		$rootScope.$on('$routeChangeStart', function(event, next, prev) {
			// console.log('start : ',next.$$route);
			// console.log('start : ',prev);
			// console.log($location.$$path);
		});

		$rootScope.$on('$routeChangeSuccess', function(event, next, prev) {
			// console.log('success : ',next.$$route);
			// console.log('success : ',prev);
			// console.log($location.$$path);
		});
	}])

	.controller('BookController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.name = "BookController";
		$scope.params = $routeParams;
	}])

	.controller('ChapterController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.name = "ChapterController";
		$scope.params = $routeParams;
	}])
	
	// .controller("newsController", ['$scope','message8','greeting',function ($scope,message8,greeting) {
	// 	console.log(message8());
	// 	console.log(greeting);
	//     $scope.message = message8;
	// }])
	.controller("newsController", function ($scope,message8,greeting) {
		console.log(message8());
		console.log(greeting);
	    $scope.message = message8;
	});