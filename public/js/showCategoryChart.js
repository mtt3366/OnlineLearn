$(function(){
    var nameArr = []
    var lengthArr = []
    document.querySelectorAll('.categoryNameItem').forEach(function(item){
        nameArr.push(item.getAttribute('data-vla'))
    })
    document.querySelectorAll('.categoryLengthItem').forEach(function(item){
        lengthArr.push(item.getAttribute('data-vla'))
    })
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showCategoryChart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各分类课程数量统计'
        },
        tooltip: {},
        legend: {
            data:['数量']
        },
        xAxis: {
            data: nameArr
        },
        yAxis: {},
        series: [{
            name: '数量',
            type: 'bar',
            data: lengthArr
        }]
    };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
})