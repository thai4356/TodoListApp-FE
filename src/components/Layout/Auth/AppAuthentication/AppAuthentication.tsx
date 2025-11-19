import type { AuthenticationProps } from 'types/components';

import { Image } from 'antd';

import imageLogoITS from '/images/logo-ITS.svg';

import { Link } from 'react-router-dom';
import { navigateToPublicRoute } from 'routes';
import classes from './AppAuthentication.module.scss';

const AppAuthentication = ({ title, description, children }: AuthenticationProps) => {
  return (
    <div className={`flex h-screen w-screen items-center overflow-y-auto ${classes.authentication}`}>
      <div
        className={`${
          !description ? classes['authentication__page-register'] : classes['authentication__page-container']
        }`}
      >
        <Link to={navigateToPublicRoute()} className="mb-12 flex justify-center">
          <Image preview={false} src={imageLogoITS} alt="" className="object-cover" />
        </Link>

        <div
          className={`flex flex-col justify-center overflow-hidden rounded bg-white ${classes['authentication__children']}`}
        >
          <div className={`mb-3 text-center text-2xl font-bold ${classes['authentication__title']}`}>
            <span>{title}</span>
          </div>
          {description && (
            <div className={`mb-8 text-center text-sm font-medium ${classes['authentication__description']}`}>
              <span>{description}</span>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
};

export default AppAuthentication;
