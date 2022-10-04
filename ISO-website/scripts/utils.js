const Toast = Swal.mixin({
	toast: true,
	position: 'bottom',
	showConfirmButton: false,
	timer: 3000,
	timerProgressBar: true,
	didOpen: (toast) => {
		toast.addEventListener('mouseenter', Swal.stopTimer)
		toast.addEventListener('mouseleave', Swal.resumeTimer)
	}
})

function setPage(page) {
    const all_pages = document.getElementsByClassName("main-content");
    for (let i = 0; i < all_pages.length; i++) {
        all_pages[i].classList.add("hidden");
    }

    const page_element = document.getElementById(`page-${page}`);
    if (page_element) {
        page_element.classList.remove("hidden");
    }
    for (let b of document.getElementsByClassName("active-button")) {
        b.classList.remove("active-button");
    }
    const button = document.getElementById(`${page}-button`);
    if (button) {
        button.classList.add("active-button");
    }

    // Add to url params
    const url = new URL(window.location.href);
    url.searchParams.set("p", page);
    window.history.pushState({}, "", url.href);

}

function removeAllChildren(element, keep_first_n = 0) {
    while (element.childNodes.length > keep_first_n) {
        element.removeChild(element.firstChild);
    }
}

function appendChildren(element, children) {
    for (let i = 0; i < children.length; i++) {
        element.appendChild(children[i]);
    }
}

function timestampToDate(timestamp) {
    const date = new Date(timestamp * 1000);
    return date.toLocaleDateString();
}

function secondsToHoursMinutes(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);

    return `${hours}h ${minutes}m`;
}

function toggle_theme() {
	if (document.documentElement.getAttribute("data-theme") != "dark") {
		document.documentElement.setAttribute('data-theme', 'dark');
		localStorage.setItem("theme", "dark");
	}
	else {
		document.documentElement.setAttribute('data-theme', 'light');
		localStorage.setItem("theme", "light");
	}
}