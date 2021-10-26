import React, { lazy, Suspense } from 'react';

const LazyNavigator = lazy(() => import('./Navigator'));

const Navigator = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyNavigator {...props} />
  </Suspense>
);

export default Navigator;
