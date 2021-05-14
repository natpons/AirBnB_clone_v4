// Specify a function to execute when the DOM is fully loaded
$(document).ready(function () {
  const amenities = {};
  $('input[type=checkboxclear]').click(function () {
    // Iterate over a jQuery object, executing a function for each matched element
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this).data('id')] = $(this).data('name');
      } else {
        delete amenities[$(this).data('id')];
      }
    });
    // Method returns an array of a given object's own property values
    if (Object.values(amenities).length > 0) {
      $('.amenities h4').text(Object.values(amenities).join(', '));}
    else {
      $('.amenities h4').html('&nbsp'); 
    }  
  });
});
