// components/RequisitesPDF.tsx
import {Page, Text, View, Document, StyleSheet, PDFDownloadLink} from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        padding: 40,
        fontSize: 12,
    },
    title: {
        fontSize: 18,
        marginBottom: 20,
        textAlign: 'center',
        fontWeight: 'bold',
    },
    section: {
        marginBottom: 15,
    },
    label: {
        fontWeight: 'bold',
        marginBottom: 5,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginBottom: 10,
    },
    column: {
        width: '48%',
    },
});

export const RequisitesPDF = ({data}: { data: any }) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <Text style={styles.title}>Реквизиты компании</Text>

            <View style={styles.section}>
                <Text style={styles.label}>Полное наименование:</Text>
                <Text>{data.companyName}</Text>
            </View>

            <View style={styles.section}>
                <Text style={styles.label}>Юридический адрес:</Text>
                <Text>{data.address}</Text>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>ИНН:</Text>
                    <Text>{data.inn}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>ОГРН:</Text>
                    <Text>{data.ogrn}</Text>
                </View>
            </View>

            <View style={styles.row}>
                <View style={styles.column}>
                    <Text style={styles.label}>Генеральный директор:</Text>
                    <Text>{data.director}</Text>
                </View>
                <View style={styles.column}>
                    <Text style={styles.label}>Почта:</Text>
                    <Text>{data.email}</Text>
                </View>
            </View>
        </Page>
    </Document>
);