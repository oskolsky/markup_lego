//****************************************************************************************************
//
// .. INIT
//
//****************************************************************************************************
//
// .. DIALOGS
//
$.arcticmodal('setDefault', {
  overlay: {
    css: {
      backgroundColor: '#000',
      opacity: 0.66
    }
  },
  openEffect: {
    speed: 200
  },
  closeEffect: {
    speed: 200
  }
});

//
// .. ACCOUNTING
//
accounting.settings = {
  currency: {
    decimal: '.',
    thousand: ' ',
    precision: 0
  },
  number: {
    decimal : '.',
    thousand: ' ',
    precision: 0
  }
}



//****************************************************************************************************
//
// .. EVENTS
//
//****************************************************************************************************
//
// .. PROMO BLOCK ON HOME PAGE
//

//
// .. ARTICLE CLOSE
//
$(document).on('click', '.articles_i_show_close', function() {
  var $el = $(this).closest('.articles_i');
  $el.find('.articles_i_show').fadeOut(250, function() {
    $(this).remove();
    $el.find('.articles_i_announcement').fadeIn(250);
  });

  var destination = $el.offset().top;
  $('html, body').animate({scrollTop: destination}, 500);
  return false;
});

//
// .. PHOTO GALLERY LOAD NEW PHOTO
//
$(document).on('click', '.articles_i_show_gallery_add > a', function() {
  $('.articles_i_show_gallery').find('.articles_i_show_gallery_i').fadeIn();
  $(this).closest('.articles_i_show_gallery_add').remove();
  return false;
});

//
// .. OPEN DIALOG
//
$(document).on('click touchstart', '[data-dialog="true"]', function() {
  var url = $(this).data('url');
  var overlayclick = $(this).data('overlayclick');
  $.arcticmodal('close');
  if (overlayclick == false) {
    $.arcticmodal({
      type: 'ajax',
      url: url,
      closeOnOverlayClick: false,
      closeOnEsc: false,
      afterOpen: function() {

      },
      afterLoadingOnShow: function() {
        $('.form').customForm();
        $('.form_text.__phone').mask('+7 (999) 999-99-99');
      }
    });
  } else {
    $.arcticmodal({
      type: 'ajax',
      url: url,
      afterOpen: function() {

      },
      afterLoadingOnShow: function() {
        $('.form').customForm();
        $('.form_text.__phone').mask('+7 (999) 999-99-99');
      }
    });
  }


  return false;
});

//
// .. CLOSE DIALOG
//
$(document).on('click touchend', '.js-dialog_close', function() {
  $.arcticmodal('close');
});



