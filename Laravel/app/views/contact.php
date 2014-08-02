<!DOCTYPE html>
<html ng-app="contact">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1" />
	
	<title>Contact - easy contact list</title>

	<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=0" />  
	<meta name="description" content="" />
	<meta name="author" content="Tommy Ku" />

    <script type="text/javascript" src="http://code.jquery.com/jquery-1.11.1.js"></script>
	<script type="text/javascript" src="js/angular.min.js"></script>
	<script type="text/javascript" src="js/contact.js"></script>

	<link rel="shortcut icon" href="" />
	<link rel="apple-touch-icon" href="" />

	<link rel="stylesheet" href="css/lemonade.css" />
	<link rel="stylesheet" href="css/base.css" />
	
	<link rel="stylesheet" href="css/mobile.css" media="only screen and (max-width : 768px)"> <!-- tablet and below -->
</head>
<body ng-controller="mainCtrl">
	<header>
		<div id="footerDiv">
            <span class="line-wrap" ng-show="!inDesktop && listInactive" ng-click="listInactive = !listInactive">
                &lt; Open list
            </span>
            <span class="line-wrap" ng-show="!inDesktop && !listInactive" ng-click="listInactive = !listInactive">
                Close list &gt;
            </span>
			Contact is a creepy web app by Tommy Ku.
		</div>
	</header>
    
	<div id="content" class="frame">
		<div class="bit-5 contactList {{(!inDesktop && listInactive) ? 'contactListDisable' : ''}}">
			<a class="compose {{(display.compose) ? 'active' : ''}}" ng-click="contact.make()">New</a>
            <div ng-repeat="l in contact.contacts">
                <h3 class="label">{{l.label}}</h3>
                <ul class="list">
                    <li ng-repeat="c in l.list | orderBy:'name':true" class="{{(c.id==display.id) ? 'active' : ''}}" ng-click="contact.open(c.id);">{{c.name}}</li>
                </ul>
            </div>
		</div>
		<div class="bit-4-5 contactContent">
            <div class="frame">
                <div class="bit-4 photo">
                    <img class="avatar" ng-src="{{display.photo}}" title="{{display.name}}" />
                </div>
                <div class="bit-3-4">
                    <div class="details" ng-show="!display.compose">
                        <dl>
                            <dt>Name</dt>
                                <dd>{{display.name}}</dd>
                            <dt>Telephone</dt>
                                <dd>{{display.tel}}</dd>
                            <dt>Email</dt>
                                <dd>{{display.email}}</dd>
                            <dt>Address</dt>
                                <dd>{{display.address}}</dd>
                        </dl>
                    </div>
                    <div ng-show="display.compose">
                        <p><input type="text" class="input" name="name" placeholder="name" value="" ng-model="display.name" /></p>
                        <p><input type="text" class="input" name="phone" placeholder="phone" value="" ng-model="display.tel" /></p>
                        <p><input type="text" class="input" name="email" placeholder="email" value="" ng-model="display.email" /></p>
                        <p><input type="text" name="address" class="input" placeholder="address" value="" ng-model="display.address" /></p>
                        <p><input type="text" class="input" name="image" placeholder="photo url" value="" ng-model="display.photo" /></p>
                        <br />
                        <p><a href="#" class="submit" ng-click="contact.post();">Submit</a></p>
                    </div>
                </div>
            </div>
 		</div>
	</div>

</body>
</html>