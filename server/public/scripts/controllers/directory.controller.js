myApp.controller('DirectoryController', function (ProspectsService) {
    console.log('DirectoryController created');
    var vm = this;
    vm.directory = {list: []};

    vm.getDirectory = function (){
        ProspectsService.getDirectory();
        vm.directory = ProspectsService.directory;
        console.log('directory controller hit with', vm.directory);
    };
}); // end controller