# goLearning — จากศูนย์สู่ฮีโร่ 🦸

เส้นทางเรียนรู้ Go แบบมีโครงสร้าง เรียนรู้ทีละขั้น แต่ละบทต่อเนื่องกัน

## 🗺️ แผนการเรียน

### 🟢 พื้นฐาน (สัปดาห์ที่ 1–2)
| # | บท | หัวข้อ |
|---|-----|--------|
| 01 | [Hello Go](/01_hello_go/) | ติดตั้ง, `go mod`, package, `fmt` |
| 02 | [ตัวแปรและชนิดข้อมูล](/02_variables_types/) | ประกาศตัวแปร, zero value, constant, แปลงชนิด |
| 03 | [ฟังก์ชัน](/03_functions/) | คืนค่าหลายตัว, named return, defer, closure |
| 04 | [Control Flow](/04_control_flow/) | if, for, switch, break/continue |
| 05 | [Slice และ Map](/05_slices_maps/) | โครงสร้างข้อมูลหลักของ Go |
| 06 | [String และ Rune](/06_strings_runes/) | UTF-8, วนลูปรัน, แพ็กเกจ `strings` |
| 07 | [Struct และ Method](/07_structs_methods/) | สร้างชนิดเอง, receiver, embedding |

### 🟡 ระดับกลาง (สัปดาห์ที่ 3–4)
| # | บท | หัวข้อ |
|---|-----|--------|
| 08 | [Interface](/08_interfaces/) | implicit satisfaction, type assertion, empty interface |
| 09 | [การจัดการ Error](/09_errors/) | ชนิด `error`, wrap, `errors.Is/As`, panic/recover |
| 10 | [Pointer](/10_pointers/) | value vs reference, pointer receiver, nil map |
| 11 | [Goroutine และ Channel](/11_concurrency/) | `go` keyword, buffered/unbuffered channel, select |
| 12 | [Context และการยกเลิก](/12_context/) | `context.Context`, timeout, cancellation |
| 13 | [Package และ Module](/13_packages/) | จัดระเบียบโค้ด, `internal`, import ข้าม module |
| 14 | [การเขียนเทส](/14_testing/) | `go test`, table-driven test, benchmark, fuzzing |

### 🔴 ขั้นสูง (สัปดาห์ที่ 5–6)
| # | บท | หัวข้อ |
|---|-----|--------|
| 15 | [Generics](/15_generics/) | Type parameter, constraint, type inference |
| 16 | [Reflection](/16_reflection/) | แพ็กเกจ `reflect`, dynamic typing |
| 17 | [รูปแบบ Concurrency](/17_concurrency_patterns/) | Worker pool, pipeline, fan-in/fan-out, errgroup |
| 18 | [Standard Library เชิงลึก](/18_stdlib/) | `io`, `net/http`, `encoding/json`, `os`, `time` |
| 19 | [I/O และ Filesystem](/19_io_filesystem/) | Reader, Writer, `filepath`, `embed` |
| 20 | [สร้าง CLI Tool](/20_cli_tools/) | `flag`, `os/args`, `cobra` framework |

### 🏆 โปรเจกต์ฮีโร่ (สัปดาห์ที่ 7+)
| # | โปรเจกต์ | ทักษะที่ฝึก |
|---|-----------|-------------|
| 21 | [Task Tracker CLI](/21_task_tracker/) | CLI, JSON persistence, CRUD |
| 22 | [URL Shortener API](/22_url_shortener/) | HTTP server, routing, JSON, storage |
| 23 | [Concurrent Web Crawler](/23_web_crawler/) | Goroutine, channel, rate limiting |
| 24 | [Real-time Chat Server](/24_chat_server/) | WebSocket, concurrency, broadcasting |
| 25 | [Key-Value Store](/25_kv_store/) | Persistence, compaction, HTTP API |

## 📖 วิธีใช้งาน

แต่ละบทจะมีไฟล์:
- **`README.md`** — อธิบายแนวคิด + กรณีศึกษา
- **`main.go`** — โค้ดเริ่มต้นพร้อม TODO ให้ทำ
- **`main_test.go`** — เทสตรวจสอบความถูกต้อง

**ขั้นตอน:**
1. อ่าน `README.md` ของบทนั้น
2. เปิด `main.go` แล้วทำ TODO
3. รัน `go test -v` เพื่อตรวจ
4. เมื่อเทสผ่านหมด ✅ ไปบทต่อไป

## ⚡ คำสั่งที่ใช้บ่อย

```bash
cd 01_hello_go && go test -v    # รันเทสบทปัจจุบัน
go run main.go                   # รันโปรแกรม
go vet ./...                     # ตรวจจับความผิดพลาดทั่วไป
```