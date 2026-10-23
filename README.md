# Web basica

Esqueleto minimo con frontend vanilla y backend Python.

## Estructura

- `frontend/index.html`: pagina principal.
- `frontend/src/css/styles.css`: estilos.
- `frontend/src/js/app.js`: comportamiento del navegador.
- `backend/src/app.py`: servidor Flask y endpoint `/api/health`.
- `backend/requirements.txt`: dependencias Python.

## Conceptos basicos

### Frontend

El frontend es la parte de la web que se ejecuta en el navegador y que ve y utiliza la persona. En este proyecto esta formado por `index.html`, `styles.css` y `app.js`.

- **HTML** define el contenido y la estructura: titulos, textos, botones y otros elementos.
- **CSS** significa *Cascading Style Sheets* (hojas de estilo en cascada). Define la apariencia de la pagina: colores, espacios, tamanos, posicionamiento y adaptacion visual.
- **JavaScript** agrega comportamiento. En esta web escucha el clic del boton y consulta al backend para mostrar su estado.

### Backend

El backend es la parte que se ejecuta en el servidor. Recibe peticiones del frontend, aplica logica y devuelve respuestas. En esta web el backend esta escrito en Python y se encuentra en `backend/src/app.py`.

### Flask

Flask es un microframework de Python para crear aplicaciones web y APIs. Se llama "microframework" porque proporciona las piezas esenciales, como un servidor de desarrollo y un sistema de rutas, sin obligar a utilizar una base de datos, un sistema de usuarios u otras funciones que este proyecto todavia no necesita.

En esta web Flask se utiliza para:

- Crear la aplicacion web.
- Definir las rutas `/`, `/api/health` y las rutas de archivos del frontend.
- Iniciar el servidor local en el puerto `5000`.
- Entregar el HTML, CSS y JavaScript al navegador.
- Devolver la respuesta JSON del endpoint de salud.

### API

Una API (*Application Programming Interface* o interfaz de programacion de aplicaciones) es una forma organizada para que dos programas se comuniquen. Aqui el JavaScript del navegador se comunica con Flask mediante una peticion HTTP a `/api/health`.

### JSON

JSON (*JavaScript Object Notation*) es un formato de texto para representar y transportar datos entre aplicaciones. Es facil de leer tanto para las personas como para los programas. Aunque su nombre contiene "JavaScript", puede utilizarse con Python, JavaScript y muchos otros lenguajes.

El backend devuelve esta respuesta JSON cuando se consulta `/api/health`:

```json
{
	"status": "ok"
}
```

En este objeto, `status` es la clave y `ok` es su valor. Flask crea esta respuesta con `jsonify`, y el frontend la convierte en un objeto JavaScript mediante `response.json()` para poder mostrar `Backend: ok` en la pagina.

### Endpoint

Un endpoint es una direccion concreta de una API que realiza una funcion. En este proyecto:

- `GET /api/health` es el endpoint que comprueba si el backend funciona y devuelve `{ "status": "ok" }`.
- `GET /` entrega la pagina principal.
- `GET /<path:filename>` entrega archivos del frontend, como `src/css/styles.css` y `src/js/app.js`.

`GET` indica que el navegador esta solicitando informacion. Una API mas completa podria utilizar tambien `POST` para crear datos, `PUT` para actualizarlos o `DELETE` para eliminarlos.

### Por que usamos `health`

`health` significa "salud" o "estado". Se utiliza como nombre habitual para un endpoint de comprobacion, tambien llamado *health check*. Su objetivo es responder rapidamente a una pregunta sencilla: "¿el backend esta activo y puede responder?".

Este endpoint no consulta una base de datos ni realiza una operacion compleja. Solo devuelve `status: ok`, por lo que sirve como una primera prueba de comunicacion entre el frontend y el backend. Si el navegador recibe esa respuesta, sabemos que Flask esta ejecutandose, la ruta existe y la peticion llego correctamente.

En una aplicacion mas grande, un endpoint de salud podria comprobar tambien la base de datos, otros servicios o el espacio disponible. En esta web basica solo comprueba el servidor Flask.

### Dependencias

