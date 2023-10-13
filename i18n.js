var language = localStorage.getItem("language") || "zh-cn";
localStorage.setItem("language", language);

document.onreadystatechange = (state) => {
    if (document.readyState === "complete") {
        change_change(language)
    }
}

function change_change(language) {
    let script = document.createElement("script")
    script.onload = function (obj) {
        // let inputs = document.getElementsByTagName("input");
        document.dispatchEvent(new Event('lanDataLoaded'));
        translate()
    }
    script.src = `./${language}.js`
    document.body.appendChild(script);
}

function translate() {
    let inputs = document.all;
    for (let i of inputs) {
        let attr = i.getAttribute("language");
        if (attr) {
            i['placeholder'] = lan_data[attr];
            if (i['childNodes'][0]) {
                i['childNodes'][0]['data'] = lan_data[attr]
            }
            if (i['title']) {
                i['title'] = lan_data[attr]
            }
        }
    }
}