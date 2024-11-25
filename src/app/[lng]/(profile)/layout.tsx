
import Sidebar from '@/components/UserComponents/SideBar'
import style from '@/app/[lng]/(profile)/account/index.module.scss'

interface RootLayoutProps {
    children: React.ReactNode;
    params: { lng: string };
}

export default function RootLayout({ children, params: { lng } }: Readonly<RootLayoutProps>) {
    return (

        <div className={style.userpage}>
            <div className={style.inner}>
                <Sidebar lng={lng} />
                {children}
            </div>
        </div>

    );
}