//****************************************************************************************************
//
// .. READY
//
//****************************************************************************************************
$(function() {

  $('.form_text.__phone').mask('+7 (999) 999-99-99');
  $('.form_text.__card').mask('9999 9999 9999 9999');
  $('.form_text.__date').mask('99 д. 99 м. 9999 г.');

  $('.scroll-pane').jScrollPane();

  //
  // .. Autocomplete
  //
  var availableTags = [
      "Москва",
      "Воронеж",
      "Екатеринбург",
      "Краснодар",
      "Астрахань",
      "Белгород",
      "Волгоград",
      "Калининград",
      "Липецк",
      "Нижний Новгород",
      "Новосибирск",
      "Омск",
      "Оренбург",
      "Ростов на Дону",
      "Самара",
      "Саратов",
      "Сочи",
      "Сургут",
      "Тольяти",
      "Тула",
      "Пермь",
      "Рязань"
  ];
  $('#autocomplete').autocomplete({
    source: availableTags
  });  

  //
  // .. SUBSCRIPTION ACTION
  //
  $('.subscription-block_form_submit').on('click', function() {
    
    var $check = $(this).closest('.subscription-block_form').find('.form_checkbox.form_el.__real');
    
    if ($check.is(':checked')) {
      $.ajax({
        url: '#',
        data: {},
        success: function(response) {
          alert('AJAX submit form success!');
          $('.subscription-block_form').find('form').fadeOut(250, function() {
            $('.subscription-block_form').find('p').text('Спасибо, вы подписаны, или какой-нибудь другой текст!');
          });
        },
        error: function() {
          alert('Error send form');
        }
      });
    } else {
      alert('Необходимо подтвердить, что Вам больше 12 лет');
    }
    
    return false;
  });



  //
  // .. HOME PAGE SHARE
  //
  $('.share-block').find('.share-block_a').click(function() {
    $(this).fadeOut();
    return false;
  });

  //
  // .. CATALOG ITEM RESIZE
  //
  $('.catalog.__series').find('.catalog_row').each(function() {
    $(this).find('.catalog_i').resizeToMaxHeight();
  });

  //
  // .. CATALOG SHOW
  //
  $('.js-add-basket').click(function() {
    $(this).removeClass('__red').addClass('__green').text('Оформить');
    return false;
  });

  //
  // .. JOBS
  //
  $('.jobs-item_more').click(function() {
    var $el = $(this).closest('.jobs-item').find('.jobs-item_body');
    if ($el.is(':hidden')) {
      $el.slideDown();
    } else {
      $el.slideUp();
    }
    return false;
  });

  //
  // .. FAQ
  //
  $('.faq_i').find('.faq_i_open').click(function() {
    $(this).closest('.faq_i').addClass('__current');
    $(this).closest('.faq_i').find('.faq_i_answer').show();
    return false;
  });
  $('.faq_i').find('.faq_i_answer_close').click(function() {
    $(this).closest('.faq_i').removeClass('__current');
    $(this).closest('.faq_i').find('.faq_i_answer').hide();
    return false;
  });

  //
  // .. ARTICLE SHOW & CLOSE
  //
  $('.js-articles_i_caption_more').click(function() {
    var _this = this;
    var
        url = $(this).data('url'),
        itemID = $(this).attr('href');
    window.location.hash = itemID;
    $.ajax({
      url: url,
      success: function(response) {
        $(_this).closest('.articles_i_announcement').hide();
        $(_this).closest('.articles_i_announcement').after(response);
        $(_this).closest('.articles_i').find('.articles_i_show').fadeIn(250);
      },
      error: function() {
        alert('Error load resources');
      }
    });
    return false;
  });

  //
  // .. PHOTO GALLERY ON STORES PAGE
  //
  $('.stores_photos').each(function() {
    var _this = this;
    $(this).find('.stores_photos_thumb_i').click(function() {
      var src = $(this).attr('href');
      $(_this).find('.stores_photos_thumb_i.__current').removeClass('__current');
      $(this).addClass('__current');
      $(_this).find('.stores_photos_preview').attr({src: src})
      return false;
    });
  });

  //
  // .. PHOTO & VIDEO GALLERY
  //
  $('.gallery').each(function() {
    var _this = this;
    $(_this).find('.gallery_preview').find('.gallery_preview_i').click(function() {
      var rel = $(this).data('rel');
      $(_this).find('.gallery_preview_i.__current').removeClass('__current');
      $(this).addClass('__current');
      $(_this).find('.gallery_view').find('.gallery_view_i.__current').removeClass('__current');
      $(_this).find('.gallery_view').find('.gallery_view_i[data-rel="' + rel + '"]').addClass('__current');
      return false;
    });
  });

  //
  // .. AVAILABILITY
  //
  $('.availability_more').click(function() {
    var $el = $(this).closest('.availability').find('.availability_section_more');
    if ($el.is(':hidden')) {
      $(this).text('Скрыть');
      $el.slideDown();
    } else {
      $(this).text('Показать');
      $el.slideUp();
    }
    return false;
  });

  //
  // .. STORES
  //
  $('.store_more.__open').click(function() {
    var $el = $(this).siblings('.store_details');
    $(this).hide();
    $el.slideDown();
    return false;
  });
  $('.store_more.__close').click(function() {
    var $el = $(this).closest('.store_details');
    $('.store_more.__open').show();
    $el.slideUp();
    return false;
  });

  //
  // .. REVIEWS ADD
  //
  $('.js-reviews-toggle').click(function() {
    var $el_list = $('.reviews_list');
    var $el_form = $('.reviews_add');
    if ($el_form.is(':hidden')) {
      $el_list.hide();
      $el_form.fadeIn();
    } else {
      $el_list.fadeIn();
      $el_form.hide();
    }
    return false;
  });

  //
  // .. HISTORY
  //
  $('.history_head').click(function() {
    var $el = $(this).next('.history_body');
    if ( $el.is(':hidden') ) {
      $(this).addClass('__open');
      $(this).find('.fa').removeClass('fa-chevron-down').addClass('fa-chevron-up');
      $el.show();
    } else {
      $(this).removeClass('__open');
      $(this).find('.fa').removeClass('fa-chevron-up').addClass('fa-chevron-down');
      $el.hide();
    }
    return false;
  });

  //
  // .. BASKET DELIVERY
  //
  $('.js-basket-delivery').change(function() {
    var value = $(this).val();
    $('.basket_delivery_i').hide();
    $('.basket_delivery_i.__' + value).fadeIn();
  });

  //
  // .. ADD CHILDREN
  //  
  $('.js-add-children').click(function() {
    var tpl = _.template( $('#children').html() );
    $('.children').append( tpl() );
    return false;
  });

  //
  // .. FORM NUMBER
  //
  $('.form_number').each(function() {
    var _this = this;
    $(this).find('.form_number_controls_i').click(function() {
      var $el = $(_this).find('input');
      var value = $el.val();
      $(this).hasClass('__up') ? value++ : value--;
      if (value > 0) $el.val(value);
      return false;
    });
  });

  //
  // .. JQUERY UI TABS
  //
  $('.tabs').tabs();

  //
  // .. JQUERY UI SLIDER RANGE
  //
  $('.range-slider').each(function() {
    var _this = this;
    $(_this).find('.range-slider_init.__price').slider({
      range: true,
      min: 0,
      max: 22000,
      step: 100,
      values: [0, 22000],
      slide: function(event, ui) {
        $(_this).find('.range-slider_value.__min').text(ui.values[0]);
        $(_this).find('.range-slider_value.__max').text(ui.values[1]);
      }
    });
    $(_this).find('.range-slider_init.__age').slider({
      range: true,
      min: 0,
      max: 16,
      step: 1,
      values: [0, 16],
      slide: function(event, ui) {
        $(_this).find('.range-slider_value.__min').text(ui.values[0]);
        $(_this).find('.range-slider_value.__max').text(ui.values[1]);
      }
    });
  });

  //
  // .. FORMS
  //
  $('.form').customForm(); // $('#checkbox').customForm() to init single element; $('body').customForm() to init all elements

  //
  // .. SCROLL TO
  //
  $('a[data-scroll="true"]').on('click touchend', function() {
    var       $this = $(this),
             anchor = $this.attr('href'),
        destination = $(anchor).offset().top;
    $('html, body').animate({scrollTop: destination}, 500);
    return false;
  });

  //
  // .. SLIDERS
  //

  //
  // .. OWL Single Slider init
  //
  $('.single-slider').owlCarousel({
    navigation: true,
    navigationText: false,
    slideSpeed: 300,
    paginationSpeed : 400,
    singleItem: true,
    transitionStyle: 'fadeUp',
    afterMove: function(elem) {
      var rel = $(this.owl.userItems[this.owl.currentItem]).data('rel');
      $('.header_bg').find('.header_bg_i').fadeOut(400, function() {
        $('.header_bg').find('.header_bg_i[data-rel="' + rel + '"]').fadeIn(400)
      })
    }
  });

  //
  // .. OWL Carousel init
  //
  $('.carousel').owlCarousel({
    navigation: true,
    navigationText: false,
    slideSpeed: 300,
    paginationSpeed : 400,
    responsive: false,
    items : $(this).data('items')
  });

  //
  // .. OWL Text Slider init
  //
  $('.text-slider').owlCarousel({
    navigation: true,
    navigationText: false,
    slideSpeed: 0,
    paginationSpeed : 400,
    singleItem: true,
    transitionStyle: 'fade'
  });

  //
  // .. NUMBER
  //
  $('.format-number').each(function() {
    var
      number = parseInt($(this).text()),
      formatNumber = accounting.formatNumber(number);

    $(this).text(formatNumber);
  });

  //
  // .. MONEY
  //
  $('.format-money').each(function() {
    var c = accounting.settings.currency;

    if ($(this).hasClass('__rub')) {
      c.format = '%v';
    } else if ($(this).hasClass('__usd')) {
      c.symbol = '$';
      c.format = '%s%v';
    } else if ($(this).hasClass('__eur')) {
      c.symbol = '€';
      c.format = '%s%v';
    }

    var
      number = parseFloat($(this).text()),
      formatMoney = accounting.formatMoney(number);



    if ($(this).hasClass('__rub')) {
      $(this).text(formatMoney).append('&nbsp;<span>руб.</span>');
    } else {
      $(this).text(formatMoney);
    }
  });



  //****************************************************************************************************
  //
  // .. SCROLL
  //
  //****************************************************************************************************
  $(window).scroll(function() {});



  //****************************************************************************************************
  //
  // .. RESIZE
  //
  //****************************************************************************************************
  $(window).smartresize(function() {

  });
  
});



//****************************************************************************************************
//
// .. LOAD
//
//****************************************************************************************************
$(window).load(function() {});