Las dependencias son programas o paquetes externos que el proyecto necesita para funcionar. Se declaran en `backend/requirements.txt` para que puedan instalarse de forma repetible con `pip install -r requirements.txt`.

Una dependencia directa es una libreria que el proyecto solicita explicitamente. Las dependencias indirectas o transitivas son librerias que una dependencia directa necesita para funcionar. Todas se instalan dentro de `.venv`.

### Librerias utilizadas

Una libreria es codigo ya escrito y reutilizable que ofrece funciones listas para usar. En este proyecto se instala Flask y, automaticamente, sus dependencias internas:

- **Flask**: framework principal para crear el servidor web, registrar rutas y enviar respuestas.
- **Werkzeug**: gestiona partes fundamentales del servidor WSGI, las peticiones HTTP, las respuestas y el enrutamiento que utiliza Flask.
- **Jinja2**: motor de plantillas de Flask. Esta web no lo usa directamente todavia, pero permite generar HTML dinamico en proyectos posteriores.
- **MarkupSafe**: ayuda a tratar texto HTML de forma segura cuando se generan plantillas con Jinja2.
- **ItsDangerous**: permite firmar datos de forma segura, por ejemplo para sesiones o tokens.
- **Click**: proporciona comandos de terminal para ejecutar y administrar aplicaciones Flask.
- **Blinker**: ofrece un sistema de senales o eventos internos que Flask puede utilizar.

El frontend no utiliza librerias JavaScript externas: usa las funciones nativas del navegador, como `fetch`, `document.querySelector` y los eventos de los botones.

### Carpeta `src`

`src` es una abreviatura habitual de *source* (codigo fuente). Es la carpeta donde se guarda el codigo principal que se escribe para la aplicacion. En este proyecto hay dos carpetas `src` porque frontend y backend son partes separadas:

- `frontend/src/css` contiene los estilos CSS.
- `frontend/src/js` contiene el JavaScript.
- `backend/src` contiene el codigo Python del servidor.

El nombre `src` no es obligatorio para Flask ni para Python; es una convencion que ayuda a organizar el codigo y separarlo de configuraciones, dependencias y documentacion.

## Como funciona cada seccion

### Frontend

- `frontend/index.html` define la estructura de la pagina y carga los archivos CSS y JavaScript.
- `frontend/src/css/styles.css` contiene los estilos visuales.
- `frontend/src/js/app.js` agrega interactividad. El boton realiza una peticion a `/api/health` y muestra el estado del backend.

### Backend

- `backend/src/app.py` crea la aplicacion Flask.
- La ruta `/api/health` devuelve una respuesta JSON para comprobar que el backend esta funcionando.
- La ruta `/` entrega `frontend/index.html`.
- Las rutas restantes entregan los archivos del frontend, como CSS y JavaScript.
- `backend/requirements.txt` lista las librerias Python necesarias para el backend.

### Entorno virtual `.venv`

`.venv` es una carpeta que contiene un entorno Python aislado para este proyecto. Permite instalar Flask sin mezclar sus dependencias con otros proyectos o con la instalacion global de Python.

La carpeta se crea con `python -m venv .venv`, se activa con `.\.venv\Scripts\Activate.ps1` y se ignora en Git mediante `.gitignore`. Por eso no se comparte ni se sube al repositorio; cada persona puede recrearla e instalar las dependencias usando `requirements.txt`.

### Flujo completo

1. Entra en `web-basica/backend`.
2. Crea y activa `.venv`.
3. Instala las dependencias con `pip install -r requirements.txt`.
4. Inicia Flask con `python -m src.app`.
5. Abre `http://127.0.0.1:5000` en el navegador.

## Instalacion de dependencias

Desde `backend`, crea un entorno virtual y activa este entorno:

```powershell
python -m venv .venv
.\.venv\Scripts\Activate.ps1
```

Con el entorno activado, instala Flask y sus dependencias:

```powershell
pip install -r requirements.txt
```

## Ejecutar

Con el entorno virtual activado y situado en `backend`, inicia el servidor:

```powershell
python -m src.app
```

Abre http://127.0.0.1:5000.
