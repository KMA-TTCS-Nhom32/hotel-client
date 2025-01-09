// import React, { useRef } from 'react';
// import styles from './index.module.scss';

// interface TabProps {
//   tabs: { name: string; content: JSX.Element; ref?: React.RefObject<HTMLElement> }[];
// }

// const Tabs: React.FC<TabProps> = ({ tabs = [] }) => {
//   const [activeTab, setActiveTab] = React.useState(0);

//   const scrollToSection = (index: number) => {
//     const sectionRef = tabs[index]?.ref;
//     sectionRef?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
//   };

//   return (
//     <div className="w-full">
//       <div className="flex space-x-4 border-b border-gray-300">
//         {tabs.length > 0 && tabs.map((tab, index) => (
//           <button
//             key={index}
//             className={`py-2 px-6 text-lg font-semibold text-gray-600 hover:text-blue-600 transition-all duration-300 ${index === activeTab ? 'border-b-2 border-blue-600 text-blue-600' : ''}`}
//             onClick={() => {
//               setActiveTab(index);
//               scrollToSection(index);
//             }}
//           >
//             {tab.name}
//           </button>
//         ))}
//       </div>

//       <div className="pt-6">
//         {tabs[activeTab]?.content}
//       </div>
//     </div>
//   );
// };

// export default Tabs;
