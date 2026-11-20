"use client";

import { useEffect } from "react";

/**
 * Enciende el scroll "por pantallas" (portview) solo mientras su página está a la vista.
 * Next 16 deja la página anterior oculta en memoria al navegar; si el portview dependiera de que
 * exista su sección en el documento, seguiría encendido en la página nueva (la Bitácora quedaba
 * atascada al final). Al ocultarse la página, React limpia este efecto y el portview se apaga.
 */
export default function ActivarPantallas() {
  useEffect(() => {
    const html = document.documentElement;
    html.classList.add("pantallas");
    return () => html.classList.remove("pantallas");
  }, []);
  return null;
}
