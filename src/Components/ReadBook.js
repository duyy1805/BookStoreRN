import PDFView from "react-native-view-pdf";
function ReadBook({ route, navigation }) {
    const { book } = route.params;
    return (
        <PDFView
            style={{ flex: 1 }}
            onError={(error) => console.log("onError", error)}
            onLoad={() => console.log("PDF rendered from base 64 data")}
            resource="http://www.pdf995.com/samples/pdf.pdf"
            resourceType="url"
        />
    );
}
export default ReadBook;
