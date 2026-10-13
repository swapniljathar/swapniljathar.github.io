(function () {
	"use strict";

	var root = document.documentElement;
	var theme = localStorage.getItem("site-theme") === "dark" ? "dark" : "light";
	var sunIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"></circle><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"></path></svg>';
	var moonIcon = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 15.5A8.5 8.5 0 0 1 8.5 3.5 8.5 8.5 0 1 0 20.5 15.5Z"></path></svg>';

	function applyTheme(nextTheme, button) {
		theme = nextTheme;
		root.setAttribute("data-theme", theme);
		localStorage.setItem("site-theme", theme);

		if (button) {
			var isDark = theme === "dark";
			button.innerHTML = isDark ? moonIcon : sunIcon;
			button.setAttribute("aria-pressed", String(isDark));
			button.setAttribute("aria-label", "Switch to " + (isDark ? "light" : "dark") + " theme");
			button.setAttribute("title", "Switch to " + (isDark ? "light" : "dark") + " theme");
		}
	}

	root.setAttribute("data-theme", theme);

	document.addEventListener("DOMContentLoaded", function () {
		var button = document.querySelector(".theme-toggle");
		if (!button) {
			return;
		}

		applyTheme(theme, button);
		button.addEventListener("click", function () {
			applyTheme(theme === "dark" ? "light" : "dark", button);
		});
	});
}());
