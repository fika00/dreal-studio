varying vec2 vUv;
varying vec2 vAdjustedUV;
varying vec3 vPosition;

uniform float uTime;

mat3 rotationMatrix(float angle) {
    float c = cos(angle);
    float s = sin(angle);
    return mat3(
        c, 0.0, s,
        0.0, 1.0, 0.0,
        -s, 0.0, c
    );
}
vec2 rotateUV(vec2 uv, float rotation)
{
    // float midX = 0.25;
    float midX = 0.5;

    float midY = 0.65;

    return vec2(
        cos(rotation) * (uv.x - midX) + sin(rotation) * (uv.y - midY) + midX,
        cos(rotation) * (uv.y - midY) - sin(rotation) * (uv.x - midX) + midY
    );
}

void main() {
    vUv = uv;



    vPosition = position;

    vAdjustedUV = rotateUV(uv, uTime - 3. );


    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}