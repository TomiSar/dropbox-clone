import Dropzone from '@/components/Dropzone';
import { auth } from '@clerk/nextjs';
import React from 'react';

function Dashboard() {
  const { userId } = auth();
  return (
    <div>
      {/* <h1>Dashboard</h1> */}
      <Dropzone />
    </div>
  );
}

export default Dashboard;
