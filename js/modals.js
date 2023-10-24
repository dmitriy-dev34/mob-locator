"use strict";

document.addEventListener("DOMContentLoaded", function () {
	//! Start Scripts

/* ------------------- Modal Base -------------------- */
const modalBtn = document.querySelectorAll('.js-modal-btn');
const modals = document.querySelectorAll('.modal');
const body = document.body;

function openModal(elem) {
	elem.classList.add('active');
	if (hasScrollbar()) {
		body.style.width = `calc(100vw - ${window.innerWidth - document.documentElement.clientWidth}px)`;
	}
	body.style.overflow = 'hidden';
}

function closeModal(e) {
	if (e.target.classList.contains('modal__close') || e.target.closest('.modal__close') || e.target.classList.contains('modal__overlay')) {
		e.target.closest('.modal').classList.remove('active');
		body.style.overflow = '';
		body.style.width = '';
	}
}

function hasScrollbar() {
	return document.body.scrollHeight > window.innerHeight;
}

modalBtn.forEach(btn => {
	btn.addEventListener('click', (e) => {
		let data = e.target.dataset.modalOpen;

		modals.forEach(modal => {
			if (modal.dataset.modal == data || modal.dataset.modal == e.target.closest('.js-modal-btn').dataset.modalOpen) {
				openModal(modal)
			}
		})
	})
})

modals.forEach(modal => {
	modal.addEventListener('click', e => closeModal(e))
})

window.addEventListener('keydown', e => {
	modals.forEach(modal => {
		if (e.key === "Escape" && modal.classList.contains('active')) {
			modal.classList.remove('active');
			body.style.overflow = '';
			body.style.width = '';
		}
	})
})
/* ------------------- / Modal Base -------------------- */

/* ------------------- Modal Unsubscribe -------------------- */
const unsubscribeNo = document.querySelector('.unsubscribe-no');
const modalUnsubscribe = document.querySelector('.modal-unsubscribe');

unsubscribeNo.addEventListener('click', () => {
	modalUnsubscribe.classList.remove('active');
	body.style.overflow = '';
	body.style.width = '';
});


	//! End Scripts
});