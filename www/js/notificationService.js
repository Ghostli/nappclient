angular.module('notepadApp').service('Notification', function($q, $cordovaToast) {
  return {
    show: function(message) {
      try{
          $cordovaToast.show(message, 'top', 'short');
      }catch(err){
          alert(message);
      }
    }
  };
});
