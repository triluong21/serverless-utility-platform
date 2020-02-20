import { APIGatewayEvent, Callback, Context, Handler } from "aws-lambda";
import * as UtlFunctions from "./utility";

export const workHandler: Handler = async (event: APIGatewayEvent, context: Context, callback?: Callback) => {
  // if (event.pathParameters.gitAcct === "gitAcctNumber") {
  try {
    const goodMessage = "Process complete";
    const response = UtlFunctions.createSuccessResponse(200, goodMessage);
    return response;
  } catch (error) {
    console.log("Try/Catch exception. Error: ", error);
    const errorMessage = "Unable to take request at this time. Message -809"
    const response = UtlFunctions.createErrorResponse(500, errorMessage);
    return response;
  }
  // }
  // else {
  //   const errorMessage = "Github Account is not recognized.";
  //   const response = UtlFunctions.createErrorResponse(400, errorMessage);
  //   return response;
  // }
}
