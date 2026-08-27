import { useState } from 'react';
import LeftColumn from '@/Components/auth/LeftColumn';
import RightColumn from '@/Components/carousel/RightColumn';
import SystemsHome from '@/Components/systems/SystemsHome';
import SystemPanel from '@/Components/systems/SystemPanel';

export default function Login() {
  const [user, setUser] = useState(null);
  const [systemId, setSystemId] = useState(null);

  if (systemId) {
    return <SystemPanel systemId={systemId} onExit={() => setSystemId(null)} />;
  }

  if (user) {
    return <SystemsHome user={user} onEnter={setSystemId} />;
  }

  return (
    <div className="flex min-h-dvh w-full bg-white font-sans antialiased">
      <LeftColumn onLogin={setUser} />
      <RightColumn />
    </div>
  );
}
