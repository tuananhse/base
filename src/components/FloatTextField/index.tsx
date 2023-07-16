// import React, { forwardRef, useEffect, useImperativeHandle, useRef, useState } from 'react';
// import {
//   Image,
//   ImageStyle,
//   LayoutChangeEvent,
//   StyleSheet,
//   Text,
//   TextInput,
//   TextInputProps,
//   TextProps,
//   TextStyle,
//   TouchableOpacity,
//   TouchableWithoutFeedback,
//   View,
//   ViewStyle,
// } from 'react-native';
// import Animated, {
//   Easing,
//   interpolateColor,
//   useAnimatedStyle,
//   useDerivedValue,
//   withTiming,
// } from 'react-native-reanimated';
// import { styles } from './styles';

// import { getValueWithCurrencyMask, getValueWithNonCurrencyMask } from './utils';

// export interface Props extends Omit<TextInputProps, 'secureTextEntry'> {
//   /** Style to the container of whole component */
//   containerStyles?: ViewStyle;
//   /** Changes the color for hide/show password image */
//   darkTheme?: true | false;
//   /** Set this to true if you want the label to be always at a set position. Commonly used with hint for displaying both label and hint for your input. Default false. */
//   staticLabel?: boolean;
//   /** Hint displays only when staticLabel prop is set to true. This prop is used to show a preview of the input to the user */
//   hint?: string;
//   /** Set the color to the hint */
//   hintTextColor?: string;
//   /** Value for the label, same as placeholder */
//   label: string;
//   /** Style to the label */
//   labelStyles?: TextStyle;
//   /** Set this to true if is password to have a show/hide input and secureTextEntry automatically */
//   isPassword?: true | false;
//   /** Callback for action submit on the keyboard */
//   onSubmit?: () => void;
//   /** Style to the show/hide password container */
//   showPasswordContainerStyles?: ViewStyle;
//   /** Style to the show/hide password image */
//   showPasswordImageStyles?: ImageStyle;
//   /** Style to the input */
//   inputStyles?: TextStyle;
//   /** Path to your custom image for show input */
//   customShowPasswordImage?: string;
//   /** Path to your custom image for hide input */
//   customHidePasswordImage?: string;
//   /** Custom Style for position, size and color for label, when it's focused or blurred */
//   customLabelStyles?: CustomLabelProps;
//   /** Required if onFocus or onBlur is overrided */
//   isFocused?: boolean;
//   /** Set a mask to your input */
//   mask?: string;
//   /** Set mask type */
//   maskType?: 'currency' | 'phone' | 'date' | 'card';
//   /** Set currency thousand dividers */
//   currencyDivider?: ',' | '.';
//   /** Maxinum number of decimal places allowed for currency mask. */
//   maxDecimalPlaces?: number;
//   /** Set currency on input value */
//   currency?: string;
//   /** Changes the input from single line input to multiline input */
//   multiline?: true | false;
//   /** Maxinum number of characters allowed. Overriden by mask if present */
//   maxLength?: number;
//   /** Shows the remaining number of characters allowed to be typed if maxLength or mask are present */
//   showCountdown?: true | false;
//   /** Style to the countdown text */
//   showCountdownStyles?: TextStyle;
//   /** Label for the remaining number of characters allowed shown after the number */
//   countdownLabel?: string;
//   /** Set your custom show password component */
//   customShowPasswordComponent?: JSX.Element;
//   /** Set your custom hide password component */
//   customHidePasswordComponent?: JSX.Element;
//   /** Callback for show/hide password */
//   onTogglePassword?: (show: boolean) => void;
//   /** Prop for force toggling show/hide password. If set to true, shows the password, and when set to false hides it. */
//   togglePassword?: boolean;
//   /** Add left component to your input. Usually used for displaying icon */
//   leftComponent?: JSX.Element;
//   /** Add right component to your input. Be aware if using the input as password this component is positioned before the show/hide component */
//   rightComponent?: JSX.Element;
//   /** Set custom animation duration. Default 300 ms */
//   animationDuration?: number;
//   /** Label Props */
//   labelProps?: TextProps;
// }

