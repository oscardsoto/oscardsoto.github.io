---
layout:       post
title:        Instala MySQL en tu máquina Linux
pdate:        [07, 04, 2022]
---
Para que tengas MySQL dentro de tu ordenador Linux de manera segura y sin ningún problema. Este procedimiento lo realicé en Ubuntu v20.04, pero funciona también para Kali Linux, Debian, Lubuntu, o parecidos.

Abriremos la consola y colocaremos los siguientes comandos:

```cmd
sudo apt-get install mysql-server
```

Después de darle en continuar (respondiendo si al procedimiento) se empezará a instalar. El software no es tan pesado, lo que será pesado son las bases de datos que crearemos a lo largo de su uso. La instalación será rápida.

Una vez instalado, estaremos a la mira de varios hackers si lo ejecutamos tal cual, debido a que aún no hemos configurado el gestor. MySQL tiene un script de seguridad que debemos ejecutar con el siguiente comando:

```cmd
sudo mysql_secure_installation
```

Una vez ejecutado, la consola te pedirá si deseas agregar una contraseña para conectar a MySQL, ya que en estos momentos la conexión se realiza sin ningún tipo de contraseña.

{% include functions/img.html src="instala-mysql-linux/validate-pass.png" alt="Imagen de captura 0" %}

Si le damos que sí (con _Y_), nos pedirá un nivel de seguridad para la contraseña que vamos a insertar. Esto es a la elección de cada quien, pero para este caso seleccionaré la opción 1 (nivel de seguridad medio). Después de esto nos pedirá insertarla.

{% include functions/img.html src="instala-mysql-linux/tipo-contrasenia.png" alt="Imagen de captura 1" %}

Después, nos preguntará si continuamos con la contraseña proporcionada.

{% include functions/img.html src="instala-mysql-linux/contrasenia-continuar.png" alt="Imagen de captura 2" %}

En el momento en que presionamos Y, y le damos a ENTER, nos preguntará si deseamos eliminar los usuarios anónimos. Esto es para proporcionar acceso anónimo a tus bases de datos. Si deseas dar acceso a usuarios anónimos, procede a decirle a la consola que no. De lo contrario, presiona _Y_.

{% include functions/img.html src="instala-mysql-linux/usuarios-anonimos.png" alt="Imagen de captura 3" %}

Después nos preguntará si deseamos desactivar el acceso remoto de nuestro usuario root. Esto siempre es una buena idea. Las actividades del usuario root siempre se deben ejecutar de manera local, independientemente de la situación. Dicho esto, procederemos a escribir _Y_.

{% include functions/img.html src="instala-mysql-linux/login-remoto.png" alt="Imagen de captura 4" %}

La siguiente pregunta trata acerca de la base de datos por defecto que se crea al momento de instalar MySQL. No afecta en nada en la aplicación, así es que no hay ningún problema si la eliminamos.

{% include functions/img.html src="instala-mysql-linux/database-test.png" alt="Imagen de captura 5" %}

Después nos pedirá que reiniciemos los privilegios de las tablas. Esto quiere decir que reiniciará los permisos por los cuales nosotros podremos realizar cambios en las tablas. Diremos que sí, y ya tendremos nuestro MySQL instalado.

Ahora solo tendremos que iniciarlo. Usaremos el siguiente comando para tenerlo ejecutándose dentro de nuestra máquina:

```cmd
sudo systemctl enable --now mysql.service
```

Con este comando, le estoy diciendo al sistema que active en el momento el servicio de mysql. Para verificar que nuestro servicio está activo, ejecutamos lo siguiente:

```cmd
systemctl status mysql.service
```

{% include functions/img.html src="instala-mysql-linux/servicio-activo.png" alt="Imagen de captura 2" %}

Si el atributo "Active:" se encuentra en "active (running)", quiere decir que nuestro servidor de mysql está funcionando sin problemas. Si deseas desactivar el servidor, solo ejecuta el siguiente comando:

```cmd
sudo systemctl disable mysql
```