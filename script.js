// Importamos el contenido del archivo JSON 'jugadores.json'
const jugadores = require('./jugadores.json');

//-----------------------------------punto 2-----------------------------------------------------------
// mostras los delanteros con su respetiva puntuacion 
// Convertimos los grupos de la Copa América en un array de pares clave-valor
const grupos = Object.entries(jugadores.copa_america.grupos);

// Mapeamos sobre cada grupo para obtener el nombre y puntaje de los delanteros
const Mostrar_delantero_puntos = grupos.map((grupo) => {
    // Convertimos cada país dentro del grupo en un array de pares clave-valor
    const paises = Object.entries(grupo[1]);
    // Mapeamos sobre cada país para obtener el nombre y puntaje del delantero
    const delantero_puntos = paises.map((pais) => {
        const delantero = pais[1].jugadores.delantero.nombre;
        const puntos = pais[1].jugadores.delantero.puntaje;
        // Retornamos una cadena de texto con el nombre y puntaje del delantero
        return  " delantero: " + delantero + " puntos: " + puntos;
        
    });
    // Retornamos el array de delanteros y sus puntajes para cada grupo
    return delantero_puntos;
});
//console.log(Mostrar_delantero_puntos);
// Reducimos el array de arrays en un solo array de delanteros y sus puntajes
console.log("------------------------------------------------punto 2-------------------------------------------------")
const final_deñanteros = Mostrar_delantero_puntos.reduce((acumulado_jugadores, jugadores_actuales) => [...acumulado_jugadores, ...jugadores_actuales], []);
console.log(final_deñanteros);
//-----------------------------------punto 3-----------------------------------------------------------
// mostrar los porteros del grupo b
// Obtenemos el grupo B de la Copa América
const grupo_b = jugadores.copa_america.grupos.grupo_b;

// Convertimos el grupo B en un array de pares clave-valor
const grupo_b_array = Object.entries(grupo_b);

// Mapeamos sobre cada país en el grupo B para obtener el nombre del portero
const nombres_porteros = grupo_b_array.map((pais) => {
  return pais[1].jugadores.portero.nombre;
});
console.log("------------------------------------------------punto 3-------------------------------------------------")
console.log(nombres_porteros);

//-----------------------------------punto 4-----------------------------------------------------------
//mostramos la informacion de los defensas cuyo pais empiece por letra c
// Mapeamos sobre cada grupo de la Copa América para obtener los nombres de los defensas
const defensas = Object.entries(jugadores.copa_america.grupos)
  .map(([_, grupo]) => {
    const array_defensa = Object.entries(grupo)
      .filter((pais) => {
        // Filtramos los países cuyo nombre comienza con 'C'
        if (pais[0][0].toLowerCase() === "c") {
          return true;
        } else {
          return false;
        }
      })
      .map(([_, equipo]) => `${equipo.jugadores.defensa.nombre}`);
    // Retornamos un array de nombres de defensas
    return array_defensa;
  })
  // Reducimos el array de arrays en un solo array de nombres de defensas
  .reduce((prev, curr) => [...prev, ...curr], []);
console.log("------------------------------------------------punto 4-------------------------------------------------")
console.log(defensas);

//-----------------------------------punto 5-----------------------------------------------------------
// mostras la informacion de los 5 mejores jugadores  calificados
// Mapeamos sobre cada grupo de la Copa América para obtener los jugadores con su puntaje y posición
const jugadores_mayor_puntaje = Object.entries(jugadores.copa_america.grupos)
  .map(([_, grupo]) => {
    const array_jugadores = Object.entries(grupo)
      .map(([_, equipo]) => {
        const jugadores_por_equipo = Object.entries(equipo.jugadores).map(
          ([posicion, jugador]) => [jugador.nombre, jugador.puntaje, posicion]
        );
        // Retornamos un array de jugadores con su nombre, puntaje y posición
        return jugadores_por_equipo;
      })
      // Reducimos el array de arrays en un solo array de jugadores
      .reduce((prev, curr) => [...prev, ...curr], [])
      // Ordenamos los jugadores por puntaje en orden ascendente
      .sort((item1, item2) => item1[1] - item2[1]);
    // Retornamos el array de jugadores ordenado por puntaje
    return array_jugadores;
  })
  // Reducimos el array de arrays en un solo array de jugadores
  .reduce((prev, curr) => [...prev, ...curr], []);

