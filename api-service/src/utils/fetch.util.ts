import { CustomError } from "./error";

interface QueryParams {
	[key: string]: string;
  }
  
  export class FetchUtil {
	static async get(url: string, params?: QueryParams) {
	  let queryParams = '';
	  if (params) {
		const paramKeys = Object.keys(params);
		queryParams = paramKeys
		  .map((key) => `${encodeURIComponent(key)}=${encodeURIComponent(params[key])}`)
		  .join('&');
	  }
  
	  const apiUrl = queryParams ? `${url}?${queryParams}` : url;
  
	  const apiResponse = await fetch(apiUrl);
  
	  if (!apiResponse.ok) {
		throw new CustomError(`Erro ao fazer a solicitação GET para ${url}`, 'BadRequest');
	  }
  
	  return await apiResponse.json();
	}
  }
  