// export interface SetGlobalStyles {
//   /** Set global styles to all floating-label-inputs container */
//   containerStyles?: ViewStyle;
//   /** Set global custom styles to all floating-label-inputs labels */
//   customLabelStyles?: CustomLabelProps;
//   /** Set global styles to all floating-label-inputs input */
//   inputStyles?: TextStyle;
//   /** Set global styles to all floating-label-inputs label */
//   labelStyles?: TextStyle;
//   /** Set global styles to all floating-label-inputs show password container */
//   showPasswordContainerStyles?: ViewStyle;
//   /** Set global styles to all floating-label-inputs show password image */
//   showPasswordImageStyles?: ImageStyle;
//   /** Set global style to the countdown text */
//   showCountdownStyles?: TextStyle;
// }

// export interface CustomLabelProps {
//   /** Absolute distance from left-most side of the input when focused */
//   leftFocused?: number;
//   /** Absolute distance from left-most side of the input when blurred */
//   leftBlurred?: number;
//   /** Absolute distance from center of the input when focused */
//   topFocused?: number;
//   /** Absolute distance from center of the input when blurred */
//   topBlurred?: number;
//   /** Font size of label the when focused */
//   fontSizeFocused?: number;
//   /** Font size of label the when blurred */
//   fontSizeBlurred?: number;
//   /** Font color of label the when blurred */
//   colorFocused?: string;
//   /** Font color of label the when blurred */
//   colorBlurred?: string;
// }

// /** Set global styles for all your floating-label-inputs */
// const setGlobalStyles: SetGlobalStyles = {
//   /** Set global styles to all floating-label-inputs container */
//   containerStyles: undefined as ViewStyle | undefined,
//   /** Set global custom styles to all floating-label-inputs labels */
//   customLabelStyles: undefined as CustomLabelProps | undefined,
//   /** Set global styles to all floating-label-inputs input */
//   inputStyles: undefined as TextStyle | undefined,
//   /** Set global styles to all floating-label-inputs label */
//   labelStyles: undefined as TextStyle | undefined,
//   /** Set global styles to all floating-label-inputs show password container */
//   showPasswordContainerStyles: undefined as ViewStyle | undefined,
//   /** Set global styles to all floating-label-inputs show password image */
//   showPasswordImageStyles: undefined as ImageStyle | undefined,
//   /** Set global style to the countdown text */
//   showCountdownStyles: undefined as TextStyle | undefined,
// };

// interface InputRef {
//   focus: () => void;
//   blur: () => void;
// }

// const AnimatedText = Animated.createAnimatedComponent(Text);

// const FloatingLabelInput: React.ForwardRefRenderFunction<InputRef, Props> = (
//   {
//     label,
//     labelProps,
//     mask,
//     isPassword,
//     maxLength,
//     inputStyles,
//     showCountdown,
//     showCountdownStyles,
//     labelStyles,
//     darkTheme,
//     countdownLabel,
//     currencyDivider,
//     currency,
//     maskType,
//     onChangeText,
//     customHidePasswordComponent,
//     customShowPasswordComponent,
//     isFocused,
//     onBlur,
//     onFocus,
//     onTogglePassword,
//     togglePassword,
//     leftComponent,
//     rightComponent,
//     customHidePasswordImage,
//     customLabelStyles = {},
//     staticLabel = false,
//     hint,
//     hintTextColor,
//     onSubmit,
//     containerStyles,
//     customShowPasswordImage,
//     showPasswordContainerStyles,
//     maxDecimalPlaces,
//     multiline,
//     showPasswordImageStyles,
//     value = '',
//     animationDuration,
//     ...rest
//   }: Props,
//   ref: any,
// ) => {
//   const [halfTop, setHalfTop] = useState(0);
//   const [isFocusedState, setIsFocused] = useState(false);
//   const [secureText, setSecureText] = useState(true);
//   const inputRef = useRef<any>(null);
//   customLabelStyles = StyleSheet.flatten([
//     {
//       fontSizeFocused: 10,
//       fontSizeBlurred: 14,
//       colorFocused: '#627E9F',
//       colorBlurred: '#B9D0E3',
//     },
//     setGlobalStyles?.customLabelStyles,
//     customLabelStyles,
//   ]);

