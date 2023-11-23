# Profesionalizando la BD - Proyecto Final

## Objetivos generales

- [x] Utilizar MongoDB como sistema de persistencia principal.
- [x] Definir todos los endpoints necesarios para trabajar con productos y carritos.

## Objetivos específicos

- [x] Profesionalizar las consultas de productos con filtros, paginación y ordenamientos.
- [x] Profesionalizar la gestión de carritos para implementar los últimos conceptos aprendidos.

## Entrega del Proyecto

- [x] Proporcionar un enlace al repositorio de GitHub que excluye la carpeta de `node_modules`.

## Sugerencias

- [x] Permitir comentarios en el archivo.
- [x] Mantener la lógica del negocio existente sin cambios, solo su persistencia.
- [x] Los nuevos endpoints deben seguir la misma estructura y lógica utilizada hasta ahora.

## Tareas de Profesionalización

### Productos

- [x] Modificar el método GET `/` para que cumpla con los siguientes puntos:
  - [x] Poder recibir parámetros de consulta (query params) como `limit` (opcional), `page` (opcional), `sort` (opcional) y `query` (opcional).
  - [x] El parámetro `limit` permite devolver solo el número de elementos solicitados al momento de la petición, con un valor predeterminado de 10 si no se proporciona.
  - [x] El parámetro `page` permite devolver la página que se desea buscar, con un valor predeterminado de 1 si no se proporciona.
  - [x] El parámetro `query` se utiliza para especificar el tipo de elemento que se quiere buscar. Si no se proporciona, se realizará una búsqueda general.
  - [x] El parámetro `sort` permite realizar ordenamientos ascendentes o descendentes por precio. Si no se proporciona, no se realizará ningún ordenamiento.
- [x] El método GET debe devolver un objeto con el siguiente formato:
  ```json
  {
    "status": "success/error",
    "payload": "Resultado de los productos solicitados",
    "totalPages": "Total de páginas",
    "prevPage": "Página anterior",
    "nextPage": "Página siguiente",
    "page": "Página actual",
    "hasPrevPage": "Indicador para saber si la página previa existe",
    "hasNextPage": "Indicador para saber si la página siguiente existe",
    "prevLink": "Link directo a la página previa (null si hasPrevPage=false)",
    "nextLink": "Link directo a la página siguiente (null si hasNextPage=false)"
  }
```

	## Búsqueda y Ordenamiento de Productos

- [x] Implementar la capacidad de buscar productos por categoría o disponibilidad.
- [x] Habilitar el ordenamiento de productos de manera ascendente o descendente por precio.

## Carritos de Compra

### Endpoints del Router de Carts

- [x] Implementar el endpoint `DELETE api/carts/:cid/products/:pid` para eliminar un producto específico del carrito.
- [x] Agregar el endpoint `PUT api/carts/:cid` para actualizar el carrito con un arreglo de productos en el formato especificado previamente.
- [x] Incluir el endpoint `PUT api/carts/:cid/products/:pid` que permita actualizar la cantidad de ejemplares de un producto mediante la información pasada desde `req.body`.
- [x] Implementar el endpoint `DELETE api/carts/:cid` para eliminar todos los productos del carrito.
- [x] Asegurarse de que, en el modelo de Carts, la propiedad `products` contenga IDs que hagan referencia al modelo de Products.
- [x] Modificar la ruta `/:cid` para que al traer todos los productos, los traiga completos utilizando "populate". De esta forma, se almacena solo el ID, pero al solicitarlos se pueden desglosar los productos asociados.

## Vistas

- [x] Crear una vista en el router de vistas `/products` para visualizar todos los productos con paginación.
- [x] Ofrecer dos formas de visualizar los productos:
  - [x] Mostrar una descripción completa del producto, incluyendo detalles de precio, categoría, etc., y un botón para agregar al carrito.
  - [x] Agregar un botón "Agregar al carrito" directamente, sin necesidad de abrir una página adicional con los detalles del producto.
- [x] Agregar una vista en `/carts/:cid` para visualizar un carrito específico que solo muestre los productos que pertenezcan a ese carrito.

