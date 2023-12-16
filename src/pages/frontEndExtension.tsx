import Image from "next/image";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function FrontEndExtension() {
  return (
    <div className="">
      <p>Calls from the extension will end up here!</p>
    </div>
  );
}
