export type AddAgencyReq = {
  agencyName: string;
  taxCode: string;
  phone: string;
  address: string;
  accountName: string;
  email: string;
  password: string;
  confirmPassword: string;
  valid: boolean;
};

export type UpdateAgencyReq = {
  id: number;
  name: string;
  phone: string;
  email: string;
  address: string;
  taxCode: string;
  status: number;
};