//   const [fontColorAnimated, setFontColorAnimated] = useState(0);

//   const [fontSizeAnimated, setFontSizeAnimated] = useState(
//     isFocused === true
//       ? customLabelStyles.fontSizeFocused ?? 10
//       : customLabelStyles.fontSizeBlurred ?? 14,
//   );

//   const [leftAnimated, setLeftAnimated] = useState(
//     staticLabel ? customLabelStyles?.leftFocused ?? 15 : customLabelStyles.leftBlurred ?? 6,
//   );

//   const [topAnimated, setTopAnimated] = useState(
//     staticLabel ? customLabelStyles?.topFocused ?? 0 : customLabelStyles.topBlurred ?? 0,
//   );

//   useEffect(() => {
//     if (isFocused === undefined) {
//       if (value !== '' || isFocusedState) {
//         setIsFocused(true);
//       } else if (value === '' || value === null) {
//         setIsFocused(false);
//       }
//     }
//   }, [value]);

//   useEffect(() => {
//     if (isFocused !== undefined) {
//       if (value !== '' || isFocused) {
//         setIsFocused(true);
//       } else {
//         setIsFocused(false);
//       }
//     }
//   }, [isFocused, value]);

//   useEffect(() => {
//     if (togglePassword !== undefined) {
//       _toggleVisibility(togglePassword);
//     }
//   }, [togglePassword]);

//   useEffect(() => {
//     if (isFocusedState || value !== '') {
//       if (halfTop !== 0) {
//         animateFocus();
//       }
//     } else {
//       animateBlur();
//     }
//   }, [isFocusedState, halfTop, value]);

//   useImperativeHandle(ref, () => ({
//     focus() {
//       inputRef.current.focus();
//     },
//     blur() {
//       inputRef.current.blur();
//     },
//   }));

//   function handleFocus() {
//     setIsFocused(true);
//   }

//   function handleBlur() {
//     if (value === '') {
//       setIsFocused(false);
//     }
//   }

//   function setFocus() {
//     inputRef.current?.focus();
//   }

//   function setBlur() {
//     inputRef.current?.blur();
//   }

//   function _toggleVisibility(toggle?: boolean) {
//     if (toggle === undefined) {
//       if (onTogglePassword != null) {
//         onTogglePassword(!secureText);
//       }
//       setSecureText(!secureText);
//       if (secureText) {
//         setFocus();
//       } else {
//         setBlur();
//       }
//       return;
//     }
//     if (!(secureText && !toggle) && !(!secureText && toggle)) {
//       if (onTogglePassword != null) {
//         onTogglePassword(!toggle);
//       }
//       setSecureText(!toggle);
//       if (toggle) {
//         setFocus();
//       } else {
//         setBlur();
//       }
//     }
//   }

//   function onSubmitEditing() {
//     if (onSubmit !== undefined) {
//       onSubmit();
//     }
//   }

//   const imgSource = secureText
//     ? require('../../assets/icons/ic_eye_block.png')
//     : require('../../assets/icons/ic_eye_open.png');

//   const style: TextStyle = StyleSheet.flatten([
//     setGlobalStyles?.labelStyles,
//     labelStyles,
//     {
//       alignSelf: 'center',
//       position: 'absolute',
//       flex: 1,
//       zIndex: 999,
//     },
//   ]);

