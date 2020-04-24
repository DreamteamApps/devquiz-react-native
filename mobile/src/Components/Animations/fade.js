import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import {Animated} from 'react-native';

const Fade = forwardRef((props, ref) => {
  const fadeAnim = useRef(new Animated.Value(props?.start ?? 0)).current;

  useImperativeHandle(ref, () => ({
    start() {
      Animated.timing(fadeAnim, {
        toValue: props?.end ?? 1,
        duration: props?.duration ?? 2000,
        useNativeDriver: true,
      }).start(() => props?.onAnimationDone && props.onAnimationDone());
    },
    reverse() {
      Animated.timing(fadeAnim, {
        toValue: props?.start ?? 0,
        duration: props?.duration ?? 2000,
        useNativeDriver: true,
      }).start(() => props?.onAnimationDone && props.onAnimationDone());
    },
    cycle() {
      Animated.timing(fadeAnim, {
        toValue: props?.end ?? 1,
        duration: props?.duration ?? 2000,
        useNativeDriver: true,
      }).start(() =>
        Animated.timing(fadeAnim, {
          toValue: props?.start ?? 0,
          duration: props?.duration ?? 2000,
          useNativeDriver: true,
        }).start(() => props?.onAnimationDone && props.onAnimationDone()),
      );
    },
  }));

  return (
    <Animated.View ref={ref} style={{opacity: fadeAnim}}>
      {props.children}
    </Animated.View>
  );
});

export default Fade;
