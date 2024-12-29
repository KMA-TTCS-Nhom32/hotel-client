import TabNavList from './tab-nav-list';
import ListRoom from './ListRoom';
interface PageMyReservationInforProps {
    
    lng: string;
}

const PageMyReservationInfor = async ({ lng }: PageMyReservationInforProps) => {
   

    return (
        <div className='bg-white px-3 py-4 rounded-2xl w-full'>
            <TabNavList lng={lng} /> 
            <ListRoom lng={lng} />
        </div>
        
        
     );

};

export default PageMyReservationInfor;