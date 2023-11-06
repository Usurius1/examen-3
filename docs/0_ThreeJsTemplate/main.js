
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const scene = new THREE.Scene();
scene.fog = new THREE.Fog( 0xf0664a, 10, 55 );
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Color fondo
scene.background = new THREE.Color(0.25,0.6,0.95);

//Luz ambiental
const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
scene.add(ambientLight);

//Luz direccional
const light = new THREE.DirectionalLight(0xffffff,0.6);
light.position.set(0,4,2);
scene.add(light);
light.castShadow = true;

light.shadow.camera.top = 20
light.shadow.camera.left = 20
light.shadow.camera.right = -20

const helper = new THREE.CameraHelper(light.shadow.camera)
scene.add(helper);



const planeG = new THREE.PlaneGeometry(45,60,2,2);
const planeMat = new THREE.MeshStandardMaterial( {color:0x7ad2fa} )
const plane = new THREE.Mesh(planeG,planeMat);
scene.add(plane);
plane.rotateX(-90*(Math.PI/180))
plane.position.set(0,-1,0);
plane.receiveShadow=true;



const renderer = new THREE.WebGLRenderer();
//renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
//renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
//renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild( renderer.domElement );

const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
const cube = new THREE.Mesh( geometry, material );

camera.position.z = 5;

// Instantiate a loader
const gltfloader = new GLTFLoader();
let cargado = false; 

const arregloEsferas = []

for (let i=0; i<30; i++){//el codigo de adentro se ejecutara 30 veces
	const sphereG = new THREE.SphereGeometry(0.5, 16, 8);
	const sphereM = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()})
	const sphere = new THREE.Mesh(sphereG,sphereM);
	sphere.castShadow = true;
	scene.add(sphere);	

	sphere.position.set( 
	Math.random() * 30 - 19, 
	Math.random() * 10,
	Math.random() * 30 -30
	)

	arregloEsferas.push(sphere);

}


const hdriLoader = new RGBELoader();

hdriLoader.load('public/HDRI/table_mountain_2_puresky_2k.hdr',
function(textura){

	textura.mapping = THREE.EquirectangularReflectionMapping;
	scene.background = textura;
	scene.environment = textura;
	
}
)




// Load a glTF resource

let mona;

gltfloader.load(
	// resource URL
	'/public/monaazul/mona.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    mona = gltf.scene;
		scene.add( mona);

    mona.position.x = 0;

	mona.traverse(subobjeto => {
		if(subobjeto.isMesh)
			subobjeto.castShadow = true;
	})

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

let charmander

gltfloader.load(
	// resource URL
	'public/charmander/charmander.gltf',
	// called when the resource is loaded
	function ( gltf ) {

    charmander = gltf.scene;
		scene.add( charmander );

		charmander.scale.set(0.50,0.50,0.50)

		charmander.traverse(subobjeto => {
			if(subobjeto.isMesh)
				subobjeto.castShadow = true;
		})

    charmander.position.x = 5;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

let garden;

gltfloader.load(
	// resource URL
	'public/garden/garden.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		garden = gltf.scene;
		scene.add( garden );

		garden.scale.set(1.50,1.50,1.50)

		garden.traverse(subobjeto => {
			if(subobjeto.isMesh)
				subobjeto.castShadow = true;
		})

		garden.position.x = 10;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

let lucario

gltfloader.load(
	// resource URL
	'public/Lucario/Lucario.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		lucario = gltf.scene;
		scene.add( lucario );

		lucario.scale.set(1.50,1.50,1.50)

		lucario.traverse(subobjeto => {
			if(subobjeto.isMesh)
				subobjeto.castShadow = true;
		})

		lucario.position.x = -5;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

let Miniq

gltfloader.load(
	// resource URL
	'public/Miniq/Miniq.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		Miniq = gltf.scene;
		scene.add( Miniq );

		Miniq.scale.set(1,1,1)

		Miniq.traverse(subobjeto => {
			if(subobjeto.isMesh)
				subobjeto.castShadow = true;
		})

		Miniq.position.x = -10;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);

let umbreon

gltfloader.load(
	// resource URL
	'public/umbreon/umbreon.gltf',
	// called when the resource is loaded
	function ( gltf ) {

		umbreon = gltf.scene;
		scene.add( umbreon );

		umbreon.scale.set(0.20,0.20,0.20)

		umbreon.traverse(subobjeto => {
			if(subobjeto.isMesh)
				subobjeto.castShadow = true;
		})

		umbreon.position.x = -15;

		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
		cargado = true;

	},
	// called while loading is progressing
	function ( xhr ) {

		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );

	},
	// called when loading has errors
	function ( error ) {

		console.log( 'An error happened' );

	}
);



// const grid = new THREE.GridHelper(100,100);
// scene.add(grid);

const clock = new THREE.Clock();


function animate() {
  requestAnimationFrame( animate );

  let deltaTime = clock.getDelta();



  if(cargado == true){
    mona.rotation.y += 1 * 0.05;
  }

  if(cargado == true){
    charmander.rotation.y += 1 * 0.05;
  }

  if(cargado == true){
    garden.rotation.y += 1 * 0.05;
  }

  if(cargado == true){
    lucario.rotation.y += 1 * 0.05;
  }

  if(cargado == true){
    Miniq.rotation.y += 1 * 0.05;
  }

  if(cargado == true){
    umbreon.rotation.y += 1 * 0.05;
  }


  

  // required if controls.enableDamping or controls.autoRotate are set to true
  controls.update();
  renderer.render( scene, camera );
}


window.addEventListener( 'resize', onWindowResize, false );

function onWindowResize(){ //funcion para redimensionar ventana si el usuario le anda moviendo
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );
}

animate(); //Iniciamos el loop

