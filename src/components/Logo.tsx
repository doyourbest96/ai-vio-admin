import Image from "next/image";

export default function Logo() {
  return (
    <div className="flex-center shrink-0">
      <div className="flex-center gap-1">
        <Image
          alt="AIVIO"
          src={"/aivio-logo.png"}
          width={128}
          height={28}
          priority={true}
          className="h-auto"
        />
      </div>
    </div>
  );
}
