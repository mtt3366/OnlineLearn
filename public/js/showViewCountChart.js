!function(){
    var nameArr = []
    var lengthArr = []
    document.querySelectorAll('.viewHistoryHidden').forEach(function(item){
        nameArr.push(item.getAttribute('data-username'))
        lengthArr.push(item.getAttribute('data-view'))
    })
    
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showViewCountChart'));
    var option = {
        title: {
            text: '各用户总学习次数柱状统计图'
        },
        legend: {
            data:['用户总学习次数']
        },
        color: ['#3398DB'],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : nameArr,
                axisTick: {
                    alignWithLabel: true
                }
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'用户总学习次数',
                type:'bar',
                barWidth: '60%',
                data:lengthArr
            }
        ]
    };
    

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}()