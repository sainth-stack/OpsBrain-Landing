/** Inline script - runs before paint to avoid theme flash */
export const themeInitScript = `(function(){try{var k="opsbrain-theme";var t=localStorage.getItem(k);if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t);return}var d=window.matchMedia("(prefers-color-scheme: dark)").matches;document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){document.documentElement.setAttribute("data-theme","light")}})();`;

export const THEME_STORAGE_KEY = "opsbrain-theme";

export const THEME_CHANGE_EVENT = "opsbrain-theme-change";
