import React from 'react';

import { Text } from '@/components/ui/text';
import styles from './index.module.scss';

interface ProfileCardProps {
  children: React.ReactNode;
  title: string;
}

const ProfileCard = ({ children, title }: ProfileCardProps) => {
  return (
    <div className={styles.card}>
      <Text element='h5' type='title1-semi-bold'>
        {title}
      </Text>
      {children}
    </div>
  );
};

export default ProfileCard;
