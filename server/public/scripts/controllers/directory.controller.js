myApp.controller('DirectoryController', function (ProspectsService) {
    console.log('DirectoryController created');
    var vm = this;
    vm.directory = {list: []};
    vm.approval = {list:[]};

    vm.getDirectory = function (){
        ProspectsService.getDirectory();
        vm.directory = ProspectsService.directory;
        console.log('directory controller hit with', vm.directory);
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
}); // end controller