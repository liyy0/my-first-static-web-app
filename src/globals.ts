

export const BASE_URL = "https://function4api.azurewebsites.net/api/getshipment?";



export const GET_DEFAULT_HEADERS = () => {
  var headers = new Headers();
  headers.append('accept', 'application/json')
  headers.append('x-functions-key',process.env.REACT_APP_api_key as string);
  return headers;
};

