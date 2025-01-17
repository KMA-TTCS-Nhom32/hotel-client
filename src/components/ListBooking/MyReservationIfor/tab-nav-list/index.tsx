'use client';
import { useState, useRef, useEffect } from 'react';
import { useTranslation } from '@/i18n/client';

interface TabNavListProps {
  lng: string;
  onTabChange: (tab: string) => void;
}

const TabNavList = ({ lng, onTabChange }: Readonly<TabNavListProps>) => {
  const { t } = useTranslation(lng, 'benefit');
  const [activeTab, setActiveTab] = useState('upcoming');
  const [underlineWidth, setUnderlineWidth] = useState(0);
  const [underlinePosition, setUnderlinePosition] = useState(0);
  const tabsRef = useRef<HTMLUListElement>(null);

  const tabs = ['Upcoming', 'Completed', 'Cancelled'];

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
    onTabChange(tab);
  };

  useEffect(() => {
    const activeTabElement: any = tabsRef.current?.querySelector(`p[data-tab="${activeTab}"]`);
    if (activeTabElement) {
      setUnderlineWidth(activeTabElement.offsetWidth);
      setUnderlinePosition(activeTabElement.offsetLeft);
    }
  }, [activeTab]);

  return (
    <div className='flex flex-col'>
      <div className='text-lg ont-medium text-center text-gray-500 relative'>
        <ul ref={tabsRef} className='flex flex-wrap -mb-px gap-5'>
          {tabs.map((tab) => (
            <li className='me-2' key={tab} onClick={() => handleTabClick(tab)}>
              <p
                data-tab={tab}
                role='tab'
                aria-selected={activeTab === tab}
                className={`inline-block p-4 cursor-pointer ${
                  activeTab === tab
                    ? 'text-orange-500'
                    : 'text-gray-500 hover:text-gray-600 dark:hover:text-gray-300'
                }`}
              >
                {t(tab as any)}
              </p>
            </li>
          ))}
        </ul>
        <div
          className='absolute bg-primary h-1'
          style={{
            width: underlineWidth,
            left: underlinePosition,
            bottom: 0,
            transition: 'left 0.3s ease, width 0.3s ease',
          }}
        />
      </div>
    </div>
  );
};

export default TabNavList;
