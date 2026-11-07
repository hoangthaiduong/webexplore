# Deploy WebExplore lên Vercel

## Cách khuyến nghị: GitHub → Vercel

1. Giải nén ZIP. Mở thư mục dự án có trực tiếp các tệp `index.html`, `package.json`, `vercel.json` và các thư mục `src/`, `public/`, `scripts/`.
2. Đưa **nội dung bên trong thư mục này** lên repository GitHub. Không đặt toàn bộ dự án trong một thư mục con nếu bạn không đổi Root Directory.
3. Trên Vercel, chọn **Add New → Project** và Import repository GitHub vừa tạo.
4. Trong phần cấu hình dự án:
   - Framework Preset: **Other**.
   - Root Directory: `./` (thư mục đang chứa `index.html` và `vercel.json`).
   - Build Command: `npm run build`.
   - Output Directory: `dist`.
   - Install Command: để mặc định; dự án không có dependency bên ngoài.
5. Nhấn **Deploy**.

`vercel.json` đã khai báo sẵn Build Command và Output Directory. Nếu Vercel vẫn đang dùng cấu hình cũ, vào **Settings → Build and Deployment**, kiểm tra Output Directory là `dist`, không phải `public`.

## Nếu repository có thư mục WebExplore nằm bên trong

Nếu cấu trúc GitHub của bạn là `repository/WebExplore/index.html`, hãy đặt **Root Directory** trên Vercel thành `WebExplore`. Root Directory phải là nơi có `index.html`, `package.json` và `vercel.json`.

## Chạy trực tiếp trên máy

Không cần build. Giải nén rồi nhấp đúp `index.html` ở thư mục dự án.

## Deploy thủ công

Nếu dùng chức năng tải static output, chạy build trước rồi tải **nội dung trong thư mục `dist/`**. Không tải riêng thư mục `public/`, vì `index.html` không nằm trong đó.
