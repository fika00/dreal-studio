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

float uvScale = 1.5;

void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

    vec4 mask = texture2D(maskTexture, mirrorRepeat(vec2((uv.x * uvScale) + smokeUTime, uv.y * uvScale * 2.)));
	
    float finalMask = mask.r + .6;
    
    vec4 texel = texture2D(map, uv);

    float fog = smoothstep(.0,.35,texel.r * intensity) * finalMask;
	outputColor = vec4((texel.rgb * intensity) + fog, texel.a );
	// outputColor = vec4(finalMask);

}