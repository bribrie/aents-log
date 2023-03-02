import axios from 'axios';

interface createPostRequest {
  category: string;
  title: string;
  summary: string;
  content: string;
  main_image_url: string;
  created_at: string;
}

export interface createPostSuccessResponse {
  success: true;
  _id: string;
  category: string;
  title: string;
  content: string;
  summary: string;
  main_image_url: string;
  created_at: string;
}

interface createPostFailureResponse {
  success: false;
  message: string;
  detail: any;
}

type createPostResponse = createPostSuccessResponse | createPostFailureResponse;

export const request_create_post = async (
  createData: createPostRequest
): Promise<createPostResponse> => {
  const response = await axios
    .post<any>('/_f/post/create', {
      category: createData.category,
      title: createData.title,
      summary: createData.summary,
      content: createData.content,
      main_image_url: createData.main_image_url,
      created_at: createData.created_at,
    })
    .then(({ data }) => ({
      success: true,
      ...data,
    }))
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
