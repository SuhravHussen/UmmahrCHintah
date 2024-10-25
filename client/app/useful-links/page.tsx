import Facebook from "@/components/useful-links/Faceboook";
import Telegram from "@/components/useful-links/Telegram";
import Websites from "@/components/useful-links/Websites";
import Youtube from "@/components/useful-links/Youtube";
import { secondaryFont } from "@/lib/fonts";

export default function page() {
  return (
    <div className="my-16">
      <h1
        className={`text-center text-2xl md:text-4xl ${secondaryFont.className}`}
      >
        প্রয়োজোনীয় লিংক সমূহ{" "}
      </h1>
      <div className="flex flex-col gap-4">
        <Websites />
        <Facebook />
        <Youtube />
        <Telegram />
      </div>
    </div>
  );
}
