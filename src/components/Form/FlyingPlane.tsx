// import { motion } from "framer-motion";
// import Image from "next/image";

// export default function FlyingPlane() {
//   const lineAnimation = {
//     x: ["0px", "-400px"],
//     y: ["0px", "200px"],
//   };

//   const lineTransitions = {
//     duration: 4,
//     ease: "linear",
//     repeat: Infinity,
//     repeatType: "loop" as const,
//   };

//   return (
//     <div className="relative w-full overflow-hidden h-[213px] flex items-center justify-center">
//       {[...Array(100)].map((_, i) => (
//         <div
//           key={i}
//           className="absolute top-0 left-0 w-full h-full z-[-1]"
//           style={{ transform: `translate(${i * 100}%, -${i * 100}%)` }}
//         >
//           <motion.div
//             className="absolute top-0 left-[0]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute top-[15%] left-[20%]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute top-[15%] left-[50%]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute bottom-0 left-[0]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute bottom-[15%] left-[20%]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute bottom-[15%] left-[50%]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//           <motion.div
//             className="absolute bottom-[50%] right-[5%]"
//             initial={{ x: `0%`, y: `0%` }}
//             animate={lineAnimation}
//             transition={{
//               ...lineTransitions,
//               delay: i * 0.7,
//             }}
//           >
//             <svg
//               width="87"
//               height="53"
//               viewBox="0 0 87 53"
//               fill="none"
//               xmlns="http://www.w3.org/2000/svg"
//             >
//               <line
//                 y1="-0.5"
//                 x2="98.549"
//                 y2="-0.5"
//                 transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
//                 stroke="url(#paint0_linear_2430_1018)"
//               />
//               <defs>
//                 <linearGradient
//                   id="paint0_linear_2430_1018"
//                   x1="0"
//                   y1="0.5"
//                   x2="98.549"
//                   y2="0.5"
//                   gradientUnits="userSpaceOnUse"
//                 >
//                   <stop stop-color="white" stop-opacity="0" />
//                   <stop offset="0.495" stop-color="white" />
//                   <stop offset="1" stop-color="white" stop-opacity="0" />
//                 </linearGradient>
//               </defs>
//             </svg>
//           </motion.div>
//         </div>
//       ))}

//       {/* Самолёт */}
//       <motion.div
//         initial={{ y: "0%", rotate: 0 }}
//         animate={{ y: "10%", rotateX: -40 }}
//         transition={{
//           duration: 3,
//           ease: "easeInOut",
//           repeat: Infinity,
//           repeatType: "reverse",
//         }}
//       >
//         <Image src="/sendIcon.svg" alt="send-icon" width={205} height={206} />
//       </motion.div>
//     </div>
//   );
// }

import { motion } from "framer-motion";
import Image from "next/image";

export default function FlyingPlane() {
  const lineAnimation = {
    x: ["0px", "-400px"],
    y: ["0px", "200px"],
  };

  const lineTransitions = {
    duration: 3,
    ease: "linear",
    repeat: Infinity,
    repeatType: "loop" as const,
  };

  return (
    <div className="relative w-full overflow-hidden h-[213px] flex items-center justify-center">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="absolute top-0 left-0 w-full h-full z-[-1]"
          style={{ transform: `translate(${i * 100}%, -${i * 100}%)` }}
        >
          {[
            "top-0 left-[0]",
            "top-[15%] left-[20%]",
            "top-[15%] left-[50%]",
            "bottom-0 left-[0]",
            "bottom-[15%] left-[20%]",
            "bottom-[15%] left-[50%]",
            "bottom-[50%] right-[5%]"
          ].map((position, idx) => (
            <motion.div
              key={idx}
              className={`absolute ${position}`}
              initial={{ x: "0%", y: "0%" }}
              animate={lineAnimation}
              transition={{
                ...lineTransitions,
                delay: i * 0.7,
              }}
            >
              <svg
                width="87"
                height="53"
                viewBox="0 0 87 53"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <line
                  y1="-0.5"
                  x2="98.549"
                  y2="-0.5"
                  transform="matrix(0.859972 -0.510342 0.510035 0.860153 1.49542 52.1108)"
                  stroke="url(#paint0_linear_2430_1018)"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_2430_1018"
                    x1="0"
                    y1="0.5"
                    x2="98.549"
                    y2="0.5"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stopColor="white" stopOpacity="0" />
                    <stop offset="0.495" stopColor="white" />
                    <stop offset="1" stopColor="white" stopOpacity="0" />
                  </linearGradient>
                </defs>
              </svg>
            </motion.div>
          ))}
        </div>
      ))}

      {/* Самолёт */}
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