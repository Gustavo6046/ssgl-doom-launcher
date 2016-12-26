(function() {
  app.directive('importChoose', ['nwService', '$mdToast', 'configService', function(nwService, $mdToast, configService) {
    return {
      restrict: 'AE',
      replace: 'true',
      scope: {
        wdir: '=?',
        kind: '@',
        label: '@'
      },

      template: '<div><input class="fileDialog" nwworkingdir="{{wdir}}" type="file" style="display:none;"><md-button style="width: 100%" class="fileBtn md-accent" ng-click="openDialog()"><i class="mdi mdi-arrow-down-bold-hexagon-outline"></i>{{label}}</md-button></div>',

      link: function($scope, elem) {
        $scope.wdir = nwService.execpath;

        var z = elem[0].querySelector('.fileDialog');

        z.addEventListener('change', function() {
          if (this.value !== '') {
            nwService.readJSON(this.value).then(function(obj) {
              if ($scope.kind === 'config') {
                configService.importConfig(obj);
              } else {
                configService.importSourceports(obj);
              }
            }, function(err) {
              $mdToast.show(
                $mdToast.simple().content(err).position('bottom').hideDelay(2000)
              );
            });
          }
        }, false);

        $scope.openDialog = function() {
          z.click();
        };
      }
    };
  }]);
})();
