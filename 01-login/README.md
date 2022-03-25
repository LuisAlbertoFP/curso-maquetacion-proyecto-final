# 01 Login

Para poder ejecutar el proyecto necesitamos:

- Instalar las dependencias del proyecto

```bash
npm install

```

- Ejecutar el comando `start`

```bash
npm start

```

- Abrir el navegador en la URL:

```
http://localhost:1234

```

- Para hacer el login, puedes usar estos credenciales:

```
Usuario: admin@email.com
Password: test

```

## Implementación

Añadir nombre de clase al HTML:

_./src/pages/login.html_

```diff
...

- <body>
+ <body class="root">
    <header>
      <img src="../../core/content/img/logo_header.svg" />
    </header>

```

Layout pagina login:

- Lo estilamos como un contenedor flex, en modo columna para que se apile uno debajo de otro los elementos: header, background-image y la card con el formulario de login.

_./src/pages/login.styles.scss_

```scss
.root {
  display: flex;
  flex-direction: column;
  align-items: center;
}
```

Estilos header:

- Le damos un padding
- Hacemos la imagen responsive, que como max tenga un tamaño de `200px` y si el tamaño de la pantalla llega a ser menor, ocupa el 100% que le permita el header respetando el padding.

_./src/pages/login.styles.scss_

```diff
.root {
  display: flex;
  flex-direction: column;
  align-items: center;

+ & header {
+   padding: 40px;

+   & img {
+     max-width: 200px;
+     width: 100%;
+   }
+ }
}

```

Añadir nombre de clase al HTML:

_./src/pages/login.html_

```diff
...

  <body class="root">
    <header>
      <img src="../../core/content/img/logo_header.svg" />
    </header>
-   <div>TODO: Add background image from css</div>
+   <div class="background-image"></div>

```

Estilos imagen de fondo:

- Hacemos la imagen responsive, aplicando el mismo concepto anterior.
- Insertamos dicha imagen usando la propiedad backround
- Usamos `cover` para que se escale o ajuste al tamaño del contendor, sin deformar la imagen.

_./src/pages/login.styles.scss_

```diff
.root {
  ...

+ & .background-image {
+   max-width: 1920px;
+   width: 100%;
+   height: 400px;
+   background: url('../../core/content/img/bg_login.jpg') no-repeat right
+     center;
+   background-size: cover;
+ }

}

```

Añadir nombre de clase al HTML:

_./src/pages/login.html_

```diff
...

    <div class="background-image"></div>
-   <div>
+   <div class="card">
      <h1>Acceso</h1>
      <form>

```

Estilos login card:

- Necesitamos sacarla del posicionamiento normal, ya que queremos que esté por delante de la imagen de fondo.
- Utilizamos `top: 50%`, `left: 50%` y `transform: translate(-50%, -50%);` para centrar el elemento. Si dejásemos solamente `top: 50%`, `left: 50%`, estamos centrando la esquina superior-izquierda de la card, que no coincide con el punto central que necesitamos:

```
Punto que estamos moviendo con top y left
    |
    ▼
    *-------------------------
    |                        |
    |                        |
    |                        |
    |           *            |  ⏴- Punto central de la card que necesitamos
    |                        |  en el centro de la pantalla
    |                        |
    |                        |
    --------------------------
```

- Siguiendo el diseño `mobile-first`, en version móvil hacemos que ocupe un 100%, y cuando supere el tamaño de pantalla de `900px` que como máximo ocupe `500px` y tenga los border redondeados.

- Además añadimos padding, color de fondo y un sombreado.

_./src/pages/login.styles.scss_

```diff
.root {
  ...

+ & .card {
+   position: absolute;
+   top: 50%;
+   left: 50%;
+   transform: translate(-50%, -50%);
+   width: 100%;
+   padding: 16px;
+   background-color: white;
+   box-shadow: 0 0 30px rgba(0, 0, 0, 0.2), 2px 2px 5px rgba(0, 0, 0, 0.2);

+   @media (min-width: 900px) {
+     border-radius: 10px;
+     max-width: 500px;
+   }
+ }
}

```

Titulo:

- Cambiamos el tamaño y grosor de fuente.
- Añadimos un detalle a la izquierda.

_./src/pages/login.html_

```diff
...

    <div class="background-image"></div>
    <div class="card">
-     <h1>Acceso</h1>
+     <h1 class="title">Acceso</h1>
      <form>

```

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
...

+   & .title {
+     font-weight: 300;
+     font-size: 2.2rem;
+     border-left: 10px solid #22c6cb;
+     padding-left: 10px;
+   }
  }
}

