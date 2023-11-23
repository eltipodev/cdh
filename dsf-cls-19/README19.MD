# Implementación de Login

## Aspectos a Incluir

- Ajustar el servidor principal para trabajar con un sistema de login.

- Deberá contar con todas las vistas realizadas en el hands-on lab, así también como las rutas de router para procesar el registro y el login.

- Una vez completado el login, realizar la redirección directamente a la vista de productos.

- Agregar a la vista de productos un mensaje de bienvenida con los datos del usuario.

- Agregar un sistema de roles, de manera que si colocamos en el login como correo "adminCoder@coder.com" y la contraseña "adminCod3r123", el usuario de la sesión además tenga un campo de "rol" con el valor "admin".

- Todos los usuarios que no sean admin deberán contar con un rol de "usuario".

- Implementar un botón de "logout" para destruir la sesión y redirigir a la vista de login.

## Pasos para la Implementación

### Login por Formulario

1. Al cargar el proyecto, este deberá comenzar en la pantalla de login.

2. Si no tienes un usuario, primero se creará un usuario. La pantalla de login deberá tener un enlace de redirección "Regístrate".

3. El proceso de registro deberá guardar al usuario en la base de datos.

4. Regresa al proceso de login y coloca las credenciales de manera incorrecta para comprobar que no se pueda avanzar a la siguiente pantalla.

5. Luego, coloca las credenciales de manera correcta para corroborar que se cree una sesión correctamente y que se haga una redirección a la vista de productos.

6. La vista de productos tendrá en la parte superior de la página el mensaje "Bienvenido" seguido de los datos del usuario que se haya logueado (NO mostrar la contraseña). Es importante que se visualice el "rol" para ver que aparezca "usuario" o "user".

7. Presiona el botón de logout y destruye la sesión, notando cómo te redirige a la página de login.

8. Ingresa las credenciales específicas de admin indicadas en las diapositivas. El login debe redirigir correctamente y mostrar en los datos del rol: "admin", haciendo referencia a la correcta gestión de roles.

9. Asegúrate de que el admin NO exista en la base de datos, sino que sea una validación que se haga de manera interna en el código.
