# Kế hoạch redesign portfolio — Data & Research Editorial

Ngày lập: 2026-09-06  
Dự án: D:/Portfolio  
Trạng thái: Đã lập kế hoạch và cập nhật đặc tả; chưa triển khai giao diện.  
Đặc tả thiết kế: [DESIGN.md](DESIGN.md). Báo cáo tự audit: [PLAN_AUDIT.md](PLAN_AUDIT.md).

## 1. Mục tiêu và quyết định đã thống nhất

Tạo website cá nhân đẹp, bắt mắt và có dấu ấn riêng, thể hiện ba hướng: làm việc với dữ liệu, chia sẻ kỹ thuật và nghiên cứu. Nhà tuyển dụng cần hiểu vai trò/kinh nghiệm; người đọc kỹ thuật cần tìm được bài viết; người quan tâm nghiên cứu cần đọc paper và phương pháp.

- Thiết kế lại bố cục, hero, cách trình bày nội dung và hình ảnh.
- Giữ Astro, pnpm, Markdown và JavaScript nhẹ.
- Theme: trắng ngà / đen than / xanh rừng, lime làm điểm nhấn; Research có mảng nền tối.
- Trang chủ (thứ tự đã chốt): Hero → Experience → Achievements & Research → Projects / Lab → Certifications → Writing → About & Contact.
- Experience và thành tích tạo độ tin cậy trước project ý tưởng; Certifications là phần gọn sau Projects, trước Writing. Paper có khối riêng trong Achievements & Research, không lặp lại ở About.
- CASK thuộc Experience và một bài blog kỹ thuật khái quát hóa; không đưa dự án nội bộ ra công khai.
- Projects trở thành Lab, thể hiện rõ ý tưởng/thử nghiệm và trạng thái thực tế.
- Paper là nội dung nổi bật riêng, ghi đúng workshop/venue và tình trạng xuất bản.
- Writing hỗ trợ bài nội bộ và đường dẫn bài viết ở nền tảng ngoài.
- Ngôn ngữ website ban đầu giữ tiếng Anh; tên tiếng Việt giữ đúng dấu.
- Lượt lập kế hoạch này không sửa application code, không xuất bản bài và không deploy.

## 2. Hiện trạng đã đọc

- src/pages/index.astro: trang chủ dài, gồm stats, projects, experience, achievements, publication, skills, certificates, writing, now và contact.
- src/styles/global.css: container 960px, Forest Green ở cả hai theme, nhiều card và hiệu ứng reveal.
- src/content/projects/: hai entry Last-Mile và QuantVN đang dùng ngôn ngữ như sản phẩm đã thực hiện; chưa có trạng thái ý tưởng trong schema.
- src/components/ProjectCard.astro: dùng cùng SVG biểu đồ mặc định khi thiếu ảnh.
- src/content/achievements/: paper đang chung collection với giải thưởng; ghi DMO Fintech 2026 Workshop @ PAKDD Conference, Hong Kong.
- src/content/blog/: schema hiện chỉ dành cho bài Markdown nội bộ.
- src/pages/blog/[slug].astro và rss.xml.ts: cần cập nhật nếu thêm bài external để không sinh trang rỗng.
- design-validation/: ảnh cũ phục vụ lịch sử; một số ảnh chưa hiện hết section do reveal, không dùng làm bằng chứng nghiệm thu mới.

## 3. Nội dung cần chuẩn bị

| Nội dung | Cần có | Khi chưa có |
| --- | --- | --- |
| CASK | Vai trò và đóng góp được phép chia sẻ; outline bài học | Giữ bài ở draft; tiếp tục xây giao diện với nội dung trung tính |
| Lab | Trạng thái thật của từng entry, giả thuyết, bước thử tiếp theo | Chưa công bố claim thành quả; không tự suy đoán cả hai đều đã hoàn thành |
| Paper | PDF/URL chính thức, tác giả, venue, trạng thái; hình phương pháp | Giữ record đang chuẩn bị; không tạo kết quả hoặc URL giả |
| Writing ngoài | URL, tiêu đề, ngày, mô tả, nguồn và quan hệ tác giả | Listing hỗ trợ sẵn nhưng không chèn bài giả |
| Hình ảnh | SVG khái niệm hoặc ảnh sản phẩm có quyền công bố | Dùng hình khái niệm ghi rõ, không giả làm screenshot |
| Cá nhân | CV hiện hành, social đúng, email và định vị | Giữ dữ liệu có sẵn, đánh dấu phần cần kiểm tra trước phát hành |

Thiếu nội dung không cản trở triển khai layout, schema và responsive. Không tự viết các dữ kiện còn thiếu như đã được xác nhận.

## 4. Route và mô hình nội dung mục tiêu

### Route

| Route | Nhãn / hành vi |
| --- | --- |
| / | Trang chủ mới |
| /research | Danh sách nghiên cứu |
| /research/[slug] | Giải thích paper, metadata và liên kết tài nguyên |
| /projects | Lab; giữ URL cũ |
| /projects/[slug] | Idea / experiment / project detail; giữ slug cũ |
| /blog | Writing gồm local và external |
| /blog/[slug] | Chỉ bài local đã xuất bản |
| /certificates | Giữ, dẫn từ mục Certifications trên homepage và footer |
| /rss.xml | Chỉ bài local đã xuất bản trong phiên bản đầu |

Giữ #work như anchor tương thích trỏ vào Lab; navigation mới dùng #lab. Không đổi hàng loạt URL, không tạo route alias chưa cần thiết.

### Schema dự kiến

