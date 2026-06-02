export default function sitemap() {
  const baseUrl = 'https://papelerianotarial.net'; // Update to real domain when live

  const routes = [
    '',
    '/catalogo',
    '/catalogo/productos',
    '/servicios',
    '/contacto',
    '/aviso-de-privacidad',
    '/terminos-y-condiciones',
  ];

  return routes.map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: route === '' ? 'weekly' : 'monthly',
    priority: route === '' ? 1 : 0.8,
  }));
}
