$('.btn.edit-address').click(function () {
  $(this).hide()
  $(this).parents('td').siblings('.address-edit').show()
  $(this).siblings('.btn.edit-address-cancel').show()
  $(this).siblings('.btn.edit-address-submit').show()
  $(this).siblings('.btn.delete-address').hide()
  $(this).parents('td').siblings('.address-record').hide()
})

$('.btn.edit-address-submit').click(function () {
  $(this).hide()
  $(this).parents('td').siblings('.address-edit').hide()
  $(this).siblings('.btn.edit-address-cancel').hide()
  $(this).siblings('.btn.edit-address').show()
  $(this).siblings('.btn.delete-address').show()
  $(this).parents('td').siblings('.address-record').show()
})

$('.btn.edit-address-cancel').click(function () {
  $(this).hide()
  $(this).parents('td').siblings('.address-edit').hide()
  $(this).siblings('.btn.edit-address-submit').hide()
  $(this).siblings('.btn.edit-address').show()
  $(this).siblings('.btn.delete-address').show()
  $(this).parents('td').siblings('.address-record').show()
})

$('.carousel').carousel()

$('.single-product-images').slick({
  slidesToShow: 1,
  slidesToScroll: 1,
  dots: true,
  customPaging: function (slider, i) {
    var thumb = $(slider.$slides[i]).data('thumb')
    return `<a><img class="img-fluid" src=${thumb} /></a>`
  },
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 3,
        infinite: true,
        dots: true,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
})

function getVariantFromOptions() {
  let variantArr = []
  $('.product-category select').map(function (i, el) {
    variant = { value: $(el).val(), index: $(el).data('index') }
    variantArr.push(variant)
  })
  return variantArr
}

function updateHistoryState(variant) {
  if (!history.replaceState || !variant) {
    return
  }

  var newurl =
    window.location.protocol +
    '//' +
    window.location.host +
    window.location.pathname +
    '?variant=' +
    variant.id

  window.history.replaceState({ path: newurl }, '', newurl)
}

$('.product-category select').on('change', function () {
  var selectedValues = getVariantFromOptions()
  var variants = window.product.variants

  // Search for product variants based on what was selected in the dropdowns
  var found = _.find(variants, function (variant) {
    return selectedValues.every(function (values) {
      return _.isEqual(variant[values.index], values.value)
    })
  })
  updateHistoryState(found)
  $('#variant-id').val(found.id)
})
