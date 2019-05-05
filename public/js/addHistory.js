$.ajax({
    type: 'post',
    url: '/api/addHistory',
    data: {
        //历史纪录需要：文章的id，文章的title用户的id，用户的id在cookie里面，现在的时间在后台添加
        contentid: $('#contentId').val(),
        contentTitle:$('#contentTitle').text(),
    },
    dataType: 'json',
    success: function(result) {

    }
})
//每次页面重载的时候获取一下该文章的所有历史纪录
$.ajax({
    type: 'get',
    url: '/api/getHistory',
    success: function(responseData) {
        var historyList =responseData.data
        //先反转再去重
        historyList.reverse()
         for(var i = 0; i < historyList.length-1; i++){
            for(var j = i+1; j < historyList.length; j++){
                if(historyList[i].contentId==historyList[j].contentId){
                    historyList.splice(j,1);//console.log(arr[j]);
                   j--;
                }
            }
        }
        
        var str = ''
        var minLength = Math.min(historyList.length,10)
        for (let index = 0; index < minLength; index++) {
            let item = historyList[index];
            str+=`<div class="item">
                    <span class="historyTitle shenglue"><a href="/view?contentid=${item.contentId}" >${item.contentTitle}</a></span></span>—<span class="historyTime">${historyformatDate(item.postTime)}</span>
                 </div>`
        }
        $('#historyArea').html(str)
    }
});
function historyformatDate(d) {
    var date1 = new Date(d);
    return date1.getFullYear() + '/' + (date1.getMonth()+1) + '/' + date1.getDate() + '  ' + date1.getHours() + ':' + date1.getMinutes() + ':' + date1.getSeconds();
}