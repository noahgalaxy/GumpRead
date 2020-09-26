<template>
    <div id="showPdf" class="bgk">
        <dashboard-nav-bar></dashboard-nav-bar>
        <div class="main_content" id="mainContent" ref="mainContent">
                <div v-for="item in totals" :id="`page-${item}`" :key="item" class="pdf-box">
                    <canvas :id="'canvas-pdf-' + item" class="canvas-pdf"></canvas>
                </div>
                <div class="pdf-box">
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate dolor ducimus incidunt officiis optio rerum ut? Animi itaque molestiae nam!</p>
                </div>
            </div>


    </div>
</template>

<script>

    /*
    getDocument()：用于异步获取PDf文档，发送多个Ajax请求以块的形式下载文档。它返回一个Promise，该Promise的成功回调传递一个对象，该对象包含PDF文档的信息，该回调中的代码将在完成PDf文档获取时执行。

    getPage()：用于获取PDF文档中的各个页面。

    getViewport()：针对提供的展示比例，返回PDf文档的页面尺寸。

    render()：渲染PDF。
     */
    import Vue from 'vue';
    import PDFJS from 'pdfjs-dist'
    import { TextLayerBuilder } from 'pdfjs-dist/web/pdf_viewer'
    import 'pdfjs-dist/web/pdf_viewer.css'

    import DashboardNavBar from "../../components/dashboard/DashboardNavBar";
    export default {
        name: 'AboutAuthor',
        components: {DashboardNavBar},
        data () {
            return {
                pdfUrl : '',
                scale: 1.2,
                totals: [],
                pageNo: 1,
                viewHeight: 0,
                scrollbar: ''
            }
        },
        mounted () {
            this.getMainContentWidth()
            // this.getPdfFun()
            this.renderPdf()
        },
        methods: {
            getMainContentWidth () {
                let div = this.$refs.mainContent
                let width = window.getComputedStyle(div).width
                this.contentWidth = parseInt(width)
            },


            renderPdf () {
                // let pdfUrl = '/抗拼接攻击的矢量瓦片数据水印算法_唐伟.pdf';
                let pdfUrl = '/A robust zero-watermarking algorithm for color image.pdf';

                // PDFJS.workerSrc = require('pdfjs-dist/build/pdf.worker')
                PDFJS.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/2.4.456/pdf.worker.js`;
                PDFJS.cMapUrl= 'https://cdn.jsdelivr.net/npm/pdfjs-dist@2.0.288/cmaps/' // include "/"
                PDFJS.cMapPacked= true // set cMapPacked = true to ignore Warning: Ignoring invalid character "121" in hex string

                let loadingTask = PDFJS.getDocument(pdfUrl);
                loadingTask.promise.then(pdf => {
                    let totalPage = pdf.numPages
                    let idName = 'canvas-pdf-'
                    this.createCanvas(totalPage, idName)
                    for (let i = 1; i <= totalPage; i++) {
                        // 获取到每一页，对每一页进行操作
                        pdf.getPage(i).then((page) => {
                            let pageDiv = document.getElementById(`page-${i}`)

                            let viewportFirst = page.getViewport({scale: 1.5});

                            // 计算 scale值，this.contentWidth 为 ref = mainContent 的元素的宽度
                            let scale = this.contentWidth / viewportFirst.width
                            let viewport = page.getViewport({scale: scale})
                            console.log("scale: ", scale)

                            let canvas = document.getElementById(idName + i)
                            let context = canvas.getContext('2d')

                            // 获取屏幕 物理像素 / 设备独立像素dip 比例
                            // let dpr = window.devicePixelRatio || 1;
                            // let bsr = context.webkitBackingStorePixelRatio ||
                            //         context.mozBackingStorePixelRatio ||
                            //         context.msBackingStorePixelRatio ||
                            //         context.oBackingStorePixelRatio ||
                            //         context.backingStorePixelRatio || 1;
                            // let PIXEL_RATIO = dpr / bsr;
                            // console.log("PIXEL_RATIO: ",PIXEL_RATIO)

                            // canvas.height = viewport.height * PIXEL_RATIO
                            // canvas.width = viewport.width * PIXEL_RATIO
                            // canvas.style.width = viewport.width+'px'
                            // canvas.style.height = viewport.height + 'px'
                            // context.setTransform(PIXEL_RATIO, 0, 0, PIXEL_RATIO, 0, 0)
                            canvas.height = viewport.height
                            canvas.width = viewport.width
                            this.viewHeight = viewport.height
                            let renderContext = {
                                canvasContext: context,
                                viewport
                            }
                            let renderTask = page.render(renderContext);
                            renderTask.promise.then(() => {
                                // page.getTextContent()：该函数的成功回调会返回PDF页面上的文本片段。
                                return page.getTextContent()
                            }).then((textContent) => {
                                // 创建文本图层div
                                const textLayerDiv = document.createElement('div')
                                textLayerDiv.setAttribute('class', 'textLayer')
                                // 将文本图层div添加至每页pdf的div中
                                pageDiv.appendChild(textLayerDiv)

                                /*
                                创建新的TextLayerBuilder实例, 该类的实例有两个重要方法，就是下面的：
                                    setTextContent()： 用于设置page.getTextContent()返回的文版片段
                                    render()： 用于渲染文本图层。
                                 */
                                let textLayer = new TextLayerBuilder({
                                    textLayerDiv: textLayerDiv,
                                    pageIndex: page.pageIndex,
                                    viewport: viewport
                                })
                                textLayer.setTextContent(textContent)
                                textLayer.render()
                            })
                        })
                    }
                }, error => {
                    console.log("打开pdf过程遇到了错误：\n", error);
                })
            },
            createCanvas (totalPages) {
                for (let i = 1; i <= totalPages; i++) {
                    this.totals.push(i)
                }
            },
        }
    }
</script>

<style lang="scss">
    .bgk{
        background-color: #F5F5F5;
        width: 100%;
        height: 100%;
        /*position: relative;*/
    }
    #showPdf {
        .main_content{
            margin-left: 200px;
            /*position: relative;*/
        }
        .pdf-box {
            position: relative;
            /*position: static;*/
            width: 70%;
            height: 100%;
            text-align: left;
            display: inline-block;
            margin-bottom: 20px;
            margin-left: 100px;
        }
    }
</style>
