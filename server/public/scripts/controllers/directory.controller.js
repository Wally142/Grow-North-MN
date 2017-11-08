myApp.controller('DirectoryController', function (ProspectsService, $scope, $mdDialog) {
    console.log('DirectoryController created');
    var vm = this;
    vm.directory = { list: [] };
    vm.approval = { list: [] };
    vm.profile = ProspectsService.profile;

    vm.getDirectory = function () {
        ProspectsService.getDirectory();
        vm.directory = ProspectsService.directory;
        console.log('directory controller hit with', vm.directory);
    };

    $scope.showProfile = function (ev, id) {
        console.log('showProfile called for user: ', id);
        vm.getProfile(id);
        console.log('prospect profile', vm.profile.list);
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

    function DialogController(ProspectsService, $scope, $mdDialog) {
        $scope.profile = ProspectsService.profile;
        $scope.commentIn = '';
        $scope.hide = function () {
            $mdDialog.hide();
        };
        $scope.answer = function (answer) {
            $mdDialog.hide(answer);
        };
        $scope.cancel = function () {
            $mdDialog.cancel();
        };
        $scope.delete = function (id) {
            console.log('delete account func called for user id: ', id);
            ProspectsService.deleteProfile(id);
            $mdDialog.cancel();
            vm.getDirectory();
        };
        $scope.updateComments = function(id, comment) {
            console.log('comment func called with id and comment: ', id, comment);
            ProspectsService.updateComments(id, comment);
            console.log('service comment', id, comment);
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

    vm.getProfile = function (id) {
        ProspectsService.getProfile(id);
        vm.profile = ProspectsService.profile;
    };

    // vm.updateComments = function (id, comment) {
    //     console.log('comment func called with id and comment: ', id, comment);        
    //     ProspectsServices.updateComments(id, comment);
    //     console.log('service comment', id, comment);
    // }
}); // end controller