# 03 Account

Vamos a partir del ejemplo anterior `02-account-list`.

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

Dejamos como ejercicio:

  - Sacar a común estilos `root`, `header`, `nav`, `titulo pagina` y `footer`

Mientras tanto, vamos a copiar los mismo estilos de `account-list` que necesitamos en `account`:

_./src/pages/account.html_

```diff
- <body>
+ <body class="root">
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
    <nav>
-     <ul>
+     <ul class="navbar-list">
-       <li>
+       <li class="selected">
          <a href="../account-list/account-list.html">Mis cuentas</a>
        </li>
        <li><a href="../movements/movements.html">Movimientos</a></li>
        <li><a href="../transfer/transfer.html">Transferencias</a></li>
      </ul>
    </nav>
    <section>
      <div>
-       <div>
+       <div class="title-container">
-         <h1>Cuenta Bancaria</h1>
+         <h1 class="title">Cuenta Bancaria</h1>
        </div>
        <form>
          ...
        </form>
      </div>
    </section>
    <footer>
-     <div>
+     <div class="footer-subcontainer">
        <img src="../../core/content/img/logo_footer.svg" />
      </div>
    </footer>
```

_./src/pages/account.styles.scss_

```scss
@import '../../core/content/css/breakpoints';
@import '../../core/content/css/palette';

.root {
  // <= TODO: Move styles to common >
  display: flex;
  flex-direction: column;
  align-items: center;

  & > :nth-child(n) {
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;

    & > :nth-child(n) {
      width: 100%;
      max-width: $breakpoints-lg;
    }
  }

  & header {
    background-color: $palette-primary-main;
    padding-top: 40px;
    padding-bottom: 40px;

    & .header-subcontainer {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding-left: 16px;
      padding-right: 16px;
    }

    & img {
      max-width: 200px;
      width: 100%;
    }

    & .user {
      color: white;
      display: flex;
      flex-direction: row;
      gap: 10px;

      &::before {
        content: '';
        background: url(../../core/content/img/icon-user.svg) no-repeat center
          center;
        width: 20px;
      }
    }
  }

  & nav {
    background-color: $palette-secondary-main;

    & .navbar-list {
      // <= Estilos para resetear el ul >
      margin-top: 10px;
      margin-bottom: 0;
      padding-left: 0;
      list-style-type: none;
      // <# Estilos para resetear el ul >
      display: flex;
      flex-direction: row;
      justify-content: center;
      gap: 40px;

      & > :nth-child(n) {
        color: $palette-secondary-contrast-text;
        & a {
          color: $palette-secondary-contrast-text;
          text-decoration: none;
        }
      }

      & .selected {
        border-bottom: 5px solid $palette-primary-main;
        padding-bottom: 5px;
      }
    }
  }

  & .title-container {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 5px solid $palette-secondary-main;
    padding-bottom: 5px;
    margin-top: 30px;

    & .title {
      margin: 0;
      font-weight: 300;
      font-size: 2.2rem;
    }
  }

  & footer {
    background-color: $palette-secondary-main;
    padding: 80px;
    margin-top: 100px;

    & .footer-subcontainer {
      display: flex;
      flex-direction: row;
      justify-content: center;

      & img {
        width: 100%;
        max-width: 200px;
      }
    }
  }
  // <# TODO: Move styles to common >
}

```

Como vemos, solamente necesitamos implementar los estilos del formulario, aquí tambien podemos coger los mismos estilos del `login` pero con pequeños cambios:

_./src/pages/account.html_

```diff
...
        <form>
          <div>
            <label>Tipo de cuenta:</label>
-           <select id="type">
+           <select class="field" id="type">
              <option value=""></option>
              <option value="1">Nómina</option>
              <option value="2">Ahorro</option>
              <option value="3">Normal</option>
            </select>
-           <p id="type-error"></p>
+           <p class="error-message" id="type-error"></p>
          </div>
          <div>
            <label>Alias:</label>
-           <input id="alias" type="text" />
+           <input class="field" id="alias" type="text" />
-           <p id="alias-error"></p>
+           <p class="error-message" id="alias-error"></p>
          </div>
          <button
+           class="submit-button"
            id="save-button"
            type="submit"
          >
            GUARDAR
          </button>
        </form>
...
```

_./src/pages/account.styles.scss_

