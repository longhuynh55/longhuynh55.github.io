# Content inventory — baseline 2026-09-06 (R02, vòng đầu)

Quy ước trạng thái: KEEP (giữ) · REWRITE (viết lại) · DRAFT (chưa public) · VERIFY (cần xác minh, không dùng claim khi chưa xong).
Không suy đoán nội dung thiếu. Snapshot phục hồi: `D:/Portfolio.backup-20260906/`.

## Projects (`src/content/projects/`)

| Entry | Trạng thái | Nguồn/căn cứ | Ghi chú migration (schema Lab mới) |
| --- | --- | --- | --- |
| `hcmc-last-mile-data-platform.md` | VERIFY | Body do owner viết; số/cadence/volumes chưa thấy nguồn | Claim mang ngôn ngữ shipped ("scheduled", marts cụ thể) nhưng status thật chưa xác nhận → gán status sau inventory; `outcome` hiện tại chỉ public khi có cơ sở |
| `quantvn-stock-market-analytics.md` | VERIFY | 500+ stocks × 7y lặp lại hero/stats nhưng freshness/delay/guardrail metric chưa có nguồn | Như trên; pseudocode guardrail không phải evidence vận hành |

## Achievements (`src/content/achievements/`)

| Entry | Trạng thái | Nguồn/căn cứ | Ghi chú |
| --- | --- | --- | --- |
| `finnovative-hackathon-2026.md` (1st Place) | KEEP + VERIFY bổ sung | Giấy chứng nhận scan/PDF trong `D:/CV/CERTIFICATE/FESSE.pdf`, ngày 17/01/2026 đọc từ giấy | Ảnh bản số đã gắn; còn thiếu: quy mô đội thi, tiêu chí, vai trò cá nhân |
| `dazone-2025.md` (Top 10) | VERIFY | Ảnh bằng khen đã gắn; ngày chỉ có năm 2025, date hiện 2025-01-01 là placeholder | Cần ngày thật hoặc chấp nhận year-only |
| `rmit-business-analytics-champion-2025.md` (Top 15) | VERIFY | Như trên | Như trên |
| `financial-condition-guided-retrieval.md` (paper) | VERIFY | Chỉ có frontmatter; venue DMO Fintech 2026 Workshop @ PAKDD Hong Kong chưa đối chiếu record chính thức; không URL/abstract/takeaway | Giữ draft cho đến khi metadata xác minh; không suy published từ tên conference |

## Certificates (`src/content/certificates/`)

| Entry | Trạng thái | Nguồn/căn cứ |
| --- | --- | --- |
| `datacamp-associate-data-analyst.md` | KEEP | PDF `DAA0010932243762.pdf`, certified 29/08/2026, ID đọc từ bằng |
| `data-science-edx-harvardx.md` | KEEP | PDF edX, issued 04/2026, credential URL thật trong PDF |
| `sql-intermediate.md` (HackerRank) | VERIFY | Không có asset trong `D:/CV/CERTIFICATE`; date 2024-01-01 placeholder |
| `nvidia-end-to-end-data-science-workflows.md` | VERIFY | Không có asset; date 2024-01-01 placeholder |

## Blog (`src/content/blog/`)

| Entry | Trạng thái | Nguồn/căn cứ |
| --- | --- | --- |
| `how-i-built-my-first-data-pipeline.md` | DRAFT | Template mẫu, `draft: true`; Writing homepage ẩn đúng |

## Identity (`src/config.ts`)

| Field | Trạng thái | Nguồn/căn cứ |
| --- | --- | --- |
| bio/stats (`8–10h`, `500+`) | VERIFY | Chưa có timesheet/log đối chiếu; không khẳng định cơ sở công bố (đúng brief plan §13) |
| experience CASK 01–05/2026 | KEEP facts, VERIFY scope | Dates + highlights do owner cung cấp; phạm vi chia sẻ công khai chưa chốt |
| socials | VERIFY | Suy từ handle hiển thị, chưa xác nhận |
| now (Sep 2026) | REWRITE định kỳ | Phải giữ tươi; bỏ promise 48h nếu không giữ được |

## CASK article outline

Chưa bắt đầu. Brief 7 câu hỏi đã gửi owner; outline làm việc `Lessons from automating recurring reporting` (plan §13) chỉ viết khi có phạm vi chia sẻ + ví dụ synthetic được duyệt. Không dùng số 8–10h làm claim cho đến khi rõ cơ sở.

## Paper metadata gaps

venue record chính thức, authors đầy đủ + role, reviewStatus/publicationStatus, preprintUrl/publishedAt/eventDate, abstract/takeaway, method figure source, citation text. Tất cả VERIFY.

## Asset inventory hiện có

- `src/assets/achievements/`: dazone-2025.jpg (140KB), rmit-…-2025.jpg (97KB), finnovative-hackathon-2026.jpg (110KB, bản số sạch)
- `public/certificates/`: 3 PDF gốc (datacamp 45KB, edx 124KB, finnovative 378KB)
- `public/`: favicon.svg + PNG 32/180 (tự raster), og-image.png PLACEHOLDER 7.7KB, resume.pdf (chưa xác minh mới nhất)
- Thiếu: OG 1200×630 thật, screenshots/diagrams projects, paper figure/cover, ảnh Working thật cho hero/Lab mới
