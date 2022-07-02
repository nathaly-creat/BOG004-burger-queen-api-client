<div align='center'>
  <h1>La Burguer</h1>

  ![Logo](./src/assets/images/laBurgLogo2.jpeg)
</div>
<br>

# Contenido

* [Descripción del Producto](#Descripción-del-Producto)
     * [Tecnologías Usadas.](#Tecnologías-Usadas.)
     * [Roles de los usuarios.](#Roles-de-los-usuarios)
* [Producto Terminado](#Producto-Terminado)
    * [Credenciales.](#Credenciales)
* [Historias de Usuarios](#Historias-de-Usuarios)
* [Test Unitario](#Test-Unitario)
* [Autores](#Autores)

# Descripción de Producto

LaBurguer es una *single page application (SPA)* desarrollado usando *React* para un restaurante de hamburguesas. Nuestra aplicación es una interfaz con estado sincrónico para la gestión de las operaciones del restaurante, las funcionalidades a las que es posible acceder dependerán del perfil de usuario que se asigne al momento del registro.

El diseño de nuestra aplicación tiene como concepto el diseño web optimizado para Tablets y Smartphones. 

## *Tecnologías Usadas.*
<br>
<div align="center">

![https://developer.mozilla.org/es/docs/Web/HTML](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653397840/file_type_html_icon_130541_atmw6h.png)
![https://developer.mozilla.org/es/docs/Web/CSS](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653398039/file_type_css_icon_130661_kigv4b.png)
![https://developer.mozilla.org/es/docs/Web/JavaScript](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653398044/javascript_icon_130900_va5nkc.png)
![https://es.reactjs.org/](https://upload.wikimedia.org/wikipedia/commons/thumb/4/47/React.svg/30px-React.svg.png)
![npm](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656693016/npm_original_wordmark_logo_icon_146402_1_n7b6ko.png)
![https://getbootstrap.com/](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b2/Bootstrap_logo.svg/30px-Bootstrap_logo.svg.png)
![https://www.figma.com/](https://upload.wikimedia.org/wikipedia/commons/thumb/3/33/Figma-logo.svg/20px-Figma-logo.svg.png)
![https://jestjs.io/](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653396951/file_type_jest_snapshot_icon_130513_elq3km.png)
![https://git-scm.com/](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653397045/file_type_git_icon_130581_yfdybp.png)
![https://github.com/](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1653397485/github_logo_icon_169115_fxnzjn.png)

</div>

## *Roles de los usuarios.*

* <span style="color:#eb7c68;">**Administrador:**</span> El alcance de su acceso incluye creación de usuarios, actualización del registro de usuario y la visualización del estado de las ordenes generadas en las operaciones del restaurante.
* <span style="color:#eb7c68;">**Mesero:**</span> El alcance de su acceso incluye tomar pedidos y editarlos antes de crear la orden. El mesero tiene acceso a el set de ordenes listas para entregar a la mesa y al historial de ordenes entregadas. 
* <span style="color:#eb7c68;">**Chef**</span> El alcance de su acceso incluye ver la lista de ordenes enviadas por el mesero que necesitan ser preparadas, puede marcarlas como listas adicionalmente puede ver el historial de ordenes entregadas y el record de tiempo que tomó prepararlas.


# Producto terminado.

## *Credenciales de acceso:*
* mesero@laburguer.xyz
* chef@laburguer.xyz

* Contraseña: 123456 

<span style="color:#eb7c68;">*Vista Login.*</span>

![Login](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656694797/loginLaBurguer_el84fg.png)

<span style="color:#eb7c68;">*Vista Administrador.*</span>

![admin](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656694867/adminLaBurguer_esvvyn.png)

<span style="color:#eb7c68;">*Vista Mesero.*</span>

![waiter](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656695001/waiterLaBurguer_z8gmgv.png)

<span style="color:#eb7c68;">*Vista Chef.*</span>

![kitchen](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656702557/kitchenLaBurguer_o0akhh.png)


# Historias de Usuario

- <span style="color:#eb7c68;">**HU 1:**</span> Mesero(a) debe poder ingresar al sistema, si el administrador ya le ha asignado credenciales. *"Yo como mesero(a) quiero poder ingresar al sistema de pedidos."*
- <span style="color:#eb7c68;">**HU 2:**</span> Mesero(a) debe poder tomar pedido de cliente. *"Yo como mesero(a) quiero tomar el pedido de un cliente para no depender de mi mala memoria, para saber cuánto cobrar, y enviarlo a la cocina para evitar errores y que se puedan ir preparando en orden."*
- <span style="color:#eb7c68;">**HU 3:**</span> Jefe de cocina debe ver los pedidos. *"Yo como jefe(a) de cocina quiero ver los pedidos de los clientes en orden y marcar cuáles están listos para saber qué se debe cocinar y avisar a los meseros que un pedido está listo para servirlo a un cliente."*
- <span style="color:#eb7c68;">**HU 4:**</span> Mesero(a) debe ver pedidos listos para servir. *"Yo como mesero(a) quiero ver los pedidos que están preparados para entregarlos rápidamente a los clientes que las hicieron."*
- <span style="color:#eb7c68;">**HU 5:**</span> Administrador(a) de tienda debe administrar a sus trabajadores.
*"Yo como administrador(a) de tienda quiero gestionar a los usuarios de la plataforma para mantener actualizado la información de mis trabajadores."*
# Test Unitarios (gitHub actions)

![test-1](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656706670/test_parte1_fnv0yx.png)
![test-2](https://res.cloudinary.com/dtaq1ip2g/image/upload/v1656706670/test_parte2_lqf9u8.png)

# Autores
 Developers | Contact |
| ------------- | ------------- |
| <span style="color:#dbdddf;">**Nathaly Huerta**</span> | [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/nathalyhuertabermúdez/) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/nathaly-creat) |
| <span style="color:#dbdddf;">**Ana Margarita García**</span>| [![LinkedIn](https://img.shields.io/badge/linkedin-%230077B5.svg?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/ana-margarita-garcia/
) [![GitHub](https://img.shields.io/badge/github-%23121011.svg?style=for-the-badge&logo=github&logoColor=white)](https://github.com/anagarcia791) |