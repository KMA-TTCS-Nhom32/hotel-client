import { createTranslation } from '@/i18n/server';
import User from '@/components/UserComponents/UserPage';
import Content from '@/components/Common/Content'
import { Children } from 'react';
interface HomeProps {
  params: {
    lng: string;
  };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  
  return (
    <Content className='w-full'>
      <User lng={lng}
        title={'Personal_details'}/>
    </Content>
    
  )

  ;
}
