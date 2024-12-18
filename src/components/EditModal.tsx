import React, { useState } from 'react';

import { EditModalProps } from '../types';

const ADMIN_PASSWORD = '1234'; // In a real app, this should be properly secured

export function EditModal({ isOpen, onClose, onConfirm, action }: EditModalProps) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      onConfirm();
      onClose();
      setPassword('');
      setError('');
    } else {
      setError('Incorrect password');
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Enter Password to {action}</h3>
        <form onSubmit={handleSubmit}>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="border p-2 mb-2 w-full"
            placeholder="Password"
          />
          {error && <p className="text-red-500 text-sm mb-2">{error}</p>}
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-200 rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded"
            >
              Confirm
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}