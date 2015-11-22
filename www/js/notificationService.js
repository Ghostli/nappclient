angular.module('notepadApp').service('Notification', function($q, $cordovaToast) {
  return {
    show: function(message) {
      try{
          $cordovaToast.show(message, 'short', 'top');
      }catch(err){
          alert(message);
      }
    }
  };
});
