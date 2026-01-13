---
layout:      post
title:       ¿Te preocupas por escribir código legible?
title_en:    Do you care to write readable code?
pdate:        [06, 02, 2022]
---

> *¿Y por qué debería preocuparme?*

Tal vez te estés preguntando.

Siempre he dicho que escribir una buena pieza de software es como cuidar un jardín; si no riegas tus plantas, cortas las hojas que estén marchitas, o agregas fertilizante, se pudren tus frutas, o se mueren tus flores. Si ya eres un programador experimentado, ¿te acuerdas de aquellas veces que leíste tu código viejo y te dabas de topes en la cabeza por cómo estaba escrito?

Es normal, todos pasamos por eso. Recientemente, vi un proyecto de la universidad que tenía guardado en mi disco duro y mi cerebro no dejaba de recordarme lo novato que era al ver todas esas clases rellenas de código espagueti. Ese proyecto tiene 4 años guardado. Escribir buen código lleva tiempo y dedicación, como un buen jardín.

Te daré unos cuantos consejos de cómo mejorar tu código que me he dado cuenta alo largo de mi experiencia. Consejos que puedes aplicar el día de hoy si tienes el tiempo para hacerlo:
 
## 1. No escribas todo en una sola linea de código

Un programador novato siempre va a escribir una que otra línea de código con dos o más instrucciones. Lo ideal es que se escriba una instrucción por línea, pero a veces esa instrucción es tán larga que sí es necesario cortarla en dos (hasta tres). Pero no es necesario poner toda una función de seguido.

Si estas minificando el código para volver tu proyecto más rápido en navegador, tiene mucho sentido que lo hagas. De otra forma, lo correcto es escribír de arriba a abajo, una instrucción por línea.

¿No es mejor leer esto?:

```js
function agregaUnNumero(numerito)
{
    console.log(numerito);
    var resultado = numero >= 90 ? rechazados.agrega(numerito) : agregados.agrega(numerito);
    console.log(resultado);
}
agregaUnNumero(15);
```

¿Que esto?:

```js
function agregaUnNumero(numerito) { console.log(numerito); var resultado = numero >= 90 ? rechazados.agrega(numerito) : agregados.agrega(numerito); console.log(resultado); } agregaAlgo(15);
```

## 2. Nombra tus variables, métodos, clases, exactamente para lo que las quieres

El nombre de una variable debe ser autodescriptible. Esto quiere decir que en el momento en el que la leas, debes entender para qué va a ser usada.
Si necesitas una variable para definir segundos, llámala “segundos”. Si necesitas un método para definir un tipo de comida, llámala “tipoComida”. Si necesitas una clase para definir a un jugador, llamala “Jugador”. Nada más, nada menos.

No es necesario que agregues nomenclaturas extrañas como “tm_segundos”, o “mlp_vida”, a menos de que la documentación te lo exija. No importa en qué estilo estén escritos: si son camelCase, snake_case, PascalCase, o kebab-case. Mientras se entienda para qué se debe utilizar la variable “segundos_en_servidor”, es más que suficiente.

> **Actualización 2026**
>
> La convención de escritura importa, de acuerdo al lenguaje de programación en el que la escribas.
> Normalmente se usa camelCase en Js y C# para variables dentro de una función, pero casi nunca verás una variable global escrita de esa forma en C#.
> 
> Y digo casi nunca por que, incluso especificando en documentación, habrá alguien que lo haga.

## 3. Mantén todo ordenado

Lo más común es usar tabuladores para diferenciar las posiciones de donde declaras tus objetos, o defines propiedades. Este punto lo menciono más por razones estéticas, que por buenas prácticas. Es cierto que ayuda a leer mejor el código e identificar errores más rápido, pero también es menos estresante ver un código alineado, en donde todas las variables se definen en una sola columna.

Veamos un ejemplo, ¿qué te resulta más amistoso de leer? ¿Esto?:

```js
var dados = [];
var no_caras = 6;
var dado_inicial = new Dado();
```

¿O esto?:

```js
var dados         = [];
var no_caras      = 6;
var dado_inicial  = new Dado();
```

Y por último, pero no menos importante:

## 4. Agrega comentarios a tu código.

Si un método se vuelve complejo conforme lo escribes, es importante que coloques comentarios para que otras personas (e incluso tú) puedan entender de lo que trata, aun después de unos cuantos meses de haberlo escrito. Asegúrate de colocar oraciones simples, no es necesario mucho texto explicando que hace cada método, y tampoco es necesario que coloques tantos comentarios dentro del mismo. Con solo unos cuantos, bien detallados y simples, es más que suficiente.

Si tienes un botón que tira un dado cada vez que lo presionas:

```js
function tirarDado(){
  var dado = new Dado();
  var resultado = dado.lanzar();
  resultados.push(resultado);
  return resultado;
}
```

No esta de más explicar qué hace:

```js
/**
* Retorna el resultado de tirar un dado, y lo agrega a un histórico de resultados
*/
function tirarDado(){
  var dado        = new Dado();
  var resultado   = dado.lanzar();
  resultados.push(resultado);
  return resultado;
}
```