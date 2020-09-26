<template>
    <div>
<!--        <div id="pdf-view">-->
            <iframe id="pdf" frameborder="no" border="0" marginwidth="0" marginheight="0" scrolling="no" allowtransparency="yes"></iframe>
<!--        </div>-->
<!--        <div style="float: right; width: 30%; height: 1000px; background-color: purple"></div>-->
    </div>


</template>

<!--注意这个是pdflib，暂时不用-->

<script>
    import { PDFDocument, StandardFonts, rgb } from 'pdf-lib'
    export default {
        name: "PdfLibEditer",
        created() {
            // this.createPdf()
            this.modifyPdf()
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
            async modifyPdf() {
                // const url = 'https://pdf-lib.js.org/assets/with_update_sections.pdf'
                const url = '/A robust zero-watermarking algorithm for color image.pdf'
                const existingPdfBytes = await fetch(url).then(res => res.arrayBuffer())

                const pdfDoc = await PDFDocument.load(existingPdfBytes)
                // const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica)
                //
                // const pages = pdfDoc.getPages()
                const pdfDataUri = await pdfDoc.saveAsBase64({ dataUri: true });
                document.getElementById('pdf').src = pdfDataUri
            },
            changeFrameHeight(){
                var ifm= document.getElementById("pdf");
                ifm.height=document.documentElement.clientHeight;
            }
        }
    }
</script>

<style scoped>
    #pdf-view{
        width: 100%;
        height: 100%;
    }

    #pdf{
        width: 40%;
        height: 100%;
        /*margin-left: 200px;*/
        /*margin-top: 100px;*/
        /*overflow: hidden;*/
    }
</style>