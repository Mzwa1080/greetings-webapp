document.addEventListener('DOMContentLoaded', function() {
  //--------ELEMENTS/REFERENCING-------
  var elems = document.querySelectorAll('.collapsible');
  var modal = document.querySelectorAll('.modal');


  // ---GETTING-----
  var instances = M.Collapsible.init(elems);
  var instances = M.Modal.init(modal);

})
