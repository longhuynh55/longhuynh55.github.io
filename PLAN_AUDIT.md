# Tự audit kế hoạch portfolio

Ngày: 2026-09-06.  
Kết luận: Bộ tài liệu đủ rõ để bắt đầu triển khai sau các chỉnh sửa dưới đây. Đây là audit tài liệu và đối chiếu consumer trong source, không phải nghiệm thu website.

## Phạm vi

Đã kiểm tra DESIGN.md, REDESIGN_PLAN.md, PORTFOLIO_REFERENCES.md, AGENTS.md và hai bản checklist design-review. Đối chiếu content.config.ts, trang Certificates, Projects listing và PublicationBanner để kiểm tra các giả định migration. Dùng bằng chứng nghiên cứu đã đọc ở lượt trước; không thu thập thêm nguồn hay tuyên bố đã kiểm tra lại toàn bộ website bên ngoài.

## Phát hiện và xử lý

| ID | Vấn đề trước audit | Xử lý |
| --- | --- | --- |
| A01 | GĐ1 và đoạn bắt đầu còn ghi prototype thiếu Experience, trong khi brief mới có Experience | Đồng bộ prototype Hero → Experience → Achievements & Research và mẫu chung các phần sau |
| A02 | Paper migration chỉ nói chung, bỏ sót Certificates đọc kind=paper và PublicationBanner typed theo achievements | Ghi rõ consumer và thứ tự chuyển; archive giữ awards/credentials, paper chuyển sang Research |
| A03 | Preprint, accepted và published bị mô tả như một chuỗi trạng thái duy nhất | Tách reviewStatus, publicationStatus, preprintUrl và nghĩa ngày tháng |
| A04 | Gate Paper source của R06 có thể làm chặn template và các task downstream | Tách template và nội dung; thiếu metadata giữ draft, layout vẫn triển khai được |
| A05 | Draft mặc định, chọn featured và thứ tự preview chưa đủ rõ; logic Projects còn chưa nằm trong migration checklist | Quy định draft an toàn, explicit migration, sort/cap, shared helper cho mọi consumer |
| A06 | External date bắt buộc dễ dẫn tới ngày bịa; related article thiếu cơ chế resolve | Date external optional nếu nguồn không có; thêm author, id references và public resolver |
| A07 | Ẩn empty section có thể để hero CTA/fragment bị hỏng; nav Lab chưa có destination rõ | Ghi route map, empty archives và CTA fallback; thêm #publication compatibility có điều kiện |
| A08 | Hình riêng vừa là tiêu chí chất lượng bắt buộc vừa bị xếp toàn bộ P1 | Đưa hero/Lab graphics tối thiểu vào P0; giữ hình bổ sung và motion ở P1 |
| A09 | GĐ6 nói có thể đạt khi chỉ ghi hạn chế, trái với mandatory gate | Lỗi bắt buộc vẫn fail; phân biệt missing content, field data và lỗi UI/code |
| A10 | Plan nhiều lớp nhưng chưa nêu thứ tự quyết định và map phase/task | Thêm governance và mapping GĐ0–6 ↔ R01–R10; nguồn tham khảo không trở thành yêu cầu bắt chước |
| A11 | Skill còn khuyên screenshot thật chung cho mọi project, không hợp Idea/CASK | Chỉnh theo trạng thái và tính công khai; cảnh báo clipping cho figure có nghĩa |
| A12 | Draft exclusion có thể bị hiểu là đủ để bảo vệ file public | Ghi rõ public assets và fixture phải an toàn độc lập với draft flag |

Tất cả là chỉnh sửa tài liệu trong lượt audit. Không đánh dấu các task code là đã xong.

## Quyết định giữ nguyên

- Thứ tự: Hero → Experience → Achievements & Research → Projects / Lab → Certifications → Writing → About & Contact.
- Palette và hướng Data & Research Editorial, container 1200px, Astro/pnpm.
- A là hướng prototype ưu tiên; B chỉ là biến thể ngắn để so sánh, không mở thêm dự án thiết kế.
- CASK không trở thành public company project; Lab có trạng thái; paper ghi đúng venue; Writing hỗ trợ link ngoài.
- Không thêm CMS, backend, WebGL hay scope mới.

