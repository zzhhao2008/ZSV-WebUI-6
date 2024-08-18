# 1.初始化模板

根目录为`web`
在您的HTML中添加代码：
```html
<script src="/controler/main.js"></script>
<script>
    window.onload = function () {
		uc=new uiControler
		uc.init(<way>,<url>,<option>)
    }
</script>
```
其中`<way>`为请求方式(polling/once/socket/static) String 
`<url>`为请求地址 String 
`<option>`为请求参数 Object 

当way为static时，url无，option为配置信息

当way为polling时，url为请求地址，option为空

当way为once时，url为请求地址，option为请求参数

### 请求参数(可选)：
```js
{
    "tick":1000 //每次请求间隔
}
```
### 请求数据发送格式：
JSON格式，POST请求

数据为全局变量CData内容
```js
CData = {
    nowlocation: window.location.hash,//当前页面hash
    addtion: null  //附加参数
}
```

当way为socket时，进行WebSocket通信

# 2.配置文件
一个常见的示例如下
使用时请删除注释
```js
{
    "head":{
        "title":"SuperUI-ZSV", //标题
        "icon":"icon.jpg" //图标
        "ace":1,//是否启用AceEditor前置
        "chartjs":1,//是否启用Chart.js前置
    },
    "theme":"light",//页面主题，CSS在static/theme下
    "nav":{ //导航栏，删除则不显示
        "title": "",//导航栏标题，默认为head.title
        "children": [ //导航栏项目
            {
                "title": "痴国5",
                "href": "#wiki",
                "icon": "wikipedia"
            }
        ],
        "icon": "/icon.jpg", //导航栏主图标
        "titlehref":"#", //导航栏主链接
        "login":1, //是否启用登录按钮
        "loginname":"登录", //登录按钮名称
        "reg":1 //是否启用注册按钮
    },
    "body":{
        "type":"container",//类型
        "option":{ //可选参数
            "class":"container-fluid" //样式
        }
        "children":[ //子项目
            {
                "type":"abox",
                "innerHTML":"1128" //内容
            },
            {
                "type":"button",
                "innerHTML":"45768",
                "btntype":"danger" //按钮
            }
        ]
    }
}
```
## 内置组件
### abox
一个带有背景的盒子，可以放置任何内容
```js
{
    "type":"abox",
}
```
### button
一个按钮，可以放置任何内容
```js
{
    "type":"button",
    "innerHTML":"按钮内容",
    "btntype":"danger" //按钮类型，可选
    "onclick":"" //点击事件
}
```
### container
Bootstrap容器，可以放置任何内容
### row
Bootstrap行
### col
Bootstrap列
```js
{
    "type":"col",
    "colsize":12 //列大小，可选
}
```
### a
一个链接
```js
{
    "type":"a",
    "innerHTML":"链接内容",
    "href":"链接地址"
}
```

## 外部自定义组件
### AceEditor
AceEditor编辑器，需要启用AceEditor前置

JS见/static/js/aceinit.js
```js

/**
 * 添加一个Aceeditor
 * @param {string} outname 输出值的名字
 * @param {element} element 插入的元素
 * @param {string} content 默认内容
 * @param {string} language 语言
 * @param {string} theme 主题
 * @returns id EditorControlerID
 */
function initEditor(outname = 0, element = document.body, content = "", language = "markdown", theme = "tomorrow")

function Ace_theme(theme, id = 0)

function Ace_language(language, id = 0)

function Ace_fontSize(size, id = 0)

function Ace_getId(outname)

function Ace_changeable(id, able = true)

function Ace_setValue(content, id = 0)

function Ace_getValue(id = 0)

function Ace_setOutputBand(outname, id)

```
### chartjs
Chart.js图表，需要启用Chart.js前置

JS见/static/js/chartinit.js
```JS
class eChart {
    setId(id) //设置图表的ID
    setType(type) //设置图表类型
    setLabels(labels) //设置标签
    addData(label, newdata, color="") //添加数据
    resetData(dataid,label, newdata, color="") //重置数据
}
```
### 示例
```JS
        data = {
            "id": "myChart",
            "type": "radar",
            "labels": [
                "语文",
                "数学",
                "英语",
                "物理",
                "化学",
                "政治",
                "总分"
            ],
            "datas": [
                {
                    "label": "历史得分率(%)",
                    "data": [
                        41.3,
                        95.65,
                        86.96,
                        73.91,
                        86.96,
                        91.3,
                        86.96
                    ],
                    "color": "red"
                },
                {
                    "label": "本次得分率(%)",
                    "data": [
                        41.66666666666667,
                        75,
                        87.5,
                        100,
                        97.91666666666666,
                        85.41666666666666,
                        81.25
                    ],
                    "color": "blue"
                },
            ],

        }
        //allChart(data)
        chart=new eChart()
        chart.setType("bar")
        chart.setLabels(data.labels)
        chart.addData(data.datas[1].label, data.datas[1].data, data.datas[1].color)
        chart.addData(data.datas[0].label, data.datas[0].data, data.datas[0].color)

        chart.show(document.body)
```