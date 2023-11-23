## Primera entrega de tu Proyecto Final

En esta etapa del proyecto, se desarrollará un servidor que contendrá los endpoints y servicios necesarios para gestionar los productos y carritos de compra en el e-commerce.

## Primera entrega del Proyecto Final

**ENTREGA DEL PROYECTO FINAL**

~~Para esta primera entrega, se debe desarrollar un servidor basado en Node.js y Express que escuche en el puerto 8080 y disponga de dos grupos de rutas: `/products` y `/carts`. Estos endpoints se implementarán utilizando el enrutador de Express, con las siguientes especificaciones: -->~~

### Manejo de Productos

~~Para el manejo de productos, que tendrá su enrutador en `/api/products/`, configura las siguientes rutas:~~

~~- ✓ La ruta raíz `GET /` deberá listar todos los productos de la base, incluyendo la limitación con el parámetro `?limit` del desafío anterior.~~

~~- ✓ La ruta `GET /:pid` deberá traer únicamente el producto con el ID proporcionado.~~

- ✓ La ruta raíz `POST /` deberá agregar un nuevo producto con los siguientes campos:
 ~~ - `id`: Número o Cadena (A tu elección, el ID NO se manda desde el cuerpo de la solicitud, se autogenera como lo hemos visto desde los primeros entregables, asegurando que NUNCA se repitan los IDs en el archivo).~~
  - `title`: Cadena de texto.
  - `description`: Cadena de texto.
  - `code`: Cadena de texto.
  - `price`: Número.
  - `status`: Booleano (Status es `true` por defecto).
  - `stock`: Número.
  - `category`: Cadena de texto.
  - `thumbnails`: Array de Cadenas que contenga las rutas donde están almacenadas las imágenes referentes a dicho producto.

  Todos los campos son obligatorios, a excepción de `thumbnails`.

~~- ✓ La ruta `PUT /:pid` deberá tomar un producto y actualizarlo con los campos enviados desde el cuerpo de la solicitud. En ningún caso se debe actualizar o eliminar el ID al realizar dicha actualización.~~

~~- ✓ La ruta `DELETE /:pid` deberá eliminar el producto con el PID (ID de producto) indicado.~~

~~Para el carrito, que tendrá su enrutador en `/api/carts/`, configura dos rutas:~~

~~- ✓ La ruta raíz `POST /` deberá crear un nuevo carrito con la siguiente estructura:~~
  ~~- `Id`: Número o Cadena (A tu elección, de la misma manera que con los productos, debes asegurarte de que los IDs nunca se dupliquen y se autogeneren).~~
  ~~- `products`: Array que contendrá objetos que representen cada producto.~~


~~- ✓ La ruta `GET /:cid` deberá listar los productos que pertenezcan al carrito con el parámetro `cid` proporcionado.~~

~~- ✓ La ruta `POST /:cid/product/:pid` deberá agregar el producto al arreglo "products" del carrito seleccionado, siguiendo el siguiente formato:~~
 ~~ - `product`: Debe contener SOLO el ID del producto (Es crucial que no agregues el producto completo).~~
  ~~- `quantity`: Debe contener el número de ejemplares de dicho producto. El producto, de momento, se agregará de uno en uno.~~

  ~~Además, si un producto ya existente intenta agregarse al carrito, se deberá incrementar el campo `quantity` de dicho producto.~~

~~- La persistencia de la información se implementará utilizando el sistema de archivos (File System), donde los archivos **"productos.json"** y **"carrito.json"** respaldarán la información.~~

~~- No es necesario realizar ninguna implementación visual; todo el flujo se puede llevar a cabo mediante Postman o el cliente de tu elección.~~

### Formato

- ✓ Proporcionar un enlace al repositorio de GitHub con el proyecto completo, excluyendo la carpeta "node_modules".

### Sugerencias

- ✓ No olvides agregar `app.use(express.json())` para el manejo de datos en formato JSON.

- ✓ No es necesario implementar Multer.

- ✓ Proporcionar un enlace a un video donde se explique el proyecto es una buena práctica.
