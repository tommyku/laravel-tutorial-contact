var count = 20;
var app = angular.module("contact", []);

app.controller("mainCtrl", function($scope, $http) {
    $scope.inDesktop = (document.body.clientWidth >= 768);
    $scope.listInactive = true;
    $scope.contact = {
        contacts: [],
        getList: function() {
			$http({method: 'GET', url: "contacts"}).
				success(function(data, status, headers, config) {
                    $scope.contact.init();
                    angular.forEach(
                        data, 
                        function(val) {
                            var index = $scope.contact.ALPHA.indexOf(val.name.charAt(0).toUpperCase());
                            if (index != -1) {
                                $scope.contact.contacts[index].list.push(val);
                            }
                        },
                        $scope.contact.contacts
                    );
				}).
				error(function(data, status, headers, config) {
					console.error(data);
				});
        },
		open: function(id) {
            $scope.listInactive = true;
			$http({method: 'GET', url: "contact/"+id}).
				success(function(data, status, headers, config) {
                    $scope.display = data;
                    $scope.display.compose = false;
				}).
				error(function(data, status, headers, config) {
					console.error(data);
				});
		},
        post: function() {
			$http.defaults.transformRequest = [function(data) {
				return angular.isObject(data) && String(data) !== '[object File]' ? param(data) : data;
			}];
            

			var data = $scope.display;
            console.log(data);

            $http.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=utf-8';
            $http.post('contact', data).
            success(function(data, status, headers, config) {
                console.log(data);
                $scope.contact.getList();
                $scope.contact.open(data.id);
            }).
            error(function(data, status, headers, config) {
                if (status == 500) {
                    $scope.error = data;
                }
            });
        },
        delete: function(id) {
			$http({method: 'DELETE', url: "contact/"+id}).
				success(function(data, status, headers, config) {
                    console.log(data);
				}).
				error(function(data, status, headers, config) {
					console.error(data);
				});
        },
		make: function() {
            $scope.listInactive = true;
			$scope.display = {
                photo: "https://p.pfx.ms/ic/bluemanmxxl.png",
                name: "",
                tel: "",
                email: "",
                address: "",
                compose: true
			};
		},
        init: function() {
            for (var i=0; i<$scope.contact.ALPHA.length; ++i) {
                $scope.contact.contacts[i] = {
                    label: $scope.contact.ALPHA.charAt(i),
                    list: []
                };
            }
        },
        ALPHA: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
	};
    
    /*
    $scope.callAPI = function() {
        $.ajax({
          url: 'http://api.randomuser.me/',
          dataType: 'json',
          success: function(data){
            count--;
            var user = data["results"][0]["user"];
            var index = $scope.contact.ALPHA.indexOf(user.name.first.charAt(0).toUpperCase());
            var val = {
                name: user.name.first+' '+user.name.last,
                email: user.email,
                tel: user.phone,
                address: user.location.street+' '+user.location.city+' '+user.location.state,
                photo: user.picture,
                id: 0
            }
            console.log(
                "INSERT INTO contact (name,email,tel,address,photo) VALUES ('"+val.name+"','"+val.email+"','"+val.tel+"','"+val.address+"','"+val.photo+"')"
            );
            if (index != -1) {
                $scope.contact.contacts[index].list.push(val);
            }
            
            $scope.$apply();
            if (count) {
                $scope.callAPI();
            }
          }
        });
    };
    */
    
    
    $scope.display = {
        photo: "https://p.pfx.ms/ic/bluemanmxxl.png",
        name: "",
        tel: "",
        email: "",
        address: "",
        compose: true
    };
    
    // $scope.contact.init();
    // $scope.callAPI();
    $scope.contact.getList();
});

var inDesktop = window.matchMedia("(min-width:768px)"); // desktop
//Add a listener to the MediaQueryList
inDesktop.addListener(function(e){
	var $theScope = angular.element(document.querySelector('[ng-controller=mainCtrl]')).scope();
	if(e.matches){
		$theScope.$apply(function() {
			$theScope.inDesktop = true;
		});
	}
	else {
		$theScope.$apply(function() {
			$theScope.inDesktop = false;
		});
	}
});

var param = function(obj) {
	var query = '', name, value, fullSubName, subName, subValue, innerObj, i;

	for(name in obj) {
	  value = obj[name];

	  if(value instanceof Array) {
		for(i=0; i<value.length; ++i) {
		  subValue = value[i];
		  fullSubName = name + '[' + i + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value instanceof Object) {
		for(subName in value) {
		  subValue = value[subName];
		  fullSubName = name + '[' + subName + ']';
		  innerObj = {};
		  innerObj[fullSubName] = subValue;
		  query += param(innerObj) + '&';
		}
	  }
	  else if(value !== undefined && value !== null)
		query += encodeURIComponent(name) + '=' + encodeURIComponent(value) + '&';
	}

	return query.length ? query.substr(0, query.length - 1) : query;
};
