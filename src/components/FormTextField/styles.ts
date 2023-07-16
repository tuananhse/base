import { StyleSheet } from "react-native";
import { Colors } from "../../utils";

const textfieldStyle = StyleSheet.create({
    captionContainer: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    captionText: {
        fontSize: 12,
        color: Colors.error_red,
        paddingVertical: 4,
    },
})

export default textfieldStyle