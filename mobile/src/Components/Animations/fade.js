import React, {forwardRef, useCallback} from 'react';
import {Animated} from 'react-native';

const Fade = forwardRef((props, ref) => {
  
  const startAnimation = useCallback(() => {
    Animated.timing(fadeAnim, {
      toValue: props.end,
      duration: 5000,
    }).start();
  }, []);

  return <Animated.View>{props.children}</Animated.View>;
});

//  const Fade = forwardRef({children, start = 0, end = 1, time = 3000},ref)=>() {
//   useEffect(() => {
//     Animated.timing(fadeAnim, {
//       toValue: 0,
//       duration: 5000,
//     }).start();
//   }, []);

//   return <Animated.View>{children}</Animated.View>;
// }
