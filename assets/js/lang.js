function toggleEnPrefixAndRedirect() {
    const url = new URL(window.location.href);
    const segments = url.pathname.split("/").filter(s => s.length > 0);

    if (segments[0] === "en") {
        segments.shift();
    } else {
        segments.unshift("en");
    }

    url.pathname = "/" + segments.join("/");
    window.location.href = url.toString();
}