// import $ from 'jquery';
var $ = require('jquery');

export var movieObject = (function() {
    var _bind = function(obj) {
        obj.container.on('click', '.pic_show', function() {
            let movieId = $(this).data('movieid');
            window.location.href = `../detail/detail.html?movieId=${movieId}`;
        })
    }
    var MovieRender = function() {};

    MovieRender.prototype.init = function(config) {
        this.container = $(config.id);
        _bind(this);
        return this;
    }
    MovieRender.prototype.render = function() {
        var itemBefore = `<div class="movie_body"><ul>`,
            itemAftr = `</ul></div>`,
            itemMovie = '';
        $.post("http://127.0.0.1:3002/api2/movie/movieOnInfoList")
            .done(function(res) {
                if (res.status === 0) {
                    let { movieList } = res.data;
                    movieList.forEach(item => {
                        itemMovie += `<li>
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
                    $('#content').append(itemBefore + itemMovie + itemAftr);
                }
            })
    }

    return MovieRender;

})()