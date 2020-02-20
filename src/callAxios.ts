import { AxiosSingleton } from "../singletons/AxiosSingleton"

export const listPRnumbers = (async (token: string, orgName: string, repoName: string) => {
  const baseUrl = "https://api.github.com";
  const basePath = "/repos/"
  const requestPath = "/pulls";
  let completeUrl = "";
  let result: any[] = [];
  // tslint:disable-next-line: prefer-const
  let response: any[] = [];
  completeUrl = baseUrl + basePath + orgName + "/" + repoName + requestPath
  result = await axiosGetAllPRs(completeUrl, token);
  // tslint:disable-next-line: prefer-for-of
  for (let i = 0; i < result.length; i++) {
    response.push(result[i].number);
  };
  return response;
})

export const axiosGetAllPRs = (serviceUrl: string, accessToken: string) => {
  if (!serviceUrl) {
    throw new Error("The serviceUrl was not set.  Unable to make POST.");
  }
  const axios = AxiosSingleton.getInstance().getAxios();
  return new Promise<any[]>((resolve, reject) => {
    const headers = {
      'Content-Type': 'application/json',
      'Authorization': 'Bearer '.concat(accessToken),
    };
    axios.get(serviceUrl, { headers })
      .then((response: any) => {
        resolve(response.data);
      })
      .catch((error: any) => {
        console.log("Error: ", error);
        const errorResponse = {
          Error: error,
          Message: "No Data"
        }
        reject(errorResponse);
      });
  });
}