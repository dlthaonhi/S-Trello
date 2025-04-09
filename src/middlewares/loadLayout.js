export async function loadLayoutMiddleware(to, from, next) {
  try {
    const layout = to.meta.layout || 'default'
    const layoutModule = await import(`../layouts/${layout}.vue`)
    to.meta.layoutComponent = layoutModule.default
    return next()
  } catch (error) {
    console.error('Error loading layout:', error)
    const errorLayoutModule = await import('../layouts/error.vue')
    to.meta.layoutComponent = errorLayoutModule.default
    return next()
  }
}
