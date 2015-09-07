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
					// isString:'我在 resolve 中就是一个字符串', // 错误用法 ，resolve中必须是方法
					valString:'testIndex',
					aytoRun:function () {
						return 'resolve 中的属性是函数会自动运行';
					},
					message8:['messageService',function(messageService) { 
						// console.log('messageService : ',messageService.getMessage());               
						return messageService.getMessage();        
					}],
					greeting:['greetingService',function(greetingService){
						return greetingService.getGreeting();
					}]
				}
			})
			.when("/news2", {        
				templateUrl: "tpl/newsView.html",
				controller: "newsController2",
				resolve: {        
					initData:function (initDataService) {
						return initDataService();
					}
				}
			});
	}])
	
	.config(['$httpProvider',function($httpProvider) {
		console.log($httpProvider);
		console.log('keys',Object.keys($httpProvider));
		console.log('我是 $httpProvider');
	}])
	.factory("testIndex", function($q, $timeout) {   
		console.log('我是通过字符串绑到 resolve 属性中的');
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
				return '直接返回值'
				// console.log('auto execute');
			}
		};
	}])
	.factory("greetingService", ['$q','$timeout',function($q, $timeout) {   
		return {       
			getGreeting: function() {           
				var deferred = $q.defer();           
				$timeout(function() {               
					deferred.resolve("Allo!");
					// deferred.reject("Allo!");            
				}, 2000);           
				return deferred.promise;       
			}   
		}
	}])
	.factory('initDataService', ['$q','greetingService', 'messageService',function($q,greetingService,messageService){
		return function(){
			var greeting = greetingService.getGreeting();
			// var message = messageService.getMessage();
			var message = messageService.setMessage();
			return $q.all([greeting,message]).then(function (data) {
				return {
					greeting:data[0],
					message:data[1]
				}
			});
		};
	}])
	.run(['$rootScope', '$location', function($rootScope, $location) {
		console.log('run');
		// console.log('$q',$q.when('value')); // Promise {$$state: Object}
		// console.log('messageService', messageService.getMessage());

		$rootScope.$on('$routeChangeStart', function(event, next, prev) {
		// 异步立即执行
			// console.log('start : ',next.$$route);
			// console.log('start : ',prev);
			// console.log('start : ',$location.$$path);
		});

		
		$rootScope.$on('$routeChangeSuccess', function(event, next, prev) {
		// route路由中resolve返回 resolve 执行
			// console.log('success : ',next.$$route);
			// console.log('success : ',prev);
			// console.log('success : ',$location.$$path);

			// 全局执行 

			// 并且执行 controller ----------- 主枝干 ----------

		});
		
		$rootScope.$on('$routeChangeError', function(event, next, prev) {
		// route路由中resolve返回reject 执行
			console.log('error : ',$location.$$path);
		});
		console.log('run stream end');

	}])

	.controller('BookController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.name = "BookController";
		$scope.params = $routeParams;
	}])

	.controller('ChapterController', ['$scope', '$routeParams', function($scope, $routeParams) {
		$scope.name = "ChapterController";
		$scope.params = $routeParams;
	}])
	
	.controller("newsController", ['$scope','message8','greeting','aytoRun','valString',function ($scope,message8,greeting,aytoRun,valString) {
		console.log(message8());
		console.log(greeting);
		console.log('aytoRun : ',aytoRun);
		console.log('valString : ',valString);
	    $scope.message = message8;
	}])

	.controller("newsController2", ['$rootScope','$scope','initData',function ($rootScope,$scope,initData) {
		console.log('newsController2');
		console.log(initData);
		console.log('$scope.$root :',$scope.$root);
		console.log('$scope.$root.$$phase :',$scope.$root.$$phase);
		console.log('$rootScope :',$rootScope);
		console.log('$rootScope === $scope.$root :',$rootScope===$scope.$root); // true
	}]);