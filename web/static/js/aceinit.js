var editors = []
var outnameToID = []

/**
 * 添加一个Aceeditor
 * @param {string} outname 输出值的名字
 * @param {element} element 插入的元素
 * @param {string} content 默认内容
 * @param {string} language 语言
 * @param {string} theme 主题
 * @returns id EditorControlerID
 */
function initEditor(outname = 0, element = document.body, content = "", language = "markdown", theme = "tomorrow") {
    id = editors.length
    if (outname !== 0) outnameToID[outname] = id

    var editordiv = document.createElement("div");
    var editor = document.createElement("pre");
    editordiv.id = "ace-" + id;
    editor.id = "codeEditor" + id;
    editor.className = "ace_editor";
    editor.style = "min-height:320px";
    editor.innerHTML = "<textarea class='ace_text-input' style='width:97.5%;height:320px;'></textarea>";
    editordiv.appendChild(editor);
    element.appendChild(editordiv);

    editors[id] = ace.edit("codeEditor" + id);
    editors[id].setTheme("ace/theme/" + theme);
    editors[id].session.setMode("ace/mode/" + language);
    //字体大小
    editors[id].setFontSize(15);
    //设置只读（true时只读，用于展示代码）
    editors[id].setReadOnly(outname === 0);
    //自动换行,设置为off关闭
    editors[id].setOption("wrap", "free");
    //启用提示菜单
    ace.require("ace/ext/language_tools");

    if (content !== "") {
        editors[id].setValue(content);
    }

    if (outname !== 0) {
        //添加input
        var input = document.createElement("input");
        input.id = "ace-out-" + outname;
        input.name = outname;
        input.type = "hidden";
        element.appendChild(input);
        editors[id].getSession().on('change', function () {
            document.getElementById("ace-out-" + outname).value =
                editors[id].getValue();
        });
    }
    return id
}

function Ace_theme(theme, id = 0) {
    return editors[id].setTheme("ace/theme/" + theme);
}

function Ace_language(language, id = 0) {
    return editors[id].session.setMode("ace/mode/" + language);
}

function Ace_fontSize(size, id = 0) {
    return editors[id].setFontSize(size);
}

function Ace_getId(outname) {
    return outnameToID[outname] ? outnameToID[outname] : 0
}

function Ace_changeable(id, able = true) {
    return editors[id].setReadOnly(!able);
}

function Ace_setValue(content, id = 0) {
    return editors[id].setValue(content);
}

function Ace_getValue(id = 0) {
    return editors[id].getValue();
}

function Ace_setOutputBand(outname, id) {
    outnameToID[outname] = id
    editors[id].getSession().on('change', function () {
        document.getElementById("ace-out-" + outname).value =
            editors[id].getValue();
    })
}