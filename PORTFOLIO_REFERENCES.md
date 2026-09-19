# Portfolio reference research

Ngày tham khảo: 2026-09-06. Phục vụ D:/Portfolio.  
Liên quan: [Plan](REDESIGN_PLAN.md), [Design](DESIGN.md).

## Phạm vi và độ chắc chắn

Đã đọc trực tiếp 8 website cá nhân, một bài Distill, hai bài về animation và ba nguồn chuẩn/chất lượng web: tổng cộng 14 URL nguồn. Đã xem screenshot desktop trực tiếp của Brittany Chiang, Josh Comeau, Rauno Freiberg, swyx và Emil Kowalski. Lee Robinson, Andrej Karpathy, Bruno Simon và các bài hướng dẫn được đọc qua nội dung web; không coi đó là kiểm chứng toàn bộ giao diện hay tương tác.

Đây là nghiên cứu tham khảo có chọn lọc, không phải bảng xếp hạng portfolio tốt nhất hay nghiên cứu chứng minh hiệu quả tuyển dụng. Không đo performance/accessibility của các website tham khảo; không suy ra họ đạt chuẩn chỉ vì đẹp. Quan sát nguồn và đề xuất áp dụng được tách riêng. Chưa audit website local chạy thực tế trong lượt này.

## 1. Các website tham khảo và quyết định áp dụng