//console.log(jugadores_mayor_puntaje);
// Obtenemos los 5 jugadores con mayor puntaje
console.log("------------------------------------------------punto 5-------------------------------------------------")
console.log(
  jugadores_mayor_puntaje
    .slice(-5)
    .map(
      ([nombre, puntaje, posicion]) =>
        nombre + " (" + posicion + "): " + puntaje
    )
);

//-----------------------------------punto 6-----------------------------------------------------------
// mostrar en un array con los 10 defensas de menor puntuacion 
// Obtenemos los 10 primeros defensas con sus puntajes
console.log("------------------------------------------------punto 6-------------------------------------------------")
console.log(
  jugadores_mayor_puntaje
    .filter(([_, __, posicion]) => posicion === "defensa")
    .map(([nombre, puntaje]) => nombre + ": " + puntaje)
    .slice(0, 10)
);

//-----------------------------------punto 7-----------------------------------------------------------
// calcular la puntuacion promedio de cada selecion 
// Mapeamos sobre cada grupo de la Copa América para obtener el promedio de puntaje de cada selección
const lista_promedios = Object.entries(jugadores.copa_america.grupos)
  .map(([_, info_grupo]) => {
    const promedio_selecion = Object.entries(info_grupo).map(
      ([nombre_seleccion, info_seleccion]) => {
        const jugadores_como_array = Object.entries(info_seleccion.jugadores);
        const promedio =
          Object.entries(jugadores_como_array).reduce(
            (prev, [_, [__, datos_jugador]]) => {
              // Calculamos la suma de los puntajes de los jugadores
              return prev + datos_jugador.puntaje;
            },
            0
          ) / jugadores_como_array.length;
        // Retornamos el nombre de la selección y su promedio de puntaje
        return nombre_seleccion + ": " + promedio;
      }
    );
    // Retornamos un array de promedios para cada selección en el grupo
    return promedio_selecion;
  })
  // Reducimos el array de arrays en un solo array de promedios
  .reduce((prev, curr) => [...prev, ...curr], []);
console.log("------------------------------------------------punto 7-------------------------------------------------")
console.log(lista_promedios);

//-----------------------------------punto 8-----------------------------------------------------------
// mostrar las seleciones que haya genado el menos una vez el torneo
// Mapeamos sobre cada grupo de la Copa América para obtener las selecciones que han ganado al menos un partido
const lista_selecciones = Object.entries(jugadores.copa_america.grupos)
  .map(([_, info_grupo]) => {
    const seleciones = Object.entries(info_grupo)
      .filter(([_, info_seleccion]) => {
        return info_seleccion.ganadas > 0;
      })
      .map(([nombre_seleccion]) => nombre_seleccion);
    // Retornamos un array de selecciones que han ganado al menos un partido
    return seleciones;
  })
  // Reducimos el array de arrays en un solo array de selecciones
  .reduce((prev, curr) => [...prev, ...curr], []);
  console.log("------------------------------------------------punto 8-------------------------------------------------")
console.log(lista_selecciones);

//-----------------------------------punto 9-----------------------------------------------------------
// utilizar otro metodo de acceso y la manipulacion de propiedades diferentes a notacion de punto y corchetes en un caso que considerar util
// Obtenemos la lista de selecciones que han ganado al menos un partido (método alternativo)
const lista_selecciones_9 = Object.entries(jugadores.copa_america[(() => "grupos")()])
  .map(([_, info_grupo]) => {
    const seleciones = Object.entries(info_grupo)
      .filter(([_, info_seleccion]) => {
        return info_seleccion.ganadas > 0;
      })
      .map(([nombre_seleccion]) => nombre_seleccion);
    // Retornamos un array de selecciones que han ganado al menos un partido
    return seleciones;
  })
  // Reducimos el array de arrays en un solo array de selecciones
  .reduce((prev, curr) => [...prev, ...curr], []);
console.log("------------------------------------------------punto 9-------------------------------------------------")
console.log(lista_selecciones_9);






