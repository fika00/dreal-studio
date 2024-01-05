#ifdef FRAMEBUFFER_PRECISION_HIGH

	uniform mediump sampler2D map;

#else

	uniform lowp sampler2D map;

#endif

uniform float intensity;
uniform sampler2D maskTexture;
uniform float smokeUTime;

vec2 mirrorRepeat(vec2 v) {
	vec2 m = mod(v,2.);
	return mix(m,2.0 - m, step(1.0 ,m));
}

vec2 repeat(vec2 v) {
    return fract(v);
}

float uvScale = 1.;
float powerFactor = 1.35;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

    vec4 mask = texture2D(maskTexture, mirrorRepeat(vec2((uv.x * uvScale) + smokeUTime, uv.y * uvScale * 3.)));
	
    
    vec4 texel = texture2D(map, uv);

    vec3 finalMask = vec3((pow(texel.r,powerFactor),pow(texel.g,powerFactor),pow(texel.b,powerFactor)) * intensity * 15.) * mask.r;
	// outputColor = vec4(finalMask);
	outputColor = vec4((texel.rgb * intensity) +  finalMask, texel.a ) ;

}