import { Spin } from 'antd';
import { useGetMeCompany } from 'api/company/useCompany';
import { getAuthorization } from 'config/api';
import { ReactNode } from 'react';
import { login } from 'store/slices/userSlice';
import { UserLoginRes } from 'types/SwaggerTypeUser';

const RouterWrapper = ({ children }: { children: ReactNode }) => {
  const { data: company, isFetching: fetchingCompany } = useGetMeCompany();
  const token = getAuthorization();
  const authInfo: UserLoginRes = { ...company?.data, accessToken: token };
  if (token) {
    login(authInfo);
  }
  return fetchingCompany ? (
    <div className="flex h-dvh items-center justify-center">
      <Spin size="large" />
    </div>
  ) : (
    children
  );
};
export default RouterWrapper;
