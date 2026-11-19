// _dir.yml 只用于目录元数据，不暴露成页面。
export default defineEventHandler((event) => {
  const path = getRequestURL(event).pathname
  if (path.endsWith('/_dir') || path.endsWith('/_dir/'))
    return sendRedirect(event, path.replace(/\/_dir\/?$/, '') || '/', 301)
})