//   const input = StyleSheet.flatten([
//     { color: customLabelStyles.colorFocused },
//     inputStyles,
//     setGlobalStyles?.inputStyles,
//     styles.input,
//     {
//       flex: 1,
//       zIndex: style?.zIndex !== undefined ? style.zIndex - 2 : 0,
//     },
//   ]);

//   containerStyles = StyleSheet.flatten([
//     styles.container,
//     {
//       alignItems: 'center',
//       flexDirection: 'row',
//       flex: 1,
//       zIndex: style?.zIndex !== undefined ? style.zIndex - 6 : 0,
//     },
//     containerStyles,
//   ]);

//   let toggleButton =
//     showPasswordContainerStyles ??
//     setGlobalStyles?.showPasswordContainerStyles ??
//     styles.toggleButton;

//   toggleButton = StyleSheet.flatten([
//     toggleButton,
//     {
//       alignSelf: 'center',
//     },
//   ]);

//   let img = showPasswordImageStyles ?? setGlobalStyles.showPasswordImageStyles ?? styles.img;

//   img = StyleSheet.flatten([
//     {
//       height: 25,
//       width: 25,
//     },
//     img,
//   ]);

//   async function animateFocus() {
//     if (!staticLabel) {
//       setLeftAnimated(customLabelStyles.leftFocused ?? 0);
//       setFontSizeAnimated(customLabelStyles.fontSizeFocused ?? 10);
//       setTopAnimated(
//         customLabelStyles.topFocused ?? -halfTop + (customLabelStyles.fontSizeFocused ?? 10),
//       );
//       setFontColorAnimated(1);
//     } else {
//       setFontColorAnimated(1);
//     }
//   }

//   function animateBlur() {
//     if (!staticLabel) {
//       setLeftAnimated(customLabelStyles.leftBlurred ?? 6);
//       setFontSizeAnimated(customLabelStyles.fontSizeBlurred ?? 14);
//       setTopAnimated(customLabelStyles.topBlurred ?? 0);
//       setFontColorAnimated(0);
//     } else {
//       setFontColorAnimated(0);
//     }
//   }

//   const countdown = StyleSheet.flatten([
//     styles.countdown,
//     setGlobalStyles?.showCountdownStyles,
//     showCountdownStyles,
//   ]);

//   function onChangeTextCallback(val: string): void {
//     if (onChangeText === undefined) {
//       return;
//     }

//     if (maskType === undefined && mask === undefined) {
//       onChangeText(val);
//       return;
//     }

//     let newValue: string | undefined;

//     if (maskType !== 'currency' && mask !== undefined) {
//       newValue = getValueWithNonCurrencyMask({ value: val, mask });
//     }

//     if (maskType === 'currency') {
//       if (
//         currency != null &&
//         !/^\d+$/g.test(val.replace(/[.,]/g, '')) &&
//         val.replace(/[.,]/g, '').replace(currency, '') !== ''
//       ) {
//         return undefined;
//       }

//       newValue = getValueWithCurrencyMask({
//         value: currency !== undefined ? value.replace(currency, '') : value,
//         newValue: currency !== undefined ? val.replace(currency, '') : val,
//         currencyDivider,
//         maxDecimalPlaces,
//       });
//     }

//     if (newValue !== undefined) {
//       onChangeText((currency ?? '') + newValue);
//     }
//   }

//   function onLayout(event: LayoutChangeEvent) {
//     const { height } = event.nativeEvent.layout;
//     setHalfTop(height / 2);
//   }

//   const positionAnimations = useAnimatedStyle(() => {
//     return {
//       transform: [
//         {
//           translateX: withTiming(leftAnimated, {
//             duration: animationDuration ?? 200,
//             easing: Easing.in(Easing.ease),
//           }),
//         },
//         {
//           translateY: withTiming(topAnimated, {
//             duration: animationDuration ?? 200,
//             easing: Easing.in(Easing.ease),
//           }),
//         },
//       ],
//       fontSize: withTiming(fontSizeAnimated, {
//         duration: animationDuration ?? 200,
//         easing: Easing.in(Easing.ease),
//       }),
//     };
//   });