- Projects: thêm status (idea/exploring/prototype/released), draft, hypothesis, nextStep, targetOutcome, evidence và updatedAt; giữ title/description/tags/image/github/demo. outcome chỉ dành cho kết quả đã có cơ sở. Không mặc định released cho entry cũ.
- Research: collection riêng với title, id từ filename, authors có role, venue, reviewStatus (unsubmitted/submitted/accepted), publicationStatus (unpublished/published), preprintUrl độc lập, publishedAt/eventDate tùy dữ kiện, updatedAt, summary, researchQuestion, contribution, limitations, paperUrl/codeUrl/slidesUrl/behindPost, cover, featured và draft. Accepted có thể đồng thời có preprint; eventDate không phải ngày xuất bản. Không suy ra published từ tên conference.
- Blog: phân biệt kind: local | external; giữ title/date/description/tags/draft, thêm featured, cover; external bắt buộc externalUrl, publisher và relationship (authored/recommended). Date của bài external là ngày xuất bản nguồn, không phải ngày thêm bookmark.
- URL: validate http/https cho tài nguyên ngoài, không chấp nhận "#" hoặc chuỗi rỗng như link hoạt động.
- Bài external chỉ là metadata và outbound link; không sinh trang /blog/[slug], không xuất hiện trong prev/next của bài local, không có local canonical/sitemap entry.
- RSS phiên bản đầu chỉ local; Writing ngoài vẫn xuất hiện trong listing và selected entries.
- Một nguồn helper lọc draft và phân loại bài được dùng nhất quán giữa listing, route generation, related links và feed.
- Di chuyển paper khỏi achievements sau khi cập nhật mọi consumer: index.astro, PublicationBanner.astro và certificates/index.astro. Trang /certificates giữ awards + credentials, thay phần Publications bằng link /research khi có paper công khai. Không hiển thị cùng paper hai lần.

## 5. Các giai đoạn triển khai

### Giai đoạn 0 — Baseline và nội dung

- [ ] Kiểm tra git/status và thay đổi có sẵn; tạo bản sao hoặc snapshot có thể phục hồi trước khi sửa.
- [ ] Chạy pnpm run build, ghi lỗi baseline nếu có.
- [ ] Chụp trang hiện tại desktop/mobile sau khi cuộn đầy đủ.
- [ ] Lập inventory nội dung: giữ / viết lại / draft / cần xác minh.
- [ ] Kiểm tra claim dự án, bio, stats và Experience; tìm chỗ còn mô tả ý tưởng như thành quả.
- [ ] Chuẩn bị outline CASK dạng draft: vấn đề chung → cách tiếp cận → ví dụ giả lập → bài học.
- [ ] Ghi các metadata paper và URL bài ngoài còn thiếu.

Đầu ra: baseline và content inventory.  
Đạt khi: có đường phục hồi, phân biệt được nội dung thật và nội dung cần xác nhận.

### Giai đoạn 1 — Prototype thiết kế

- [ ] Áp dụng token mục tiêu ở bản preview local; đo contrast thực tế.
- [ ] Dựng hero desktop và mobile: tên lớn, định vị ngắn, hai CTA, SVG riêng.
- [ ] Dựng A/B cho Hero → Experience → Achievements & Research theo mục 12; thêm mẫu chung Lab, Certifications và Writing.
- [ ] So sánh font hiện tại với phương án có serif; chỉ thêm font nếu cải thiện rõ và đọc tốt tiếng Việt.
- [ ] Hoàn thiện dark mode nền than, trạng thái hover/focus và menu mobile.
- [ ] Chụp 1440px và 390px để xem nhịp thị giác, không dùng nội dung giả như nội dung phát hành.

Đầu ra: hướng thị giác cụ thể có thể xem local.  
Đạt khi: hero nổi bật, ba loại nội dung có cách trình bày khác nhau, không tràn ngang và không phụ thuộc animation để đọc.

### Giai đoạn 2 — Schema và di chuyển nội dung

- [ ] Sửa src/content.config.ts theo mô hình mục 4; cùng thay đổi cập nhật mọi consumer cũ để build được ngay GĐ2. R05–R08 làm UI sau đó, không trì hoãn route/draft guards tới các giai đoạn đó.
- [ ] Thêm src/content/research/ và di chuyển paper có kiểm soát.
- [ ] Bổ sung trạng thái/draft cho từng project dựa trên inventory.
- [ ] Thêm hỗ trợ external writing và helper phân loại/lọc bài.
- [ ] Cập nhật src/config.ts: hero gọn, bỏ lặp stats, giữ kinh nghiệm đủ cơ sở.
- [ ] Điều chỉnh homepage, Projects listing/detail/prev-next, Research listing/detail, blog routes/prev-next, related links, RSS và sitemap để không sinh nội dung draft/external rỗng.
- [ ] Kiểm tra fixture nhỏ cho local/external/draft, missing URL và project status.

Đầu ra: content model hoạt động, entry cũ được di chuyển, không mất slug.  
Đạt khi: build thành công; trạng thái và link được render đúng; draft không lọt ra build.

### Giai đoạn 3 — Xây trang chủ

- [ ] Cập nhật Base.astro, Nav.astro, Footer.astro và global.css.
- [ ] Viết lại index.astro theo thứ tự mới; thay stats/rail/skills matrix cũ.
- [ ] Xây theo thứ tự: Hero, Experience, Achievements & Research (gồm ResearchFeature), Projects / Lab, Certifications, WritingPreview và About/Contact.
- [ ] Certifications hiển thị tối đa ba chứng chỉ chọn lọc, issuer/năm/link hợp lệ và nút xem tất cả; giữ gọn hơn Experience, Research và Lab.
- [ ] Kiểm tra thứ tự này ở desktop/mobile; giữ #achievements, #research, #certificates và anchor tương thích #work.
- [ ] Giữ #work tương thích và scroll-margin cho sticky navigation.
- [ ] Giảm tag, viền hộp và các đoạn giới thiệu trùng lặp.
- [ ] Ẩn section/CTA khi chưa có nội dung hoặc URL; kiểm tra thứ tự khi section vắng.

