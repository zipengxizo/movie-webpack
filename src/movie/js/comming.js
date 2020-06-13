import $ from 'jquery';
// var $ = require('jqeury');
// import axios from 'axios'

export var movieObject = (function() {
    var _bind = function(obj) {
        console.log(1111, obj)
        obj.container.on('click', '.pic_show', function() {
            console.log('goto detail page');
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
                    console.log(res)
                    movieList.forEach(item => {
                        itemMovie += `<li>
                            <div class="pic_show" data-movieId="${item.id}">
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