```

Formulario:

_./src/pages/login.html_

```diff
...
    <div class="card">
      <h1 class="title">Acceso</h1>
      <form>
        <input
+         class="field"
          id="user"
          type="text"
          placeholder="Usuario"
          autocomplete="off"
        />
-       <p id="user-error"></p>
+       <p class="error-message" id="user-error"></p>
        <input
+         class="field"
          id="password"
          type="password"
          placeholder="Contraseña"
          autocomplete="off"
        />
-       <p id="password-error"></p>
+       <p class="error-message" id="password-error"></p>
-       <button id="login-button" type="submit">
+       <button class="submit-button" id="login-button" type="submit">
          ENVIAR
        </button>
      </form>
```

Añadimos el display en modo columna y con `flex-start` para que el botón quede a la izquierda.
Además un espaciado interno entre los elementos flex de `16px`

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
...

+   & form {
+     display: flex;
+     flex-direction: column;
+     align-items: flex-start;
+     gap: 16px;
+   }

  }
}

```

Hacemos que los inputs ocupen un 100%, y le damos algunos estilos
(`outline: none;`: para que no le de un borde automatico el navegador cuando hacemos foco)

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
...

    & form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

+     & .field {
+       width: 100%;
+       padding: 12px 16px;
+       border-radius: 10px;
+       border: 1px solid #ddd;
+       outline: none;
+       box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset;
+     }

...

```

La clase `.error` se añade desde el JavaScript en el fichero `./src/common/helpers/element.helpers.js`.
Coloreamos el borde del input de rojo, y por defecto hacemos que el mensaje de error no se pinte para no ocupar espacio.

Cuanto tenga error, lo mostramos y le damos el color del texto y un margen la izquierda.

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
...

    & form {
      display: flex;
      flex-direction: column;
      align-items: flex-start;
      gap: 16px;

      & .field {
        width: 100%;
        padding: 12px 16px;
        border-radius: 10px;
        border: 1px solid #ddd;
        outline: none;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset;

+       // Added by JavaScript
+       &.error {
+         border-color: #f44336;
+       }
      }

+     & .error-message {
+       display: none;

+       // Added by JavaScript
+       &.error {
+         display: block;
+         color: #f44336;
+         margin-left: 16px;
+       }
+     }

...

```

Por último, le damos los estilos al botón, tiene pinta de que los estilos de este botón se pueden mover a común, ya que se puede reutilizar para las demás páginas.
De momento, lo declaramos aquí y más adelante empezamos a moverlo.

Añadimos `cursor: pointer;` para cambiar el icono del ratón a la mano, y le damos color de fondo, texto, padding, etc. Hacemos una pequeña `transition` para que cuando cambia al estado hover o active tarde un poco en hacer el cambio y no se vea tan brusco.

