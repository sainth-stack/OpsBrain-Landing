/** Inline script - runs before paint to avoid theme flash */
export const themeInitScript = `(function(){try{var t=localStorage.getItem("opsbrain-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);return}document.documentElement.setAttribute("data-theme","light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export const THEME_STORAGE_KEY = "opsbrain-theme";
