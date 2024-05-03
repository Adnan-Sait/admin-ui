import ApiResponse from "../models/ApiResponse";
import { User } from "../page/admin/AdminPage";
import { SERVICE_URLS } from "../utils/constants";

function getErrorMessage(error: unknown) {
  if (error instanceof Error) return error.message;
  return String(error);
}

export async function getMembers(): Promise<ApiResponse<User[] | null>> {
  try {
    const response = await fetch(SERVICE_URLS.GET_MEMBERS, {
      method: "get",
      headers: {
        accept: "application/json",
      },
    });

    if (!response.ok) {
      const responseObj = new ApiResponse<null>(
        null,
        true,
        "Status code not ok"
      );
      responseObj.statusCode = response.status;
      return responseObj;
    }

    const data = await response.json();

    const responseObj = new ApiResponse(data);
    responseObj.statusCode = response.status;

    return responseObj;
  } catch (err) {
    const errMsg = getErrorMessage(err);
    return new ApiResponse<null>(null, true, errMsg);
  }
}
