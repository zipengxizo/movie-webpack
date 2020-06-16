import '../../assets/css/iconfont/iconfont.css';
import '../../assets/css/common.css'
import './css/movie.css'

import { movieObject } from './js/comming.js';
import moment from 'moment';
console.log(moment().format());

// 获取电影列表
new movieObject().init({ id: '.movie_body ul' }).render();