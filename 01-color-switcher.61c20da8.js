const t=document.querySelector("[data-start]"),e=document.querySelector("[data-stop]");let r=null;function d(){return`#${Math.floor(16777215*Math.random()).toString(16)}`}e.setAttribute("disabled",!0),t.addEventListener("click",(()=>{t.setAttribute("disabled",!0),e.removeAttribute("disabled"),document.body.style.backgroundColor=d(),r=setInterval((()=>{document.body.style.backgroundColor=d()}),1e3)})),e.addEventListener("click",(()=>{e.setAttribute("disabled",!0),t.removeAttribute("disabled"),clearInterval(r)}));
//# sourceMappingURL=01-color-switcher.61c20da8.js.map