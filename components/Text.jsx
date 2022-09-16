import React from 'react';
import { Text, StyleSheet } from 'react-native';
import { useTheme } from '@react-navigation/native';
import Animated from 'react-native-reanimated';

function AnimatedText(props) {
    const { colors, font} = useTheme();
    const {
        children, style, size, bold, center, color, animated,
    } = props;

    if (animated) {
        return (
            <Animated.Text allowFontScaling={false} {...props} style={[styles,style]}>
                {children}
            </Animated.Text>
        );
    };

    return (
        <Text allowFontScaling={false} {...props} style={[styles, style]}>
            {children}
        </Text>
    );
}


const styles = StyleSheet.compose({
    color: color || colors.text,
    fontSize: size || 14,
    fontWeight: bold ? '500' : "400",
    fontFamily: font,
    textAlign: center ? 'center' : null,
});

export default React.memo(AnimatedText);