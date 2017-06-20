

/*angular.module('ngRouteExample',['ngRoute'])
    .config(['$routeProvider', function($routeProvider){
        $routeProvider
            .when('/',{templateUrl: 'Welcome.html'})
            .when('/article',{templateUrl: 'article.html',controller: 'siteCtrl'})
            .when('/new_article',{templateUrl: 'new_article.html'})
            .otherwise({redirectTo:'/'})
    }]);*/
/*angular.module("ngRouteExample", [])*/




angular.module("ngRouteExample", ["ui.router"])
    .config(
        function($stateProvider, $urlRouterProvider){
            $urlRouterProvider.when("", "/Welcome");
            $stateProvider
            //.state("状态",{url : "URL路径", templateUrl : "html"})
                .state("Welcome",{url : "/Welcome", templateUrl : "Welcome.html"})
                .state("article",{url : "/article", templateUrl : "article.html",controller:"siteCtrl"})
                .state("new2", {url : "/new2", templateUrl : "new_article.html"})
        }
    )
/*    .controller('siteCtrl', function($scope, $http,$filter) {


 }
)*/
  /*  .controller('siteCtrl',['$scope','$http','$filter',function($scope,$http,$filter){
        $http.get("/carrots-admin-ajax/a/article/search ")
            .success(function (response) {$scope.list = response.data.articleList;});
        $scope.search=function(){
            console.log($scope.sta);
            console.log($scope.list.length);
            var $listStatus=[];
            for(i=0;i<$scope.list.length;i++){
                $listStatus[i]=$scope.list[i].status;
            }
            console.log($listStatus);
            $scope.list=$filter("filter")($listStatus,"1")
        }
    }])*/
    .controller('siteCtrl', function($scope,$http) {
        $scope.size="8";   //初始默认值，每页显示5条，当前为第一页。
        $scope.page="1";
        $scope.type="";    //日类型和状态赋值为空
        $scope.sta="";
        $scope.startDate="";  //起始日期赋值为空
        $scope.endDate="";
        //起始日期不为空时，将其转换为数字格式日期。



        $scope.enterPage=function(){


            if($scope.startDate!=""){$scope.startDate=new Date($scope.startDate).getTime()}
            if($scope.endDate!=""){$scope.endDate=new Date($scope.endDate).getTime()}
            //根据接口要求进行传参
        $http.get("/carrots-admin-ajax/a/article/search?" + "page=" +$scope.page + "&size="+$scope.size + "&type="+$scope.type+ "&status="+$scope.sta+ "&startAt="+$scope.startDate+ "&endAt="+$scope.endDate)
            .success(
                function (response) {
                    $scope.list = response.data.articleList;
                    $scope.page_x=response.data.page;
                    //分页，取总行数与设置的单页行数比值上浮并转换为数组长度的数值。
                    $scope.pageTotal=new Array(Math.ceil(response.data.total/response.data.size));
                    for(var i=0;i<$scope.pageTotal.length;i++){$scope.pageTotal[i]=i;}  //任意赋值为不相同数值，repeat要求
                    var aaa=document.getElementsByClassName("page")[$scope.page_x-1]
                    var bbb=document.getElementsByClassName("page")
                    angular.element(aaa).addClass('backBlue')
                    angular.element(aaa).siblings().removeClass('backBlue')
        })

           /* function Ctr($scope) {
                /!*if($scope.page==$scope.list.page){$scope.isActive = true;}
                 }
                 console.log($scope.page==$scope.list.page)*!/*/
        }
        $scope.pageNum=function () {
            $scope.page=event.target.innerHTML; //取当前点击跳转的页面内 内容为设置页面，并跳转
            $scope.enterPage();
        }
        //非首页情况下，跳转到前面一页。
        $scope.prevPage=function () {
            if($scope.page>1){
            $scope.page=$scope.page-1;
            $scope.enterPage();
        }}
        //非末页情况下，跳转到后一页。
        $scope.backPage=function () {
            if($scope.page<$scope.pageTotal.length){
            console.log($scope.page);
            $scope.page=Number($scope.page) + 1;
            $scope.enterPage();
        }}
        $scope.enterPage();
        $scope.search=function () {
            $scope.enterPage();
        }
        //起始赋值为空
        $scope.clear=function () {
            $scope.type="";
            $scope.sta="";
            $scope.startDate="";
            $scope.endDate="";
            $scope.enterPage();
        }
        //首页、尾页跳转，非自身情况下。
        $scope.firstPage=function () {
            if($scope.page!=1){
                console.log($scope.page);
                $scope.page=1;
                $scope.enterPage();
            }}
        $scope.lastPage=function () {
            if($scope.page!=$scope.pageTotal.length){
                console.log($scope.page);
                $scope.page=$scope.pageTotal.length;
                $scope.enterPage();
            }}
    })

    .filter("changeType",function () {
        return function (type){
            var listType="";
            switch (type){
                case 0:listType="首页banner";break;
                case 1:listType="找职位banner";break;
                case 2:listType="找精英banner";break;
                case 3:listType="行业大图";break;
            }
            return listType;
        }
    })
    .filter("changeStatus",function(){
        return function (status){
            var listStatus="";
            switch (status){
                case 2:listStatus="上线";break;
                case 1:listStatus="草稿";break;
            }
            return listStatus;
        }
    })



