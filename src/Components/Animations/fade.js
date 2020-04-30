import React, {forwardRef, useRef, useImperativeHandle} from 'react';
import {Animated} from 'react-native';

const Fade = forwardRef((props, ref) => {
  const fadeAnim = useRef(new Animated.Value(props?.start ?? 0)).current;

  useImperativeHandle(ref, (onAnimationDone) => ({
    start(onAnimationDone) {
      Animated.timing(fadeAnim, {
        toValue: props?.end ?? 1,
        duration: props?.duration ?? 2000,
        delay: props?.delay || 0,
        useNativeDriver: true,
      }).start(() => onAnimationDone && onAnimationDone());
    },
    reverse(onAnimationDone) {
      Animated.timing(fadeAnim, {
        toValue: props?.start ?? 0,
        duration: props?.duration ?? 2000,
        delay: props?.delay || 0,
        useNativeDriver: true,
      }).start(() => onAnimationDone && onAnimationDone());
    },
    cycle(onAnimationDone) {
      this.start(() =>
        this.reverse(() => onAnimationDone && onAnimationDone()),
      );
    },
  }));

  return (
    <Animated.View
      ref={ref}
      style={{
        ...props.style,
        flex: props?.flex ?? 0,
        justifyContent: props.justifyContent,
        opacity: fadeAnim,
      }}>
      {props.children}
    </Animated.View>
  );
});

export default Fade;
