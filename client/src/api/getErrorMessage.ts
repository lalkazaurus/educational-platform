import axios from "axios";

export function getErrorMessage(error: unknown): string {
  if (axios.isAxiosError(error)) {
    if (error.response?.data?.message) {
      return Array.isArray(error.response.data.message)
        ? error.response.data.message.join(", ")
        : error.response.data.message;
    }
    return error.message;
  }
  return "Unknown error";
}
