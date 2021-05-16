$(document).ready(function () {
  const amenities = {};
  $('input[type=checkbox]').click(function () {
    $(this).each(function () {
      if (this.checked) {
        amenities[$(this).attr('data-id')] = $(this).attr('data-name');
      } else {
        delete amenities[$(this).attr('data-id')];
      }
    });
    $('.amenities h4').text(Object.values(amenities));
  });

  $.get('http://0.0.0.0:5001/api/v1/status/', function (data, textStatus) {
    if (textStatus === 'success') {
      if (data.status === 'OK') {
        $('DIV#api_status').addClass('available');
      } else {
        $('DIV#api_status').removeClass('available');
      }
    }
  }
  );

  $.ajax({
    type: 'POST',
    url: 'http://0.0.0.0:5001/api/v1/places_search',
    data: '{}',
    dataType: 'json',
    contentType: 'application/json',
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        const place = data[i];
        const str = '<article><h2>' +
          place.name +
          '</h2><div class="price_by_night"><p>$' +
          place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
          place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
          place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
          place.number_bathrooms + '</p></div></div><div class="description"><p>' +
          place.description + '</p></div></article>';
        $('section.places').append(str);
      }
    }
  });

  $('section.filters > button').click(function () {
    $('section.places > article').remove();
    $.ajax({
      type: 'POST',
      url: 'http://0.0.0.0:5001/api/v1/places_search',
      data: JSON.stringify({ amenities: Object.keys(amenities) }),
      dataType: 'json',
      contentType: 'application/json',
      success: function (data) {
        for (let i = 0; i < data.length; i++) {
          const place = data[i];
          const str = '<article><h2>' +
            place.name +
            '</h2><div class="price_by_night"><p>$' +
            place.price_by_night + '</p></div><div class="information"><div class="max_guest"><div class="guest_image"></div><p>' +
            place.max_guest + '</p></div><div class="number_rooms"><div class="bed_image"></div><p>' +
            place.number_rooms + '</p></div><div class="number_bathrooms"><div class="bath_image"></div><p>' +
            place.number_bathrooms + '</p></div></div><div class="description"><p>' +
            place.description + '</p></div></article>';
          $('section.places').append(str);
        }
      }
    });
  });
});