En el hover, oscurecemos el color usando la función de sass `darken` y en el active, le damos un sombreado.

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
...

    & form {
      ...

+     & .submit-button {
+       background-color: #22c6cb;
+       color: white;
+       border: none;
+       padding: 12px 24px;
+       border-radius: 10px;
+       cursor: pointer;
+       font-weight: 900;
+       transition: all ease 0.2s;

+       &:hover {
+         background-color: darken(#22c6cb, 10%);
+       }

+       &:active {
+         box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1),
+           inset 0 2px 2px 2px rgba(0, 0, 0, 0.2),
+           inset 0 0 2px 2px rgba(0, 0, 0, 0.1);
+       }
+     }
  ...

```

El footer de la card:

_./src/pages/login.html_

```diff
...
        <button class="submit-button" id="login-button" type="submit">
          ENVIAR
        </button>
      </form>
-     <h4>Está Usted en un <strong>sitio seguro</strong></h4>
+     <h4 class="footer">Está Usted en un <strong>sitio seguro</strong></h4>
```

Cambiamos el grosor de la fuente a `300`, y hacemos que sea un contenedor flex para posicionar el icono y el texto en una fila, con un espaciado de `5px` entre ellos.

El icono, lo insertamos mediante el pseudo-elemento `before`, con `content: ''` porque es necesario añadir esta propiedad aunque no tenga contenido, y añadimos el icono, con un `width` y un espaciado extra a la derecha.

_./src/pages/login.styles.scss_

```diff
.root {
  ...

  & .card {
    ...
    & form {

    }

+   & .footer {
+     font-weight: 300;
+     display: flex;
+     flex-direction: row;
+     gap: 5px;

+     &::before {
+       content: '';
+       background: url(../../core/content/img/secure_site.svg) no-repeat center
+         center;
+       width: 20px;
+       margin-right: 5px;
+     }
+   }
  }
}
```

Ahora que tenemos la página entera maquetada, podemos plantearnos mover cosas a común, por ejemplo:

- Variables de los colores: Creamos el fichero parcial `_palette` (estos ficheros no los vamos a importar en el html, sino que son utilizados en otros scss).

_./src/core/content/css/\_palette.scss_

```diff
+ $palette-primary-main: #22c6cb;
+ $palette-primary-contrast-text: white;
+ $palette-error-main: #f44336;

```

Y lo utilizamos en los estilos de login:

_./src/pages/login.styles.scss_

```diff
+ @import '../../core/content/css/palette';

.root {
...
    & .title {
      font-weight: 300;
      font-size: 2.2rem;
-     border-left: 10px solid #22c6cb;
+     border-left: 10px solid $palette-primary-main;
      padding-left: 10px;
    }
...
      & .field {
        width: 100%;
        padding: 12px 16px;
        border-radius: 10px;
        border: 1px solid #ddd;
        outline: none;
        box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset;

        // Added by JavaScript
        &.error {
-         border-color: #f44336;
+         border-color: $palette-error-main;
        }
      }

      & .error-message {
        display: none;

        // Added by JavaScript
        &.error {
          display: block;
-         color: #f44336;
+         color: $palette-error-main;
          margin-left: 16px;
        }
      }
...
      & .submit-button {
-       background-color: #22c6cb;
+       background-color: $palette-primary-main;
-       color: white;
+       color: $palette-primary-contrast-text;
        border: none;
        padding: 12px 24px;
        border-radius: 10px;
        cursor: pointer;
        font-weight: 900;
        transition: all ease 0.2s;

        &:hover {
-         background-color: darken(#22c6cb, 10%);
+         background-color: darken($palette-primary-main, 10%);
        }

        &:active {
          box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1),
            inset 0 2px 2px 2px rgba(0, 0, 0, 0.2),
            inset 0 0 2px 2px rgba(0, 0, 0, 0.1);
        }
      }
...
```

- Variables de los breakpoints de las mediaqueries: Creamos el fichero parcial `_breakpoints`.

_./src/core/content/css/\_breakpoints.scss_

```diff
+ $breakpoints-md: 900px;

```

Y lo utilizamos en los estilos de login:

_./src/pages/login.styles.scss_

```diff
@import '../../core/content/css/palette';
+ @import '../../core/content/css/breakpoints';

...
-   @media (min-width: 900px) {
+   @media (min-width: $breakpoints-md) {
      border-radius: 10px;
      max-width: 500px;
    }
...

```

- Incluso, podemos crearnos estilos de componentes comunes, por ejemplo el botón primario:

_./src/core/content/css/\_components.scss_

```diff
+ @import './palette';

+ @mixin button(
+   $color: $palette-primary-main,
+   $contrast-text: $palette-primary-contrast-text
+ ) {
+   background-color: $color;
+   color: $contrast-text;
+   border: none;
+   padding: 12px 24px;
+   border-radius: 10px;
+   cursor: pointer;
+   font-weight: 900;
+   transition: all ease 0.2s;

+   &:hover {
+     background-color: darken($color, 10%);
+   }

+   &:active {
+     box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1),
+       inset 0 2px 2px 2px rgba(0, 0, 0, 0.2),
+       inset 0 0 2px 2px rgba(0, 0, 0, 0.1);
+   }
+ }


```

Y lo utilizamos en los estilos de login:

_./src/pages/login.styles.scss_

```diff
@import '../../core/content/css/palette';
@import '../../core/content/css/breakpoints';
+ @import '../../core/content/css/components';

...
      & .submit-button {
+       @include button;
-       background-color: $palette-primary-main;
-       color: $palette-primary-contrast-text;
-       border: none;
-       padding: 12px 24px;
-       border-radius: 10px;
-       cursor: pointer;
-       font-weight: 900;
-       transition: all ease 0.2s;

-       &:hover {
-         background-color: darken($palette-primary-main, 10%);
-       }

-       &:active {
-         box-shadow: inset 0 2px 0 0 rgba(0, 0, 0, 0.1),
-           inset 0 2px 2px 2px rgba(0, 0, 0, 0.2),
-           inset 0 0 2px 2px rgba(0, 0, 0, 0.1);
-       }
      }
...

```

> Ejemplo `@include button(red);`.
