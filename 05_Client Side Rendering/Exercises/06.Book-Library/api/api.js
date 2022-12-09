const hostURL = 'http://localhost:3030';

async function request(method, url, data) {
  const options = {
    method,
    headers: {},
  };

  if (data) {
    options.headers['Content-Type'] = 'application/json';
    options.body = JSON.stringify(data);
  }

  const user = JSON.parse(sessionStorage.getItem('userdata'));

  if (user) {
    options.headers['X-Authorization'] = user.accessToken;
  }

  try {
    const response = await fetch(hostURL + url, options);

    if (response.status === 204) {
      return;
    }

    if (!response.ok) {
      if (response.status === 403) {
        sessionStorage.clear();
        return;
      }

      const error = await response.json();
      throw new Error(error.message);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    alert(error.message);
    throw new Error(error.message);
  }
}

const get = request.bind(null, 'GET');
const post = request.bind(null, 'POST');
const put = request.bind(null, 'PUT');
const del = request.bind(null, 'DELETE');

export { get, post, put, del };