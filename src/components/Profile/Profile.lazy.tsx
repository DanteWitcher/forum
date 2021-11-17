import React, { lazy, Suspense } from 'react';

const LazyProfile = lazy(() => import('./Profile'));

// TODO: figure out, which type to use
const Profile = (props: any/*JSX.IntrinsicAttributes & { children?: React.ReactNode; }*/) => (
  <Suspense fallback={null}>
    <LazyProfile {...props} />
  </Suspense>
);

export default Profile;
