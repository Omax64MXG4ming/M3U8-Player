$(document).ready(function() {

    const input = $("#m3u8-placeholder");
    const button = $("#play-btn");

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

        // Simulación de carga (puedes reemplazar con tu player real)
        setTimeout(() => {
            setLoading(false);
            showMessage("Reproduciendo...", true);
        }, 2000);
    });

    input.on("input", function() {
        input.removeClass("error");
    });

    function setLoading(state) {
        if (state) {
            button.text("Cargando...");
            button.prop("disabled", true);
        } else {
            button.text("Play");
            button.prop("disabled", false);
        }
    }

    function showMessage(text, success = false) {
        let msg = $("#msg");

        if (msg.length === 0) {
            $("#text-box").append('<div id="msg"></div>');
            msg = $("#msg");
        }

        msg.text(text);
        msg.removeClass("error-text success-text");

        if (success) {
            msg.addClass("success-text");
        } else {
            msg.addClass("error-text");
        }
    }

});

$(window).on('load', function () {
    $('#m3u8-placeholder')[0].value = localStorage.getItem('m3u8-link') || '';
    $('#play-btn').on('click', function () {
        localStorage.setItem('m3u8-link', $('#m3u8-placeholder')[0].value);
        window.location.href = './player' + '#' + $('#m3u8-placeholder')[0].value;
    });
});