Đầu ra: homepage hoàn chỉnh ở hai theme.  
Đạt khi: có đường đi rõ từ hero đến Lab, từ Research đến paper và từ Writing ra bài viết.

### Giai đoạn 4 — Trang chi tiết và nội dung hỗ trợ

- [ ] Tạo /research và /research/[slug], thông tin tác giả/venue/status và mục giới hạn.
- [ ] Làm lại /projects và detail theo trạng thái; ý tưởng có hypothesis/next experiment, sản phẩm có evidence.
- [ ] Làm lại /blog và local article template; external card đi thẳng ra nguồn.
- [ ] Giữ bài CASK ở draft đến khi văn bản và hình ảnh phù hợp phạm vi chia sẻ đã xác định.
- [ ] Đồng bộ Certificates, 404 và bài dài với typography mới.
- [ ] Kiểm tra TOC, tiêu đề paper dài, code block, bảng và ảnh trên điện thoại.

Đầu ra: hành trình đọc hoàn chỉnh.  
Đạt khi: không có dead-end, nút giả hay external entry biến thành bài rỗng.

### Giai đoạn 5 — Hình ảnh, motion và tối ưu

- [ ] Dựng bộ SVG nodes/connectors/annotations nhất quán.
- [ ] Hình Lab phản ánh ý tưởng thực tế; hình paper dựa vào phương pháp đã đọc.
- [ ] Tạo cover/OG phù hợp với nhận diện mới.
- [ ] Tái sử dụng reveal observer, bảo đảm no-JS/reduced-motion luôn thấy nội dung.
- [ ] Hover có keyboard/focus tương đương; không có nội dung chỉ hiện khi hover.
- [ ] Tối ưu ảnh, font, kích thước media và loading; không thêm framework chỉ cho hiệu ứng.

Đầu ra: bộ đồ họa riêng và tương tác hoàn thiện.  
Đạt khi: đồ họa giúp hiểu nội dung, không gây hiểu sai hoặc làm chậm thao tác.

### Giai đoạn 6 — Nghiệm thu và bàn giao

- [ ] pnpm run build; kiểm tra tất cả route đã định.
- [ ] Test logic trọng yếu: draft, local/external routing, RSS, publication/project status.
- [ ] Chụp homepage và template quan trọng ở 1440px/768px/390px, hai theme; spot-check 320px và zoom 200%.
- [ ] Cuộn hết trang trước khi chụp để không bỏ sót reveal.
- [ ] Kiểm tra keyboard/menu/Escape/focus/skip link, no-JS, reduced motion và theme persistence.
- [ ] Đo contrast và performance; ghi công cụ, viewport, môi trường và kết quả thật.
- [ ] Rà links, CV, canonical, OG, robots, sitemap và domain placeholder.
- [ ] Rà nội dung CASK và public assets để không chứa thông tin nội bộ; chỉ dùng ví dụ được khái quát hóa.
- [ ] Ghi thay đổi, điểm chưa hoàn tất và ảnh nghiệm thu trong báo cáo Markdown.
- [ ] Cập nhật README và các skill nội bộ còn nhắc cấu trúc cũ.

Đầu ra: bản local hoàn chỉnh và báo cáo kiểm chứng.  
Đạt khi: các tiêu chí bắt buộc trong DESIGN.md đạt. Nếu còn lỗi bắt buộc, ghi chưa đạt; việc ghi hạn chế không thay thế nghiệm thu. Nội dung draft thiếu nguồn và field metrics chưa có dữ liệu được liệt kê riêng, không giả báo đã hoàn tất. Deploy là công việc riêng khi người dùng yêu cầu; hoàn thành bản local không đồng nghĩa đã phát hành.

## 6. Map file dự kiến

| File / thư mục | Công việc |
| --- | --- |
| DESIGN.md | Đặc tả mục tiêu; đã cập nhật ở lượt lập kế hoạch |
| src/styles/global.css | Tokens, typography, grid, responsive, motion |
| src/layouts/Base.astro | Shell, metadata, fonts, theme, script integration |
| src/pages/index.astro | Trang chủ mới |
| src/components/Nav.astro, Footer.astro | Navigation và footer mới |
| src/components/SectionRail.astro, HeroStats.astro, SkillMatrix.astro | Ngừng dùng trên homepage; xóa chỉ khi không còn consumer |
| src/components/ProjectCard.astro | Trạng thái Lab, hình riêng và nội dung đúng mức hoàn thiện |
| src/components/PublicationBanner.astro | Refactor hoặc thay bằng ResearchFeature |
| src/components/WritingPreview.astro | Component mới cho local và external |
| src/content.config.ts, src/content/ | Schema và migration |
| src/pages/research/ | Listing/detail mới |
| src/pages/certificates/index.astro | Giữ awards + credentials, gỡ consumer paper cũ và dẫn /research |
| src/pages/projects/, src/pages/blog/ | Template mới, giữ URL |
| src/pages/rss.xml.ts | Chỉ bài local đã xuất bản |
| src/config.ts | Identity/bio/Experience, loại bỏ claim trùng hoặc chưa rõ |
| public/, src/assets/ | Assets công khai, ảnh/SVG tối ưu |
| .claude/skills/, .agents/skills/ | Đồng bộ hướng dẫn sau thay đổi schema |
| design-validation/ | Ảnh baseline và ảnh redesign phân biệt bằng tên |

