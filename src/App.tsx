import { EyeCard } from "./components/EyeCard";

function Attribution() {
  return (
    <div className="w-full flex justify-center mt-4">
      <p className="text-[10px] text-white">
        Thank you to{" "}
        <a
          href="https://www.instagram.com/faelpt"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:opacity-80 transition-opacity"
        >
          Rafael Serra
        </a>{" "}
        for the original design
      </p>
    </div>
  );
}

export default function App() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center sm:p-4"
      style={{ backgroundColor: "var(--cream-background)" }}
    >
      <div className="flex flex-row items-center justify-center size-full">
        <div className="box-border flex flex-row gap-2 items-center justify-center sm:p-[24px] size-full">
          <EyeCard />
        </div>
      </div>
      <Attribution />
    </div>
  );
}
