var allCommentCharts = document.querySelectorAll('.commentChart')
allCommentCharts.forEach(function (item) {

    var contentTitle = item.getAttribute('contentTitle')
    var contentViews = Number(item.getAttribute('contentViews'))
    var commentsLength = Number(item.getAttribute('commentsLength'))
    
    var myChart = echarts.init(item);
    var option = null;
    option = {
        title : {
            text: contentTitle+'数据饼图',
            subtext: '学习次数与评论次数对比图',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            orient: 'vertical',
            left: 'left',
            data: ['课程学习数','评论数']
        },
        series : [
            {
                name: '访问来源',
                type: 'pie',
                radius : '55%',
                center: ['50%', '60%'],
                data:[
                    {value:contentViews, name:'课程学习数'},
                    {value:commentsLength, name:'评论数'},
                ],
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    ;
    if (option && typeof option === "object") {
        myChart.setOption(option, true);
    }
})