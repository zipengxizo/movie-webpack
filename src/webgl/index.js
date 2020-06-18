import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import Stats from 'three/examples/jsm/libs/stats.module'
import './css/webgl.css'
import xbot from './gl/LittlestTokyo.glb'
// 一个旋转的正方体
var scence = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var geometry = new THREE.BoxGeometry();
var meterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
var cube = new THREE.Mesh(geometry, meterial);
scence.add(cube);
camera.position.z = 5;

function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;
    renderer.render(scence, camera);

}
animate();

// 划线
/* var renderer = new THREE.WebGLRenderer();

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 500);
camera.position.set(0, 0, 100)
camera.lookAt(0, 0, 0);

var scene = new THREE.Scene();

var meterial = new THREE.LineBasicMaterial({ color: 0x0000ff })

var points = []
points.push(new THREE.Vector3(-10, 0, 0))
points.push(new THREE.Vector3(0, 10, 0))
points.push(new THREE.Vector3(10, 0, 0))
var geometry = new THREE.BufferGeometry().setFromPoints(points)
var line = new THREE.Line(geometry, meterial)

scene.add(line)
renderer.render(scene, camera) */

// 创建文字
// css样式处理

// 载入3D模型
/* var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement);

var camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 600)
camera.position.set(0, 0, 10)

var scene = new THREE.Scene();

var loader = new GLTFLoader();

loader.load(`../${xbot}`, function(gltf) {
    scene.add(gltf.scene);

}, undefined, function(error) {
    console.error(error);

});

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);

}

animate();
 */


/* var scene, camera, dirLight, stats;
var renderer, mixer, controls;

var clock = new THREE.Clock();
var container = document.getElementById('container');
stats = new Stats();
container.appendChild(stats.dom);

renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.outputEncoding = THREE.sRGBEncoding;
container.appendChild(renderer.domElement);

scene = new THREE.Scene();
scene.background = new THREE.Color(0xbfe3dd);

camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 100);
camera.position.set(5, 2, 8);

controls = new OrbitControls(camera, renderer.domElement);
controls.target.set(0, 0.5, 0);
controls.update();
controls.enablePan = false;
controls.enableDamping = true;

scene.add(new THREE.HemisphereLight(0xffffff, 0x000000, 0.4));

dirLight = new THREE.DirectionalLight(0xffffff, 1);
dirLight.position.set(5, 2, 8);
scene.add(dirLight); */

// envmap
/* var path = 'textures/cube/Park2/';
var format = '.jpg';
var envMap = new THREE.CubeTextureLoader().load([
    path + 'posx' + format, path + 'negx' + format,
    path + 'posy' + format, path + 'negy' + format,
    path + 'posz' + format, path + 'negz' + format
]);
 */
/* var dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath('js/libs/draco/gltf/');

var loader = new GLTFLoader();
loader.setDRACOLoader(dracoLoader);
loader.load(`../${xbot}`, function(gltf) {

    var model = gltf.scene;
    model.position.set(1, 1, 0);
    model.scale.set(0.01, 0.01, 0.01);
    model.traverse(function(child) {

        // if (child.isMesh) child.material.envMap = envMap;

    });

    scene.add(model);

    mixer = new THREE.AnimationMixer(model);
    mixer.clipAction(gltf.animations[0]).play();

    animate();

}, undefined, function(e) {

    console.error(e);

});


window.onresize = function() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

};


function animate() {

    requestAnimationFrame(animate);

    var delta = clock.getDelta();

    mixer.update(delta);

    controls.update();

    stats.update();

    renderer.render(scene, camera);

} */