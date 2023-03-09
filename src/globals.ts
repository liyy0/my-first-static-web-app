

export const BASE_URL = "https://function4api.azurewebsites.net/api/getshipment?";



export const GET_DEFAULT_HEADERS = () => {
  var headers = new Headers();
  headers.set('accept', 'application/json')
//   headers.append('x-functions-key',TOKEN)
  // headers.append('Access-Control-Allow-Origin','http://localhost:3000')
  // headers.append('Access-Control-Allow-Origin',' *')
  return headers;
};

