# 02 Account list

Vamos a partir del ejemplo anterior `01-login`.

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

Vamos a seguir la misma forma de trabajar que en el ejemplo anterior, comenzamos con el layout.

_./src/pages/account-list.html_

```diff
...

- <body>
+ <body class="root">
    <header>
      <div>
  ...

```

Layout pagina account-list:

- En este caso podemos optar por 2 opciones, usar display `flex` en modo columna o usar `grid` si vemos que podemos situar varios elementos hijos en diferentes posiciones.

- En este caso, vamos a usar `flex` ya que todo se pinta en una sola columna.

_./src/pages/account-list.styles.scss_

```scss
.root {
  display: flex;
  flex-direction: column;
}
```

- Queremos centrar a todos los hijos con un tamaño máximo de `1200px`, pero que el color de fondo ocupe el 100% y que el contenido quede centrado.

  Ej: el primer `:nth-child(n)` hace referencia al header donde vamos a estilar el color de fondo y el segundo `:nth-child(n)` hace referencia al `div` hijo del header

  > NOTA:
  > Con el segundo `nth-child`, obligamos a que los hijos de más abajo ocupen el 100% siempre y como máximo 1200px

_./src/core/content/css/\_breakpoints.scss_

```diff
$breakpoints-md: 900px;
+ $breakpoints-lg: 1200px;

```

_./src/pages/account-list.styles.scss_

```diff
+ @import '../../core/content/css/breakpoints';

.root {
  display: flex;
  flex-direction: column;
+ align-items: center;

+ & > :nth-child(n) {
+   width: 100%;
+   display: flex;
+   flex-direction: row;
+   justify-content: center;

+   & > :nth-child(n) {
+     width: 100%;
+     max-width: $breakpoints-lg;
+   }
+ }
}

```

Añadimos los estilos de la cabecera:

_./src/pages/account-list.html_

```diff
...

  <body class="root">
    <header>
-     <div>
+     <div class="header-subcontainer">
        <a href="../login/login.html">
          <img src="../../core/content/img/logo_header_white.svg" />
        </a>
-       <p>Bienvenido Sr. Juan López</p>
+       <p class="user">Bienvenido Sr. Juan López</p>
      </div>
    </header>
  ...

```

_./src/pages/account-list.styles.scss_

```diff
@import '../../core/content/css/breakpoints';
+ @import '../../core/content/css/palette';

.root {
  ...

  & > :nth-child(n) {
    width: 100%;
    max-width: $breakpoints-lg;

    & > :nth-child(n) {
      width: 100%;
    }
  }

+ & header {
+   background-color: $palette-primary-main;
+   padding-top: 40px;
+   padding-bottom: 40px;
+ }
}

```

Añadimos los estilos del subcontainer haciendo que tenga un layout flex.

Añadimos los estilos de la imagen para que sea responsive.

_./src/pages/account-list.styles.scss_

```diff

.root {
  ...

  & header {
    max-width: 100%;
    background-color: $palette-primary-main;
    padding-top: 40px;
    padding-bottom: 40px;

+   & .header-subcontainer {
+     display: flex;
+     flex-direction: row;
+     justify-content: space-between;
+     align-items: center;
+     padding-left: 16px;
+     padding-right: 16px;
+   }

+   & img {
+     max-width: 200px;
+     width: 100%;
+   }
  }
}

```

Por último añadimos los estilos del usuario, parecido a como lo hicimos en el login:

_./src/pages/account-list.styles.scss_

```diff

.root {
  ...

  & header {
    ...

    & img {
      max-width: 200px;
      width: 100%;
    }

+   & .user {
+     color: white;
+     display: flex;
+     flex-direction: row;
+     gap: 10px;

+     &::before {
+       content: '';
+       background: url(../../core/content/img/icon-user.svg) no-repeat center
+         center;
+       width: 20px;
+     }
+   }

  }
}

```

Estilos de la barra de navegación:

_./src/pages/account-list.html_

```diff
...
    <nav>
-     <ul>
+     <ul class="navbar-list">
-       <li>Mis cuentas</li>
+       <li class="selected">Mis cuentas</li>
        <li><a href="../movements/movements.html">Movimientos</a></li>
        <li><a href="../transfer/transfer.html">Transferencias</a></li>
      </ul>
    </nav>
  ...

```

Creamos las variables del color secundario

_./src/core/content/css/\_palette.scss_

```diff
$palette-primary-main: #22c6cb;
$palette-primary-contrast-text: white;
+ $palette-secondary-main: #232c3b;
+ $palette-secondary-contrast-text: white;
$palette-error-main: #f44336;

```

Y aplicamos los estilos:

  - Cambiamos los márgenes y padding para resear los estilos por defecto del ul y le quitamos los puntos del ul con `list-style-type: none;`. (Normalmente por ésto se usan librerias externas para resear estos estilos como normalize.css, etc.).
  - Le añadimos el display `flex` con espaciado entre items de `40px`
  - Cambiamos el color de fuente
  - Cambiamos tambien lo anchor con color y quitamos la raya horizontal
  - Le damos el estilo del item seleccionado

_./src/pages/account-list.styles.scss_

