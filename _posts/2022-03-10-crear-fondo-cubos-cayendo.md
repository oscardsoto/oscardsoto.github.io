---
layout:       post
title:        ¿Cómo hacer un fondo de cubos cayendo?
pdate:        [10, 03, 2022]
---
Primero, necesitarás una librería llamada “Three.js”, una librería de Javascript que permite realizar animaciones en 3 dimensiones dentro de la web. Así es que tendrás que referenciar la librería en una etiqueta _script_ dentro de tu archivo html.

```html
<script src=”https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js”></script> 
```

> Antes de que iniciemos, necesitas conocer la librería antes de usarla. [Dale una ojeada a su documentación para que te familiarices con los términos](https://threejs.org/docs/) que voy a utilizar. Aun así, explicaré lo que usé para que tú también lo apliques.

## 1. Puesta de escena

Para iniciar este tutorial, debes entender que para realizar una animación, necesitas tres cosas indispensables: una escena, en donde colocarás todos tus elementos visuales, una cámara, que es la que visualizará todos los elementos dentro de su perspectiva, y un proceso para renderizar lo que la cámara está viendo.

> _El término renderización (del inglés rendering) es un anglicismo para representación gráfica, usado en la jerga informática para referirse al proceso de generar imagen fotorrealista, o no, a partir de un modelo 2D o 3D (o en lo que colectivamente podría llamarse un archivo de escena) por medio de programas informáticos. Además, los resultados de mostrar dicho modelo pueden llamarse render._
>
> [Wikipedia, la enciclopedia libre. _Renderización_](https://es.wikipedia.org/wiki/Renderizaci%C3%B3n)

Declararemos nuestras variables correspondientes para nuestra escena.
Declaramos nuestra variable de escena por medio de la clase _THREE.Scene()_, nuestra variable de  cámara con la clase _THREE.WebGLRenderer()_, y nuestra variable de la cámara con la clase _THREE.PerspectiveCamera()_

```js
var escena = new THREE.Scene();

var camara = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight);

var render = new THREE.WebGLRenderer();
```

Nota como al momento de declarar la clase para la perspectiva de la cámara hay dos parámetros: el primero indica el FOV (Field of View), que es el campo de visión de la cámara, representado en grados. No voy a adentrarme mucho en el tema, [pero aquí hay un artículo que te explica más a detalle el FOV](https://www.brickhousesecurity.com/hidden-cameras/field-of-view-explained/), y el segundo indica la relación del aspecto, o sea la escala que se usará para la perspectiva. Siempre colocarás este valor con la relación del ancho por el alto de tu navegador, para que tu rénder no muestre solo un fragmento de lo que estás haciendo.

Para visualizar el rénder, tendremos que colocar el resultado en el documento Html. Para ello, colocamos las siguientes líneas:

```js
render.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(render.domElement);
```

La primera línea indica el ancho y el alto del rénder y la segunda anexa el resultado de la renderización al _"<body>"_ de nuestro documento.

## 2. Agregando un cubo

Una vez agregada la escena al documento Html, vamos a incorporar los cubos. Para ello, necesitamos definir tres cosas:
1. El material del que van a estar hechos los cubos
2. La geometría del objeto que vamos a instanciar (es decir, la de un cubo)
3. La posición (x, y, z) dentro del espacio tridimensional de la escena en la que se ubicará el cubo

Para el material, utilizaremos el tipo básico y le pondremos el color de nuestra preferencia en hexadecimal. En este caso, usaré el verde.

```js
var material = new THREE.MeshBasicMaterial({ color: 0xb9fbc0 });
```

La geometría es fácil, solo hay que determinar el ancho, alto y profundidad del cubo. Ocuparé cubos pequeños, así es que basta con declararlos como 1 x 1 x 1.

```js
var geometria = new THREE.BoxGeometry(1, 1, 1);
```

La posición dentro de la escena se tiene que definir al momento de instanciar el objeto. Para ello, necesitaremos del tipo de material y la geometría ya definidos:

```js
var cubo = new THREE.Mesh(geometria, material);
```

Tendremos que acceder a la propiedad _"cubo.position.x"_, _"cubo.position.y"_ y _"cubo.position.z"_ para cambiar la posición. Puedes colocarlo en donde gustes, yo colocaré el cubo en el origen del plano.

```js
cubo.position.x = 0;
cubo.position.y = 0;
cubo.position.z = 0;
```

Finalmente, agregamos nuestro cubo a la escena, y colocaremos la posición de la cámara.

```js
escena.add(cubo);
```

Al momento de renderizar, tendrás una pantalla en negro. Eso es porque falta agregar los fotogramas (frames) de la animación. El cubo existe, pero no hay ningún fotograma para que se visualice en ningún momento.

> _Un fotograma (frame) es únicamente definido como la combinación entre una imagen a visualizar, y el tiempo/momento en que esa imagen será visualizada. Una secuencia de fotogramas crea una animación._
>
> [Yatin S. _Conceptos fundamentales de la animación: fotogramas, capas y carpeta de capas_. cprogramming.com](https://www.cprogramming.com/tutorial/animation/frames_and_layers.html)

Para agregarlos, necesitamos del apoyo de una función que permita pedir esos fotogramas. La definiremos como _animacion()_, y está permitirá renderizar los fotogramas que emita la función. Sin embargo, la cámara necesita de una posición en el plano también, para que esta tome la perspectiva que queramos renderizar.

```js
camara.position.z = 5;

var animacion = function(){
    requestAnimationFrame(animacion);
    render.render(escena, camara);
};

animacion();
```

Una vez ejecutado, tendremos nuestro cubo. A pesar de que parezca un cuadrado:

{% include functions/img.html src="crea-fondo-cubos-cayendo/cubo.png" alt="Imagen del cubo." %}

Para verlo en perspectiva, tendremos que rotarlo un poco. Eso lo debemos hacer dentro de la función de animacion():

```js
var animacion = function(){
    requestAnimationFrame(animacion);

    cubo.rotation.x = 0.5;              // Vamos a rotar el cubo en el eje X

    render.render(escena, camara);
};
```

Obteniendo el siguiente resultado:

{% include functions/img.html src="crea-fondo-cubos-cayendo/cubo-rotado.png" alt="Imagen del cubo rotado." %}

Lo que estamos haciendo, en perspectiva, es lo que vemos en la imagen. La cámara estará hacia arriba, apuntando hacia nuestro cubo que se encuentra en el origen. Para realizar la animación de los cubos de abajo hacia arriba, tendremos que moverlos a lo largo del eje de las Y (siendo la línea verde), y ubicarlos a lo largo del eje X (siendo la línea roja). Lo que está en la imagen de abajo, es lo que llevamos hasta ahora.

{% include functions/img.html src="crea-fondo-cubos-cayendo/paso1.png" alt="Imagen del render." %}

## 3. Agregando más cubos

Vamos a declarar un array que contenga todos nuestros cubos, y los crearemos mediante un ciclo for. Declararé 100, pero tú puedes agregar los que gustes.
Tendremos que instanciarlos de manera en que la cámara pueda tener una perspectiva de todos (o de la mayoría), por lo que los alinearemos en el eje Y de manera consecutiva, tomando una distancia de 1 en cada uno (ya que cada cubo mide 1 x 1 x 1) desde -50 a 50. Así es como quedaría:

```js
var cantidad_cubos  = 100;
var cubos           = [];
for (var i = 0; i < cantidad_cubos; i++)
{
    cubos.push(new THREE.Mesh(geometria, material));
    cubos[i].position.y = i - 50;
}

for (var i = 0; i < cantidad_cubos; i++)
    escena.add(cubos[i]);
```

Pero si ejecutas esto, verás una línea verde, que representa todos los cubos alineados uno en uno. Para solucionar esto, vamos a acomodarlos al azar usando una función que tendremos que colocar en el tope de la etiqueta _script_, que nos permita obtener un número entero al azar de un determinado rango.

```js
function obtenEnteroAleatorio(min, max) {
    var valor = Math.floor(Math.random() * (max - min)) + min;
    return (valor !== 0) ? valor : 1;
}
```

Esto lo usaremos en conjunto con la función _Math.random()_ para generar las posiciones aleatorias, en conjunto con la siguiente función:

```js
y = a * 50 * f(-1, 1);
```

En donde:
1. _y_ es la posición en el eje de las Y
2. _-a_ es el número decimal generado al azar (por lo regular de 8 decimales: por ejemplo -0.85452470), y
3. _f(-1, 1)_ es la función _obtenEnteroAleatorio()_ que declaramos al inicio, en donde retorna un entero positivo, o negativo.

El valor decimal puede ir desde 0 hasta 1. Si multiplicamos ese valor por 50, el valor decimal se convertiría de 0 a 50, que corresponde a los 50 puntos positivos sobre el eje Y que mencionaba al principio. Si ese valor lo multiplicamos por el resultado de la función (cuyos únicos posibles valores son -1 o 1), entonces ya podemos recorrer los valores negativos del eje.

Una vez aplicado:

```js
var cantidad_cubos  = 100;
var cubos           = [];
for (var i = 0; i < cantidad_cubos; i++)
{
    cubos.push(new THREE.Mesh(geometria, material));
    cubos[i].position.y = Math.random() * 50 * obtenEnteroAleatorio(-1, 1);
}

for (var i = 0; i < cantidad_cubos; i++)
    escena.add(cubos[i]);
```

Obtenemos posiciones aleatorias en Y:

{% include functions/img.html src="crea-fondo-cubos-cayendo/varios-cubos.png" alt="Imagen del cambio de cubos en Y." %}

Pero solo logramos ver una línea verde cortada en cachos. Eso es porque nos hace falta darle una posición en Z para que tome perspectiva.

Una vez más, lo vamos a hacer con valores aleatorios. Esta vez, desde -25 a 30 para que tome una perspectiva profunda, pero también necesitaremos incrementar el valor de la posición en Z de la cámara, para que ningún cubo se cruce en su perspectiva. Yo lo dejaré en 35.

```js
var cantidad_cubos  = 100;
var cubos           = [];
for (var i = 0; i < cantidad_cubos; i++)
{
    cubos.push(new THREE.Mesh(geometria, material));
    cubos[i].position.y = Math.random() * 50 * obtenEnteroAleatorio(-1, 1);
    cubos[i].position.z = obtenEnteroAleatorio(-25, 30);        // Agregamos posición aleatoria en Z a cada cubo
}

for (var i = 0; i < cantidad_cubos; i++)
    escena.add(cubos[i]);
camara.position.z = 35;     // Y agregamos más altura a la camara.
```

Lo ejecutamos en nuestro navegador de preferencia, y tendremos una perspectiva mejor:

{% include functions/img.html src="crea-fondo-cubos-cayendo/varios-cubos-perspectiva.png" alt="Imagen de perspectiva mejor." %}

De hecho, cada vez que recargas la página, los cubos ahora aparecen en posiciones diferentes. ¡Esa es la magia de trabajar con aleatorios!

## 4. Mi parte favorita, la animación

Ya que tenemos los cubos en nuestro escenario, vamos a hacer que se muevan. Para ello, necesitaremos de la función _animacion()_ que declaramos en el paso 2.

Dentro de ella, realizaremos un ciclo for para cambiar las posiciones y rotar los cubos. Para rotarlos, accederemos a su propiedad _rotation_ y cambiaremos sus valores en los tres ejes (X, Y, Z).

```js
var animacion = function(){
    requestAnimationFrame(animacion);
    for (var i = 0; i < cantidad_cubos; i++)
    {
        cubos[i].rotation.x += Math.random() * 0.1;
        cubos[i].rotation.y += Math.random() * 0.1;
        cubos[i].rotation.z += Math.random() * 0.1;
    }
    render.render(escena, camara);
};
```

Se agrega la función _random_, porque no nos interesa que gire en una cantidad en específico, y lo multiplicamos por un decimal para que la rotación no sea tan rápida.
Para hacer que se desplacen hacia arriba, tendremos que moverlos en el eje de las Y. Lo pondré de 0.05 para que vaya lento y podamos ver la animación.

```js
var animacion = function(){
    requestAnimationFrame(animacion);
    for (var i = 0; i < cantidad_cubos; i++)
    {
        cubos[i].rotation.x += Math.random() * 0.1;
        cubos[i].rotation.y += Math.random() * 0.1;
        cubos[i].rotation.z += Math.random() * 0.1;

        cubos[i].position.y += 0.05;                // Posición en Y
    }
    render.render(escena, camara);
};
```

Ahora bien, tendremos que mover los cubos sobre el eje X para que se distribuyan a lo largo de la pantalla. Quiero que se vea cada uno sobre un punto en el eje, por lo que también usaré el rango de -50 a 50 para cubrir los 100 cubos.

```js
var animacion = function(){
    requestAnimationFrame(animacion);
    for (var i = 0; i < cantidad_cubos; i++)
    {
        cubos[i].rotation.x += Math.random() * 0.1;
        cubos[i].rotation.y += Math.random() * 0.1;
        cubos[i].rotation.z += Math.random() * 0.1;

        cubos[i].position.x = i - (cantidad_cubos / 2);  // Posición en X
        cubos[i].position.y += 0.05;            
    }
    render.render(escena, camara);
};
```

Con esa fórmula, si yo quiero menos de 100 cubos, no me tengo que preocupar por modificar el valor de esta posición.

Si lo ejecutamos, podremos ver nuestros cubos en movimiento:    

{% include functions/img.html src="crea-fondo-cubos-cayendo/cubos-moviendose.gif" alt="Gif de los cubos en movimiento." %}

Pero solo se desplazan una vez. Para que se desplacen indefinidamente, tenemos que regresarlos hacia un punto inicial, y para ello necesitamos de una condición que indique hasta donde el cubo puede ir hacia arriba, y en el caso en que se cumpla, mover el cubo hasta el fondo permitido (es decir -50) y cambiar la posición en Z (solamente para fines estéticos). Es necesario incluir la condición dentro del for.

```js
var animacion = function(){
    requestAnimationFrame(animacion);
    for (var i = 0; i < cantidad_cubos; i++)
    {
        cubos[i].rotation.x += Math.random() * 0.1;
        cubos[i].rotation.y += Math.random() * 0.1;
        cubos[i].rotation.z += Math.random() * 0.1;

        cubos[i].position.x = i - (cantidad_cubos / 2);
        cubos[i].position.y += 0.05;

        // Condición para retornar los cubos
        if (cubos[i].position.y >= window.innerHeight / 18)
        {
            cubos[i].position.y = -50;
            cubos[i].position.z = obtenEnteroAleatorio(-20, 35);
        }       
    }
    render.render(escena, camara);
};
```

Y con esto tendremos nuestra secuencia de cubos flotando. Puedes modificar el color de los cubos a tu gusto, y también del fondo (si no quieres un fondo negro) con la siguiente línea, después de haber instanciado la variable de la escena:

```js
escena.background = new THREE.Color(color_en_hexadecimal);
```