```diff
@import '../../core/content/css/breakpoints';
@import '../../core/content/css/palette';
+ @import '../../core/content/css/components';

.root {
  ...
  // <# TODO: Move styles to common >

+ // TODO Move to common needed form styles
+ & form {
+   display: flex;
+   flex-direction: column;
+   align-items: flex-start;
+   gap: 16px;

+   & .field {
+     width: 100%;
+     padding: 12px 16px;
+     border-radius: 10px;
+     border: 1px solid #ddd;
+     outline: none;
+     box-shadow: 0px 1px 2px rgba(0, 0, 0, 0.3) inset;

+     // Added by JavaScript
+     &.error {
+       border-color: $palette-error-main;
+     }
+   }

+   & .error-message {
+     display: none;

+     // Added by JavaScript
+     &.error {
+       display: block;
+       color: $palette-error-main;
+       margin-left: 16px;
+     }
+   }

+   & .submit-button {
+     @include button;
+   }
+ }
}

```

Hacemos los cambios necesario para este formulario:

_./src/pages/account.html_

```diff
...
        <form>
          <fieldset>
-           <div>
+           <div class="field-inline-container">
              <label>Tipo de cuenta:</label>
-             <select class="field" id="type">
+             <select class="field select" id="type">
                <option value=""></option>
                <option value="1">Nómina</option>
                <option value="2">Ahorro</option>
                <option value="3">Normal</option>
              </select>
              <p class="error-message" id="type-error"></p>
            </div>
-           <div>
+           <div class="field-inline-container">
              <label>Alias:</label>
              <input class="field" id="alias" type="text" />
              <p class="error-message" id="alias-error"></p>
            </div>
          </fieldset>
          <button
            class="submit-button"
            id="save-button"
            type="submit"
          >
            GUARDAR
          </button>
        </form>
...

```

- Añadimos los estilos del elemento `fieldset` que nos permite agrupar un conjunto de campos de un formulario. Reseteamos los estilos por defecto de éste, y aplicamos los nuestros.

_./src/pages/account.styles.scss_

```diff
...

.root {
  ...
  // <# TODO: Move styles to common >

  // TODO Move to common needed form styles
  & form {
    ...

    & .submit-button {
      @include button;
    }

+   & fieldset {
+     // <= Reset fieldset default styles >
+     border: none;
+     padding: 0;
+     margin: 0;
+     // <# Reset fieldset default styles >

+     display: flex;
+     flex-direction: column;
+     gap: 10px;
+     padding-top: 30px;
+     padding-bottom: 30px;
+     width: 100%;
+     border-bottom: 1px solid $palette-secondary-main;
+   }
  }
}

```

- Añadimos los mismo estilos de un `select` que hicimos en el fichero `account-list.styles`, pero además le añadimos el estilo del error

_./src/pages/account.styles.scss_

```diff
...

.root {
  ...
  // <# TODO: Move styles to common >

  // TODO Move to common needed form styles
  & form {
    ...

    & fieldset {
      ...
    }

+   // TODO: Move to common, copied from account-list.styles
+   & .field.select {
+     padding: 8px 12px;
+     border-radius: 10px;
+     border: 1px solid black;
+     width: 100%;
+     max-width: 200px;
+     box-shadow: 0px 1em 2em -1.5em rgba(0, 0, 0, 0.5);

+     &.error {
+       border-color: $palette-error-main;
+     }
+   }
  }
}

```

- Añadimos los estilos de como debe comportarse el contenedor de un campo cuando queremos en una línea: `label`, `field` y `error-message`

- para cualquier `field` le damos un width max de `400px`
- pero si es un `select`, lo reducimos a `200px`

_./src/pages/account.styles.scss_

```diff
...

.root {
  ...
  // <# TODO: Move styles to common >

  // TODO Move to common needed form styles
  & form {
    ...

    // TODO: Move to common, copied from account-list.styles
    & .field.select {
      ...
    }

+   & .field-inline-container {
+     width: 100%;
+     display: flex;
+     flex-direction: row;
+     align-items: center;
+     gap: 20px;

+     & label {
+       min-width: 300px;
+       text-align: right;
+     }

+     & .field {
+       max-width: 400px;
+     }

+     & .field.select {
+       max-width: 200px;
+     }

+     & .error-message.error {
+       margin-left: 0;
+     }
+   }
  }
}

```

Dejamos como ejercicio:

  - Sacar a común estilos `formulario`
