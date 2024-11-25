import { createTranslation } from '@/i18n/server';
import User from '@/components/UserComponents/AccountInformation'


interface HomeProps {
    params: {
        lng: string;
    };
}

export default async function Home({ params: { lng } }: Readonly<HomeProps>) {
  

    return (
        <div>
            <User lng={lng} />
            
        </div>
    )
}
