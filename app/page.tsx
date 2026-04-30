import { SceneManager } from "@/components/SceneManager";
import FloatingParticles from "@/components/FloatingParticles";

export default function Home() {
  return (
    <main className="min-h-screen relative overflow-hidden bg-gradient-to-br from-pink-50 via-white to-rose-50">
      <FloatingParticles />
      <SceneManager />
    </main>
  );
}
