import React, { useState } from 'react';
import axios from '../api';

function ExportButton({ selectedUsers }) {
  const [loading, setLoading] = useState(false);

  const handleExport = async () => {
    if (selectedUsers.length === 0) return;

    setLoading(true);

    try {
      const response = await axios.post('/users/export', { userIds: selectedUsers }, { responseType: 'blob' });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'users.csv');
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error('Error exporting users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleExport} disabled={selectedUsers.length === 0 || loading}>
      {loading ? 'Exporting...' : 'Export'}
    </button>
  );
}

export default ExportButton;
