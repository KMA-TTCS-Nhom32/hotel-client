import { Icons } from '@/components/Common/Icons';
import { AppTranslationFunction } from '@/lib/types/i18n';
import { SquareArrowLeft, SquareArrowRight } from 'lucide-react';

interface SideBarPolicy {
  t: AppTranslationFunction;
}

const SideBarPolicy = async ({ t }: SideBarPolicy) => {
  return (
    <>
      <div className='rounded-xl bg-white flex flex-col px-4 py-6 mt-6'>
        <div className='text-lg font-medium'>Chính sách hủy và dời lịch</div>
        <div className='mt-4'>
          <div className='flex gap-3 mt-2'>
            <Icons.successCheck />
            <span>
              Đối với đặt phòng này, hủy không còn khả dụng để được hoàn tiền đầy đủ do còn ít hơn 7
              ngày trước ngày nhận phòng.
            </span>
          </div>
          <div className='flex gap-3 mt-2'>
            <Icons.successCheck />
            <span>Có thể dời lịch</span>
          </div>
        </div>
      </div>

      <div className='rounded-xl bg-white flex flex-col px-4 py-6 mt-6'>
        <div className='text-lg font-medium'>Chính sách chỗ ở</div>
        <div className='mt-3'>
          <div className=' flex gap-3 mt-2'>
            <Icons.document />
            <div className='item-info flex-1'>
              <div className='font-normal'>Tài liệu cần thiết</div>
              <div className='text-gray-500'>
                Khi nhận phòng, bạn cần mang theo Chứng minh nhân dân/VISA/Hộ chiếu. Các tài liệu
                yêu cầu ở dạng bản cứng.
              </div>
            </div>
          </div>
          <div className='flex justify-between'>
            <div className='flex gap-3 mt-2'>
              <SquareArrowRight className='w-6 h-6' />
              <div className=''>
                <div className=''>Nhận phòng</div>
                <div className='text-gray-500'>Sau 2:00 chiều</div>
              </div>
            </div>
            <div className='flex gap-3 mt-2'>
              <SquareArrowLeft className='w-6 h-6' />
              <div className=''>
                <div className='item-info__title'>Trả phòng</div>
                <div className='text-gray-500'>Trước 12:00 chiều</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SideBarPolicy;
