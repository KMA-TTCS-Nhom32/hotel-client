'use client';

import styles from './index.module.scss';

interface Branch {
  id: number;
  name: string;
  address: string;
  price: number;
  image: string;
  tags: string[];
  lastRoom: boolean;
}

interface BranchListProps {
  branches: Branch[];
}

export default function BranchList({ branches }: BranchListProps) {
  return (
    <section className={styles.branch_list}>
      <h2 className={styles.title}>38 khách sạn phù hợp</h2>
      <div className={styles.list}>
        {branches.map((branch) => (
          <div className={styles.branch_card} key={branch.id}>
            {/* Image Section */}
            <div className={styles.image_container}>
              <img src={branch.image} alt={branch.name} />
              <div className={styles.popular_tag}>Phổ biến nhất</div>
            </div>

            {/* Details Section */}
            <div className={styles.details}>
              <div className={styles.location}>
                {branch.tags.map((tag, index) => (
                  <span className={styles.tag} key={index}>
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className={styles.branch_name}>{branch.name}</h3>
              <p className={styles.address}>{branch.address}</p>
              <p className={styles.features}>
                PHÙ HỢP: ✅ Du lịch nghỉ dưỡng ✅ Công tác ngắn ngày ✅ Khám phá thành phố
              </p>
              <p className={styles.info}>
                <span>View thành phố</span> · <span>6.4</span>
              </p>
            </div>

            {/* Price and Button */}
            <div className={styles.actions}>
              <p className={styles.price}>
                CHỈ TỪ <span>{branch.price.toLocaleString()} Đồng / Đêm</span>
              </p>
              <button className={branch.lastRoom ? styles.last_room_button : styles.choose_button}>
                {branch.lastRoom ? 'PHÒNG CUỐI' : 'Chọn phòng'}
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
