(function () {
    var container = document.querySelector("[data-hero-media]");
    if (!container) return;

    var poster = container.querySelector(".hero-poster");
    var video = container.querySelector(".hero-video");
    if (!poster || !video) return;

    var LOAD_TIMEOUT_MS = 4000;
    var SLOW_CONNECTION = ["slow-2g", "2g"];

    function usePosterOnly() {
        container.classList.remove("hero-media--video");
        container.classList.add("hero-media--poster");
        video.pause();
    }

    function useVideo() {
        container.classList.remove("hero-media--poster");
        container.classList.add("hero-media--video");
        var playPromise = video.play();
        if (playPromise && typeof playPromise.catch === "function") {
            playPromise.catch(usePosterOnly);
        }
    }

    function shouldSkipVideo() {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return true;

        var conn = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
        if (!conn) return false;
        if (conn.saveData) return true;
        if (conn.effectiveType && SLOW_CONNECTION.indexOf(conn.effectiveType) !== -1) return true;

        return false;
    }

    container.classList.add("hero-media--poster");

    if (shouldSkipVideo()) {
        usePosterOnly();
        return;
    }

    var settled = false;

    function settle(showVideo) {
        if (settled) return;
        settled = true;
        clearTimeout(timeoutId);
        if (showVideo) useVideo();
        else usePosterOnly();
    }

    var timeoutId = setTimeout(function () {
        settle(false);
    }, LOAD_TIMEOUT_MS);

    video.addEventListener(
        "canplaythrough",
        function () {
            settle(true);
        },
        { once: true }
    );

    video.addEventListener(
        "error",
        function () {
            settle(false);
        },
        { once: true }
    );

    video.load();
})();
