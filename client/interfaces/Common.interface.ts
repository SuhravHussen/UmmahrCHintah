export interface PaginationLinks {
  self: string;
  next: string | null;
  prev: string | null;
}

export interface PaginationInfo {
  totalPage: number;
  [key: string]: number;
}
