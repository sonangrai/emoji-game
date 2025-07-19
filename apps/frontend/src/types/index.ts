export * from "./room";
export * from "./user";

type TMeta = {
  total: number;
  page: number;
  offset: number;
  limit: number;
  hasPrevious: boolean;
  hasNext: boolean;
};

export type TResponse<T = any> = {
  status: number;
  data: T;
  msg: string;
  meta: TMeta | null;
};
