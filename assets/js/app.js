var arrLang = {};
var page = document.querySelector('body').getAttribute('data-page');
function loadLanguage(lang) {
    console.log("lll-",lang);
    jQuery.getJSON('https://nexwaveinc.com/assets/languages/'+lang+'.json', function (data) {
        arrLang[lang] = data;
       // console.log("ppp-",lang);
        updateLanguage(lang);
    }).fail(function (jqXHR, textStatus, errorThrown) {
        console.log("Error loading JSON:", errorThrown);
    });
}

function updateLanguage(lang) {
    //console.log("ddd");
   
   // console.log('lbdlcbl');
    jQuery("*[key]").each(function (index, element) {
        jQuery(this).html(arrLang[lang][jQuery(this).attr("key")]);
      //  console.log(arrLang[lang][jQuery(this).attr("key")],jQuery(this).attr("key"));
    });
}

var urlParams = new URLSearchParams(window.location.search);
var langParam = urlParams.get('lang');

var langArr = [];
jQuery('.dropdown-menu .dropdown-item').each(function(){langArr.push(jQuery(this).data('val'))})
console.log('langArr', langArr)
if (langParam && langArr.includes(langParam)) {
    loadLanguage(langParam);
    localStorage.setItem('lang', langParam);
    setSelect(langParam)
    // jQuery(".translate").val(langParam)
} else {
    var lang = "";
    if (localStorage.getItem('lang')){
        lang = localStorage.getItem('lang')
    }else{
        lang = "eng"
    }
    setSelect(lang)
    loadLanguage(lang);
    checkip();
}
function setSelect(langparam){
    jQuery('.dropdown-menu .dropdown-item').each(function(){
        if(jQuery(this).data('val') == langparam){
            console.log('matched', jQuery(this).parents(".dropdown"))
            jQuery(this).parents(".dropdown").find(".btn").html(jQuery(this).html());
            
            jQuery(this).parent().siblings().find('a').removeClass('active');
            jQuery(this).addClass('active');
        }
    })
}
jQuery(".translate").change(function () {
    var lang = jQuery(this).val();
    loadLanguage(lang);
    var newUrl = window.location.pathname + "?lang=" + lang;
    window.history.pushState({
        path: newUrl
    }, '', newUrl);
});

jQuery(document).on("click", ".dropdown-menu .dropdown-item", function (e) {
        e.preventDefault();
        if (!jQuery(this).hasClass("active")) {
            
        jQuery(".dropdown-menu .dropdown-item").removeClass("active");
        jQuery(this).addClass("active");
        jQuery(this)
            .parents(".dropdown")
            .find(".btn")
            .html(jQuery(this).html());
            var lang= jQuery(this).data('val');
            localStorage.setItem('lang', lang);
            loadLanguage(lang);
            var newUrl = window.location.pathname + "?lang=" + lang;
            window.history.pushState({
                path: newUrl
            }, '', newUrl);

        }
    });

function checkip()
{
    jQuery.get("https://ipinfo.io", function(response) {
        if(response.country == "DE")
        {
            loadLanguage("grm");
        }
    }, "jsonp");
}