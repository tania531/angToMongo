
angular.module('tasks', [])
.controller('tasksController', ['$scope', '$http', function($scope, $http){
	$http.get("http://localhost:9000/tasks").then(function(response){
		$scope.taskList = response.data;
		console.log(response.data);
	});

	$scope.addTask = function(){
		console.log('add task fcn');
		$http.post("http://localhost:9000/tasks", $scope.newTask)
			.then(function(response){
				$scope.taskList.push(response.data);
				$scope.newTask = {};
			});		
	};

	$scope.deleteTask = function(task, taskIndex){
		
		$http.delete("http://localhost:9000/tasks/" + task._id)
			.then(function(response){
				$scope.taskList.splice(taskIndex, 1);
				console.log('task: ', task._id);
			});

	};

}]);