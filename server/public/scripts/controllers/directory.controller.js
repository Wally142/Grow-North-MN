myApp.controller('DirectoryController', function (ProspectsService, $http, $scope, $mdDialog) {
    console.log('DirectoryController created');
    $scope.currentNavItem = 'directory'; // tells nav bar which item to indicate as 'selected'
    var vm = this;
    vm.directory = {
        list: []
    };
    vm.approval = {
        list: []
    };
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
        $scope.connections = ProspectsService.connections;

        $scope.commentIn = '';
        // holds true/false values for ng-shows
        $scope.editBoolean = {};
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

        $scope.updateComments = function (id, comment) {
            console.log('comment func called with id and comment: ', id, comment);
            ProspectsService.updateComments(id, comment);
            $scope.editBoolean.comments = !$scope.editBoolean.comments;
        };

        $scope.updateDetails = function (id, details, column) {
            console.log('update details with', id, details, column);
            ProspectsService.updateDetails(id, details, column);
            $scope.editBoolean[column] = !$scope.editBoolean[column];
        };
        $scope.showEdit = function (input) {
            $scope.editBoolean[input] = !$scope.editBoolean[input];
            console.log('$scope.editBoolean: ', $scope.editBoolean[input]);
        };

        $scope.addConnection = function () {
            console.log('you clicked me!');
        };


        $scope.getSearch = function () {

            $scope.searchTextChange = function (text) {
                console.log('Text changed to', text);
            };

            $scope.selectedItemChange = function (item) {
                console.log('Item changed to', item);
            };

            $scope.loadAll = function () {
                // var allListings = "Greg, Cam, Mike, Katie, Evan, Nestor";
                var list = [];
                console.log('DIRECTORY:', vm.directory.list);
                for (var i = 0; i < vm.directory.list.length; i++) {
                    list.push(vm.directory.list[i].firstname + ' ' + vm.directory.list[i].lastname);
                }
                console.log('LIST:', list);
                var allListings = list.map(function (name) {
                    return {
                        value: name.toLowerCase(),
                        display: name
                    };
                });
                return allListings;
            };

            $scope.createFilterFor = function (query) {
                var lowerCaseQuery = angular.lowercase(query);
                return function filterFn(listing) {
                    return (listing.value.indexOf(lowerCaseQuery) === 0);
                };
            };

            $scope.querySearch = function (query) {
                if (query) {
                    var results = query ? $scope.listings.filter($scope.createFilterFor(query)) : $scope.listings;
                    return results;
                } else {
                    return [];
                }
            };

            $scope.listings = $scope.loadAll();
            // vm.searchText = "";
        };
    }

    vm.delete = function (id) {
        ProspectsService.deleteApproval(id);
    };

    vm.approve = function (id, status) {
        ProspectsService.updateApproval(id, status);
        console.log('you clicked me!', id, status);
    };

    vm.getApproval = function () {
        ProspectsService.getApproval();
        vm.approval = ProspectsService.approval;
        console.log('directory controller hit with', vm.approval);
    };

    // vm.getSearch = function () {

    //     vm.searchTextChange = function (text) {
    //         console.log('Text changed to', text);
    //     };

    //     vm.selectedItemChange = function (item) {
    //         console.log('Item changed to', item);
    //     };

    //     vm.loadAll = function () {
    //         // var allListings = "Greg, Cam, Mike, Katie, Evan, Nestor";
    //         var list = [];
    //         console.log('DIRECTORY:', vm.directory.list);
    //         for (var i = 0; i < vm.directory.list.length; i++) {
    //             list.push(vm.directory.list[i].firstname + ' ' + vm.directory.list[i].lastname);
    //         }
    //         console.log('LIST:', list);
    //         var allListings = list.map(function (name) {
    //             return {
    //                 value: name.toLowerCase(),
    //                 display: name
    //             };
    //         });
    //         return allListings;
    //     };

    //     vm.createFilterFor = function (query) {
    //         var lowerCaseQuery = angular.lowercase(query);
    //         return function filterFn(listing) {
    //             return (listing.value.indexOf(lowerCaseQuery) === 0);
    //         };
    //     };

    //     vm.querySearch = function (query) {
    //         if (query) {
    //             var results = query ? vm.listings.filter(vm.createFilterFor(query)) : [];
    //             return results;
    //         } else {
    //             return [];
    //         }
    //     };

    //     vm.listings = vm.loadAll();
    //     // vm.searchText = "";
    // };

    vm.getProfile = function (id) {
        ProspectsService.getProfile(id);
        vm.profile = ProspectsService.profile;
    };

    vm.getComments = function (id, comment) {
        ProspectsServices.updateComments(id, comment);
        console.log('service comment', id, comment);
    };

}); // end controller