import { motion } from 'framer-motion';
import { memo } from 'react';

const VerticalFadeIn = memo(({className='', style={}, children, duration=1, delay=0, once=true, amount=0, y=50}) => {
  return (
    <motion.div className={className} style={style}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once, amount }}
      transition={{ duration, ease: "easeOut", delay }}
    >
      {children}
    </motion.div>
  )
});

// const RtlFadeIn = memo(({className='', style={}, children, duration=1, delay=0, once=true, amount=0, x=50}) => {
//   return (
//     <motion.div className={className} style={style}
//       initial={{ opacity: 0, x }}
//       whileInView={{ opacity: 1, x: 0 }}
//       viewport={{ once, amount }}
//       transition={{ duration, ease: "easeOut", delay }}
//     >
//       {children}
//     </motion.div>
//   )
// });

export {VerticalFadeIn, /* RtlFadeIn */};