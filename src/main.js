import * as THREE from 'three';

import * as vertexShader from './vertex.glsl.js';
import * as fragmentShader from './fragment.glsl.js';

const clock = new THREE.Clock();


function main() {
	let container;
	let camera, scene, renderer;

	init();
	animate();

	function init() {

		container = document.getElementById('container');

		camera = new THREE.OrthographicCamera(
			window.innerWidth / - 2,
			window.innerWidth / 2,
			window.innerHeight / 2,
			window.innerHeight / - 2,
			1,
			1000,
		);
		camera.position.z = 1;
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();

		scene = new THREE.Scene();
		scene.background = new THREE.Color(0x000000);

		const plane = new THREE.PlaneGeometry(window.innerWidth, window.innerHeight);

		const material = new THREE.RawShaderMaterial({
			uniforms: {
				u_resolution: new THREE.Uniform(new THREE.Vector2()),
				u_time: {value: 0.0},
			},
			vertexShader: vertexShader.default,
			fragmentShader: fragmentShader.default,
			transparent: true,
		});

		const mesh = new THREE.Mesh(plane, material);
		scene.add(mesh);

		const canvas = document.getElementById('playground');

		renderer = new THREE.WebGLRenderer({canvas});
		renderer.setPixelRatio(window.devicePixelRatio);
		renderer.setSize(window.innerWidth, window.innerHeight);
		
		container.appendChild(renderer.domElement);

		window.addEventListener('resize', onWindowResize);
	};

	function onWindowResize() {
		camera.aspect = window.innerWidth / window.innerHeight;
		camera.updateProjectionMatrix();
		renderer.setSize(window.innerWidth, window.innerHeight);
	};

	function render() {
		const object = scene.children[0];
		object.material.uniforms.u_time.value = clock.getElapsedTime();
		object.material.uniforms.u_resolution.value.x = window.innerWidth;
		object.material.uniforms.u_resolution.value.y = window.innerHeight;  
		renderer.render(scene, camera);
	};

	function animate() {
		requestAnimationFrame(animate);
		render();
	};
};

try {
	main();
} catch (err) {
	document.getElementById('error').innerText = err.message;
}
