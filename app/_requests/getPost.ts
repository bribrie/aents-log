import axios from 'axios';
import { createPostSuccessResponse } from './createPost';

export interface getPostsSuccessResponse {
  success: true;
  result: createPostSuccessResponse[];
}

export interface getPostSuccessResponse {
  success: true;
  result: createPostSuccessResponse;
}

interface getPostFailureResponse {
  success: false;
  message: string;
  detail: any;
}

export type getPostsResponse = getPostsSuccessResponse | getPostFailureResponse;

export type getPostResponse = getPostSuccessResponse | getPostFailureResponse;

export const request_get_posts = async (
  category: string
): Promise<getPostsResponse> => {
  const response = await axios
    .get<any>(`/_f/post?category=${category}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => ({
      success: true,
      ...data,
    }))
    .catch(({ response }) => {
      switch (response) {
        case 422:
          return {
            success: false,
            message: '',
          };
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

export const request_get_post = async (
  _id: string
): Promise<getPostResponse> => {
  const response = await axios
    .get<any>(`/_f/post/find?_id=${_id}`, {
      headers: { 'Content-Type': 'application/json' },
    })
    .then(({ data }) => ({
      success: true,
      ...data,
    }))
    .catch(({ response }) => {
      switch (response) {
        case 422:
          return {
            success: false,
            message: '',
          };
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