| Nguồn trực tiếp | Quan sát tại thời điểm đọc | Áp dụng cho Phúc — đề xuất thiết kế | Giới hạn |
| --- | --- | --- | --- |
| [Brittany Chiang](https://brittanychiang.com/) | Desktop chia identity và nội dung thành hai cột; có Experience, Projects, Writing; bài Writing dẫn ra các nền tảng ngoài | Experience trình bày vai trò, thời gian, đóng góp và liên kết đọc sâu; Writing hỗ trợ nguồn ngoài ngay từ schema | Không sao chép sidebar, navy palette, copy hoặc layout toàn trang |
| [Josh W. Comeau](https://www.joshwcomeau.com/) | Trang Articles and Tutorials có tiêu đề, đoạn giới thiệu và category; screenshot có hình mây và màu nhận diện riêng | Viết teaser giúp chọn bài; dành đồ họa đặc trưng cho header/cover và giữ vùng đọc sạch | Không cần newsletter, search hoặc số lượng category tương đương khi mới ít bài |
| [Lee Robinson](https://leerob.com/) | Bio có tùy chọn độ dài; Notes và Blogs tách rõ | Giới thiệu ngắn, cho người đọc đi sâu qua liên kết; homepage chỉ chọn nội dung cần thiết | Chỉ tham khảo cấu trúc nội dung; không chọn mức tối giản này làm hướng thị giác chính |
| [Andrej Karpathy](https://karpathy.ai/) | Trang tập hợp kinh nghiệm theo thời gian, talks, teaching, writing nhiều nền tảng và pet projects | Nối mỗi thành tích với artifact; phân biệt paper, project và bài giải thích | Không dùng uy tín cá nhân của tác giả để suy ra hiệu quả của bố cục; không sao chép mật độ nội dung |
| [swyx](https://swyx.io/) | Screenshot có nền ấm, serif, hình minh họa và các khối biên tập; featured essays gồm cả liên kết ngoài | Dùng phân cấp editorial, một bài dẫn đầu và mô tả ngắn; chọn bài nổi bật có chủ đích | Không nhập carousel ngang, trang quá dài hoặc ornaments dày đặc vào bản đầu |
| [Bruno Simon](https://bruno-simon.com/) | Nội dung site hướng dẫn lái xe khám phá thế giới 3D; có điều khiển và tùy chọn chất lượng | Lấy nguyên tắc một trải nghiệm đặc trưng gắn với chuyên môn; ở đây là đồ họa dữ liệu nhẹ | Không triển khai game/3D để truy cập CV; chưa kiểm thử trực tiếp trải nghiệm 3D |
| [Rauno Freiberg](https://rauno.me/) | Screenshot cho thấy chữ đen rất lớn, nền trung tính và một hình tròn vàng tạo điểm nhìn mạnh | Hero cần một bố cục và hình chủ đạo dễ nhớ; dùng tương phản quy mô chữ/hình | Giữ palette xanh đã chọn; không sao chép vòng tròn vàng, hình thức gallery hay intro của nguồn |
| [Emil Kowalski](https://emilkowal.ski/) | Screenshot có cột đọc gọn, khoảng trắng lớn; nội dung chia Today, Projects và Writing | Certifications và metadata dùng trình bày tiết chế; typography và spacing phải tự đứng vững | Không thu toàn portfolio về cột hẹp vì mục tiêu của Phúc cần hình và paper nổi bật |

## 2. Nguồn cho chất lượng bài viết, motion và nghiệm thu

### R09 — Giải thích nghiên cứu

[Distill: Communicating with Interactive Articles](https://distill.pub/2020/communicating-with-interactive-articles/) bàn về cách dùng tương tác để truyền đạt ý tưởng và phương pháp. Áp dụng: trang paper có một hình trả lời một câu hỏi cụ thể; chỉ thêm tương tác khi nó giúp hiểu một quan hệ. Static diagram và lời giải thích vẫn là bản nền. Không bắt buộc mô phỏng cả mô hình nghiên cứu trên browser.

### R10 — Motion có lý do

[Emil: You Don't Need Animations](https://emilkowal.ski/ui/you-dont-need-animations) là nguồn tham khảo cho quyết định tiết chế chuyển động; [7 Practical Animation Tips](https://emilkowal.ski/ui/7-practical-animation-tips) bổ trợ việc tinh chỉnh. Áp dụng: mỗi hiệu ứng phải ghi trigger, mục đích, thời lượng và fallback. Các con số duration trong DESIGN.md là lựa chọn dự án, không phải số đo hay tiêu chuẩn của tác giả.

### R11 — Performance có cách đo

[web.dev: Web Vitals](https://web.dev/articles/vitals) nêu LCP <=2.5s, INP <=200ms và CLS <=0.1; đánh giá dữ liệu thực tế ở percentile 75, tách mobile/desktop. Áp dụng: ghi cả lab checks và giới hạn của chúng. Không xem Lighthouse score là chứng nhận INP hoặc Core Web Vitals ngoài thực tế. Site chưa có field data phải ghi chưa có, không báo đạt.

### R12 — Kích thước vùng bấm

[W3C: Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) mô tả tiêu chí 24×24 CSS px cùng các ngoại lệ. Mục tiêu control 44px của dự án là lựa chọn tiện dụng cao hơn mức minimum đó; không gắn nhầm 44px là yêu cầu AA phổ quát. Kiểm tra cả khoảng cách giữa icon buttons.

### R13 — Reduced motion

[W3C: Animation from Interactions](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) là giải thích SC 2.3.3 ở mức AAA. Dự án chủ động áp dụng reduced-motion cho tương tác dù mục tiêu chung là AA; không tuyên bố tuân thủ AAA toàn bộ vì chỉ làm một hạng mục.

## 3. Tổng hợp art direction cho dự án

Đề xuất riêng: Data & Research Editorial, bố cục mở rộng 1200px, nền trắng ngà, chữ than, xanh rừng tập trung ở paper, lime điểm xuyết.

- Độ rõ của Experience: học cách liên kết đóng góp với bằng chứng.
- Cá tính của hero: một đồ họa riêng và chữ lớn, thay vì cộng nhiều hiệu ứng.
- Chiều sâu Research: câu hỏi → phương pháp → bằng chứng → giới hạn.
- Lab: thể hiện tiến độ suy nghĩ; ý tưởng có giả thuyết và thí nghiệm tiếp theo.
- Writing: người đọc chọn được bài theo vấn đề và nguồn xuất bản.
- Certifications: đóng vai trò bổ trợ, giữ gọn giữa Projects và Writing.

Đây là tổng hợp thiết kế, không phải nhận định rằng một nguồn đã sử dụng đúng toàn bộ các quy tắc trên.

## 4. Điều không nên nhập vào plan

- Không đổi stack chỉ vì website tham khảo dùng Next.js, React, Svelte hoặc Three.js.
- Không dùng screenshot/illustration của tác giả khác làm asset portfolio của Phúc.
- Không coi metric, giải thưởng hoặc employer của nguồn là bằng chứng về hiệu quả conversion của theme.
- Không thêm mục popular/read-count nếu chưa có dữ liệu đo thật.
- Không cố bắt chước tất cả nguồn: mỗi section chỉ có một hình thức chính.
- Không đổi thứ tự đã chốt: Hero → Experience → Achievements & Research → Projects / Lab → Certifications → Writing → About & Contact.

## 5. Những việc nghiên cứu nguồn chưa thay thế được

- Audit bản local bằng trình duyệt, kiểm tra mobile và lỗi hiện hữu.
- Đọc paper gốc trước khi viết contribution/limitations hoặc vẽ phương pháp.
- Kiểm tra nội dung CASK và xác định các thông tin có thể công khai.
- Dựng prototype với dữ liệu thật để xác định typography, chiều cao hero và độ dài trang.
- Đánh giá với người xem thật; mọi thời lượng đọc/điểm rubric trong plan chỉ là mục tiêu nội bộ.

