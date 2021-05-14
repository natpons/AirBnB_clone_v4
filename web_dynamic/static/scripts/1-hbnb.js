// specify a function to execute when the DOM is fully loaded
$(document).ready(function () {
  const amenities = {};
  $('input[type=checkbox]').click(function () {
    // iterate over a jQuery object, executing a function for each matched element
    $(this).each(function () {
      // a state that tells us if a checkbox is checked or not
      if (this.checked) {
        // get the value of an attribute for the first element in the set of matched elements
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        // delete object['property']
        delete amenities[$(this).attr('data-id')];
      }
    });
    // returns an array of a given object's own property values
    $('.amenities h4').text(Object.values(amenities));
  });
});
