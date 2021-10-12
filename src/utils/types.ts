export type CompanyType = {
  id: number;
  name: string;
};

export type StockType = {
  id: number;
  name: string;
};

export type ExchangeType = {
  id: number;
  name: string;
};

export type PriceType = {
  id: number;
  price: number;
  createdAt: string;
  updatedAt: string;
  exchange: ExchangeType;
  company: CompanyType;
  stockType: StockType;
};
