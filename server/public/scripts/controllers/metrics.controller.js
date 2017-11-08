myApp.controller('MetricsController', function (ProspectsService, $scope) {
    console.log('MetricsController created');
    var vm = this;

    $scope.currentNavItem = 'dashboard'; // tells nav bar which item to indicate as 'selected'
    
    vm.mentors = { list: [] };
    vm.mentee = { list: [] };
    vm.connections = { list: [] };

    vm.getMentorNumbers = function (){
        ProspectsService.getMentorNumbers();
        vm.mentors = ProspectsService.mentorNum
        console.log('metrics controller hit with', vm.mentors);
        // return vm.mentors;
    }

    vm.getMenteeNumbers = function () {
        ProspectsService.getMenteeNumbers();
        vm.mentee = ProspectsService.menteeNum
        console.log('metrics controller hit with', vm.mentee);
    }

    vm.getConnectionNumbers = function () {
        ProspectsService.getConnectionNumbers();
        vm.connections = ProspectsService.connectionsNum
        console.log('metrics controller hit with', vm.connections);
    }







})// end controller