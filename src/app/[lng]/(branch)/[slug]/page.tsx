import React from 'react';

interface BranchDetailPageProps {
  params: { lng: string; slug: string };
}

const BranchDetailPage = ({ params: { lng, slug } }: BranchDetailPageProps) => {
  console.log(lng, slug);
  return <div className='h-[100vh]'>BranchDetailPage</div>;
};

export default BranchDetailPage;
