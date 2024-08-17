let CData = {
    nowlocation: window.location.hash,
    addtion: null
}

let backData = {}

function elementGenerator(type, options = []) {
    let element = document.createElement(type);
    //遍历option并设置
    for (let i in options) {
        element.setAttribute(i, options[i])
    }
    return element;
}

function headGenerator(option = []) {
    let head = document.head

    if (!option.charset) {
        option.charset = "UTF-8"
    }
    if (!option.icon) {
        option.icon = "/icon.jpg"
    }
    if (!option.title) {
        option.title = "SuperUI"
    }

    head.appendChild(elementGenerator("meta", { "charset": option.charset }))

    head.appendChild(elementGenerator("meta", { "http-equiv": "X-UA-Compatible", "content": "IE=edge" }))
    head.appendChild(elementGenerator("meta", { "name": "viewport", "content": "width=device-width, initial-scale=1.0" }))
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/bootstrap/5.3.2/css/bootstrap.min.css" }))
    head.appendChild(elementGenerator("script", { "src": "/static/bootstrap/5.3.2/js/bootstrap.bundle.min.js" }))
    //head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/bootstrap/icons/bootstrap-icons.css" }))
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/bootstrap/icons/bootstrap-icons.css" }))
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/css/public.css" }))
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/css/tool.css" }))
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/css/c19.css" }))
    if (option.ace) {
        head.appendChild(elementGenerator("script", { "src": "/static/js/aceeditor/ace.js" }))
        head.appendChild(elementGenerator("script", { "src": "/static/js/aceinit.js" }))
    }
    if (option.chartjs) {
        head.appendChild(elementGenerator("script", { "src": "/static/js/chartjs/chart.js" }))
        head.appendChild(elementGenerator("script", { "src": "/static/js/chartinit.js" }))
    }
    head.appendChild(elementGenerator("link", { "rel": "shortcut icon", "href": option.icon }))
    document.title = option.title
}

function themeLoader(theme = "light") {
    document.head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/theme/" + theme + ".css", "id": "themel" }))
}

function objCmp(o1, o2, es = [], debug = 0) {
    if (o1.length != o2.length) return false
    for (let i in o1) {
        if (es.includes(i)) continue
        if (typeof o1[i] != typeof o2[i]) return false
        else {
            if (typeof o1[i] == "object" || typeof o2[i] == "array") {
                if (!objCmp(o1[i], o2[i], es, debug)) return false
            }
            else if(o1[i] != o2[i]) {
                if (debug) {
                    console.log(i, o1[i], o2[i])
                }
                return false
            }
        }

    }
    return true
}


/**
 * 生成一个侧滑导航栏
 * TreeOfOption:
 * {
 * "title":""
 * "icon":""
 * "titlehref":""
 * "children":[
        {"title":"",href:""}
    ]
 * }
 * @param {Object} option 
 */
function navBarGenerator_Slide(option_o = []) {
    //复制一个option
    let option = JSON.parse(JSON.stringify(option_o))
    if (!option.title) {
        option.title = document.title
    }
    if (!option.icon) {
        option.icon = "/icon.jpg"
    }
    if (!option.titlehref) {
        option.titlehref = "/"
    }

    let body = document.body
    let nav = (elementGenerator("nav", { "class": "navbar fixed-top navtopc", "id": "navslide" }))
    let container = elementGenerator("div", { "class": "container" })
    let a = elementGenerator("a", { "class": "navbar-brand", "href": option.titlehref ? option.titlehref : "/" })
    let img = elementGenerator("img", { "src": option.icon, "alt": "Logo", "width": "30", "height": "30", "class": "d-inline-block align-text-top rounded-circle" })
    let title = elementGenerator("span", { "class": "offcanvas-title", "id": "offcanvasNavbarLabel" })
    let button = elementGenerator("button", { "class": "navbar-toggler", "type": "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#offcanvasNavbar", "aria-controls": "offcanvasNavbar" })
    let span = elementGenerator("span", { "class": "navbar-toggler-icon", "type": "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#offcanvasNavbar", "aria-controls": "offcanvasNavbar" })
    container.appendChild(a)
    a.appendChild(img)
    a.appendChild(title)
    title.innerHTML = option.title
    container.appendChild(button)
    button.appendChild(span)
    nav.appendChild(container)
    body.appendChild(nav)

    let offcanvas = elementGenerator("div", { "class": "offcanvas offcanvas-start navmainc", "tabindex": "-1", "id": "offcanvasNavbar", "aria-labelledby": "offcanvasNavbarLabel" })
    let offcanvas_header = elementGenerator("div", { "class": "offcanvas-header" })
    let h5Offcanvas = elementGenerator("h5", { "class": "offcanvas-title", "id": "offcanvasNavbarLabel" })
    let imgOffcanvas = elementGenerator("img", { "src": option.icon, "alt": "Logo", "width": "30", "height": "30", "class": "d-inline-block align-text-top rounded-circle" })
    offcanvas_header.appendChild(h5Offcanvas)
    h5Offcanvas.appendChild(imgOffcanvas)
    h5Offcanvas.innerHTML += option.title
    offcanvas.appendChild(offcanvas_header)
    nav.appendChild(offcanvas)

    let offcanvas_body = elementGenerator("div", { "class": "offcanvas-body" })
    offcanvas.appendChild(offcanvas_body)
    let offcanvas_ul = elementGenerator("ul", { "class": "navbar-nav justify-content-end flex-grow-1 pe-3" })
    offcanvas_body.appendChild(offcanvas_ul)
    let hr_inul = elementGenerator("li", { "class": "border-top my-3" })
    option.children.forEach(element => {
        if (!element.title) {
            offcanvas_ul.appendChild(hr_inul)
            return
        }
        if (!element.icon) {
            element.icon = "list"
        }
        if (!element.href) {
            element.href = "#" + element.title
        }
        let li = elementGenerator("li", { "class": "nav-item" })
        let a = elementGenerator("a", { "class": "nav-link", "href": element.href })
        a.innerHTML = `<i class='bi bi-` + element.icon + `'></i>` + element.title
        li.appendChild(a)
        offcanvas_ul.appendChild(li)
    })
    offcanvas_ul.appendChild(hr_inul)

    if (option.login == 1) {
        let li_login = elementGenerator("li", { "class": "nav-item" })
        let a_login = elementGenerator("a", { "class": "nav-link", "href": option.loginhref ?? "#profile" })
        a_login.innerHTML = `<i class='bi bi-person-circle'></i>` + (option.loginname ?? "登录")
        li_login.appendChild(a_login)
        offcanvas_ul.appendChild(li_login)
    }
    if (option.reg == 1) {
        let li_reg = elementGenerator("li", { "class": "nav-item" })
        let a_reg = elementGenerator("a", { "class": "nav-link", "href": option.reghref ?? "#register" })
        a_reg.innerHTML = `<i class='bi bi-person-fill-add'></i>` + ("注册")
        li_reg.appendChild(a_reg)
        offcanvas_ul.appendChild(li_reg)
    }

}

