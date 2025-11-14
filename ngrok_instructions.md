Para lograr una funcionalidad similar a la de VS Code para compartir tu `localhost` a través de un enlace público, puedes usar una herramienta llamada **ngrok**.

**¿Qué es ngrok?**
ngrok es una herramienta que crea un túnel seguro desde una dirección pública de Internet (un enlace `https://` que te proporciona ngrok) a un puerto en tu máquina local. Esto es útil para compartir tu trabajo en progreso, probar webhooks o permitir que otros accedan a tu servidor de desarrollo sin necesidad de desplegarlo.

**Pasos para usar ngrok con tu proyecto Next.js en WebStorm:**

1.  **Descargar ngrok:**
    *   Ve a la página oficial de ngrok: [https://ngrok.com/download](https://ngrok.com/download)
    *   Descarga la versión adecuada para tu sistema operativo (macOS, Windows, Linux).

2.  **Instalar ngrok:**
    *   **macOS/Linux:** Descomprime el archivo descargado. Obtendrás un ejecutable llamado `ngrok`. Puedes moverlo a un directorio que esté en tu `PATH` (por ejemplo, `/usr/local/bin`) para poder ejecutarlo desde cualquier lugar.
        ```bash
        unzip /path/to/ngrok.zip
        sudo mv ngrok /usr/local/bin/
        ```
    *   **Windows:** Descomprime el archivo `ngrok.zip` y coloca el ejecutable `ngrok.exe` en una carpeta de tu elección. Luego, añade esa carpeta a la variable de entorno `PATH` de Windows, o simplemente navega a esa carpeta en tu terminal para ejecutar `ngrok`.

3.  **Autenticar tu cuenta (Opcional pero recomendado):**
    *   Si te registras en ngrok (es gratis), obtendrás un "authtoken". Esto te permite usar funciones avanzadas y tener URLs más estables.
    *   Después de instalar ngrok, ejecuta en tu terminal:
        ```bash
        ngrok authtoken <TU_AUTHTOKEN>
        ```
    *   Puedes encontrar tu `authtoken` en tu panel de control de ngrok después de registrarte e iniciar sesión.

4.  **Iniciar tu servidor Next.js:**
    *   Asegúrate de que tu proyecto Next.js esté corriendo localmente. En tu terminal de WebStorm, ejecuta:
        ```bash
        npm run dev
        ```
    *   Esto iniciará tu aplicación, por defecto, en `http://localhost:3000`.

5.  **Iniciar el túnel ngrok:**
    *   Abre una **nueva terminal** en WebStorm (puedes ir a `View` > `Tool Windows` > `Terminal` o usar `Alt+F12` en Windows/Linux, `Cmd+F12` en macOS).
    *   En esta nueva terminal, ejecuta el siguiente comando, especificando el puerto en el que se está ejecutando tu aplicación Next.js (normalmente `3000`):
        ```bash
        ngrok http 3000
        ```

6.  **Obtener el enlace público:**
    *   ngrok se iniciará y te mostrará una interfaz en la terminal. Busca una línea que diga "Forwarding" y verás algo como:
        ```
        Forwarding                    https://<random-string>.ngrok-free.app -> http://localhost:3000
        ```
    *   La URL `https://<random-string>.ngrok-free.app` es tu enlace público. Puedes compartirlo con quien quieras para que vea tu aplicación Next.js en tiempo real.

**Consideraciones:**
*   Cada vez que inicies ngrok sin una cuenta pagada, obtendrás una URL pública diferente.
*   Asegúrate de que tu servidor Next.js (`npm run dev`) esté siempre en ejecución mientras uses el túnel ngrok.

¡Con estos pasos, podrás compartir tu proyecto Next.js fácilmente!