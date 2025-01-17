import { API_PATH } from '@/api/constant';
import axiosInstance from '@/api/request';
import { CancelPaymentRequestDto, CreatePaymentRequestDto } from '@ahomevilla-hotel/node-sdk';
import axios from 'axios';

export async function createPaymentLinkService(data: CreatePaymentRequestDto) {
  return axiosInstance.post(`${API_PATH.PAYMENT}/payment-request`, data);
}

export async function cancelPaymentService(data: CancelPaymentRequestDto) {
  return axiosInstance.post(`${API_PATH.PAYMENT}/cancel-payment`, data);
}

export async function getPaymentInforService(paymentRequestId: string) {
  return axiosInstance.get(`${API_PATH.PAYMENT}/payment-request/${paymentRequestId}`);
}

export async function getListBank() {
  try {
    const res = await axios({
      method: 'GET',
      url: `${process.env.NEXT_PUBLIC_LISTS_BANK_URL}`,
      headers: {
        'Content-Type': 'application/json',
      },
    });
    return res.data;
  } catch (error: any) {
    return error.response.data;
  }
}
