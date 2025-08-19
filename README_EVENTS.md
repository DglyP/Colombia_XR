# Cómo agregar un nuevo evento (sitio estático)

Este proyecto es 100% HTML/CSS/JS sin frameworks ni build step. Para crear un nuevo evento y que aparezca automáticamente en el home:

## Pasos

1. Duplica la carpeta `/events/_template/` → renombra a `/events/<tu-slug>/`.
2. Abre `/events/<tu-slug>/index.html` y reemplaza los marcadores `<!-- EVENT: ... -->`:
   - Título, subtítulo
   - Fechas ISO con zona horaria Asia/Tokyo (+09:00), por ejemplo: `2025-09-20T18:30:00+09:00`
   - Lugar (nombre y dirección)
   - Imágenes (hero/card)
   - Enlace de tickets (si aplica)
3. Exporta imágenes:
   - Card: `/events/<tu-slug>/card.jpg` (recomendado 1200×628)
   - Hero thumb: `/events/<tu-slug>/hero-thumb.jpg`
4. Edita `/events/events.json` y agrega un objeto con el siguiente esquema:

```
{
  "slug": "<tu-slug>",
  "title": "Título del Evento",
  "subtitle": "Subtítulo",
  "startDate": "2025-09-20T18:30:00+09:00",
  "endDate": "2025-09-20T21:30:00+09:00",
  "status": "upcoming", // "upcoming" | "live" | "past"
  "venueName": "Nombre del lugar",
  "venueAddress": "Dirección, Ciudad",
  "heroThumb": "/events/<tu-slug>/hero-thumb.jpg",
  "cardImage": "/events/<tu-slug>/card.jpg",
  "description": "Resumen breve del evento.",
  "ticketsUrl": "https://...",
  "pageUrl": "/events/<tu-slug>/",
  "theme": { "primary": "#00E5FF", "background": "#0A0A0A", "accent": "#FF0080" }
}
```

5. Despliega. El home (`/`) y `/events/` se actualizarán automáticamente.

## Actualizar estado de un evento
- Cuando finalice, cambia `status` a `"past"` en `/events/events.json` y despliega.

## Notas
- Mantén los timestamps en ISO con `+09:00`.
- Usa texto alternativo (alt) en imágenes por accesibilidad.
- Mantén títulos breves (≤60 caracteres) para tarjetas más legibles.
- Evita modificar estilos base del sitio para preservar consistencia visual.