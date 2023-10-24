"use strict";

document.addEventListener("DOMContentLoaded", function () {
	//! Start Scripts

	const body = document.body; // переменная body

	// Запрет перетаскивания ссылок и картинок
	document.querySelectorAll("img, a").forEach((element) => {
		element.addEventListener("dragstart", (event) => {
			event.preventDefault();
		});
	});

	/* ------------------- btnScrollTop -------------------- */
	const btnScrollTop = document.getElementById('btnScrollTop');
	window.onscroll = function () {
		scrollFunction()
	};

	function scrollFunction() {
		if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
			btnScrollTop.classList.add('show')
		} else {
			btnScrollTop.classList.remove('show')
		}
	}

	btnScrollTop.addEventListener("click", function () {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	});

	//!Плавный скролл по якорным ссылкам
	const anchors = document.querySelectorAll('a[href*="#"]');
	anchors.forEach((anchor) => {
		anchor.addEventListener('click', (event) => {
			event.preventDefault();

			const blockID = anchor.getAttribute('href').substring(1);

			document.getElementById(blockID).scrollIntoView({
				behavior: 'smooth',
				block: 'start'
			});
		});
	});

	/* ------------------- Header Fixed -------------------- */
	const header = document.querySelector('.header');
	let headerHeight = header.offsetHeight;

	// Функция для обновления высоты хедера в зависимости от ширины экрана
	function updateHeaderHeight() {
		if (window.innerWidth <= 480) {
			headerHeight = 60; // Установите желаемую высоту для мобильного хедера
		} else {
			headerHeight = 80; // Установите желаемую высоту для десктопного хедера
		}
	}

	window.addEventListener('resize', () => {
		updateHeaderHeight();
	});

	function scrollToAnchor(anchor) {
		const offset = headerHeight - 16;
		const anchorParts = anchor.split('#');
		const targetId = anchorParts[1];

		const targetElement = document.getElementById(targetId);
		if (targetElement) {
			const targetOffset = targetElement.offsetTop;
			window.scrollTo({
				top: targetOffset - offset,
				behavior: 'smooth'
			});
		}
		return false;
	};

	window.addEventListener('scroll', () => {
		if (window.scrollY > headerHeight) {
			header.classList.add('header-fixed');
			document.body.style.paddingTop = `${headerHeight}px`;
		} else {
			header.classList.remove('header-fixed');
			document.body.style.paddingTop = 0;
		}

		const anchorLinks = document.querySelectorAll('.menu__link');

		anchorLinks.forEach(link => {
			const anchor = link.getAttribute('href');
			const target = document.querySelector(anchor);

			if (target) {
				const targetTop = target.offsetTop - headerHeight;
				const targetBottom = targetTop + target.offsetHeight;

				if (window.scrollY >= targetTop && window.scrollY < targetBottom) {
					link.classList.add('active');
				} else {
					link.classList.remove('active');
				}
			}
		});
	});

	document.querySelectorAll('.menu__link').forEach(link => {
		link.addEventListener('click', (e) => {
			e.preventDefault();
			const anchor = link.getAttribute('href');
			scrollToAnchor(anchor);
		});
	});

	// Вызовем функцию для первоначальной установки высоты хедера
	updateHeaderHeight();


	/* ------------------- Mobile Menu -------------------- */
	const btnBurger = document.querySelector('.header__burger');
	const menu = document.querySelector('.header__nav');
	const pageBody = document.querySelector('.page__body');

	if (menu && btnBurger) {
		btnBurger.addEventListener('click', e => {
			btnBurger.classList.toggle('active');
			menu.classList.toggle('active');
			pageBody.classList.add('lock-scroll');
		});

		menu.addEventListener('click', e => {
			if (e.target.classList.contains('menu')) {
				pageBody.classList.remove('lock-scroll');
				menu.classList.remove('active');
				btnBurger.classList.remove('active');
			}
		});

		// Обработчик клика на каждую ссылку в меню
		const menuLinks = menu.querySelectorAll('.menu__link');
		menuLinks.forEach(link => {
			link.addEventListener('click', e => {
				e.preventDefault();
				const anchor = link.getAttribute('href');

				// Скроллим до якоря
				scrollToAnchor(anchor);

				// Закрываем меню
				pageBody.classList.remove('lock-scroll');
				menu.classList.remove('active');
				btnBurger.classList.remove('active');
			});
		});

		window.addEventListener('click', e => {
			const target = e.target;
			if (
				!target.closest('.header__nav') &&
				!target.closest('.btn-burger') &&
				menu.classList.contains('active')
			) {
				pageBody.classList.remove('lock-scroll');
				menu.classList.remove('active');
				btnBurger.classList.remove('active');
			}
		});
	};

	/* ------------------- Reviews Slider -------------------- */
	const reviewsSlider = new Swiper('.reviews__slider', {
		// Остальные настройки слайдера
		direction: 'horizontal',
		loop: true,
		spaceBetween: 32,
		slidesPerView: 1,
		slidesPerGroup: 1,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
		pagination: {
			el: '.swiper-pagination',
			clickable: true,
		},
		breakpoints: {

			1024: {
				spaceBetween: 24,
				pagination: {
					el: null,
				},
			},
			0: {
				spaceBetween: 16,
				navigation: {
					nextEl: null,
					prevEl: null,
				},
			},
		},
	});


	/* ------------------- Login -------------------- */
	const formLogin = document.querySelector('#form-login');
	const formPassword = document.querySelector('#form-password');
	const passResset = document.querySelector('#password-resset');
	const loginBack = document.querySelector('#login-back');

	passResset.addEventListener('click', () => {
		formLogin.classList.remove('active');
		formPassword.classList.add('active');
	});

	loginBack.addEventListener('click', () => {
		formPassword.classList.remove('active');
		formLogin.classList.add('active');
	});

	/* ------------------- Register Slider -------------------- */
	const registerSlider = new Swiper('.register__slider', {
		direction: 'horizontal',
		loop: false,
		effect: 'fade',
		fadeEffect: {
			crossFade: true
		},
		spaceBetween: 32,
		slidesPerView: 1,
		slidesPerGroup: 1,
		navigation: {
			nextEl: '.swiper-next',
			prevEl: '.swiper-prev',
		},
	});

	const registerPrev = document.querySelector('.register-prev');
	const registerNextBtn = document.querySelectorAll('.register-next');
	registerNextBtn.forEach(function (skipButton) {
		skipButton.addEventListener('click', function () {
			registerSlider.slideNext();
		});
	});

	registerPrev.addEventListener('click', function () {
		registerSlider.slidePrev();
	});
	//! End Scripts
});