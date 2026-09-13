(function () {
	"use strict";

	// Dark mode toggle. Initial theme is set by an inline script in <head>
	// (before paint) to avoid a flash of the wrong theme.
	var themeToggle = document.getElementById("theme-toggle");
	if (themeToggle) {
		themeToggle.addEventListener("click", function () {
			var root = document.documentElement;
			var next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
			root.setAttribute("data-theme", next);
			localStorage.setItem("theme", next);
		});
	}

	// Footer year
	var yearEl = document.getElementById("year");
	if (yearEl) yearEl.textContent = new Date().getFullYear();

	// Mobile nav toggle
	var toggle = document.getElementById("nav-toggle");
	var nav = document.getElementById("nav");
	if (toggle && nav) {
		toggle.addEventListener("click", function () {
			var open = nav.classList.toggle("is-open");
			toggle.setAttribute("aria-expanded", open ? "true" : "false");
		});
		nav.querySelectorAll("a").forEach(function (link) {
			link.addEventListener("click", function () {
				nav.classList.remove("is-open");
				toggle.setAttribute("aria-expanded", "false");
			});
		});
	}

	// Active nav link on scroll
	var sections = document.querySelectorAll("section[id]");
	var navLinks = document.querySelectorAll("#nav a[data-nav]");

	if (sections.length && navLinks.length && "IntersectionObserver" in window) {
		var map = {};
		navLinks.forEach(function (link) {
			map[link.dataset.nav] = link;
		});

		var observer = new IntersectionObserver(
			function (entries) {
				entries.forEach(function (entry) {
					if (entry.isIntersecting) {
						navLinks.forEach(function (l) { l.classList.remove("is-active"); });
						var active = map[entry.target.id];
						if (active) active.classList.add("is-active");
					}
				});
			},
			{ rootMargin: "-45% 0px -50% 0px", threshold: 0 }
		);

		sections.forEach(function (section) { observer.observe(section); });
	}

	// Project screenshot lightbox
	var lightbox = document.getElementById("lightbox");
	var lightboxImg = document.getElementById("lightbox-img");
	var lightboxClose = document.getElementById("lightbox-close");
	var lastFocused = null;

	function openLightbox(img) {
		lastFocused = document.activeElement;
		lightboxImg.src = img.src;
		lightboxImg.alt = img.alt;
		lightbox.hidden = false;
		lightboxClose.focus();
		document.body.style.overflow = "hidden";
	}

	function closeLightbox() {
		lightbox.hidden = true;
		lightboxImg.src = "";
		document.body.style.overflow = "";
		if (lastFocused) lastFocused.focus();
	}

	document.querySelectorAll(".project-media").forEach(function (btn) {
		var img = btn.querySelector("img");
		if (img) btn.setAttribute("aria-label", "View screenshot: " + img.alt);
		btn.addEventListener("click", function () {
			openLightbox(img);
		});
	});

	if (lightboxClose) lightboxClose.addEventListener("click", closeLightbox);
	if (lightbox) {
		lightbox.addEventListener("click", function (e) {
			if (e.target === lightbox) closeLightbox();
		});
	}
	document.addEventListener("keydown", function (e) {
		if (e.key === "Escape" && lightbox && !lightbox.hidden) closeLightbox();
	});

	// Contact form — submits to Netlify Forms. This works automatically once
	// deployed on Netlify, as long as the <form> in index.html keeps its
	// data-netlify="true" attribute and hidden form-name field. No signup,
	// no third-party service, no config needed here.
	var form = document.getElementById("contact-form");
	var note = document.getElementById("form-note");
	var submitBtn = form ? form.querySelector("button[type=submit]") : null;

	function encodeFormData(data) {
		return Object.keys(data)
			.map(function (key) {
				return encodeURIComponent(key) + "=" + encodeURIComponent(data[key]);
			})
			.join("&");
	}

	if (form) {
		form.addEventListener("submit", function (e) {
			e.preventDefault();

			var name = form.name.value.trim();
			var email = form.email.value.trim();
			var message = form.message.value.trim();

			if (!name || !email || !message) {
				if (note) note.textContent = "Please fill in every field.";
				return;
			}

			if (submitBtn) submitBtn.disabled = true;
			if (note) note.textContent = "Sending…";

			fetch("/", {
				method: "POST",
				headers: { "Content-Type": "application/x-www-form-urlencoded" },
				body: encodeFormData({
					"form-name": form.getAttribute("name"),
					name: name,
					email: email,
					message: message
				})
			})
				.then(function (response) {
					if (response.ok) {
						if (note) note.textContent = "Thanks — I'll get back to you soon.";
						form.reset();
					} else {
						if (note) note.textContent = "Something went wrong. Try emailing me directly instead.";
					}
				})
				.catch(function () {
					if (note) note.textContent = "Something went wrong. Try emailing me directly instead.";
				})
				.finally(function () {
					if (submitBtn) submitBtn.disabled = false;
				});
		});
	}
})();
