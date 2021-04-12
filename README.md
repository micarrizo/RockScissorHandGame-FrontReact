Proyecto en front
Y por otro lado tenemos el front hecho con react y redux
https://github.com/micarrizo/rsh-frontreact/tree/master

una vez descargado deberán ejecutar los siguientes comandos desde donde tengan la carpeta descargada y descomprimida:
para instalar los node_modules
- npm install
y para ejecutar el front react
- npm start

y listo, simplemente esos pasos y podran visualizar el juego.

Adjunto imágenes de cómo se verá el juego.

image.png
 y de cómo se verán las estadísticas

image.png


End Points
los endpoints son los siguientes:

Del jugador son los siguientes endpoints, estos se ejecutan en tiempo real para obtener las estadísticas del juego terminado.

http://localhost:4000/api/stats/player/:id/matches-won
http://localhost:4000/api/stats/player/:id/most-used-moves

y del juego en general son los siguientes, simplemente ejecutarlos:

http://localhost:4000/api/stats/games/most-picked-move-first-game
http://localhost:4000/api/stats/games/average-time
http://localhost:4000/api/stats/matches/average-quantity-takes-to-complete
http://localhost:4000/api/stats/matches/percentage-complete-incomplete
http://localhost:4000/api/stats/matches/matrix

El endpoint extra que se agregó es para poblar una estadística expresada en un mapa de calor, el cual se ven las combinaciones de jugadas hechas por cada match:
image.png


y por último, cabe destacar, que si ponen el computador en modo obscuro
image.png
se vera asi
image.png

