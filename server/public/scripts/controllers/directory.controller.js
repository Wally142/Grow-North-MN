myApp.controller('DirectoryController', function (ProspectsService, $scope, $mdDialog) {
    console.log('DirectoryController created');
    var vm = this;
    vm.directory = { list: [] };
    vm.approval = { list: [] };
    vm.testObj = {
        list: 'this is a string'
    };

    vm.getDirectory = function () {
        ProspectsService.getDirectory();
        vm.directory = ProspectsService.directory;
        console.log('directory controller hit with', vm.directory);
    };

    vm.showAlert = function (prospectId) {
        console.log('alert func called with id: ', prospectId);
        // call getProspectInfo func

        $mdDialog.show(
            $mdDialog.alert()
                .title('This is an alert... !!')
                .textContent('Description of prospect goes here')
                .ok('Close')
                .clickOutsideToClose(true)
        );
    };

    $scope.showAdvanced = function (ev, prospectData) {
        console.log('showAdvanced called for user: ', prospectData);

        $mdDialog.show({
            controller: DialogController,
            templateUrl: '/views/templates/prospect.html',
            parent: angular.element(document.body),
            targetEvent: ev,
            clickOutsideToClose: true,
            fullscreen: $scope.customFullscreen // Only for -xs, -sm breakpoints.
        })
        .then(function (answer) {
            $scope.status = 'You said the information was "' + answer + '".';
        }, function () {
            $scope.status = 'You cancelled the dialog.';
        });
    };

    function DialogController($scope, $mdDialog) {
        $scope.hide = function () {
            $mdDialog.hide();
        };

        $scope.cancel = function () {
            $mdDialog.cancel();
        };

        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
    };

    vm.getApproval = function () {
        ProspectsService.getApproval();
        vm.approval = ProspectsService.approval;
        console.log('directory controller hit with', vm.approval);
    };

    vm.delete = function (id) {
        ProspectsService.deleteApproval(id);
    };

    vm.approve = function (id, status) {
        ProspectsService.updateApproval(id, status);
        console.log('you clicked me!', id, status);

    };
}); // end controller