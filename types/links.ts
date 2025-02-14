export interface ILinks {
  id: string;
  shortUrl: string;
  destination: string;
  createdBy: string;
  locked: boolean;
  createdAt: Date;
  title?: string;
  tags?: string;
}
