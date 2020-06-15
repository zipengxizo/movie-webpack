import $ from 'jquery';

import { checkIsTotalVisible } from '~/assets/js/util/util.js'

export const movieObject = (function() {
    // throttle
    var canLoade = true //节流、防抖
    let _getthrottle = function(self) {
        if (canLoade) {
            // 防止频繁触发滚动条事件
            canLoade = false
            setTimeout(() => {
                canLoade = true
            }, 800);
            _fetchMovie(self)

        }

    }
    let _bind = function(self) {
        self.container.on('click', '.pic_show', function() {
            let movieId = $(this).data('movieid');
            window.location.href = `../detail/detail.html?movieId=${movieId}`;
        });
        document.addEventListener('scroll', function() {
            if (checkIsTotalVisible(document.querySelector('.infinite-scroll-signal'))) {
                _getthrottle(self);
            }
        }, true)

    };
    let _fetchMovie = function(self) {
        let itemMovie = '';
        $.get("/api/movieOnInfoList")
            .done(function(res) {
                if (res.status === 0) {
                    let { movieList } = res.data;
                    movieList.forEach(item => {
                        itemMovie += `<li id="li-loadmore">
                        <div class="pic_show" data-movieid="${item.id}">
                            <img src="${item.img.replace(/w\.h/, "128.180")}">
                        </div>
                        <div class="info_list">
                            <h2>${item.nm}</h2>
                            <p><span class="person">${item.wish}</span> 人想看</p>
                            <p>主演: ${item.star}</p>
                            <p>${item.rt}上映</p>
                        </div>
                        <div class="btn_pre">
                            预售
                        </div>
                    </li>`
                    });
                    self.container.append(itemMovie);
                }
            })

    }
    let MovieRender = function() {};

    MovieRender.prototype.init = function(config) {
        this.container = $(config.id);
        _bind(this);
        return this;
    }
    MovieRender.prototype.render = function() {
        _fetchMovie(this);

    }

    return MovieRender;

})()