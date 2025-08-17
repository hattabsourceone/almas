import useAuth from '@components/hooks/useAuth';
import React, { ComponentType, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function withAuth<T extends JSX.IntrinsicAttributes>(WrappedComponent: ComponentType<T>) {
  const ComponentWithAuth = (props: T) => {
    const navigate = useNavigate();
    const {isAuth} = useAuth();
    useEffect(() => {
      if (!isAuth) {
        navigate('/authentification', { replace: true });
      }
    }, [navigate]);

    if (!isAuth) {
      return null;
    }

    return <WrappedComponent {...props} />;
  };

  return ComponentWithAuth;
}

export default withAuth;
