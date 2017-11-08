myApp.controller('DirectoryController', function (ProspectsService, $http) {
    console.log('DirectoryController created');
    var vm = this;
    vm.directory = {list: []};
    vm.approval = {list:[]};

    vm.getDirectory = function (){
        ProspectsService.getDirectory();
        vm.directory = ProspectsService.directory;
        console.log('directory controller hit with', vm.directory);
    };

    vm.showInfo = function(){
        alert('Yo!');
    };
    
    vm.getApproval = function() {
        ProspectsService.getApproval();
        vm.approval = ProspectsService.approval;
        console.log('directory controller hit with', vm.approval);  
    };

    vm.delete = function(id) {
        ProspectsService.deleteApproval(id);
    };

    vm.approve = function(id, status) {
        ProspectsService.updateApproval(id, status);
        console.log('you clicked me!', id, status);
    };

    // vm.query = function(searchText) {
    //     return $http.get('/directory').then(function(result){
    //         var list = [];
    //         for (var i = 0; i < result.data.length; i++){
    //             list.push(result.data[i].firstname + ' ' + result.data[i].lastname);
    //         }
    //         return list;
    //     })
    // }

    // search functions

    
    // function querySearch (query) {
    //     var results = query ? self.listings.filter( createFilterFor(query) ) : self.listings,
    //         deferred;
    //     if (self.simulateQuery) {
    //       deferred = $q.defer();
    //       $timeout(function () { deferred.resolve( results ); }, Math.random() * 1000, false);
    //       return deferred.promise;
    //     } else {
    //       return results;
    //     }
    //   }

    


      
    vm.getSearch = function(){
        
        vm.searchTextChange = function(text) {
            console.log('Text changed to', text);
        };

        vm.selectedItemChange = function(item) {
            console.log('Item changed to', item);
        };

        vm.loadAll = function() {
            // var allListings = "Greg, Cam, Mike, Katie, Evan, Nestor";
            var list = [];
            console.log('DIRECTORY:', vm.directory.list);
            for (var i = 0; i < vm.directory.list.length; i++){
                list.push(vm.directory.list[i].firstname + ' ' + vm.directory.list[i].lastname);
            }
            console.log('LIST:', list);
            var allListings = list.map(function(name){
                return {
                    value: name.toLowerCase(),
                    display: name
                };
            });
            return allListings;
        };

        vm.createFilterFor = function(query) {
            var lowerCaseQuery = angular.lowercase(query);
            return function filterFn(listing) {
                return (listing.value.indexOf(lowerCaseQuery) === 0);
            };
        };
    
        vm.querySearch = function(query) {
            if (query) {
                var results = query ? vm.listings.filter( vm.createFilterFor(query) ) : vm.listings;
                return results;
            } else {
                return [];
            }
          };

        vm.listings = vm.loadAll();
        // vm.searchText = "";
    };
    
}); // end controller