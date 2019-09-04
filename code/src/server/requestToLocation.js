export default request => {
  const [pathname, search] = request.originalUrl.split('?')
  return { pathname, search: search ? `?${search}` : '' }
}