## Kiểm tra tài liệu sau sửa

Kiểm tra các file tài liệu tồn tại, link Markdown tương đối trỏ file thật, thứ tự homepage nhất quán, các cụm prototype cũ đã được thay và hai bản design-review khớp nhau. Bản outputs được đối chiếu hash với bản dự án.

Không chạy build/test ứng dụng vì chỉ sửa Markdown; application code không thay đổi. Các kiểm tra runtime, contrast thực tế, mobile screenshots, paper metadata và user testing vẫn nằm trong giai đoạn triển khai, chưa báo đạt.

## Bước tiếp theo

R01 baseline/runtime audit và R02 content inventory ban đầu, rồi prototype R03 và schema R04. Không cần thêm một vòng tham khảo hoặc lập kế hoạch trước khi bắt đầu. Nếu thiếu nội dung, giữ phần đó draft và tiếp tục công việc độc lập.


## Audit lần 2 — 2026-09-06

Kết luận: tìm thêm 7 điểm có thể gây lỗi triển khai; đã sửa trong tài liệu. Không thay style, thứ tự section hoặc mở rộng tính năng.

| ID | Mức | Phát hiện | Sửa |
| --- | --- | --- | --- |
| B01 | Cao | Public không đồng nghĩa featured: #lab/#research có thể không render dù có entry public | CTA/nav dựa vào preview thực sự render; fallback archive rồi Experience/Contact |
| B02 | Vừa | Quy tắc sort dùng date chung nhưng Research không có date; thiếu ngày chưa được xếp rõ | Research dùng publishedAt rồi eventDate; thiếu ngày đứng sau, sortOrder mặc định 999 và id làm tie-break |
| B03 | Vừa | Cho draft thiếu dữ liệu nhưng schema có thể vẫn bắt đủ status/metadata và chặn build | Draft được phép thiếu; public validation đầy đủ theo kind; thêm trường hợp kiểm tra |
| B04 | Cao | Màu focus neutral light #285640 trên Research #173B2C chỉ đạt 1,47:1 | Thêm --color-focus-on-ink #C9E875, scope trên ink surface và outline-offset |
| B05 | Vừa | Tokens-only mâu thuẫn với theme-color HTML cần giá trị literal; Base hiện giữ màu cũ | Cho phép serialize metadata từ shared palette, cập nhật skill; không giữ bảng màu thứ hai |
| B06 | Vừa | Projects date được định nghĩa là ngày bắt đầu nhưng code detail truyền vào article:published_time | Ghi rõ mapping SEO; ngày công bố trang chưa biết thì bỏ, không dùng ngày bắt đầu/event |
| B07 | Cao | R04 thay schema trước R05–R08 nhưng consumer cũ có thể chưa được sửa nên không đạt gate build GĐ2 | R04 bao gồm consumer adapters và route guards; các bước sau chỉ tiếp tục redesign template |

Tính contrast bằng công thức luminance sRGB trên các hex trong DESIGN.md: cặp focus cũ 1,4693:1; focus-on-ink mới trên Research light 9,00:1, Research dark 11,01:1. Đây là kiểm tra cặp token, không phải xác nhận toàn palette hoặc focus đã render đạt.

Đối chiếu thêm src/pages/projects/[slug].astro và src/layouts/Base.astro để xác nhận dependency ngày SEO và theme-color. Không chạy application build vì application code chưa được sửa.

Các quy tắc về ngày tương lai cũng được làm rõ: bản đầu không có scheduler, draft=false quyết định hiển thị; bài chưa công bố vẫn draft=true. Không thêm automation xuất bản.

Sau sửa đã kiểm tra link tài liệu, bản sao outputs, đồng bộ skill và các quy tắc CTA/preview mới. Các điểm B01–B07 là **đã giải quyết trong đặc tả**, chưa phải fix code. Runtime, prototype và toàn bộ QA website vẫn chưa thực hiện.

