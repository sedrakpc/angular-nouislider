angular-nouislider
==================

Simple angular directive for jquery [nouislider](http://refreshless.com/nouislider/) plugin.

### Usage:

- Add `jquery`, `angular`, `nouislider` and `angular-nouislider` to your code:

```html
<link rel="stylesheet" href="bower_components/nouislider/jquery.nouislider.css" />
<script src="bower_components/jquery/jquery.js"></script>
<script src="bower_components/angular/angular.js"></script>
<script src="bower_components/nouislider/jquery.nouislider.js"></script>
<script src="bower_components/nouislider/Link.js"></script>
<script src="bower_components/angular-nouislider/src/nouislider.js"></script>
```

- Add a dependency to the `nouislider` module in your application.

```js
angular.module('MyApp', ['nouislider']);
```

- Add a `slider` attribute to your `<div>` tag:

```html
<div slider ng-model="test.single" start=1 end=10></div>
<div slider ng-from="test.from" ng-to="test.to" start=0 end=100 step=5></div>
```

- All attributes(`start`,`end`,`ng-from`,`ng-to`,`ngModel`,`step`) except `margin` can be changed dynamically
