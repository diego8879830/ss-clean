/* ==========================================================================
   CONTENIDO EDITABLE — SS Clean Service & More
   --------------------------------------------------------------------------
   Todo lo que está de ejemplo vive aquí. Para cambiar un dato:
     1. Escriba el valor real en "valor".
     2. Cambie  pendiente: true  por  pendiente: false
   Con "pendiente: false" el resaltado amarillo desaparece de la página.

   Las notas de ejemplo ("Foto de ejemplo", "Confirmar si lo ofrecen",
   "Pueblos de ejemplo"...) se esconden solas cuando el dato deja de estar
   pendiente.
   ========================================================================== */

window.SS_CONFIG = {
  // true  = se ve la franja "Muestra preparada por Diego" y la nota del footer.
  // false = versión final para publicar.
  modoMuestra: true,

  // Teléfono tal como se ve en la página. El enlace "Llamar" se arma solo.
  telefono: { valor: "(787) 000-0000", pendiente: true },

  // WhatsApp: solo números, con el 1 al principio (1 + 787 + número).
  whatsapp: { valor: "17870000000", pendiente: true },

  correo: { valor: "correo@ejemplo.com", pendiente: true },

  horario: { valor: "Lunes a viernes, 8:00 a.m. a 5:00 p.m.", pendiente: true },

  // Morovis siempre va primero y se resalta en verde.
  pueblos: {
    valor: ["Morovis", "Ciales", "Orocovis", "Corozal", "Vega Baja", "Manatí", "Vega Alta"],
    pendiente: true
  },

  // ¿Ofrecen limpieza profunda y desinfección?
  //   Sí  -> pendiente: false
  //   No  -> mostrar: false (la tarjeta se esconde)
  limpiezaProfunda: { mostrar: true, pendiente: true },

  // Se lee: "Preparamos catering para grupos ______."
  // Ejemplo: "de 10 a 150 personas"
  cateringPersonas: { valor: "Indicar mínimo y máximo de personas", pendiente: true },

  // Ejemplo: "Certificada como empresa de mujer empresaria por ..."
  certificaciones: { valor: "Añadir certificaciones vigentes", pendiente: true },

  // Pregunta "¿Traen sus propios productos y equipo?" — confirmar que sí.
  productosPropios: { pendiente: true },

  // Fotos de la galería. Ponga las fotos reales en assets/ (WebP, 800 × 600)
  // y cambie src, alt y titulo. Luego pendiente: false.
  fotos: {
    pendiente: true,
    lista: [
      { src: "assets/galeria-1.webp", alt: "Oficina limpia y ordenada", titulo: "Oficinas" },
      { src: "assets/galeria-2.webp", alt: "Pasillo de edificio con piso brillado", titulo: "Pisos y áreas comunes" },
      { src: "assets/galeria-3.webp", alt: "Cristales y superficies limpias", titulo: "Cristales" },
      { src: "assets/galeria-4.webp", alt: "Mesa de desayuno servida para una reunión", titulo: "Desayunos" },
      { src: "assets/galeria-5.webp", alt: "Bandejas de almuerzo para un adiestramiento", titulo: "Almuerzos" },
      { src: "assets/galeria-6.webp", alt: "Meriendas servidas en una actividad", titulo: "Meriendas" }
    ]
  }
};
