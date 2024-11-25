import Sidebar from '@/components/UserComponents/SideBar';

import styles from './index.module.css';
interface RootLayoutProps {
  children: React.ReactNode;
  params: { lng: string };
}

export default function RootLayout({ children, params: { lng } }: Readonly<RootLayoutProps>) {
  return (
    <div className={styles.userpage}>
      <div className={styles.inner}>
        <Sidebar lng={lng} />
        {children}
      </div>
    </div>
  );
}
