// Service Worker
if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./js/serviceworker.js')
        .then(function(resp) {
            console.log("ServiceWorker cargado correctamente");
            console.log(resp);
        })
        .catch(function(err) {
            console.log("Error al registrar el ServiceWorker");
            console.log(err);
        });
} else {
    console.log("El navegador no soporta ServiceWorker");
}

// jQuery Ready
$(function() {
    $('#menu a').click(function(e) {
        e.preventDefault();
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top
        });
        return false;
    });
});