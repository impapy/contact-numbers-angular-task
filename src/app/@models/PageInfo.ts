export interface IPageInfo {
  total: number;
  currentPage: number;
  perPage: number;
  hasNextPage: boolean;
}
export class PageInfo implements IPageInfo {
  total!: number;
  currentPage!: number;
  perPage!: number;
  hasNextPage!: boolean;

  constructor(data?: IPageInfo) {
    if (data) {
      for (var property in data) {
        if (data.hasOwnProperty(property))
          (<any>this)[property] = (<any>data)[property];
      }
    }
  }
}
