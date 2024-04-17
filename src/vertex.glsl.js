export default /* glsl */`

// precision

// uniform

// in

// out

// #define

void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`