export interface Student {
  id: string;
  name: string;
  hoursRemaining: number;
  teacherName: string;
  setNumber: number;
  lastUpdated: string;
  colorIndex: number;
}

export interface EditModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  action: string;
}