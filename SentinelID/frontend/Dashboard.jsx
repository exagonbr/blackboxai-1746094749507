const { useState, useEffect } = React;

function Dashboard({ onLogout }) {
  const [alerts, setAlerts] = useState([]);

  useEffect(() => {
    const ws = new WebSocket(`ws://${window.location.host}`);

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.alert) {
        setAlerts((prevAlerts) => [data.alert, ...prevAlerts]);
      }
    };

    return () => ws.close();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-4" style={{ fontFamily: 'Inter, sans-serif' }}>
      <header className="p-4 bg-gray-800 flex items-center justify-between rounded mb-4">
        <h1 className="text-2xl font-semibold">SentinelID Dashboard</h1>
        <button
          className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
          onClick={onLogout}
        >
          Logout
        </button>
      </header>
      <main>
        {alerts.length === 0 ? (
          <p>No facial recognition alerts yet.</p>
        ) : (
          <ul className="space-y-4">
            {alerts.map((alert, index) => (
              <li key={index} className="bg-gray-800 rounded p-4 shadow">
                <p><strong>Time:</strong> {alert.timestamp || 'N/A'}</p>
                <p><strong>Camera:</strong> {alert.camera || 'Unknown'}</p>
                <p><strong>Face ID:</strong> {alert.faceId || 'Unknown'}</p>
                <p><strong>Match:</strong> {alert.match || 'No match'}</p>
                <p><strong>Confidence:</strong> {alert.confidence ? alert.confidence.toFixed(2) : 'N/A'}</p>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
