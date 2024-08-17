
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

    if (!option.includes("charset")) {
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
    head.appendChild(elementGenerator("link", { "rel": "stylesheet", "href": "/static/bootstrap/icons/bootstrap-icons.css" }))
    //head.appendChild(elementGenerator("script",{"src":"/static/js/ui/tools.js"}))
    if (option.ace) {
        head.appendChild(elementGenerator("script", { "src": "/static/js/aceeditor/ace.js" }))
        head.appendChild(elementGenerator("script", { "src": "/static/js/aceinit.js" }))
    }
    if (option.chartjs) {
        head.appendChild(elementGenerator("script", { "src": "/static/js/chartjs/chart.js" }))
        head.appendChild(elementGenerator("script", { "src": "/static/js/chartinit.js" }))
    }
    head.appendChild(elementGenerator("link", { "rel": "shortcut icon", "href": option.icon }))
    head.appendChild(elementGenerator("title", { "text": option.title }))
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

function navBarGenerator_Slide(option = []) {
    let body = document.body
    let nav=(elementGenerator("nav", { "class": "navbar fixed-top navtopc" }))
    let container = elementGenerator("div", { "class": "container" })
    let a = elementGenerator("a", { "class": "navbar-brand", "href": option.titlehref?option.titlehref:"/" })
    let img = elementGenerator("img", { "src": option.icon, "alt": "Logo", "width": "30", "height": "30", "class": "d-inline-block align-text-top rounded-circle" })
    let title = elementGenerator("span", { "class": "offcanvas-title", "id": "offcanvasNavbarLabel" })
    let button = elementGenerator("button", { "class": "navbar-toggler", "type": "button", "data-bs-toggle": "offcanvas", "data-bs-target": "#offcanvasNavbar", "aria-controls": "offcanvasNavbar" })
    let span = elementGenerator("span", { "class": "navbar-toggler-icon","type":"button","data-bs-toggle":"offcanvas","data-bs-target":"#offcanvasNavbar","aria-controls":"offcanvasNavbar" })
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
    let h5Offcanvas= elementGenerator("h5", { "class": "offcanvas-title", "id": "offcanvasNavbarLabel" })
    let imgOffcanvas= elementGenerator("img", { "src": option.icon, "alt": "Logo", "width": "30", "height": "30", "class": "d-inline-block align-text-top rounded-circle" })
    offcanvas_header.appendChild(h5Offcanvas)
    h5Offcanvas.appendChild(imgOffcanvas)
    h5Offcanvas.innerHTML += option.title
    offcanvas.appendChild(offcanvas_header)
    nav.appendChild(offcanvas)

    let offcanvas_body = elementGenerator("div", { "class": "offcanvas-body" })
    let ul = elementGenerator("ul", { "class": "navbar-nav justify-content-end flex-grow-1 pe-3" })
    let li = elementGenerator("li", { "class": "nav-item" })
    let a2 = elementGenerator("a", { "class": "nav-link", "id": "wikinaver", "href": "/wiki" })
    let i = elementGenerator("i", { "class": "bi bi-wiki" })
    let hr = elementGenerator("hr")

}