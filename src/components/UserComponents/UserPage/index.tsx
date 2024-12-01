"use client";

import AccountInformation from "@/components/UserComponents/AccountInformation"
import Password from "../PasswordUser";
import styles from './index.module.scss'
import { useTranslation } from "react-i18next";
interface User {
    lng: string;
    title: string;
}

const User = ({ lng, title }: User) => {

    const { t } = useTranslation('account');

    return (<>
        <div className={`${styles.title} text-2xl font-semibold`}>{t(`${title}`)}</div>

        <AccountInformation lng={lng} />
        <Password lng={lng} />

    </>
    );
};

export default User;
