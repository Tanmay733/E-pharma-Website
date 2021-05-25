// check input for value; float label

var inputs = document.querySelectorAll('input[type="text"]');
var form = document.getElementById('address-form');

function labelUp(input) {
  var _this = input;
  if (_this.classList.contains('open')) {
    return;
  }
  _this.classList.add('open');
}

function labelDown(input) {
  var _this = input;
  if (_this.classList.contains('open') && !_this.value) {
    _this.classList.remove('open');
  }
}

form.addEventListener('input', function(e) {
  if (e.target.tagName === "INPUT") {
    labelUp(e.target);
  }
}, false);

for (var i = 0, l = inputs.length; i < l; i++) {
  inputs[i].addEventListener('blur', function(e) {
      labelDown(e.target);
  }, false);
}