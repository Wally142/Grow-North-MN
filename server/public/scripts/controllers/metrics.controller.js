myApp.controller('MetricsController', function (ProspectsService) {
    console.log('MetricsController created');
    var vm = this;
    vm.mentorNum = ProspectsService.mentorNum;
    vm.menteeNum = ProspectsService.menteeNum;


    vm.getMentorNumbers = function (){
        ProspectsService.getMentorNumbers()
        console.log('metrics controller hit with', vm.mentorNum)
    }

    vm.getMenteeNumbers = function () {
        ProspectsService.getMenteeNumbers()
        console.log('metrics controller hit with', vm.menteeNum)
    }







})// end controller