// 搜索课程
$('#searchBtn').on('click',function(){
    //通过ajax提交请求
    $.ajax({
        type: 'post',
        url: '/searchContent',
        data: {
            contentTitle:$('#searchInput').val(),
        },
        dataType: 'json',
        success: function(result) {
            console.log(result);
            
            if(result.contents.length>0){
                alert('搜索成功') 
            }else{
                alert('暂未搜索到结果')
                return
            }
            var str = ``
            for (let index = 0; index < result.contents.length; index++) {
                const content = result.contents[index];
                //|date('Y年m月d日 H:i:s', -8*60)
                str+=`
                <div class="listBox">
                <h1>${content.title}</h1>
                <p class="colDefault">
                    作者：<span class="colInfo">${content.user.username}</span> -
                    时间：<span class="colInfo">${content.addTime}</span> -
                    阅读：<span class="colInfo">${content.views}</span> -
                    评论：<span class="colInfo">${content.comments.length}</span>
                </p>
                <dfn>
                    <p>
                        <span class="jianjie">课程简介</span>${content.description}
                        
                    </p>
                    <p><span class="jianjie">课程Tag</span><span class='kechengtag'>${content.category.name}</span></p>
            
                </dfn>
                <div><span class="jianjie">课程封面</span><img src="public/showCover/${content.coverUrl}" alt="" width="400px" height="255px" style="display:block;margin:0 auto"></div>
                <div class="function"><a href="/view?contentid=${content._id}">开始学习</a></div>
            </div>
                `
            }
            $('#contentList').html(str)
            $('.pager').hide()
            
        }
    })
})