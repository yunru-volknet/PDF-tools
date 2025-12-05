// src/utils/pdf/imageToPdf.js
import { PDFDocument } from "pdf-lib";

export async function imagesToPDF(images) {
  // 创建一个新的PDF文档
  const pdfDoc = await PDFDocument.create();
  
  for (let imageFile of images) {
    // 读取图片文件
    const imageBytes = await imageFile.arrayBuffer();
    
    // 获取图片类型
    const isJPEG = imageFile.type === 'image/jpeg' || 
                   imageFile.type === 'image/jpg' ||
                   imageFile.name.toLowerCase().endsWith('.jpg') ||
                   imageFile.name.toLowerCase().endsWith('.jpeg');
    
    const isPNG = imageFile.type === 'image/png' ||
                  imageFile.name.toLowerCase().endsWith('.png');
    
    let image;
    try {
      if (isJPEG) {
        image = await pdfDoc.embedJpg(imageBytes);
      } else if (isPNG) {
        image = await pdfDoc.embedPng(imageBytes);
      } else {
        // 尝试其他格式或使用通用方法
        console.warn(`不支持的图片格式: ${imageFile.type}，尝试通用嵌入`);
        continue;
      }
      
      // 创建页面，尺寸与图片相同
      const page = pdfDoc.addPage([image.width, image.height]);
      
      // 绘制图片
      page.drawImage(image, {
        x: 0,
        y: 0,
        width: image.width,
        height: image.height,
      });
      
    } catch (error) {
      console.error(`处理图片 ${imageFile.name} 时出错:`, error);
      throw new Error(`无法处理图片 ${imageFile.name}: 可能是不支持的格式或损坏的文件`);
    }
  }
  
  // 如果没有成功添加任何页面，抛出一个错误
  if (pdfDoc.getPageCount() === 0) {
    throw new Error('没有成功添加任何图片到PDF，请检查图片格式是否支持');
  }
  
  // 保存PDF
  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
}