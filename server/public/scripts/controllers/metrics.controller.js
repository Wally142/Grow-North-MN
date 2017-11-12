myApp.controller('MetricsController', function (ProspectsService, UserService, $scope) {
    console.log('MetricsController created');
    var vm = this;

    UserService.getuser();

    $scope.currentNavItem = 'dashboard'; // tells nav bar which item to indicate as 'selected'
    
    vm.mentors = { list: [] };
    vm.mentee = { list: [] };
    vm.connections = { list: [] };
    vm.sortMethod = 'name';
    vm.reverse = false;
    vm.query = '';

    vm.sort = function (method) {
        vm.reverse = (vm.sortMethod === method) ? !vm.reverse : false;
        vm.sortMethod = method;
    }

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