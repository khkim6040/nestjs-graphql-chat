import React from 'react';
import MainLayout from '../layouts/MainLayout';
import Sidebar from '../components/Sidebar';
import ProtectedRoutes from '../components/ProtectedRoutes';
import AuthOverlay from '../components/AuthOverlay';

function Home() {
  return (
    <MainLayout>
      <>
        <AuthOverlay />
        <Sidebar />
        HOME PAGE
      </>
    </MainLayout>
  );
}

export default Home;
