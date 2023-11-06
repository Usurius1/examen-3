
import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as dat from 'dat.gui'
 
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

//Color fondo
scene.background = new THREE.Color(0.95,0.6,0.5);

//Luz ambiental
const ambientLight = new THREE.AmbientLight(0xe0e0e0,1);
scene.add(ambientLight);

//Luz direccional
const light = new THREE.DirectionalLight(0xffffff,0.6);
light.position.set(0,4,2);
scene.add(light);
light.castShadow = true;



const renderer = new THREE.WebGLRenderer();
renderer.toneMapping = THREE.ACESFilmicToneMapping; //opciones aestethic
renderer.outputColorSpace = THREE.SRGBColorSpace; //opciones aestethic
renderer.setPixelRatio(window.devicePixelRatio); //opciones aestethic
renderer.setSize( window.innerWidth, window.innerHeight );
renderer.shadowMap.enabled = true;

const controls = new OrbitControls( camera, renderer.domElement );

document.body.appendChild( renderer.domElement );

const planeG = new THREE.PlaneGeometry(30,30,2,2);
const planeMat = new THREE.MeshStandardMaterial( {color:0xffddc0} )
const plane = new THREE.Mesh(planeG,planeMat);
scene.add(plane);
plane.rotateX(-90*(Math.PI/180))
plane.position.set(0,-5,0);
plane.receiveShadow=true;



const geometry = new THREE.BoxGeometry(1,1,1);
const material = new THREE.MeshPhongMaterial( { color: 0xffffff } );  
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// cube.castShadow=true;

const arregloEsferas = []

for (let i=0; i<30; i++){//el codigo de adentro se ejecutara 30 veces
	const sphereG = new THREE.SphereGeometry(0.5, 16, 8);
	const sphereM = new THREE.MeshPhongMaterial({color: 0xffffff * Math.random()})
	const sphere = new THREE.Mesh(sphereG,sphereM);
	sphere.castShadow = true;
	scene.add(sphere);	

	sphere.position.set( 
	Math.random() * 20 - 10, 
	Math.random() * 10,
	Math.random() * 30 -15
	)

	arregloEsferas.push(sphere);

}




// const solG = new THREE.SphereGeometry(3,16,8);
// // const solM = new THREE.MeshBasicMaterial({color:0xffff99});
// // const sol = new THREE.Mesh(solG,solM);
// // scene.add(sol);

// const grid = new THREE.GridHelper(10,10);
// scene.add( grid );

camera.position.z = 15;

// Instantiate a loader
const gltfloader = new GLTFLoader();
let shipModel;

// Load a glTF resource
gltfloader.load(
	// resource URL
	'models/ship/spaceship.gltf',
	// called when the resource is loaded
	function ( gltf ) {
    shipModel = gltf.scene
		scene.add( shipModel );

		shipModel.scale.set(0.15,0.15,0.15);

		shipModel.traverse(subobjeto => {
			if(subobjeto.isMesh)//checamos si tiene mesh, si si, entonces le decimos que emita sombras
				subobjeto.castShadow = true;
		})
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

const gui = new dat.GUI()
let options ={
	xPos: 0,
	yPos: 0,
	zPos: 0,
}

gui.add(options,'xPos', -20,20)
gui.add(options,'yPos', -20,20)
gui.add(options,'zPos', -20,20)

const clock = new THREE.Clock();

// document.addEventListener('mousemove',onMauseClick)
// document.addEventListener('click',onMauseClick) //solo se ejecuta en click detecho
document.addEventListener('mousedown',onMauseClick)

const raycaster = new THREE.Raycaster();
const mouseCoordinates = new THREE.Vector2();

function onMauseClick( event ) {

	let clickderecho = false;
	if(event.button === 2){
		clickderecho = true

	}
	// calculate mouseCoordinates position in normalized device coordinates
	// (-1 to +1) for both components

	mouseCoordinates.x = ( event.clientX / window.innerWidth ) * 2 - 1;
	mouseCoordinates.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

	raycaster.setFromCamera( mouseCoordinates, camera );
	// const objetosInter = raycaster.intersectObjects( scene.children);
	const objetosInter = raycaster.intersectObjects( arregloEsferas); //objetos inter nos regresa a todos los objetos atravesados por el reicaster prdenadps del mas cercano al mas alejado
	

	if(objetosInter.length > 0)
	{
		// console.log(objetosInter[0].object.material.color);
		

		if(ultimoClick != undefined)
		{
			// console.log("si tienes algo guardado")
			ultimoClick.material.color.set(0xff0000 * Math.random);
		}
		
		
			
		ultimoClick = objetosInter[0].object
		// console.log( objetosInter[0].object.position )
		objetivo.set (objetosInter[0].object.position.x, objetosInter[0].object.position.y, objetosInter[0].object.position.z )
		objetosInter[0].object.material.color.set(0xff0000);
		
		
		
	}


}



let ultimoClick;//undefined







const objetivo = new THREE.Vector3 (0,0,0) //posicion


function animate() { 
  requestAnimationFrame( animate );
	let delta = clock.getDelta();
	let time = clock.getElapsedTime();

	//movimientos de esferas

	
	 if(shipModel!=undefined){

			if(shipModel.position.distanceTo(objetivo) > 2)
			{
				shipModel.lookAt(objetivo);
				shipModel.translateZ(delta * 2)
			}	
		}
	
	arregloEsferas.forEach( (esfera, indice) => {

		esfera.position.y = Math.sin(time + indice);

	} )

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

//vectores
//suma de vectores
//multiplicación por un escalar
//normalizacion
//seno y coseno
//lerp
//distance
//translate
//lookAt
