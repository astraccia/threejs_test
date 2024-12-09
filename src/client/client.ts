import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js'

const body = document.body

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000)
camera.position.z = 2

const renderer = new THREE.WebGLRenderer()
renderer.setSize(window.innerWidth, window.innerHeight)
document.body.appendChild(renderer.domElement)

// const controls = new OrbitControls(camera, renderer.domElement)

let raycaster = new THREE.Raycaster();
const cursorPos = new THREE.Vector2();

const cubeColours = [0xff0000, 0xffff00, 0x0000ff, 0xf0f0f0];



const geometry = new THREE.BoxGeometry()
const material = new THREE.MeshStandardMaterial({
    color: 0x555555,
})

const cube = new THREE.Mesh(geometry, material)
cube.name = "Cube";
scene.add(cube)

const light01 = new THREE.PointLight( 0xff0000, 10);
light01.position.set( 1,1,1 );
scene.add( light01 );

const light02 = new THREE.PointLight( 0xff0000, 10);
light02.position.set( -1,1,1 );
scene.add( light02 );

const light03 = new THREE.PointLight( 0xff0000, 10);
light03.position.set( 2,3,-2 );
scene.add( light03 );

const light04 = new THREE.PointLight( 0xff0000, 10);
light04.position.set( 2,-2,-1 );
scene.add( light04 );

console.log(scene)

window.addEventListener('resize', onWindowResize, false)
function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight)
    render()
}

function animate() {
    requestAnimationFrame(animate)

    cube.rotation.x += 0.01
    cube.rotation.y += 0.01

    // controls.update()

    render()
}

function render() {
    renderer.render(scene, camera)
}
animate()



function updateRaycaster(event: PointerEvent) {
    cursorPos.x = (event.clientX / window.innerWidth) * 2 - 1;
    cursorPos.y = -(event.clientY / window.innerHeight) * 2 + 1;

    raycaster.setFromCamera(cursorPos, camera);
    const intersects = raycaster.intersectObjects(scene.children, false);

    // console.log(intersects);


    if (intersects.length > 0) {
        body.classList.add('hover')
    } else {
        body.classList.remove('hover')
    }
}


function clickRaycaster(objectName: string, callback: (() => void) | null = null): void {
    raycaster.setFromCamera(cursorPos, camera);
    const intersects: THREE.Intersection[] = raycaster.intersectObjects(scene.children, false);

    if (intersects.length > 0) {
      if (intersects[0].object.name === objectName) {
        if (callback) callback();
      }
    }
  }


document.body.addEventListener("pointermove", function (event) {
    updateRaycaster(event);
});




document.body.addEventListener("pointerdown", function (event: PointerEvent) {

    clickRaycaster("Cube", function () {
      const randomColour =  cubeColours[Math.floor(Math.random() * cubeColours.length)];
      console.log(randomColour)
      cube.material.color.setHex(randomColour);
      alert('clicked!')
    });

});

