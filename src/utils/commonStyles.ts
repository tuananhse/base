import { StyleSheet } from "react-native";
import Colors from "./colors";


const commonStyles = StyleSheet.create({
    flex: {
        flex: 1
    },
    flex2: {
        flex: 2
    },
    flex3: {
        flex: 3
    },
    flex4: {
        flex: 4
    },
    m10: {
        margin: 10
    },
    p10: {
        padding: 10
    },
    pv: {
        paddingVertical: 10
    },
    mv: {
        marginVertical: 10
    },
    mv2: {
        marginVertical: 20
    },
    ph: {
        paddingHorizontal: 10
    },
    pl: {
        paddingLeft: 10
    },
    pr: {
        paddingRight: 10
    },
    ml: {
        marginLeft: 10
    },
    mr: {
        marginRight: 10
    },
    mt: {
        marginTop: 10
    },
    mt2: {
        marginTop: 20
    },
    mt3: {
        marginTop: 30
    },
    mb: {
        marginBottom: 10
    },
    pt: {
        paddingTop: 10
    },
    pt2: {
        paddingTop: 20
    },
    alignCenter: {
        alignItems: 'center'
    },
    jusCenter: {
        justifyContent: 'center'
    },
    contentContainerStyle: {
        flexGrow: 1,
        flexDirection: 'column'
    },
    errorFieled: {
        paddingHorizontal: 10,
    },
    errorText: {
        color: Colors.error_red,
        fontSize: 12,
        paddingVertical: 4,
    }
})

export default commonStyles