import React, { lazy, Suspense } from 'react';

const LazyProfile = lazy(() => import('./Profiles'));

const Profiles = (props: JSX.IntrinsicAttributes & { children?: React.ReactNode; }) => (
  <Suspense fallback={null}>
    <LazyProfile {...props} />
  </Suspense>
);

export default Profiles;
