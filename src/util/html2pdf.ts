// 导出页面为PDF格式
import html2canvas from 'html2canvas';
import JSPDF from 'jspdf';
/***
 * elementName: 需要输出PDF的页面id
 * htmlTitle: 页面标题
 * currentTime：创建时间
 */
export default function (elementName: string, htmlTitle: string, currentTime: any) {
  const element = document.getElementById(elementName) as HTMLElement;
  html2canvas(element, {
    logging: false,
    scale: window.devicePixelRatio * 3
  }).then(function (canvas) {
    const pdf = new JSPDF('p', 'mm', 'a4'); // A4纸，纵向
    const ctx = canvas.getContext('2d');
    const a4w = 190;
    const a4h = 257; // A4大小，210mm x 297mm，四边各保留20mm的边距
    const imgHeight = Math.floor((a4h * canvas.width) / a4w); // 按A4显示比例换算一页图像的像素高度
    let renderedHeight = 0;

    while (renderedHeight < canvas.height) {
      const page = document.createElement('canvas');
      page.width = canvas.width;
      page.height = Math.min(imgHeight, canvas.height - renderedHeight); // 可能内容不足一页

      // 用getImageData剪裁指定区域，并画到前面创建的canvas对象中
      page
        .getContext('2d')
        .putImageData(
          ctx.getImageData(
            0,
            renderedHeight,
            canvas.width,
            Math.min(imgHeight, canvas.height - renderedHeight)
          ),
          0,
          0
        );
      pdf.addImage(
        page.toDataURL('image/jpeg', 1.0),
        'JPEG',
        10,
        10,
        a4w,
        Math.min(a4h, (a4w * page.height) / page.width)
      ); // 添加图像到页面，保留10mm边距

      renderedHeight += imgHeight;
      if (renderedHeight < canvas.height) {
        pdf.addPage();
      } // 如果后面还有内容，添加一个空页
      // delete page;
    }
    pdf.save(htmlTitle + currentTime);
  });
}
