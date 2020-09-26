<template>
    <div id="pdf-view">

        <iframe id="pdf" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>

    </div>
</template>

<script>
    import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
    export default {
        name: "PdfEditer",
        created() {
            this.createPdf()
        },
        methods:{
             async createPdf() {
                 console.log("createPdf被调用了")
                const pdfDoc = await PDFDocument.create();
                const page = pdfDoc.addPage([800, 1000]);
                // const page = pdfDoc.addPage();
                page.moveTo(110, 200);
                page.drawText('Hello World!');
                const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
                document.getElementById('pdf').src = pdfDataUri;
            },
            changeFrameHeight(){
                var ifm= document.getElementById("pdf");
                ifm.height=document.documentElement.clientHeight;
            }
        }
    }
</script>

<style scoped>

    #pdf{
        width: 800px;
        height: 1000px;
        margin-left: 200px;
        margin-top: 100px;
        overflow: hidden;
    }
</style>