//   const progress = useDerivedValue(() => {
//     return withTiming(fontColorAnimated, {
//       duration: animationDuration || 200,
//       easing: Easing.in(Easing.ease),
//     });
//   });

//   const colorAnimation = useAnimatedStyle(() => {
//     const color = interpolateColor(
//       progress.value,
//       [0, 1],
//       [
//         customLabelStyles.colorBlurred !== undefined ? customLabelStyles.colorBlurred : '#000',
//         customLabelStyles.colorFocused !== undefined ? customLabelStyles.colorFocused : '#000',
//       ],
//     );

//     return {
//       color,
//     };
//   });

//   const renderPasswordRightComponent = (): JSX.Element => {
//     if (secureText && customShowPasswordComponent !== undefined) {
//       return customShowPasswordComponent;
//     }
//     if (!secureText && customHidePasswordComponent !== undefined) {
//       return customHidePasswordComponent;
//     }
//     return <Image source={imgSource} resizeMode="contain" style={img} />;
//   };

//   const renderStaticLabel = (): FC.Element =>
//     staticLabel && (
//       <AnimatedText
//         {...labelProps}
//         onPress={setFocus}
//         style={[
//           style,
//           colorAnimation,
//           {
//             left: labelStyles?.left ?? customLabelStyles.leftFocused ?? 20,
//             top: -(style?.fontSize ?? 10) / 2,
//           },
//         ]}
//       >
//         {label}
//       </AnimatedText>
//     );

//   const renderInput = (): FC.Element => (
//     <View style={{ flex: 1, flexDirection: 'row', height: 50 }}>
//       {!staticLabel && (
//         <AnimatedText
//           {...labelProps}
//           onPress={setFocus}
//           style={[style, positionAnimations, colorAnimation]}
//         >
//           {label}
//         </AnimatedText>
//       )}
//       <TextInput
//         value={value}
//         onSubmitEditing={onSubmitEditing}
//         secureTextEntry={(isPassword ?? false) && secureText}
//         onFocus={onFocus ?? handleFocus}
//         onBlur={onBlur ?? handleBlur}
//         ref={inputRef}
//         {...rest}
//         maxLength={mask?.length ?? maxLength}
//         placeholderTextColor={hintTextColor}
//         placeholder={(staticLabel || isFocusedState) && hint ? hint : ''}
//         multiline={multiline}
//         onChangeText={onChangeTextCallback}
//         style={input}
//       />
//       {rightComponent != null && rightComponent}
//       {isPassword && value.length > 0 && (
//         <TouchableOpacity
//           style={toggleButton}
//           hitSlop={{ top: 4, bottom: 4, left: 4, right: 4 }}
//           onPress={() => _toggleVisibility()}
//         >
//           {renderPasswordRightComponent()}
//         </TouchableOpacity>
//       )}
//     </View>
//   );

//   const renderCountDown = () =>
//     showCountdown === true &&
//     maxLength && (
//       <Text style={countdown}>
//         {maxLength - (value?.length ?? 0)} {countdownLabel}
//       </Text>
//     );

//   return (
//     <TouchableWithoutFeedback style={{ flex: 1 }} onPress={setFocus} onLayout={onLayout}>
//       <View style={{ flexDirection: 'row' }}>
//         {renderStaticLabel()}
//         <View style={containerStyles}>
//           {leftComponent != null && leftComponent}
//           {renderInput()}
//           {renderCountDown()}
//         </View>
//       </View>
//     </TouchableWithoutFeedback>
//   );
// };
// export { setGlobalStyles };
// export default forwardRef(FloatingLabelInput);
