import LeftColumn from '@/Components/auth/LeftColumn';
import RightColumn from '@/Components/carousel/RightColumn';

export default function Login() {
  return (
    <div className="min-h-screen bg-white flex">
      <LeftColumn />
      <RightColumn />
    </div>
  );
}