Tên component mới có thể thay đổi khi triển khai để hợp cấu trúc; hành vi và tiêu chí nghiệm thu vẫn giữ.

## 7. Ưu tiên và phạm vi

P0: nội dung đúng trạng thái, confidentiality CASK, schema, hero/theme/layout, Research, Lab, Certifications, Writing local/external, mobile, accessibility, link/route integrity; tối thiểu một hero graphic riêng và hình riêng cho mỗi Lab entry công khai. Paper figure dựa nguồn nếu có, nếu chưa có thì không vẽ giả phương pháp.

P1: hình bổ sung trong bài, paper explainer khi đủ tài liệu, cover/OG riêng từng bài và motion tinh tế. Font/ảnh nền phải đủ nhẹ để đạt kiểm tra P0; P1 không phải lý do bỏ qua hiệu năng.

Để sau: CMS, tìm kiếm khi chưa nhiều bài, filters cho hai project, newsletter backend, WebGL, custom cursor, tài khoản người dùng, đa ngôn ngữ. Không cần các hạng mục này để đạt mục tiêu hiện tại.

## 8. Definition of done và trình tự bắt đầu

- [ ] Thiết kế mới nổi bật nhờ bố cục, typography và đồ họa có nội dung.
- [ ] CASK chỉ xuất hiện với thông tin được phép chia sẻ và bài viết khái quát hóa.
- [ ] Ý tưởng không bị mô tả như sản phẩm đã triển khai.
- [ ] Paper có attribution, venue và trạng thái chính xác.
- [ ] Writing dẫn đúng tới cả bài local và bên ngoài.
- [ ] Desktop/mobile, hai theme, keyboard và reduced motion được kiểm tra.
- [ ] Build, route, draft exclusion và feed đã xác minh.
- [ ] Có báo cáo nghiệm thu và đường phục hồi.

Bắt đầu bằng Giai đoạn 0, sau đó prototype Hero → Experience → Achievements & Research và các mẫu chung theo mục 12 ở Giai đoạn 1. Hoàn thiện schema trước khi nối dữ liệu thật vào homepage. Chốt bố cục trước khi đầu tư motion và polish.


## 9. Research bổ sung — nguồn và quyết định

Đã bổ sung ngày 2026-09-06 sau khi đọc 8 website cá nhân và 6 URL hướng dẫn/nghiên cứu/chuẩn. Bảng quan sát, phạm vi kiểm tra, nguồn trực tiếp và giới hạn nằm trong [PORTFOLIO_REFERENCES.md](PORTFOLIO_REFERENCES.md). Đã xem trực quan desktop của 5 website; chưa dựng prototype hoặc đo website local trong lượt nghiên cứu.

