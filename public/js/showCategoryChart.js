!function(){
    var nameArr = []
    var lengthArr = []
    console.log(1);
    document.querySelectorAll('.categoryNameItem').forEach(function(item){
        nameArr.push(item.getAttribute('data-vla'))
    })
    document.querySelectorAll('.categoryLengthItem').forEach(function(item){
        lengthArr.push(item.getAttribute('data-vla'))
    })
    console.log(nameArr);
    // 基于准备好的dom，初始化echarts实例
    var myChart = echarts.init(document.getElementById('showCategoryChart'));
    // 指定图表的配置项和数据
    var option = {
        title: {
            text: '各分类课程数量柱状统计图'
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

    // var option = {
    //     title: {
    //         text: '各分类课程数量柱状统计图'
    //     },
    //     legend: {
    //         data:['各分类课程数量']
    //     },
    //     color: ['#c23531'],
    //     tooltip : {
    //         trigger: 'axis',
    //         axisPointer : {            // 坐标轴指示器，坐标轴触发有效
    //             type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
    //         }
    //     },
    //     grid: {
    //         left: '3%',
    //         right: '4%',
    //         bottom: '3%',
    //         containLabel: true
    //     },
    //     xAxis : [
    //         {
    //             type : 'category',
    //             data : nameArr,
    //             axisTick: {
    //                 alignWithLabel: true
    //             }
    //         }
    //     ],
    //     yAxis : [
    //         {
    //             type : 'value'
    //         }
    //     ],
    //     series : [
    //         {
    //             name:'各分类课程数量',
    //             type:'bar',
    //             barWidth: '60%',
    //             data:lengthArr
    //         }
    //     ]
    // };

    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);
}()