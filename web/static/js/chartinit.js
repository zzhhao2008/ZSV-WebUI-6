
const colors = {
    "red": {
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    },
    "blue": {
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    },
    "green": {
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgb(75, 192, 192)',
        pointBackgroundColor: 'rgb(75, 192, 192)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(75, 192, 192)'
    },
    "yellow": {
        backgroundColor: 'rgba(255, 206, 86, 0.2)',
        borderColor: 'rgb(255, 206, 86)',
        pointBackgroundColor: 'rgb(255, 206, 86)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 206, 86)'
    },
    "orange": {
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgb(255, 159, 64)',
        pointBackgroundColor: 'rgb(255, 159, 64)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 159, 64)'
    }
};

class eChart {
    constructor(data = []) {
        this.data = data;
        this.data.datasets = [];
        this.showed=0;
        this.element=document.body;
    }
    setId(id) {
        if(this.showed){
            console.warn("Failed To Set Id, The Chart Is Already Shown");
            return;
        }
        this.data.id = id;
    }
    setType(type) {
        this.data.type = type;
        this.reshow()
    }
    setLabels(labels) {
        if(labels.length < this.data.datasets.length){
            console.warn("Failed To Set Labels, The Length Of Labels Is Not Equal To The Length Of Data");
            return;
        }
        this.data.labels = labels;
        this.reshow()
    }
    addData(label, newdata, color="") {
        if (newdata.lenght > this.data.labels.length) {
            console.warn("Failed To Add Data, The Length Of Data Is Not Equal To The Length Of Labels");
            return;
        }
        var nd = { 
            label: label, 
            data: newdata, 
        }
        nd.fill=true
        if(colors[color]){
            nd={ ...nd, ...colors[color] }
        } else {
            nd.backgroundColor = color;
            nd.borderColor = color;
            nd.pointBackgroundColor = color;
            nd.pointBorderColor = color;
            nd.pointHoverBackgroundColor = color;
            nd.pointHoverBorderColor = color;
        }
        this.data.datasets.push(nd);
        this.reshow();
        return this.data.datasets.length-1
    }
    resetData(dataid,label, newdata, color=""){
        if(!this.data.datasets[dataid]){
            console.warn("Failed To Reset Data, The Data isn't Defined");
            return 0;
        }
        this.data.datasets[dataid].label=label;
        this.data.datasets[dataid].data=newdata;
        if(colors[color]){
            this.data.datasets[dataid]={ ...this.data.datasets[dataid], ...colors[color] }
        }
        this.reshow()
        return 1;
    }
    deldata(){
        this.data.datasets=[]
    }
    show(element) {
        if (!element) {
            console.warn("Failed To Show Chart, The Element Is Not Defined");
        }
        if (!this.data.id) {
            console.warn("Failed in Showing Chart, The Id Is Not Defined.Auto Defined");
            this.data.id = "chart" + Math.random().toString(36).substr(2, 9);
        }
        if (!this.data.type) {
            console.warn("Failed To Show Chart, The Type Is Not Defined");
            return;
        }
        if (!this.data.labels) {
            console.warn("Failed To Show Chart, The Labels Is Not Defined");
            return;
        }
        if (!this.data.datasets) {
            console.warn("Failed To Show Chart, The Datas Is Not Defined");
            return;
        }

        let lastOne=document.getElementById(this.data.id)
        if(lastOne){
            lastOne.remove()
        }

        var canvas = document.createElement("canvas");
        canvas.id = this.data.id;
        this.element = element;
        this.showed = true;
        element.appendChild(canvas);

        data={
            labels: this.data.labels,
            datasets: this.data.datasets,
            borderWidth : 2
        }
        const config = {
            type: this.data.type,
            data: data,
            options: {
                responsive: false, // 设置图表为响应式，根据屏幕窗口变化而变化
                maintainAspectRatio: true,// 保持图表原有比例
                elements: {
                    line: {
                        borderWidth: 3 // 设置线条宽度
                    }
                },
            }
        }
        new Chart(canvas, config);
        return this.data.id
    }
    reshow(){
        if(this.showed){
            this.show(this.element);
        }
    }
}
