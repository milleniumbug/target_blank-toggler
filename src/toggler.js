(function(){
  var toggleLinksTargetBlank = function(isToggled) {
    var dataAttr = 'data-initial-target-blank';
    var $links = document.getElementsByTagName('a');
    for (var i=0; i<$links.length; i++) {
      var $link = $links[i];
      if (isToggled) {
        $link.setAttribute(dataAttr, $link.getAttribute(dataAttr) || ($link.getAttribute('target') === '_blank'));
      }
      if (($link.getAttribute(dataAttr) === 'true') === isToggled) {
        $link.removeAttribute('target');
      } else {
        $link.setAttribute('target', $link.getAttribute('target') || '_blank');
      }
      if (!isToggled) {
        $link.removeAttribute(dataAttr);
      }
    }
  };

  var needsToggle = function(e) {
    return e.which === 88;
  };

  if (document.documentElement.classList.contains('link-toggler')) {
    console.log('Behavior already loaded on website')
    return;
  }

  document.addEventListener('keydown', function(downEvent){
    if (needsToggle(downEvent)) {
      if (downEvent.repeat) {
        // Necessary otherwise target="_blank" is not effective
        downEvent.preventDefault();
      } else {
        toggleLinksTargetBlank(true);
        var onceListener = function(upEvent) {
          console.log('Reset state');
          window.removeEventListener('blur', onceListener);
          document.removeEventListener('keyup', onceListener);
          toggleLinksTargetBlank(false);
        };
        // Deactivate either on keyup or on blur to go to new window
        document.addEventListener('keyup', onceListener);
        window.addEventListener('blur', onceListener);
      }
    }
  });
})();
