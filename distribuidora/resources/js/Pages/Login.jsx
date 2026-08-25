import LeftColumn from '@/Components/auth/LeftColumn';
import RightColumn from '@/Components/carousel/RightColumn';

export default function Login() {
  return (
    <div className="flex min-h-dvh w-full bg-white font-sans antialiased">
      <LeftColumn />
      <RightColumn />
    </div>
  );
}
