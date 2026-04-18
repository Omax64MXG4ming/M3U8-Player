$(document).ready(function() {

    const input = $("#m3u8-placeholder");
    const button = $("#play-btn");

    // Cargar último link
    input.val(localStorage.getItem('m3u8-link') || '');

    function isValidM3U8(url) {
        return url.includes(".m3u8");
    }

    button.click(function() {
        let url = input.val().trim();

        if (!isValidM3U8(url)) {
            input.addClass("error");
            showMessage("Link inválido (debe contener .m3u8)");
            return;
        }

        input.removeClass("error");
        setLoading(true);

        // Guardar
        localStorage.setItem('m3u8-link', url);

        setTimeout(() => {
            setLoading(false);
            showMessage("Redirigiendo...", true);

            // Redirección
            window.location.href = './player#' + url;

        }, 1000);
    });

    input.on("input", function() {
        input.removeClass("error");
    });

    function setLoading(state) {
        button.text(state ? "Cargando..." : "Play");
        button.prop("disabled", state);
    }

    function showMessage(text, success = false) {
        let msg = $("#msg");

        if (msg.length === 0) {
            $("#text-box").append('<div id="msg"></div>');
            msg = $("#msg");
        }

        msg.text(text);
        msg.removeClass("error-text success-text");
        msg.addClass(success ? "success-text" : "error-text");
    }

});
