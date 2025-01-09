const fs = require('fs');
const path = require('path');

const sourceDir = path.join('node_modules', 'leaflet', 'dist', 'images');
const targetDir = path.join('public', 'images');

// 创建目标目录
if (!fs.existsSync(targetDir)) {
  fs.mkdirSync(targetDir, { recursive: true });
}

// 要复制的文件列表
const files = [
  'marker-icon-2x.png',
  'marker-icon.png',
  'marker-shadow.png'
];

// 复制文件
files.forEach(file => {
  const sourcePath = path.join(sourceDir, file);
  const targetPath = path.join(targetDir, file);
  
  if (fs.existsSync(sourcePath)) {
    fs.copyFileSync(sourcePath, targetPath);
    console.log(`Copied ${file} to public/images/`);
  } else {
    console.error(`Source file not found: ${sourcePath}`);
  }
}); 