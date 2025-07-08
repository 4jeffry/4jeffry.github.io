(function ($) {
	
	"use strict";

	// =================================================================================
	// # FUNGSI UTAMA YANG DIJALANKAN SAAT DOKUMEN SIAP
	// =================================================================================
	$(document).ready(function() {
		mobileNav();
		initScrollReveal();
		initMenuToggle();
		initSmoothScrollAndActiveNav();
		initCounterUp();
		initHeaderOnScroll(); // BARU: Fungsi untuk header adaptif
		initBackToTopButton(); // BARU: Fungsi untuk tombol kembali ke atas
		initCardTiltEffect(); // BARU: Fungsi untuk efek hover pada kartu
	});


	// =================================================================================
	// # FUNGSI YANG DIJALANKAN SAAT HALAMAN SELESAI DIMUAT
	// =================================================================================
	$(window).on('load', function() {
		// Animasi Preloader
		$("#preloader").animate({
			'opacity': '0'
		}, 600, function(){
			setTimeout(function(){
				$("#preloader").css("visibility", "hidden").fadeOut();
			}, 300);
		});

		// Inisialisasi Parallax jika ada elemen .cover
		if($('.cover').length){
			$('.cover').parallax({
				imageSrc: $('.cover').data('image'),
				zIndex: '1'
			});
		}
	});


	// =================================================================================
	// # PENYESUAIAN MENU MOBILE SAAT UKURAN JENDELA BERUBAH
	// =================================================================================
	$(window).on('resize', function() {
		mobileNav();
	});


	// =================================================================================
	// # INISIALISASI FITUR-FITUR
	// =================================================================================

	/**
	 * BARU: Header menjadi solid dan lebih kecil saat scroll.
	 * Ini memberikan tampilan modern dan lebih banyak ruang untuk konten.
	 */
	function initHeaderOnScroll() {
		$(window).on('scroll', function() {
			var scroll = $(window).scrollTop();
			if (scroll >= 50) {
				$('.header-area').addClass('header-scrolled');
			} else {
				$('.header-area').removeClass('header-scrolled');
			}
		});
	}


	/**
	 * BARU: Tombol "Kembali ke Atas" muncul setelah scroll.
	 * Meningkatkan pengalaman pengguna pada halaman yang panjang.
	 */
	function initBackToTopButton() {
		$(window).on('scroll', function() {
			if ($(this).scrollTop() > 100) {
				$('.back-to-top').fadeIn('slow');
			} else {
				$('.back-to-top').fadeOut('slow');
			}
		});
	}

	/**
	 * BARU: Efek 3D Tilt pada kartu testimoni dan blog.
	 * Menggunakan library vanilla-tilt.js untuk efek interaktif yang elegan.
	 */
	function initCardTiltEffect() {
		// Pastikan library VanillaTilt sudah dimuat
		if (typeof VanillaTilt !== 'undefined') {
			VanillaTilt.init(document.querySelectorAll(".team-item, .blog-post-thumb"), {
				max: 10,
				speed: 400,
				glare: true,
				"max-glare": 0.5
			});
		}
	}


	/**
	 * Inisialisasi ScrollReveal untuk animasi saat elemen muncul.
	 */
	function initScrollReveal() {
		if (window.scrollReveal) {
			window.sr = new scrollReveal();
		}
	}


	/**
	 * Inisialisasi toggle untuk menu mobile.
	 */
	function initMenuToggle() {
		if ($('.menu-trigger').length) {
			$(".menu-trigger").on('click', function() {	
				$(this).toggleClass('active');
				$('.header-area .nav').slideToggle(200);
			});
		}
	}


	/**
	 * DISERDERHANAKAN: Menggabungkan smooth scroll dan logika menu aktif.
	 * Kode ini lebih bersih dan efisien.
	 */
	function initSmoothScrollAndActiveNav() {
		var lastId,
			topMenu = $(".nav"),
			menuItems = topMenu.find("a[href^='#']"), // Hanya pilih link internal
			scrollItems = menuItems.map(function() {
				var item = $($(this).attr("href"));
				if (item.length) { return item; }
			});

		// Klik pada link menu
		menuItems.on('click', function(e) {
			var href = $(this).attr("href"),
				offsetTop = href === "#" ? 0 : $(href).offset().top - 80; // Offset disesuaikan

			$('html, body').stop().animate({ 
				scrollTop: offsetTop
			}, 700);

			// Untuk mobile, tutup menu setelah klik
			if ($(window).width() < 992) {
				$('.menu-trigger').removeClass('active');
				$('.header-area .nav').slideUp(200);
			}
			e.preventDefault();
		});

		// Event scroll untuk menandai menu aktif
		$(window).on('scroll', function() {
			var fromTop = $(this).scrollTop() + 90; // Offset disesuaikan

			var cur = scrollItems.map(function() {
				if ($(this).offset().top < fromTop)
					return this;
			});
			cur = cur[cur.length-1];
			var id = cur && cur.length ? cur.attr("id") : "";

			if (lastId !== id) {
				lastId = id;
				menuItems
					.parent().removeClass("active")
					.end().filter("[href='#"+id+"']").parent().addClass("active");
			}                   
		});
	}


	/**
	 * Inisialisasi counter-up untuk angka statistik.
	 */
	function initCounterUp() {
		if ($('.count-item').length) {
			$('.count-item strong').counterUp({
				delay: 10,
				time: 1000
			});
		}
	}


	/**
	 * Logika untuk submenu pada versi mobile.
	 */
	function mobileNav() {
		var width = $(window).width();
		$('.submenu').on('click', function() {
			if(width < 992) {
				$('.submenu ul').removeClass('active');
				$(this).find('ul').toggleClass('active');
			}
		});
	}

})(window.jQuery);

