function renderSwiper(){
     // 渲染数据
//通过ajax提交请求
    $.ajax({
        type: 'post',
        url: '/tuijianContent',
        data: {
            contentTitle:$('#tuijianInput').val(),
        },
        dataType: 'json',
        success: function(result) {
            console.log(result);
            
            if(result.contents.length<=0){
                alert('暂未添加这方面的课程')
                return
            }
            var str = ``
            var length = Math.min(result.contents.length,10)
            for (let index = 0; index < length; index++) {
                const content = result.contents[index];
                str+=`
                <div class="swiper-slide">
                    <img src="/public/showCover/${content.coverUrl}" alt="" width="226px">
                    <div class="itemTitle">${content.title}</div>
                    <div class="kaishixuexi"><a href="/view?contentid=${content._id}">开始学习</a></div>
                </div>
                `
            }
            $('#swiper-wrapper').html(str)
            var swiper = new Swiper('.swiper-container', {
                autoplay:{
                    delay: 1000,//1秒切换一次
                    stopOnLastSlide: false,
                    disableOnInteraction: true,
                },
                
                slidesPerView: 3,
                spaceBetween: 30,
                pagination: {
                  el: '.swiper-pagination',
                  clickable: true,
                },
              });
            
        }
    })
}
renderSwiper()
$('#tuijianBtn').on('click',function(){
    renderSwiper()
})




//   渲染数据

