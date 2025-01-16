export const formatCurrency = (amount: number | string) => {
  const formatted = new Intl.NumberFormat('vi-VN', {
    style: 'decimal',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(Number(amount));
  
  return `${formatted} VND`;
};
