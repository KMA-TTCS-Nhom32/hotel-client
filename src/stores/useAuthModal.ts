import { create } from 'zustand';

type AuthModalForm = 'auth' | 'confirm_email_or_phone' | 'forgot_password';

interface AuthModalStore {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
  formType: AuthModalForm;
  setFormType: (formType: AuthModalForm) => void;
}

export const useAuthModal = create<AuthModalStore>((set) => ({
  isOpen: false,
  onOpen: () => set(() => ({ isOpen: true })),
  onClose: () => set(() => ({ isOpen: false })),
  formType: 'auth',
  setFormType: (formType) => set(() => ({ formType })),
}));
