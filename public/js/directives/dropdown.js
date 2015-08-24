app.directive('dropDown', function() {
  return {
    restrict: 'A',
    link: function(scope, element, attrs) {
      element.bind('click', function() {
        if(element.attr("class") === "glyphicon glyphicon-collapse-down") {
          element.removeClass("glyphicon glyphicon-collapse-down");
          element.addClass("glyphicon glyphicon-collapse-up");
        } else {
          element.removeClass("glyphicon glyphicon-collapse-up");
          element.addClass("glyphicon glyphicon-collapse-down");
        }
      });
    }
  };
});
