(function () {
  var STORAGE_KEY = "preferred_lang";
  var SUPPORTED_LANGS = ["en", "ja", "id"];
  var SUPPORTED_RAW_PATHS = ["/", "/writings/", "/portfolio/", "/sns/", "/cv/"];

  var select = document.getElementById("language-switcher");
  if (!select) return;

  function normalizeBaseurl(baseurl) {
    if (!baseurl || baseurl === "/") return "";
    return baseurl.replace(/\/+$/, "");
  }

  function stripBaseurl(pathname, baseurl) {
    if (baseurl && pathname.indexOf(baseurl) === 0) {
      var stripped = pathname.slice(baseurl.length);
      return stripped || "/";
    }
    return pathname || "/";
  }

  function normalizeRawPath(path) {
    if (!path) return "/";
    var normalized = path.charAt(0) === "/" ? path : "/" + path;
    if (normalized !== "/" && normalized.slice(-1) !== "/") {
      normalized += "/";
    }
    return normalized;
  }

  function detectLang(pathNoBaseurl) {
    var match = pathNoBaseurl.match(/^\/(ja|id)(\/|$)/);
    return match ? match[1] : "en";
  }

  function toRawPath(pathNoBaseurl) {
    var match = pathNoBaseurl.match(/^\/(?:ja|id)(\/.*|$)/);
    if (!match) return normalizeRawPath(pathNoBaseurl);
    return normalizeRawPath(match[1] || "/");
  }

  function safeGetPreferredLang() {
    try {
      var value = window.localStorage.getItem(STORAGE_KEY);
      return SUPPORTED_LANGS.indexOf(value) > -1 ? value : null;
    } catch (error) {
      return null;
    }
  }

  function safeSetPreferredLang(lang) {
    if (SUPPORTED_LANGS.indexOf(lang) === -1) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, lang);
    } catch (error) {
      // Ignore storage errors (private mode, etc.)
    }
  }

  function resolveRawPath(rawPath) {
    return SUPPORTED_RAW_PATHS.indexOf(rawPath) > -1 ? rawPath : "/";
  }

  function buildTargetPath(lang, rawPath, baseurl) {
    var prefix = lang === "en" ? "" : "/" + lang;
    var localizedPath = rawPath === "/" ? (prefix ? prefix + "/" : "/") : prefix + rawPath;
    return (baseurl || "") + localizedPath;
  }

  var baseurl = normalizeBaseurl(select.getAttribute("data-baseurl") || "");
  var currentNoBaseurlPath = stripBaseurl(window.location.pathname, baseurl);
  var currentLang = detectLang(currentNoBaseurlPath);
  var currentRawPath = toRawPath(currentNoBaseurlPath);

  function redirectToLanguage(lang, replaceHistory) {
    var targetRawPath = resolveRawPath(currentRawPath);
    var targetPath = buildTargetPath(lang, targetRawPath, baseurl);
    if (targetPath === window.location.pathname) return;
    if (replaceHistory) {
      window.location.replace(targetPath);
      return;
    }
    window.location.assign(targetPath);
  }

  var searchParams = new URLSearchParams(window.location.search);
  var queryLangCandidate = (searchParams.get("lang") || searchParams.get("locale") || searchParams.get("hl") || "").toLowerCase();
  var queryLang = SUPPORTED_LANGS.indexOf(queryLangCandidate) > -1 ? queryLangCandidate : null;

  if (queryLang) {
    safeSetPreferredLang(queryLang);
    if (queryLang !== currentLang) {
      redirectToLanguage(queryLang, true);
      return;
    }
  }

  var preferredLang = safeGetPreferredLang();
  if (preferredLang && !queryLang && preferredLang !== currentLang) {
    redirectToLanguage(preferredLang, true);
    return;
  }

  if (!preferredLang && !queryLang && currentLang === "en" && currentRawPath === "/") {
    var browserLang = (window.navigator.language || "").toLowerCase();
    if (browserLang.indexOf("ja") === 0) {
      safeSetPreferredLang("ja");
      redirectToLanguage("ja", true);
      return;
    }
  }

  select.value = currentLang;
  select.addEventListener("change", function (event) {
    var selectedLang = event.target.value;
    if (SUPPORTED_LANGS.indexOf(selectedLang) === -1) return;
    safeSetPreferredLang(selectedLang);
    if (selectedLang === currentLang) return;
    redirectToLanguage(selectedLang, false);
  });
})();
