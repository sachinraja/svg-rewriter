import { ResponseError } from './error'

const handleRequest = async (request: Request) => {
  const { searchParams } = new URL(request.url)
  const params: Record<string, string> = {}

  // read all params as they are the attributes that will be added to the icon
  for (const [key, value] of searchParams) {
    params[key] = value
  }

  const url = params.url
  if (!url) throw new ResponseError('Missing url parameter', 400)

  delete params.url

  let response: Response
  try {
    response = await fetch(url, {
      method: 'GET',
    })
  } catch {
    throw new ResponseError('Failed to fetch url', 500)
  }

  if (response.headers.get('content-type') !== 'image/svg+xml') {
    throw new ResponseError('Invalid content-type, must be image/svg+xml', 400)
  }

  // clone response so headers are not longer immutable
  const newResponse = new Response(response.body, response)
  // cache for a week
  newResponse.headers.set('cache-control', 'max-age=604800')

  return new HTMLRewriter().on('svg', {
    element(element) {
      for (const [name, value] of Object.entries(params)) {
        element.setAttribute(name, value)
      }
    },
  }).transform(newResponse)
}

const handleRequestWrapper = async (request: Request) => {
  try {
    return await handleRequest(request)
  } catch (err) {
    if (err instanceof ResponseError) {
      return new Response(err.message)
    } else throw err
  }
}

export default {
  fetch: handleRequestWrapper,
}
