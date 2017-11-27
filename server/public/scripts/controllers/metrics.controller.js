myApp.controller('MetricsController', function (ProspectsService, UserService, $scope) {
    var vm = this;

    UserService.getuser();

    $scope.currentNavItem = 'dashboard'; // tells nav bar which item to indicate as 'selected'
    
    vm.mentors = { list: [] };
    vm.mentee = { list: [] };
    vm.connections = { list: [] };
    vm.sortMethod = 'lastname';
    vm.reverse = false;
    vm.query = '';

    vm.topDirections = ['left', 'up'];
    vm.bottomDirections = ['down', 'right'];

    vm.isOpen = false;

    vm.availableModes = ['md-fling', 'md-scale'];
    vm.selectedMode = 'md-fling';

    vm.availableDirections = ['up', 'down', 'left', 'right'];
    vm.selectedDirection = 'up';

    vm.sort = function (method) {
        vm.reverse = (vm.sortMethod === method) ? !vm.reverse : false;
        vm.sortMethod = method;
    }

    vm.getMentorNumbers = function (){
        ProspectsService.getMentorNumbers();
        vm.mentors = ProspectsService.mentorNum
    }

    vm.getMenteeNumbers = function () {
        ProspectsService.getMenteeNumbers();
        vm.mentee = ProspectsService.menteeNum
    }

    vm.getConnectionNumbers = function () {
        ProspectsService.getConnectionNumbers();
        vm.connections = ProspectsService.connectionsNum
    }
})// end controller