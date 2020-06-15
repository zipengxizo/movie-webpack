import $ from 'jquery';
import { GetQueryString } from '~/assets/js/util/util.js'
export const DetailObj = (function() {

    var DetailRender = function() {};
    DetailRender.prototype.init = function(config) {
        this.container = $(config.id);
        return this;
    }
    DetailRender.prototype.render = function() {
        let movieId = GetQueryString('movieId');
        let self = this;
        $.get(`/api/detailmovie?movieId=${movieId}`).done(function(res) {
            if (res.status === 0) {
                console.log(res)
                let { detailMovie } = res.data;
                let { photos } = res.data.detailMovie;
                let photosStr = ''
                photos.forEach((item) => {
                    photosStr += `<li class="swiper-slide">
                                        <div>
                                            <img src="${item.replace(/w\.h/, "128.180")}" alt="">
                                        </div>
                                    </li>`
                });
                let template = `<div id="content" class="contentDetail">
                    <div class="detail_list">
                        <div class="detail_list_bg"></div>
                        <div class="detail_list_filter"></div>
                        <div class="detail_list_content">
                            <div class="detail_list_img">
                                <img src="${detailMovie.img.replace(/w\.h/, "128.180")}" alt="">
                            </div>
                            <div class="detail_list_info">
                                <h2>${detailMovie.nm}</h2>
                                <p>${detailMovie.enm}</p>
                                <p>${detailMovie.sc}</p>
                                <p>${detailMovie.cat}</p>
                                <p>${detailMovie.src} / ${detailMovie.watched}分钟</p>
                                <p>${detailMovie.pubDesc}</p>
                            </div>
                        </div>
                    </div>
                    <div class="detail_intro">
                        <p>${detailMovie.dra}</p>
                    </div>
                    <div class="detail_player swiper-container">
                        <ul class="swiper-wrapper">
                            ${photosStr}
                        </ul>
                    </div>
                </div>`
                self.container.append(template);
                new Swiper('.detail_player', {
                    slidesPerView: 'auto',
                    freeMode: true,
                    freeModeSticky: true
                });
            }
        });

        return this;

    }
    return DetailRender;

})()