```diff
...
  & header {
    ...
  }

+ & nav {
+   background-color: $palette-secondary-main;

+   & .navbar-list {
+     // <= Estilos para resetear el ul >
+     margin-top: 10px;
+     margin-bottom: 0;
+     padding-left: 0;
+     list-style-type: none;
+     // <# Estilos para resetear el ul >
+     display: flex;
+     flex-direction: row;
+     justify-content: center;
+     gap: 40px;

+     & > :nth-child(n) {
+       color: $palette-secondary-contrast-text;
+       & a {
+         color: $palette-secondary-contrast-text;
+         text-decoration: none;
+       }
+     }

+     & .selected {
+       border-bottom: 5px solid $palette-primary-main;
+       padding-bottom: 5px;
+     }
+   }
+ }

```

Estilos del título de la página:

_./src/pages/account-list.html_

```diff
...
    <section>
      <div>
-       <div>
+       <div class="title-container">
-         <h1>Mis cuentas</h1>
+         <h1 class="title">Mis cuentas</h1>
-         <a href="../account/account.html">AGREGAR NUEVA CUENTA</a>
+         <a class="new-account-button" href="../account/account.html"
        </div>
  ...

```

- Añadimos el layout del contenedor
- Añadimos el estilo del border
- Añadimos un margin top
- Actualizamos los estilos del título
- Y reutilizamos los estilos del botón.

_./src/pages/account-list.styles.scss_

```diff
@import '../../core/content/css/breakpoints';
@import '../../core/content/css/palette';
+ @import '../../core/content/css/components';

...
  & nav {
    ...
  }

+ & .title-container {
+   display: flex;
+   flex-direction: row;
+   justify-content: space-between;
+   border-bottom: 5px solid $palette-secondary-main;
+   padding-bottom: 5px;
+   margin-top: 30px;

+   & .title {
+     margin: 0;
+     font-weight: 300;
+     font-size: 2.2rem;
+   }

+   & .new-account-button {
+     @include button;
+   }
+ }

```

Quitamos la decoración del anchor en el componente botón:

_./src/core/content/css/\_component.scss_

```diff
...
  cursor: pointer;
  font-weight: 900;
  transition: all ease 0.2s;
+ text-decoration: none;

  &:hover {
    background-color: darken($color, 10%);
  }
...

```

Estilos del listado:

_./src/pages/account-list.html_

```diff
...
-       <table>
+       <table class="account-list">
          <thead>
            <tr>
              <td>IBAN</td>
              <td>ALIAS</td>
              <td>SALDO DISPONIBLE</td>
              <td>ÚLTIMA OPERACIÓN</td>
              <td>OPERACIÓN</td>
            </tr>
          </thead>
          <tbody id="account-list"></tbody>
        </table>
  ...

```

Añadimos los estilos de la tabla, la row de la cabecera y del body y cada una de las celdas.

_./src/pages/account-list.styles.scss_

```diff
...

 & .title-container {
    ...
 }

+ & .account-list {
+   width: 100%;
+   margin-top: 5px;
+   color: $palette-secondary-main;

+   & thead tr {
+     background-color: #ccc;
+     font-weight: 900;
+   }

+   & tbody tr:nth-child(even) {
+     background-color: #eee;
+     font-weight: 300;
+   }

+   & td {
+     padding: 10px;
+     font-size: 0.8rem;
+   }

+   & a {
+     color: $palette-secondary-main;
+     font-weight: 600;
+   }
+ }

```

Alineamos las celdas con números a la derecha, esta clase es añadida desde JavaScript en el fichero `account-list.helpers.js`:

_./src/pages/account-list.styles.scss_

```diff
...

  & .title-container {
     ...
  }

  & .account-list {
    ...

    & a {
      color: $palette-secondary-main;
      font-weight: 600;
    }

+   // Added from JavaScript
+   & .align-right {
+     text-align: right;
+   }
  }

```

Añadimos los estilos de la clase `.select` también añadida desde JavaScript en el fichero `account-list.helpers.js`:

_./src/pages/account-list.styles.scss_

```diff
...

  & .title-container {
     ...
  }

  & .account-list {
    ...

    // Added from JavaScript
    & .align-right {
      text-align: right;
    }

+   // Added from JavaScript
+   & .select {
+     padding: 8px 12px;
+     border-radius: 10px;
+     border: 1px solid black;
+     width: 100%;
+     max-width: 200px;
+     box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5);
+   }
  }

```

Por último, añadimos los estilos del footer:

_./src/pages/account-list.html_

```diff
...
    <footer>
-     <div>
+     <div class="footer-subcontainer">
        <img src="../../core/content/img/logo_footer.svg" />
      </div>
    </footer>
  ...

```

_./src/pages/account-list.styles.scss_

```diff
...
  & .account-list {
     ...
  }

+ & footer {
+   background-color: $palette-secondary-main;
+   padding: 80px;
+   margin-top: 100px;

+   & .footer-subcontainer {
+     display: flex;
+     flex-direction: row;
+     justify-content: center;

+     & img {
+       width: 100%;
+       max-width: 200px;
+     }
+   }
+ }
...

```

## Ejercicio

- Estamos repitiendo los estilos del logo. Podemos sacarlo a un estilo común.
