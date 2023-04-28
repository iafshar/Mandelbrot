#version 330 core

// Inputs to the fragment shader are outputs
// of the same name of the vertex shader
in vec2 canvas_coord; // range [-1,1]x[-1,1]

uniform vec2 center;
uniform float zoom;
uniform int maxiter;

// Output the frag color
out vec4 fragColor;

// HW1: You can define customized functions here,
// e.g. complex multiplications, helper functions
// for colormap etc.
//x is real number
//y is coefficient of i

vec2 calcZ(vec2 z, vec2 c) {
    vec2 Zk;
    Zk[0] = (z[0] * z[0]) - (z[1] * z[1]);
    Zk[1] = 2 * z[0] * z[1];

    Zk += c;
    return Zk;
}

void main (void){

    vec2 c = center + zoom * canvas_coord;
    // HW1: Your implementation goes here. Compute
    // the value of the Mandelbrot fractal at
    // complex number c.  Then map the value to
    // some color.
    vec2 z = vec2(0,0);
    float Ic = 0;
    for (int i = 0; i < maxiter; i++) {
        //z += c;
        z = calcZ(z,c);
        if (length(z) > 2) {
            Ic = i;
            break;
        }
    }

    float IcColor = Ic/maxiter;
    // HW1: Replace the following default color
    fragColor = vec4(IcColor, IcColor, IcColor, 1.0f);
}
