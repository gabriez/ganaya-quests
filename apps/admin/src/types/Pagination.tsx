export interface PaginationProps {
  current: number;
  total: number;
  onChange: (page: number) => void;
}
export type PageEntry =
  | { type: "page"; value: number }
  | { type: "ellipsis"; id: string };
