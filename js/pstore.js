;(function($) {

	"use strict";

	var pureStore = {
		init: function() {
			this.mobileMenu();
			this.fixedHeader();
			this.siteSearch();
			this.wildSelectInit();
			this.owlCarouselInit();
			this.slickInit();
			this.customScrollInit();
			this.spinButtons();
			this.sidebarDropdowns();
			this.checkoutDropdowns();
			if ( pureConfig.woocommerce ) {
				this.woocommerceOrderingForm();
				this.priceFilter();
				this.productsPerPage();
				this.addToWishlistBtn();
				this.wishlistTfootRemove();
				if ( pureConfig.ajaxurl ) {
					this.quickView();
				}
			}
		},

		quickView: function() {
			$(document.body).on('click', '.show-quickly', (function() {
				var thisBtn = $(this);
				var prodid = thisBtn.data('prodid');
				var magnificPopup;
				$.ajax({
					url: pureConfig.ajaxurl,
					method: 'POST',
					data: {
						'action': 'pure_product_quick_view',
						'prodid': prodid
					},
					dataType: 'html',
					beforeSend: function() {
						thisBtn.addClass('loading');
						thisBtn.find('.icon').html('<i class="zmdi zmdi-spinner"></i>');
					},
					complete: function()  {
						thisBtn.removeClass('loading');
						thisBtn.find('.icon').html('<i class="zmdi zmdi-plus-circle-o"></i>');
					},
					success: function( response ) {
						$.magnificPopup.open({
	                        items: { src: '<div class="product-quick-view mfp-with-anim"><div class="container product-quick-view-wrap"><div class="product-quick-view-content">' + response + '</div></div></div>' },
	                        type: 'inline',
	                        removalDelay: 500,
	                    }, 0);
					}
				});

				$('body').on('click', '.quick-view-popup .main-images a', function(e) {
	                e.preventDefault();
	            });
			}));
		},

		mobileMenu: function() {
			$('.open-mobile-menu').click(function() {
				$('body').toggleClass('mobile-menu-open');
			});
			$('.close-mobile-menu, .close-mobile-menu-full-screen').click(function() {
				$('body').toggleClass('mobile-menu-open');
			});
		},

		fixedHeader: function() {
			$(window).scroll(function()
			{
				var header = $('header.header.fixed');

				if ( $(window).scrollTop() >= $('.header-wrapper').innerHeight() )
				{
				   header.addClass('active');
				   wpadminbarHeightOffset();
				} else
				{
					header.removeClass('active');
					header.css({ 'top': '' });
				}
			});

			$(window).resize(function(){ wpadminbarHeightOffset() });

			var wpadminbarHeightOffset = function()
			{
				if ( $( '#wpadminbar' ).length ) {
					$( 'header.header.fixed.active' ).css( 'top', function()
					{
						if ( $( '#wpadminbar' ).css( 'position' ) == 'fixed' ) {
							return $( '#wpadminbar' ).innerHeight() + 'px';
						}
						return '';
					});
				}
			}
		},

		siteSearch: function() {
			$('.site-search .searchform').find('input').focus(function(){
				$(this).parent().addClass( 'focused' );
			});
			$('.site-search .searchform').find('input').focusout(function(){
				$(this).parent().removeClass( 'focused' );
			});
		},

		wildSelectInit: function() {
			$('.wild-select').wildSelect({
				animation: 'flyUp',
				dropdownIcon: '<i class="zmdi zmdi-chevron-down"></i>'
			});

			$( '.woocommerce-ordering .orderby' ).wildSelect({
				animation: 'flyUp',
				dropdownIcon: '<i class="zmdi zmdi-chevron-down"></i>'
			});
		},

		owlCarouselInit: function() {
			$('.related-products, .upsells-products, .cross-sells').find('.products').owlCarousel({
				items: 4,
				loop: true,
				nav: true,
				dots: false,
				margin: 30,
				navText: ['<i class="zmdi zmdi-chevron-left"></i>','<i class="zmdi zmdi-chevron-right"></i>'],
				// mouseDrag: false,
			});

			$( '.pure-carousel' ).owlCarousel({
				items: 5,
				loop: true,
				nav: true,
				dots: false,
				margin: 60,
				navText: ['<i class="zmdi zmdi-chevron-left"></i>','<i class="zmdi zmdi-chevron-right"></i>']
			});

			// $( '.fullscreen-slider' ).owlCarousel({
			// 	items: 1,
			// 	loop: true,
			// 	dots: true
			// });
		},

		slickInit: function() {
			$('.thumbnails').slick({
				infinite: true,
				slidesToShow: 4,
				slidesToScroll: 1,
				vertical: true,
				speed: 170,
				verticalSwiping: true,
				arrows: false
			});
		},

		customScrollInit: function() {
			$('.widget_layered_nav ul').customScroll();
			$('.ps_widget_brands ul').customScroll();
		},

		spinButtons: function() {
			// Add spin buttons after AJAX request has been stopped.
			$( document ).ajaxStop(function() {
				$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").find('input').wrap('<div class="quantity-content"></div>');
				$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass("buttons_added").find('input').after('<div class="qty-btn-wrap"><span class="plus"><i class="zmdi zmdi-chevron-up"></i></span><span class="minus"><i class="zmdi zmdi-chevron-down"></i></span></div>');
			});

			// Spin Buttons actions.
			if ( !$('.woocommerce form .quantity .qty-btn-wrap').length ) {
				$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").find('input').wrap('<div class="quantity-content"></div>');
				$("div.quantity:not(.buttons_added), td.quantity:not(.buttons_added)").addClass("buttons_added").find('input').after('<div class="qty-btn-wrap"><span class="plus"><i class="zmdi zmdi-chevron-up"></i></span><span class="minus"><i class="zmdi zmdi-chevron-down"></i></span></div>'), $(document).on("click", ".qty-btn-wrap .plus, .qty-btn-wrap .minus", function() {
					var t = $(this).closest(".quantity").find(".qty"),
						a = parseFloat(t.val()),
						n = parseFloat(t.attr("max")),
						s = parseFloat(t.attr("min")),
						e = t.attr("step");
					a && "" !== a && "NaN" !== a || (a = 0), ("" === n || "NaN" === n) && (n = ""), ("" === s || "NaN" === s) && (s = 0), ("any" === e || "" === e || void 0 === e || "NaN" === parseFloat(e)) && (e = 1), $(this).is(".plus") ? t.val(n && (n == a || a > n) ? n : a + parseFloat(e)) : s && (s == a || s > a) ? t.val(s) : a > 0 && t.val(a - parseFloat(e)), t.trigger("change")
				})
			}
		},

		addToWishlistBtn: function() {
			$('.product').find('.add_to_wishlist').click(function( event ) {
				var addBtn = $(this);
				if ( $(this).hasClass( 'added' ) ) {
					event.stopPropagation();
					addBtn.attr( 'href', pureConfig.wishlisturl )
						.removeAttr( 'rel' );
				} else {
					addBtn.addClass( 'added' );
				}
			});
		},

		wishlistTfootRemove: function() {
			$('.wishlist_table').find('tfoot').remove();
		},

		sidebarDropdowns: function() {
			$('.product-categories .open-this').click(function(){
				var children = $(this).siblings('.children');
				$(this).parent().toggleClass('open');
				children.toggleClass('open');
				if ( children.hasClass('open') ) {
					children.show('fast');
				} else {
					children.hide('fast');
				}
			});
		},

		checkoutDropdowns: function() {
			$('.fade-area').find('.fade-content').css('display', 'none');

			$('.fade-area').find('.fade-trigger').click(function()
			{
				var content = $(this).siblings('.fade-content');
				var parent = content.parent();

				parent.toggleClass('open');

				if ( parent.hasClass('open') ) {
					content.show('medium');
				} else {
					content.hide('medium');
				}
			});
		},

		woocommerceOrderingForm: function() {
			$( '.woocommerce-ordering' ).find('.wild-options li').click(function(){
				$(this).closest('form').submit();
			});
		},

		priceFilter: function() {
			if ( $('#nonlinear').length ) {

				var nonLinearSlider = document.getElementById('nonlinear');

				noUiSlider.create(nonLinearSlider, {
					connect: true,
					behaviour: 'tap',
					start: [ 100, 500 ],
					step: 10,
					range: {
					'min': 0,
					'max': 1000,
					}
				});

				// Write the CSS 'left' value to a span.
				function leftValue ( handle ) {
					return handle.parentElement.style.left;
				}

				var lowerValue = document.getElementById('lower-value'),
				upperValue = document.getElementById('upper-value'),
				handles = nonLinearSlider.getElementsByClassName('noUi-handle');

				// Display the slider value and how far the handle moved
				// from the left edge of the slider.
				nonLinearSlider.noUiSlider.on('update', function ( values, handle ) {
					if ( !handle ) {
						lowerValue.innerHTML = '$' + values[handle];
					} else {
						upperValue.innerHTML = '$' + values[handle];
					}
				});
			}
		},

		productsPerPage: function() {
			$( '.products_per_page_form .wild-options li' ).click(function(){
				$(this).closest('form').submit();
			});

	        $( '.products_per_page_form' ).find( 'select option' ).each(function(){
	            var option = $(this);
	            if ( option.attr( 'value' ) == pureStore.getCookie( 'pure_products_per_page' ) ) {
	                option.attr( 'selected', 'selected' );
	            }
	        });
	        $( '.products_per_page_form .wild-select' ).find( '.wild-options li' ).each(function(){
	            var option = $(this);
	            if ( option.attr( 'data-value' ) == pureStore.getCookie( 'pure_products_per_page' ) ) {
	                option.attr( 'selected', 'selected' );
	                option.parent().siblings( '.wild-trigger' ).find('.wild-caption').text( option.text() );
	            }
	        });
		},

		getCookie: function( name ) {
			var value = "; " + document.cookie;
			var parts = value.split("; " + name + "=");
			if (parts.length == 2) {
				return parts.pop().split(";").shift();
			}
			return false;
		},
	}

	jQuery(document).ready(function($) {
		pureStore.init();
	});

})(jQuery);