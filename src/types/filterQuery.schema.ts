export type ProductQuery = {
  sort?: Record<string, string>;
  color?: string;
  size?: string;
  fabric?: string;
  title?: string;
  limit?: number;
  page?: number;
};
