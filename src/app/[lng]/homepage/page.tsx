import React from 'react';
import Link from 'next/link';
import Image from 'next/image'
import logo from '../../../../public/images/logo.png'
import styles from './header.module.scss'
import { CiUser } from "react-icons/ci";
import { FaBars } from "react-icons/fa6";
import { LanguageSwitcher } from '../../../components/LanguageSwitcher'
import background from '../../../../public/images/background.png'
import { useEffect } from 'react';
interface PageProps {
    params: {
        lng: string;
    };
}

export default function page({ params: { lng } }: Readonly<PageProps>) {
 
    return (


        <div className={styles.homepage}>

            <div className={styles.header}>
                <div className={styles.container}>
                    <div className={styles.navbar_header}>

                        <div className={styles.header_logo}>
                            <Image className={styles.img_logo}
                                src={logo}
                                alt="Responsive image"
                            />
                        </div>
                        <div className={styles.headermenu}>
                            <a className={styles.header_menu_item} href=''>
                                <p>Đặt Phòng</p>
                            </a>

                            <a className={styles.header_menu_item} href=''>
                                <p>Lưu trú dài hạn</p>
                            </a>

                            <a className={styles.header_menu_item} href=''>
                                <p>Hội viên thân thiết</p>
                            </a>

                            <a className={styles.header_menu_item} href=''>
                                <p>Thương hiệu thành viên</p>
                            </a>

                            <div className={styles.header_menu_item}>
                                < LanguageSwitcher />
                            </div>
                            <div className={styles.header_menu_item}>
                                <CiUser />

                            </div>
                            <div className={styles.header_menu_item}>
                                <FaBars />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
            <div className={styles.background}>
                <Image className={styles.imgbackground}
                    src={background}
                    alt="Responsive image" />
            </div>


        </div>

    );
}


