# Docker web comercial MSM
Docker para servir la web comercial de multiservicios el morche.

En la actualidad proporciona los siguientes servicios:
 * Servidor web con php
 * Servidor mail con interfaz web para pruebas (mailhog)
 * Demonio que minifica los javascripts

El servicio de la web se sirve en el puerto 8081. El servicio web de mailhog esta en el 8082.

## Comenzando
```shell
git clone https://github.com/aokiji/docker_web_comercial_msm
cd docker_web_comercial_msm
git submodule init; git submodule update
docker-compose build && docker-compose run app_compiler /usr/src/app/node_modules/.bin/gulp build && docker-compose up
```

Ya solo queda acceder con el navegador a http://localhost:8081
