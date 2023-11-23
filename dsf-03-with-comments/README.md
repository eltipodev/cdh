# Servidor con express

## Consigna
- Desarrollar un servidor basado en Express donde podamos hacer consultas a nuestro archivo de productos.

## Aspectos a incluir
- Se deberá utilizar la clase `ProductManager` que actualmente utilizamos con persistencia de archivos.
- Desarrollar un servidor Express que, en su archivo `app.js`, importe el archivo de `ProductManager` que actualmente tenemos.

## Aspectos a incluir
- El servidor debe contar con los siguientes endpoints:
  - Ruta `/products`, la cual debe leer el archivo de productos y devolverlos dentro de un objeto. Agregar el soporte para recibir por query param el valor `?limit=`, el cual recibirá un límite de resultados.
    - Si no se recibe una query de límite, se devolverán todos los productos.
    - Si se recibe un límite, solo devolver el número de productos solicitados.
  - Ruta `/products/:pid`, la cual debe recibir por `req.params` el `pid` (product Id) y devolver solo el producto solicitado en lugar de todos los productos.

## Sugerencias
- Tu clase lee archivos con promesas, recuerda usar `async/await` en tus endpoints.
- Utiliza un archivo que ya tenga productos, pues el desafío solo es para GETs.

## Formato del entregable
- Link al repositorio de GitHub con el proyecto completo, el cual debe incluir:
  - Carpeta `src` con `app.js` dentro y tu `ProductManager` dentro.
  - `package.json` con la información del proyecto.
  - NO INCLUIR LOS `node_modules` generados.

## Testing de este entregable
