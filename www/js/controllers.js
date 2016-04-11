angular.module('todo')
  .controller('TodoCtrl',['$scope','$timeout','$ionicModal','Projects','$ionicSideMenuDelegate',
    function($scope,$timeout,$ionicModal,Projects,$ionicSideMenuDelegate){
      var createProject=function(projectTitle){
        var newProject=Projects.newProject(projectTitle);
        $scope.projects.push(newProject);
        Projects.save($scope.projects);
        $scope.selectProject(newProject,$scope.projects.length-1);

      }

      $scope.projects=Projects.all();
      $scope.activeProject=$scope.projects[Projects.getLastActiveIndex()];
      $scope.newProject=function(){
        var projectTitle=prompt('Project name');
        if(projectTitle){
          createProject(projectTitle);
        }
      };
      $scope.selectProject=function(project,index){
        $scope.activeProject=project;
        Projects.setLastActiveIndex(index);
        $ionicSideMenuDelegate.toggleLeft(false);
      };


    $ionicModal.fromTemplateUrl('new-task.html',function(modal){
      $scope.taskModal=modal;
    },{
      scope:$scope,
      animation:'slide-in-up'
    });

    $scope.createTask=function(task){
      if(!$scope.activeProject || !task){
        return;
      }
      $scope.activeProject.tasks.push({
        title:task.title
      });
      $scope.taskModal.hide();
      Projects.save($scope.projects);
      task.title='';


    };

    $scope.newTask=function(){
      //task.title='';
      $scope.taskModal.show();
    };

    $scope.closeNewTask=function(){
      $scope.taskModal.hide();
    };
    $scope.toggleProjects=function(){
      $ionicSideMenuDelegate.toggleLeft();
    }

  }]);
