import React from 'react';

export default function ErrorComponent({ error, onClose }) {
  if (!error) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h2 className="text-red-500 font-bold mb-4">Error</h2>
        <p>{error}</p>
        <button
          className="mt-4 py-2 px-4 bg-blue-500 text-white rounded-lg"
          onClick={onClose}
        >
          OK
        </button>
      </div>
    </div>
  );
}
