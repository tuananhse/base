import {useField} from 'formik';
import React, {forwardRef} from 'react';
import {Text, View} from 'react-native';
import {Input} from '@ui-kitten/components';
import styles from './styles';
interface FormFloatTextFieldProps {
  name: string;
  zIndex?: number;
  onFormatValue?: (text: string) => string;
}

const FormFloatTextField: React.ForwardRefRenderFunction<
  any,
  FormFloatTextFieldProps
> = ({name, zIndex = 1000, onFormatValue, ...props}, ref) => {
  const [field, meta, helpers] = useField({name});

  const renderCaption = (text: string): React.ReactElement => {
    return (
      <View style={styles.captionContainer}>
        <Text style={styles.captionText}>{text}</Text>
      </View>
    );
  };

  return (
    <View style={{zIndex}}>
      <Input
        {...props}
        ref={ref}
        value={field.value}
        onChangeText={text => {
          if (onFormatValue != null) {
            helpers.setValue(onFormatValue(text));
          } else {
            helpers.setValue(text);
          }
        }}
        caption={meta.touched && meta.error ? renderCaption(meta.error) : null}
      />
    </View>
  );
};

export default forwardRef(FormFloatTextField);
