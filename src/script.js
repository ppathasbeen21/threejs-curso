import * as THREE from 'three'
import './style.css'

// controle por mouse
const cursor = {
    x:0,
    y:0
}
window.addEventListener('mousemove', function (e){
    cursor.x = e.clientX / sizes.width -.5
    cursor.y = e.clientY / sizes.width -.5

})

/**
 * Base
 */

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Sizes
const sizes = {
    width: 1200,
    height: 900
}

// Scene
const scene = new THREE.Scene()

// Object
const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1, 5, 5, 5),
    new THREE.MeshBasicMaterial({ color: 0x00ff00, wireframe: true })
)
scene.add(mesh)


// Axes helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

//tipos de camera
// const aspectRatio = sizes.width / sizes.height
// const camera = new THREE.OrthographicCamera(
//     -1 * aspectRatio,
//     1 * aspectRatio,
//     1,
//     -1,
//     0.1,
//     100
// )

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 1, 1000)

// camera.position.x = 2
// camera.position.y = 2
camera.position.z = 3
camera.lookAt(mesh.position)
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

// Animate
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update objects
    // mesh.rotation.y = elapsedTime;

    //update Camera
    camera.position.x = cursor.x * 5
    camera.position.y = - cursor.y * 5
    camera.lookAt(new THREE.Vector3())

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()