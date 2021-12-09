import { AxiosResponse } from 'axios';

export interface MotionPicturesListResponse<T> {
  page: number;
  results: Array<T>;
  total_pages: number;
  total_results: number;
  dates?: { maximum: string; minimum: string };
}

export type FetchingMotionPicturesFunction<T> = (pageNumber?: number) => Promise<AxiosResponse<T>>;

export interface MotionPicturesFetchingService<Type> {
  popular: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
  nowPlaying?: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
  upcoming?: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
  airingToday?: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
  onTv?: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
  topRated: FetchingMotionPicturesFunction<MotionPicturesListResponse<Type>>;
}
