import axios from 'axios';

interface deletePostSuccessResponse {
  success: true;
}

interface deletePostFailureResponse {
  success: false;
  message?: string;
  detail?: any;
}

type deletePostResponse = deletePostSuccessResponse | deletePostFailureResponse;

export const request_delete_post = async (
  _id: string
): Promise<deletePostResponse> => {
  const response = await axios
    .delete(`_f/post/delete?id=${_id}`)
    .then(() => ({ success: true }))
    .catch(({ response }) => {
      switch (response.status) {
        case 409:
          return {
            success: false,
            message: response.data.detail,
          };
        default:
          return {
            success: false,
            message: 'Unknown error',
          };
      }
    });
  return response;
};
