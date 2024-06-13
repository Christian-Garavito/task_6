const jugadores = require('./jugadores.json');

// console.log(jugadores["copa_america"]);

//-----------------------------------punto 2-----------------------------------------------------------
//console.log(Object.entries(jugadores.copa_america.grupos));
const grupos = Object.entries(jugadores.copa_america.grupos);
//console.log(grupos);
const Mostrar_delantero_puntos = grupos.map((grupo) => {
    const paises = Object.entries(grupo[1]);
    const delantero_puntos = paises.map((pais) => {
        const delantero = pais[1].jugadores.delantero.nombre;
        const puntos = pais[1].jugadores.delantero.puntaje;
        return " delantero: " + delantero + " puntos: " + puntos;

    });
    return delantero_puntos
});

const final_deñanteros = Mostrar_delantero_puntos.reduce((acumulado_jugadores, jugadores_actuales) => [...acumulado_jugadores, ...jugadores_actuales], []);
//console.log(final_deñanteros);

//-----------------------------------punto 3-----------------------------------------------------------


const grupo_b = jugadores.copa_america.grupos.grupo_b;

const grupo_b_array = Object.entries(grupo_b);

const nombres_porteros = grupo_b_array.map((pais) => {
  return pais[1].jugadores.portero.nombre;
});

console.log(nombres_porteros);

// ! Punto 4

const defensas = Object.entries(jugadores.copa_america.grupos)
  .map(([_, grupo]) => {
    const array_defensa = Object.entries(grupo)
      .filter((pais) => {
        if (pais[0][0].toLowerCase() === "c") {
          return true;
        } else {
          return false;
        }
      })
      .map(([_, equipo]) => `${equipo.jugadores.defensa.nombre}`);
    return array_defensa;
  })
  .reduce((prev, curr) => [...prev, ...curr], []);

console.log(defensas);

// ! Punto 5

const jugadores_mayor_puntaje = Object.entries(jugadores.copa_america.grupos)
  .map(([_, grupo]) => {
    const array_jugadores = Object.entries(grupo)
      .map(([_, equipo]) => {
        const jugadores_por_equipo = Object.entries(equipo.jugadores).map(
          ([posicion, jugador]) => [jugador.nombre, jugador.puntaje, posicion]
        );
        return jugadores_por_equipo;
      })
      .reduce((prev, curr) => [...prev, ...curr], [])
      .sort((item1, item2) => item1[1] - item2[1]);
    return array_jugadores;
  })
  .reduce((prev, curr) => [...prev, ...curr], []);

console.log(jugadores_mayor_puntaje);
console.log(
  jugadores_mayor_puntaje
    .slice(-5)
    .map(
      ([nombre, puntaje, posicion]) =>
        nombre + " (" + posicion + "): " + puntaje
    )
);

// ! Punto 6

console.log(
  jugadores_mayor_puntaje
    .filter(([_, __, posicion]) => posicion === "defensa")
    .map(([nombre, puntaje]) => nombre + ": " + puntaje)
    .slice(0, 10)
);

// ! Punto 7

const lista_promedios = Object.entries(jugadores.copa_america.grupos)
  .map(([_, info_grupo]) => {
    const promedio_selecion = Object.entries(info_grupo).map(
      ([nombre_seleccion, info_seleccion]) => {
        const jugadores_como_array = Object.entries(info_seleccion.jugadores);
        const promedio =
          Object.entries(jugadores_como_array).reduce(
            (prev, [_, [__, datos_jugador]]) => {
              // console.log(prev, datos_jugador);
              return prev + datos_jugador.puntaje;
            },
            0
          ) / jugadores_como_array.length;
        return nombre_seleccion + ": " + promedio;
      }
    );
    return promedio_selecion;
  })
  .reduce((prev, curr) => [...prev, ...curr], []);

console.log(lista_promedios);

// ! Punto 8

const lista_selecciones = Object.entries(jugadores.copa_america.grupos)
  .map(([_, info_grupo]) => {
    const seleciones = Object.entries(info_grupo)
      .filter(([_, info_seleccion]) => {
        return info_seleccion.ganadas > 0;
      })
      .map(([nombre_seleccion]) => nombre_seleccion);
    return seleciones;
  })
  .reduce((prev, curr) => [...prev, ...curr], []);

console.log(lista_selecciones);


// ! Punto 9

jugadores.copa_america["grupos"]

const lista_selecciones_9 = Object.entries(jugadores.copa_america[(() => "grupos")()])
  .map(([_, info_grupo]) => {
    const seleciones = Object.entries(info_grupo)
      .filter(([_, info_seleccion]) => {
        return info_seleccion.ganadas > 0;
      })
      .map(([nombre_seleccion]) => nombre_seleccion);
    return seleciones;
  })
  .reduce((prev, curr) => [...prev, ...curr], []);

console.log(lista_selecciones_9);








