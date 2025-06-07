// pages/index.tsx
import Image from "next/image";
import Link from "next/link";
import HomeImg from "@/Public/homeImage.jpg";

export default function Home() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col overflow-hidden">
      <div className="relative min-h-[calc(101vh-5rem)] w-full">
        <Image
          src={HomeImg}
          alt="Game Background"
          fill
          objectFit="cover"
          objectPosition="top"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-gray-900 bg-opacity-70 flex items-center justify-center text-center px-4">
          <div>
            <h1 className="text-5xl md:text-6xl font-bold text-white mb-6 drop-shadow-lg">
              Track Your Games Effortlessly
            </h1>
            <Link href="/games">
              <div className="inline-block bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-semibold px-6 py-3 rounded-xl transition duration-300 shadow-lg">
                Browse Games
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
