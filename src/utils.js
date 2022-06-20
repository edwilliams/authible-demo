const putPostDelete = async ({ token, method, url, data }) => {
  return new Promise((resolve, reject) => {
    const requestHeaders = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('Authorization', token)

    fetch(`http://localhost:3001/api/${url}`, {
      method,
      body: JSON.stringify(data),
      headers: requestHeaders,
    })
      .then(res => {
        return res.status === 204 ? { error: '', message: '' } : res.json()
      })
      .then(res => {
        if (res.error && res.message) {
          reject({
            message: res.message,
          })
        } else {
          resolve(res)
        }
      })
      .catch(() => {
        reject({
          message: 'Error: unable to connect to server.',
        })
      })
  })
}

export const POST = async ({ token, url, data }) => {
  return putPostDelete({ token, method: 'POST', url, data })
}

export const GET = async ({ token, url }) => {
  return new Promise((resolve, reject) => {
    const requestHeaders = new Headers()
    requestHeaders.set('Content-Type', 'application/json')
    requestHeaders.set('Authorization', token)

    fetch(`http://localhost:3001/api/${url}`, {
      headers: requestHeaders,
    })
      .then(res => res.json())
      .then(res => {
        if (res.error && res.message) {
          reject({
            message: res.message,
          })
        } else {
          resolve(res)
        }
      })
      .catch(() => {
        reject({
          message: 'Error: unable to connect to server.',
        })
      })
  })
}