Nguồn ảnh hưởng chính: [Brittany Chiang](https://brittanychiang.com/) cho Experience và external Writing; [swyx](https://swyx.io/) cho nhịp biên tập; [Rauno](https://rauno.me/) cho mức độ nổi bật của chữ/hình; [Josh Comeau](https://www.joshwcomeau.com/) cho bài viết có mô tả dễ chọn; [Distill](https://distill.pub/2020/communicating-with-interactive-articles/) cho giải thích nghiên cứu. Đây là lựa chọn áp dụng của dự án, không phải công thức được các nguồn chứng minh.

Thứ tự cố định: Hero → Experience → Achievements & Research → Projects / Lab → Certifications → Writing → About & Contact. Research không được tự chuyển lại lên trước Experience.

## 10. Định vị và hành trình đọc

Giả định làm việc: nhà tuyển dụng Data Analyst / Analytics Engineer là người xem chính, độc giả kỹ thuật/nghiên cứu là nhóm thứ hai. Giữ giả định này để triển khai, điều chỉnh nếu người dùng đổi mục tiêu.

Thông điệp người xem cần nhớ: Phúc có kinh nghiệm làm việc với dữ liệu, có hoạt động nghiên cứu và đang phát triển ý tưởng một cách có phương pháp. Mỗi vế cần có nội dung hỗ trợ; không biến định vị thành thành quả chưa xảy ra.

| Hành trình | Đường đi cụ thể | Điều cần kiểm tra |
| --- | --- | --- |
| Xem hồ sơ nhanh | Hero → Experience → CV/contact | Nhận ra tên/vai trò; tìm được thời gian, đóng góp và CV |
| Đánh giá chiều sâu | Experience → bài CASK hoặc Achievements & Research → paper detail | Phân biệt trải nghiệm thực tế, ví dụ khái quát và nghiên cứu |
| Khám phá cách suy nghĩ | Projects / Lab → hypothesis/next experiment → Writing liên quan | Hiểu rõ trạng thái; biết điều gì còn chưa được chứng minh |
| Đọc bài kỹ thuật | Menu Writing → teaser → local/external article | Biết sẽ đi tới đâu; không phải mở nhiều trang trung gian |

Bài test nội bộ đề xuất: cho người xem 15 giây nhận diện vai trò, rồi tối đa 60 giây tìm một bằng chứng và đường liên hệ. Đây là bài kiểm tra định tính do dự án đặt ra, không phải thống kê hành vi recruiter. Chưa thực hiện, chưa có kết quả.

## 11. Đặc tả composition và ngân sách nội dung

Các mức độ dài dưới đây là hướng biên tập, không dùng CSS cắt nội dung quan trọng.

| Section | Desktop | Mobile | Nội dung ưu tiên và CTA |
| --- | --- | --- | --- |
| Hero | 7 cột tên/statement, 5 cột SVG; tên 2–3 dòng tự nhiên; không ép full viewport | Tên → role → statement → CTA → hình thu gọn; không đẩy CTA xuống sau hình cao | Statement 20–35 từ; Explore my work và View CV; một graphic khái niệm |
| Experience | Nhãn/date 3 cột, vai trò và đóng góp 9 cột; nếu chỉ có CASK dùng một feature thay timeline dài | Role/company → date → 2–3 đóng góp → bài đọc sâu | Khoảng 80–130 từ mỗi entry; số liệu chỉ khi có cơ sở |
| Achievements & Research | Hai hàng: giải thưởng gọn trên, paper feature rộng dưới; tránh paper bị kẹp trong ô nhỏ | Giải thưởng → paper metadata → tên → câu hỏi → hình → CTA | Chọn 2 giải nổi bật, còn lại một dòng; paper teaser 50–80 từ, title đầy đủ |
| Projects / Lab | Tối đa 2 feature, lần lượt hình 7/chữ 5 rồi chữ 5/hình 7 | Status/title → hình → problem/hypothesis → next step → link | 60–100 từ/entry, tối đa 3 stack labels; CTA Explore idea hoặc View project theo status |
| Certifications | Một list hoặc hàng 3 phần, không ảnh scan lớn | 3 hàng có issuer/year rõ | Tối đa 3 credential; View all certificates; không cộng huy hiệu thành metric năng lực |
| Writing | Một lead 5 cột và tối đa 3 bài 7 cột; nếu một bài dùng một feature vừa đủ | Lead và các hàng theo thứ tự, không carousel | Teaser 20–40 từ, nguồn/ngày, tiêu đề đầy đủ; Browse writing |
| About & Contact | Perspective 7 cột và contact 5 cột | Bio ngắn → email → socials | Bio 60–90 từ; không lặp resume/achievements; email là action chính |

Nhịp thị giác: hero lớn → Experience có cấu trúc → paper nền tối → Lab giàu hình → Certifications nhẹ → Writing thiên chữ → contact rõ. Không lặp ba section cùng kiểu grid/card.

## 12. Prototype có so sánh, không đổi mục tiêu

Hai phương án là nghiên cứu composition trong cùng palette, cùng nội dung và cùng thứ tự; không xây hai website hoàn chỉnh.

### A — Editorial systems (phương án ưu tiên)

Tên lớn căn trái, SVG nodes/connectors ở phải; section labels nhỏ; Experience có cột ngày; paper dùng figure lớn trên nền xanh; Lab dùng ảnh xen kẽ. Sans hiện tại là nền, serif chỉ một câu nhấn nếu phù hợp.

### B — Research notebook

Hero tên + một figure có caption kiểu trang ghi chép; các đường kẻ và chú thích margin tiết chế; paper sáng hơn về phần chữ nhưng vẫn ở dark band. Nội dung giữ nguyên A để so sánh công bằng. Không thêm vân giấy hoặc chữ viết tay làm body.

### Đầu ra và cách chọn

- [ ] Dựng A/B ở 1440px và 390px cho Hero → Experience → Achievements & Research.
- [ ] Dựng một mẫu Lab, Certifications và Writing dùng chung để kiểm tra mạch nối.
- [ ] Dùng tên thật, title paper dài, một Experience thật và project state thật; placeholder phải ghi rõ nội bộ.
- [ ] Chụp light/dark cho phương án được chọn và ghi lý do chọn trong DESIGN_DECISIONS.md.
- [ ] Chọn theo rubric mục 16, không dựa vào số lượng animation.
- [ ] Nếu cả hai chưa đạt, sửa typography/composition trước khi triển khai các trang còn lại.

Không bắt buộc thêm vòng xin phép cho lựa chọn có thể đảo ngược; tạo kết quả local cụ thể để người dùng xem và góp ý.

## 13. Brief nội dung và đồ họa

### CASK article — outline dự kiến, chưa phải nội dung đã xác thực

Tên làm việc: Lessons from automating recurring reporting.

1. Một vấn đề reporting thường gặp, chỉ đưa bối cảnh được phép chia sẻ.
2. Phạm vi đóng góp của cá nhân và ranh giới giữa công việc cá nhân/nhóm.
3. Tiêu chí thiết kế: tính nhất quán KPI, xử lý lỗi, bảo trì, đối soát.
4. Một ví dụ synthetic nhỏ đi từ input → transformation → kiểm tra → report.
5. Quyết định kỹ thuật và phương án đã cân nhắc, chỉ kể những gì thực sự xảy ra.
6. Bài học, giới hạn của ví dụ và điều sẽ làm khác.
7. Link bài kỹ thuật liên quan hoặc code minh họa mới nếu có thể công khai.

Không dùng before/after giả hoặc giả định tác động 8–10h khi chưa xác định cơ sở công bố. Bản outline không xác nhận quy trình nội bộ CASK.

### Paper detail

Metadata chuẩn → câu hỏi nghiên cứu dễ hiểu → hình phương pháp → đóng góp có dẫn phần tương ứng của paper → setup/evidence đã công bố → giới hạn → tài nguyên → citation. Dự kiến có nút Copy citation với thông báo thành công/thất bại dễ tiếp cận; luôn hiển thị citation văn bản làm fallback. Chưa tạo BibTeX từ trí nhớ.

### Lab detail

Problem → status + last updated → hypothesis → proposed approach → smallest experiment → success/failure criteria → evidence/results nếu có → limitations → next step. Số liệu mục tiêu phải gắn nhãn target; status không tự tăng theo ngày.

### Asset briefs

| Asset | Nội dung cần diễn đạt | Định dạng / fallback |
| --- | --- | --- |
| Hero | Data sources → transformation → usable insight, khái niệm nghề nghiệp | SVG tự dựng; static accessible caption; không live counter |
| CASK article | Ví dụ pipeline tổng quát với dữ liệu giả lập | SVG mới; caption synthetic; không hình từ hệ thống nội bộ |
| Paper | Một quan hệ/phương pháp lấy từ paper đã đọc | SVG hoặc figure có quyền sử dụng; mô tả text tương đương |
| Lab 1 / Lab 2 | Hai giả thuyết hoặc luồng giải quyết khác nhau | Hình concept riêng; khi released mới dùng screenshot thật |
| Writing covers | Một motif liên quan chủ đề, cùng hệ nét/chữ | Optional; thiếu cover vẫn render tốt |
| OG | Tên + role, hoặc tiêu đề nội dung và branding | 1200×630, kiểm tra title dài và safe margins |

Tạo asset inventory ghi file, nguồn, quyền sử dụng, caption, alt và trạng thái thực/concept. Không tải ảnh tham khảo về gắn làm sản phẩm của mình.

## 14. Hợp đồng tương tác và trạng thái

| Thành phần | Hành vi nền | Enhancement | Khi thiếu hoặc lỗi |
| --- | --- | --- | --- |
| Menu | Link HTML đọc được, thứ tự khớp trang | Disclosure trên mobile, Escape đóng và trả focus | JS lỗi vẫn truy cập link |
| Experience article | Link nếu bài published | Underline/arrow khi hover và focus | Draft thì không có CTA giả |
| Research resources | Link trực tiếp, nhãn Paper/Code/Slides rõ | Copy citation có aria-live | URL thiếu thì bỏ; copy lỗi vẫn chọn text được |
| Lab state | Text Idea/Exploring/Prototype/Released | Màu hỗ trợ phân biệt | Không biết trạng thái thì draft, không default released |
| External Writing | Đi trực tiếp URL với publisher/indicator | Mở cùng tab mặc định; nếu new tab phải thông báo | Link chưa xác thực không được thay bằng "#" |
| Graphic | Có caption, đủ hiểu khi tĩnh | Một reveal ngắn hoặc highlight theo focus | Reduced motion/no JS giữ nguyên nội dung |
| Credentials | Tên/issuer/year; link nếu có | Hover/focus nhẹ | Credential URL thiếu vẫn có record text |
| Empty collection | Bỏ section và nav tương ứng | Không cần skeleton vì static | Không để khoảng trắng lớn hoặc số thứ tự bị hổng |

Header đề xuất để khớp hướng tuyển dụng: Experience → Research → Lab → Writing, thêm Resume và theme toggle; About/contact nằm footer. Research dẫn /#research khi feature render ở homepage, nếu không thì /research. Certifications được truy cập qua homepage/footer, không nhồi hết bảy mục vào header.

## 15. Backlog bổ sung và dependency

| ID | Task | Phụ thuộc | File/đầu ra | Điều kiện xong |
| --- | --- | --- | --- | --- |
| R01 | Lưu baseline và audit DOM/CSS/scripts local | Không | design-validation + audit note | Phân biệt lỗi cũ/lỗi mới; chưa thực hiện ở lượt research |
| R02 | Content inventory và status mapping | R01 | CONTENT_INVENTORY.md | Mỗi claim có nguồn hoặc đánh dấu cần xác minh |
| R03 | Prototype A/B | Inventory R02 ban đầu, spec; không chờ mọi nguồn | work/prototypes + DESIGN_DECISIONS.md | Cùng nội dung, desktop/mobile, chọn có lý do |
| R04 | Schema/helpers shared + consumer adapters | R02 | content.config.ts + helpers + mọi consumer hiện hữu | Build xanh sau migration; route guards hoạt động trước redesign UI |
| R05 | Shell + homepage đúng thứ tự | R03, R04 | Base/Nav/index/components | Có đủ section publishable, không duplicate paper |
| R06 | Research detail + citation fallback | R04 cho template; paper source chỉ cho nội dung thật | research routes | Template kiểm tra bằng fixture riêng; chỉ công khai metadata/nội dung đủ cơ sở |
| R07 | Lab detail và related writing | R04 | projects routes | Không có claim shipped cho idea |
| R08 | Writing mixed sources + feed | R04 | blog routes/RSS | External không tạo local page |
| R09 | Asset + motion pass | R05–R08 | assets/scripts/CSS | Nội dung tĩnh và keyboard vẫn đầy đủ |
| R10 | Visual/functional acceptance | R09 | VALIDATION_REPORT.md | Rubric + checks có bằng chứng |

Các kiểm tra logic cần thiết: public không featured (Lab và Research) với CTA/nav; draft thiếu status/metadata; Research thiếu ngày; local published/draft; external published/draft; external URL invalid; prev/next chỉ local; RSS chỉ local; paper thiếu resource; mọi Lab status; collection rỗng. Dùng fixture synthetic trong kiểm tra, không phát hành như entry thật.

Các rủi ro kỹ thuật cần audit: global .card/.container làm ảnh hưởng template cũ, style .dark-band kế thừa sai màu, reveal ẩn nội dung khi JS lỗi, nav anchor cũ, và paper còn bị map từ achievements sau migration. Đây là điểm cần kiểm tra, chưa khẳng định tất cả đang là bug.

## 16. Rubric nghiệm thu thị giác và trải nghiệm

Thang 1–5, ghi nhận xét và screenshot cho mỗi tiêu chí. Đây là rubric nội bộ, không phải benchmark ngành hoặc nghiên cứu conversion.

| Tiêu chí | Trọng số | Mức 5 mong muốn |
| --- | --- | --- |
| Nhận diện cá nhân | 20% | Tên/role rõ, một motif riêng liên quan data; nhớ được sau khi xem |
| Phân cấp và mạch nội dung | 20% | Đúng thứ tự đã chốt; các mức quan trọng phân biệt ngay |
| Typography và spacing | 15% | Dễ đọc, không clipping dấu, title dài được xử lý, khoảng trắng có nhịp |
| Hình và bằng chứng | 20% | Hình giải thích nội dung, trạng thái/evidence trung thực, không placeholder chung |
| Mobile và keyboard | 15% | Thứ tự đọc đúng, CTA dễ chạm, focus rõ, không hover-only |
| Motion và finish | 10% | Feedback nhất quán, tinh tế; bản tĩnh vẫn đẹp và đầy đủ |

Mốc đề xuất: trung bình có trọng số >=4/5, không tiêu chí dưới 3. Dù đạt điểm, các lỗi công khai nội dung nội bộ, claim sai, link chính hỏng, draft lọt build hoặc nội dung không truy cập được vẫn chặn nghiệm thu.

Performance: giữ target LCP <=2.5s, CLS <=0.1; bổ sung INP <=200ms cho dữ liệu field khi có. Theo [web.dev](https://web.dev/articles/vitals), field đánh giá percentile 75; kết quả lab là kiểm tra phát triển, không đại diện chắc chắn cho field. Chạy ba lần lab cùng môi trường, ghi median và cấu hình; không chạy lặp chỉ để chọn điểm đẹp.

Control 44px là mục tiêu usability riêng; [W3C Target Size Minimum](https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html) dùng 24px cùng ngoại lệ. Reduced motion là yêu cầu dự án; [SC 2.3.3](https://www.w3.org/WAI/WCAG22/Understanding/animation-from-interactions.html) thuộc AAA, không tuyên bố AA đòi mọi chi tiết của nó.

## 17. Trạng thái sau vòng tham khảo

Hoàn tất: đọc và tổng hợp nguồn, quan sát trực quan 5 website, bổ sung composition, content briefs, asset briefs, interaction states, dependency và rubric; đồng bộ DESIGN.md.

Chưa hoàn tất: audit local runtime, xác minh paper/CASK/project metadata, prototype, application implementation và user testing. Các checklist triển khai vẫn mở. Bước kế tiếp là R01/R02 rồi R03; không bắt đầu animation trước khi bố cục và nội dung đã đủ cụ thể.



## 18. Quy tắc thực thi sau tự audit

### Nguồn quyết định và đồng bộ

Yêu cầu mới nhất của người dùng là ưu tiên cao nhất. DESIGN.md quản lý hướng thị giác, thứ tự, navigation và hành vi UI; plan quản lý schema, migration, dependency và nghiệm thu; PORTFOLIO_REFERENCES.md là bằng chứng tham khảo, không phải yêu cầu triển khai. Khi một quyết định ảnh hưởng cả design và plan, cập nhật cả hai cùng lượt. Checklist skill đọc theo tài liệu này; không khôi phục bố cục cũ.

Giai đoạn 0–6 là lộ trình tổng; R01–R10 là task chi tiết cùng công việc, không phải một vòng triển khai thứ hai. Mapping: GĐ0=R01/R02, GĐ1=R03, GĐ2=R04, GĐ3=R05, GĐ4=R06/R07/R08, GĐ5=R09, GĐ6=R10.

Giữ hướng A ưu tiên và hướng B chỉ là biến thể giới hạn cho ba section đầu, không mở thêm moodboard/theme mới. Sau khi chọn, tiếp tục triển khai; không yêu cầu người dùng duyệt lại các quyết định đã chốt.

### Hợp đồng dữ liệu đủ để bắt đầu code

- Draft mặc định true cho entry mới trong Projects, Research, Blog, Achievements và Certificates. Migration gán explicit true/false cho mọi entry cũ sau inventory. Template thêm nội dung luôn tạo draft; không tự công khai entry do thiếu field.
- Schema cho draft cho phép thiếu status và metadata chưa biết; khi draft=false, validation yêu cầu status và metadata công khai đầy đủ theo kind. Status của project bắt buộc khi public. Giữ date là ngày bắt đầu entry/project, updatedAt là lần cập nhật thật; không dùng ngày build. evidence là danh sách {label, url}; outcome text chỉ được công bố khi có cơ sở ghi trong inventory. Idea/Exploring dùng targetOutcome, không hiển thị như kết quả đã đạt.
- Tái sử dụng featured và sortOrder cho mọi collection có preview. Selected entries: chỉ public + featured; sortOrder tăng dần (thiếu dùng 999), rồi ngày nội dung giảm dần (Research dùng publishedAt, fallback eventDate; collection khác dùng date), thiếu ngày đứng sau entry có ngày, cuối cùng id tăng dần. updatedAt không dùng làm ngày công bố hay tự đẩy thứ hạng. Không đủ số lượng thì hiển thị số đang có, không tự lấy draft hoặc filler. Awards cap 2, Lab cap 2, credentials cap 3, Writing cap 4; Research chọn 1 feature.
- Research: summary và metadata đủ cơ sở có thể public dù chưa có full explainer; contribution/limitations/figure không biết thì bỏ, không bịa. Nếu metadata chưa xác minh, record tiếp tục draft. reviewStatus và publicationStatus độc lập, preprintUrl tùy chọn; authors là danh sách {name, role?}; dùng id filename làm slug duy nhất.
- Blog local bắt buộc date xuất bản. External date có thể thiếu nếu nguồn không công bố; UI bỏ ngày và sort fallback ổn định theo id. Không thay bằng ngày bookmark; date mới phải cập nhật inventory đúng nghĩa. External bắt buộc publisher, externalUrl, author và relationship; không nhận tác giả khác là bài của Phúc.
- behindPost, experience.articleId và relatedWritingIds dùng id entry Blog, kiểm tra tồn tại và public trước khi render. Helper tạo URL dựa trên kind: local /blog/id, external URL nguồn.
- Các nội dung chi tiết dài ở Markdown body; frontmatter chỉ chứa metadata và teaser có cấu trúc. Không bắt buộc ghi contribution/limitations đầy đủ hai lần ở body và frontmatter.
- Template/fixture không chứa nội dung nhạy cảm. Không đặt draft confidential vào public/: file trong public có thể bị copy nguyên vào build dù entry draft. Fixture nằm ngoài content glob và public; production build không nhập fixture.
- Đồng bộ .claude/skills và .agents/skills: add-project, publish-post theo schema mới ngay GĐ2, trước khi dùng tạo entry. go-live đọc lại tại giai đoạn phát hành; không thay schema của skill trước khi application migration tương ứng xong.

### Navigation, empty state và tương thích

Header: Experience → Research → Lab → Writing. Tính hasLabPreview/hasResearchPreview từ chính danh sách đã lọc và giới hạn dùng để render; không suy ra từ tổng số entry public. Experience luôn trỏ /#experience khi section tồn tại; Research trỏ /#research khi feature render ở homepage, nếu không thì /research; Lab trỏ /projects, Writing trỏ /blog. Footer có About/Contact/Certificates.

Mục homepage rỗng thì ẩn preview và anchor-link phụ thuộc. Các trang archive /projects, /blog, /research, /certificates vẫn có empty state văn bản ngắn và link Home/Contact; không tạo detail cho draft. Nav Research chỉ hiện khi có public paper: trỏ /#research nếu feature thực sự render ở homepage, còn lại trỏ /research. Lab/Writing archive vẫn dùng được dù chưa có bài.

Hero CTA ưu tiên #lab khi preview Lab thực sự được render (có public + featured); nếu chỉ có project public không featured thì Explore my work → /projects; nếu không có project public thì See my experience → #experience khi section tồn tại, cuối cùng Contact me → #contact. Không để CTA trỏ section đã ẩn.

Giữ #work khi Lab tồn tại. Giữ #publication như alias của paper feature khi paper public. Trong snapshot trước migration ghi các URL/fragment thực sự tồn tại; URL public cần bỏ phải có mapping hoặc lý do. Không giả vờ redirect fragment bằng HTTP. Không tạo anchor rỗng cho nội dung private/draft.

### Gate và nội dung chưa sẵn sàng

R02 chỉ cần inventory ban đầu để mở R03/R04; thiếu paper hoặc blog ngoài không chặn schema, template và responsive. R06 template dùng fixture tách biệt; nội dung paper thật có gate riêng. Không coi user đã đồng ý visual direction là xác nhận toàn bộ metadata/claim.

Nghiệm thu local: code, UI, public subset và mandatory checks phải đạt. Thiếu nội dung thật được báo riêng và giữ draft; không gọi toàn bộ content roadmap đã hoàn tất. Field metrics chưa có không chặn local handoff, nhưng không được báo field pass. Các lỗi mandatory vẫn là fail dù có ghi chú.

Ảnh scientific/paper và nội dung CASK không cần làm thêm chỉ để lấp section. Với phần publishable đã có, nghiệm thu chất lượng thị giác vẫn cần đủ hình/typography để không biến bản redesign thành placeholder.


### Kiểm chứng bổ sung sau audit lần 2

- Draft=false là quyết định hiển thị, không dùng ngày để tự lên lịch xuất bản. Bản đầu không có scheduler; bài local chưa xuất bản phải draft=true dù có ngày dự kiến. Không để ngày tương lai được hiểu là đã xuất bản.
- Metadata SEO có nghĩa riêng: Projects date là ngày bắt đầu, không truyền vào article:published_time. Chỉ truyền ngày trang được công bố đã biết; thiếu thì bỏ. Research dùng publishedAt cho ngày paper xuất bản, eventDate chỉ làm thông tin sự kiện. Cập nhật Projects detail và Base props/callers theo nghĩa này.
- Theme-color trong HTML cần giá trị màu cụ thể, không phải var(--color-bg). Dùng một palette module/config chung xuất giá trị cho Base và CSS tokens, hoặc cơ chế generate được kiểm tra; không giữ hai bảng màu độc lập. Chỉ metadata được phép serialize hex từ nguồn chung, component styles vẫn dùng tokens.
- Kiểm tra focus trong cả neutral canvas, dark Research band và filled buttons. Scope --color-focus trên ink band sang --color-focus-on-ink, thêm outline-offset để vòng focus nằm trên nền đã đo. Kiểm tra tương phản cặp token không thay thế QA focus thực tế.
- R04 triển khai schema, migration và adapter cho toàn bộ consumer cũ trong cùng bước có thể build. R05–R08 thay bố cục/template sau đó; không chờ chúng mới sửa TypeScript, date access hoặc collection references đã hỏng.
