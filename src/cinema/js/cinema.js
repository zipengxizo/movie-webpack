import $ from 'jquery';

import { getScrollTop, getClientHeight, getScrollHeight } from '~/assets/js/util/util.js'

export const CinemaObj = (function() {
    var Cinema = function() {};
    var _bindLoadMore = function(self) {
        window.onscroll = function() {
            if (getScrollTop() + getClientHeight() === getScrollHeight()) {
                _fethCinemaData(self)
            }
        }
    }
    var _fethCinemaData = function(self) {
        $.get('/api/cinemaList?cityId=10').done(function(res) {
            let { msg } = res;
            let { cinemas } = res.data;
            let cinemasAppend = '';
            if (msg === 'ok') {
                cinemas.forEach(item => {
                    cinemasAppend += `<li>
                                        <div>
                                            <span>${item.nm}</span>
                                            <span class="q"><span class="price">${item.sellPrice}</span> 元起</span>
                                        </div>
                                        <div class="address">
                                            <span>${item.addr}</span>
                                            <span>${item.distance}</span>
                                        </div>
                                        <div class="card">
                                            <div>小吃</div>
                                            <div>折扣卡</div>
                                        </div>
                                    </li>`
                });
                self.container.append(cinemasAppend);
            }
        })
    }
    Cinema.prototype.init = function(config) {
        this.container = $(config.id);
        _bindLoadMore(this);
        return this;
    }


    Cinema.prototype.render = function() {
        _fethCinemaData(this);
    }
    return Cinema;
})()