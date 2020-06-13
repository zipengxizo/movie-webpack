import _ from 'lodash';
import '../src/css/iconfont/iconfont.css';
import '../src/css/common.css'
import deleteSvg from '../src/components/my-component/delete.svg'
import Data from '../src/data/data.xml'

import movie from './js/test/movie.js.js'

import printMe from './js/test/print.js.js';
import { cube } from './js/test/math.js.js';

/* if (process.env.NODE_ENV !== 'production') {
    console.log('Looks like we are in development mode!');
} */

function component() {
    console.log(movie);
    console.log(printMe)
        // 管理资源
    var element = document.createElement('div');
    element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.classList.add('hello');
    console.log(Data);
    var myDeleteSvg = new Image();
    myDeleteSvg.src = deleteSvg;
    myDeleteSvg.width = 20;
    myDeleteSvg.height = 20;
    element.appendChild(myDeleteSvg);
    // 管理输出
    var btn = document.createElement('button');
    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = e =>
        import ( /* webpackChunkName: "math" */ './js/test/math').then(module => {
            var cube = module.cube;
            var pre = document.createElement('p');
            pre.innerHTML = [
                'Hello webpack!',
                '5 cubed is equal to ' +
                cube(5)
            ].join('\n\n');
            element.appendChild(pre);
        });

    // btn.onclick = printMe;
    element.appendChild(btn);

    //tree shaking

    var pre = document.createElement('p');
    pre.innerHTML = [
        'Hello webpack!',
        '5 cubed is equal to ' +
        cube(5)
    ].join('\n\n');
    element.appendChild(pre);
    return element;
}

function getComponent() {
    return import ( /* webpackChunkName: "axios" */ 'axios').then((axios) => {
        console.log(axios);


    }).catch(error => 'An error occurred while loading the component');
}

async function getComponent2() {
    const axios = await
    import ( /* webpackChunkName: "axios" */ 'axios');
    console.log(22, axios);
}

getComponent();

getComponent2();

document.body.appendChild(component());