window.onhashchange = function () {
    console.log(window.location.hash)
    CData.nowlocation = window.location.hash
}

class uiControler {
    constructor() {
        this.polling = 0
        this.socket = 0
        this.pollingurl = ""
        this.pollingoption = {}
        this.socketurl = ""
        this.socketoption = {}
        this.pollingfunction = null
        this.socketfunction = null
        this.firtsTime = 1
    }

    init(way, url, option = {}) {
        switch (way) {
            case "polling":
                this.polling = 1
                this.pollingurl = url
                this.pollingoption = option
                if (!option.tick) {
                    this.pollingoption.tick = 1000
                }
                if (!option.method) {
                    this.pollingoption.method = "POST"
                }
                this.pollingfunction = setInterval(() => {
                    if (this.polling == 1)
                        fetch(this.pollingurl, { body: JSON.stringify(CData), method: this.pollingoption.method })
                            .then(res => res.json())
                            .then(res => {
                                this.dataBack(res)
                            })
                }, this.pollingoption.tick)
                break
            case "once":
                this.polling = 0
                this.socket = 0
                this.pollingurl = url
                this.pollingoption = option
                if (!option.method) {
                    this.pollingoption.method = "POST"
                }
                fetch(this.pollingurl, { body: JSON.stringify(CData), method: this.pollingoption.method })
                    .then(res => res.json())
                    .then(res => {
                        this.dataBack(res)
                    })
                break
            case "socket":
                this.socket = 1
                this.socketurl = url
                this.socketoption = option
                this.socketfunction = new WebSocket(this.socketurl)
                this.socketfunction.onmessage = (event) => {
                    this.dataBack(JSON.parse(event.data))
                }
                this.socketfunction.onopen = () => {
                    this.socketfunction.send(JSON.stringify(CData))
                }
                this.socketfunction.onclose = () => {
                    console.error("socket closed")
                    alert("WebSocket通信错误，无法继续！")
                }
                window.onhashchange = function () {
                    CData.nowlocation = window.location.hash
                    console.log(CData)
                    this.socketfunction.send(JSON.stringify(CData))
                }
                break;
            case "static":
                this.polling = 0
                this.socket = 0
                this.dataBack(option)
                break;
            default:
                console.error("way error")
                break
        }
    }

    dataBack(data) {
        //console.log(data)

        if (this.firtsTime) {
            backData = data
            this.data = data
            this.firtsTime = 0
            headGenerator(data.head)
            if (this.data.nav) {
                this.generateNav()
            }
            themeLoader(this.data.theme)
        }
        this.data = data
        if (this.data == backData) {
            return
        }
        if (!objCmp(this.data.head, backData.head)) {
            document.title = this.data.head.title
            if (!objCmp(this.data.head, backData.head, ['title'])) {
                if (this.polling == 1) {
                    this.polling = 0
                    clearInterval(this.pollingfunction)
                }
                if (confirm("检测到页面根需要修改，是否继续？"))
                    window.location.reload()
            }
        }
        if (!objCmp(this.data.nav, backData.nav)) {
            console.log("nav changed")
            let last = document.getElementById("nav" + (backData.nav.type??"slide"))
            if (last) last.remove()
                //console.log("nav" + backData.nav.type??"slide")
            this.generateNav(this.data)
        }
        backData = this.data
    }

    generateNav() {
        if (!this.data.nav.type) this.data.nav.type = "slide"
        switch (this.data.nav.type) {
            case "slide":
                navBarGenerator_Slide(this.data.nav)
                break;
            default:
                console.error("nav type error")
                this.data.nav.type = "slide"
                navBarGenerator_Slide(this.data.nav)
                break;
        }
    }

}