const host = 'http://localhost:3030';

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
    options.headers['X-Authorization'] = user.token;
  }

  try {
    const response = await fetch(host + url, options);

    if(response.status === 204){
      return response;
    }

    const result = await response.json();

    if (!response.ok) {
      if (response.status === 403) {
        sessionStorage.clear();
      }

      throw new Error(result.message);
    }

    return result;
  } catch (error) {
    alert(error.message);
    throw new Error(error);
  }
}

const get = request.bind(null, 'get');
const post = request.bind(null, 'post');
const put = request.bind(null, 'put');
const del = request.bind(null, 'delete');

export { get, post, put, del };
