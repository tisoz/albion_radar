let language = ["zh-cn", "en"]
let choice = 0;

document.onreadystatechange = (state) => {
    if (document.readyState == "complete") {
        let language_script = language[choice];
        change_change(language_script)
    }
}

function change_change(language) {
    let script = document.createElement("script")
    script.onload = function (obj) {
        // let inputs = document.getElementsByTagName("input");
        let inputs = document.all;
        for (let i of inputs) {
            let attr = i.getAttribute("language");
            if (attr) {
                i['placeholder'] = lan_data[attr];
                i['textContent'] = lan_data[attr];
                if (i['title']){
                    i['title'] = lan_data[attr]
                }
            }
        }
    }
    script.src = "./zh-cn.js"
    document.body.appendChild(script);
}
