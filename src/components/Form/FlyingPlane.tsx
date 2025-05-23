import { motion } from "framer-motion";
import Image from "next/image";

export default function FlyingPlane() {
  return (
    <div className="relative w-full overflow-hidden h-[213px] flex items-center justify-center">
      <motion.div
        initial={{ y: "0%", rotate: 0 }}
        animate={{ y: "10%", rotateX: -40 }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image src="/sendIcon.svg" alt="send-icon" width={205} height={206} />
      </motion.div>
    </div>
  );
}
