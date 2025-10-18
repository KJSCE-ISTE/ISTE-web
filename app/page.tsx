import { HexagonBackground } from "@/components/ui/hexagon-background";

export default function Home() {
  return (
    <HexagonBackground className="min-h-screen">
      <main className="relative z-10 flex flex-col items-center justify-center min-h-screen pointer-events-none">
        <div className="text-center space-y-6" >
          <h1 className="text-5xl md:text-8xl font-bold bg-gradient-to-r from-neutral-800 to-neutral-600 bg-clip-text text-transparent leading-[1.2]">
            ISTE KJSSE
          </h1>
          <p className="text-2xl md:text-3xl text-neutral-700 font-light">
            Serving Technology Better
          </p>
        </div>
      </main>
    </HexagonBackground>
  );
}
