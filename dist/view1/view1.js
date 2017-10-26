'use strict';

var view1app = angular.module('myApp.view1', ['ngRoute']);

view1app.config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }]);

view1app.controller('View1Ctrl', ['$scope','$http',function($scope, $http) {

    // $http.get("/data/employeeSummary.json").success(function(data) {
    //     $scope.employeeList = data;
    // });

    $http({
        method: 'GET',
        url: 'data/employeeSummary.json'
    }).then(function successCallback(response) {
        // 请求成功执行代码
        console.log(response);
        $scope.employeeList = response.data;
    }, function errorCallback(response) {
        // 请求失败执行代码
        console.log('failed to get data');
    });

    console.log('size='+$scope.employeeList);
    for(var it in $scope.employeeList) {
        console.log(it.firstName);
    }

        $scope.showBIO = function(it, id) {
            var orginalBIO = $('#tempBIO');
            if(orginalBIO.length>0) {
                console.log(orginalBIO.attr('name')+'f'+id);
                if (orginalBIO.attr('name')==id) {
                    orginalBIO.slideUp(1000);
                    orginalBIO.remove();
                    return;
                } else {
                    orginalBIO.remove();
                }
            }

            var biography = '<section id="synopsis"><h2>Who is '+it.firstName+' '+it.lastName+'?</h2><p>'+it.bio+'</p></section>';

            $("#tbl tr:eq("+(id+1)+")").after('<tr style="display:none;background-color: beige;" id="tempBIO" name="'+id+'"><td colspan="3"><div onclick="javascript:showAlertMessage('+it.id+');">'+biography+'</div></td></tr>');
            $("#tempBIO").toggle(1000);
            // var tempBIO=$("#tempBIO");
            // tempBIO.animate({height:'300px',opacity:'0.4'},"slow");
        };
    }]);

function showAlertMessage(employeeId) {
    $.get("data/employeeSummary.json",function(data,status){
        //alert("Get information by uri: " + data[employeeId-1].id + "\nStaus: " + status);

        $('#headphoto').attr('src','static/img/employee/'+data[employeeId-1].thumb);
        console.log($('#headphoto').attr('src'));

        layer.open({
            type: 1,
            title: false,
            closeBtn: 0,
            area: '310px',
            skin: '', //没有背景色
            shadeClose: true,
            content: $('#thumbdiv')
        });

        layer.msg('Action occurs when click contents. \n Show head photo by GET request.');
    });

    //alert(players[employeeId].bio);
    //alert(employeeId);
}