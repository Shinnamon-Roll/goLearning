// ============================================
// Go Learning — Lecture Data (Thai)
// Per-exercise structure with starterCode, solution, testFilter, stubs
// ============================================

const LECTURES = [
  // ========== บทที่ 1: Hello Go ==========
  {
    id: "01_hello_go",
    number: 1,
    title: "Hello Go!",
    tier: "foundation",
    unlocked: true,

    // File boilerplate used to wrap each exercise into a compilable Go file
    fileBoilerplate: `package main

import "fmt"

{{STUDENT_CODE}}

// --- stubs for other exercises ---
{{STUBS}}

func main() {}`,

    // บรรยาย
    lecture: {
      intro: "Go (หรือ Golang) เป็นภาษาโปรแกรมที่สร้างโดย Google ออกแบบมาเพื่อเขียนซอฟต์แวร์ที่เรียบง่าย น่าเชื่อถือ และมีประสิทธิภาพ",

      concepts: [
        {
          title: "โปรแกรม Go แรกของคุณ",
          text: "ทุกโปรแกรม Go เริ่มจาก <code>package main</code> และฟังก์ชัน <code>main</code> — นี่คือจุดเริ่มต้น (entry point) ของโปรแกรม",
          code: `package main

import "fmt"

func main() {
    fmt.Println("สวัสดี Go!")
}`,
          codeLang: "go"
        },
        {
          title: "คำสำคัญที่ต้องรู้",
          text: "ทุกไฟล์ Go เริ่มด้วย <code>package</code> declaration, ใช้ <code>import</code> ดึงแพ็กเกจอื่นมาใช้, และ <code>func main()</code> คือจุดเริ่มต้นของโปรแกรม",
          table: {
            headers: ["คำ", "ความหมาย"],
            rows: [
              ["<code>package main</code>", "จุดเริ่มต้นของโปรแกรม (entry point)"],
              ["<code>import</code>", "ดึงแพ็กเกจอื่นมาใช้"],
              ["<code>func main()</code>", "ฟังก์ชันที่รันเป็นอันดับแรก"],
              ["<code>fmt</code>", "แพ็กเกจสำหรับจัดรูปแบบ input/output"]
            ]
          }
        },
        {
          title: "ฟังก์ชันสำคัญใน fmt",
          text: "แพ็กเกจ <code>fmt</code> เป็นเครื่องมือหลักสำหรับแสดงผลและรับข้อมูล",
          table: {
            headers: ["ฟังก์ชัน", "หน้าที่", "ตัวอย่าง", "ผลลัพธ์"],
            rows: [
              ["<code>fmt.Println(a, b)</code>", "พิมพ์พร้อมขึ้นบรรทัดใหม่", "<code>Println(\"สวัสดี\", \"โลก\")</code>", "สวัสดี โลก"],
              ["<code>fmt.Printf(format, args)</code>", "พิมพ์แบบระบุฟอร์แมต", "<code>Printf(\"อายุ %d\", 25)</code>", "อายุ 25"],
              ["<code>fmt.Sprintf(format, args)</code>", "สร้าง string จากฟอร์แมต (ไม่พิมพ์)", "<code>Sprintf(\"อายุ %d\", 25)</code>", "\"อายุ 25\""],
              ["<code>fmt.Scanln(&var)</code>", "อ่านค่าจาก keyboard", "<code>Scanln(&name)</code>", "—"]
            ]
          }
        },
        {
          title: "Format Verbs (ตัวระบุรูปแบบ)",
          text: "ใช้ format verbs กับ <code>Printf</code> และ <code>Sprintf</code> เพื่อแทนที่ค่าลงใน string",
          table: {
            headers: ["Verb", "ใช้กับ", "ตัวอย่าง", "ผลลัพธ์"],
            rows: [
              ["<code>%v</code>", "ทุกชนิด (ค่าปริยาย)", "<code>Sprintf(\"%v\", 42)</code>", "\"42\""],
              ["<code>%s</code>", "string", "<code>Sprintf(\"%s\", \"Go\")</code>", "\"Go\""],
              ["<code>%d</code>", "integer (เลขจำนวนเต็ม)", "<code>Sprintf(\"%d\", 14)</code>", "\"14\""],
              ["<code>%f</code>", "float (เลขทศนิยม)", "<code>Sprintf(\"%f\", 3.14)</code>", "\"3.140000\""],
              ["<code>%t</code>", "bool (จริง/เท็จ)", "<code>Sprintf(\"%t\", true)</code>", "\"true\""],
              ["<code>%T</code>", "แสดง <strong>ชนิด</strong> ข้อมูล", "<code>Sprintf(\"%T\", 42)</code>", "\"int\""]
            ]
          }
        }
      ],

      tips: [
        "Go ไม่มี string interpolation แบบ Python f-string ต้องใช้ <code>fmt.Sprintf</code>",
        "<code>%v</code> ใช้ได้กับทุกชนิดข้อมูล (เหมือน <code>toString()</code> ในภาษาอื่น)",
        "<code>%T</code> พิมพ์ <strong>ชนิดข้อมูล</strong> ไม่ใช่ค่า เช่น <code>fmt.Sprintf(\"%T\", 42)</code> → <code>\"int\"</code>",
        "ต่อ string ด้วย <code>+</code>: <code>\"Hello\" + \" \" + \"Go\"</code> → <code>\"Hello Go\"</code>"
      ]
    },

    // แบบฝึกหัด — 10 ข้อ
    exercises: [
      {
        id: "helloWorld",
        todo: 1,
        title: "พิมพ์ข้อความ — helloWorld",
        description: "สร้างฟังก์ชัน <code>helloWorld</code> ที่พิมพ์ <code>\"Hello, World!\"</code> ออกทางหน้าจอโดยใช้ <code>fmt.Println</code> แล้วคืน string <code>\"Hello, World!\"</code>",
        hint: "ใช้ <code>fmt.Println(\"Hello, World!\")</code> พิมพ์ออกจอ แล้ว <code>return \"Hello, World!\"</code>",
        starterCode: `func helloWorld() string {
\t// TODO: พิมพ์ "Hello, World!" ด้วย fmt.Println แล้วคืน string เดียวกัน
\treturn ""
}`,
        solution: `func helloWorld() string {
\tfmt.Println("Hello, World!")
\treturn "Hello, World!"
}`,
        testFilter: "TestHelloWorld",
        stubs: "func greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "greet",
        todo: 2,
        title: "ฟังก์ชันทักทาย — greet",
        description: "สร้างฟังก์ชัน <code>greet</code> ที่รับชื่อ (string) แล้วคืน string รูปแบบ <code>\"Hello, Go! Welcome, &lt;ชื่อ&gt;!\"</code>",
        hint: "ใช้ <code>fmt.Sprintf(\"Hello, Go! Welcome, %s!\", name)</code> หรือต่อ string: <code>\"Hello, Go! Welcome, \" + name + \"!\"</code>",
        starterCode: `func greet(name string) string {
\t// TODO: คืน string ทักทายรูปแบบ "Hello, Go! Welcome, <name>!"
\treturn ""
}`,
        solution: `func greet(name string) string {
\treturn fmt.Sprintf("Hello, Go! Welcome, %s!", name)
}`,
        testFilter: "TestGreet",
        stubs: "func helloWorld() string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "printFormatted",
        todo: 3,
        title: "จัดรูปแบบข้อความ — printFormatted",
        description: "สร้างฟังก์ชัน <code>printFormatted</code> ที่รับชื่อ (string) และอายุ (int) คืน string รูปแบบ <code>\"&lt;ชื่อ&gt; is &lt;อายุ&gt; years old\"</code>",
        hint: "ใช้ <code>fmt.Sprintf(\"%s is %d years old\", name, age)</code>",
        starterCode: `func printFormatted(name string, age int) string {
\t// TODO: คืน string รูปแบบ "<name> is <age> years old"
\treturn ""
}`,
        solution: `func printFormatted(name string, age int) string {
\treturn fmt.Sprintf("%s is %d years old", name, age)
}`,
        testFilter: "TestPrintFormatted",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "double",
        todo: 4,
        title: "คูณสอง — double",
        description: "สร้างฟังก์ชัน <code>double</code> ที่รับเลขจำนวนเต็ม <code>n</code> แล้วคืนค่า <code>n * 2</code>",
        hint: "ง่ายมาก! แค่ <code>return n * 2</code>",
        starterCode: `func double(n int) int {
\t// TODO: คืนค่า n * 2
\treturn 0
}`,
        solution: `func double(n int) int {
\treturn n * 2
}`,
        testFilter: "TestDouble",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "isEven",
        todo: 5,
        title: "เลขคู่หรือเลขคี่ — isEven",
        description: "สร้างฟังก์ชัน <code>isEven</code> ที่รับเลขจำนวนเต็ม <code>n</code> แล้วคืน <code>true</code> ถ้าเป็นเลขคู่ คืน <code>false</code> ถ้าเป็นเลขคี่",
        hint: "ใช้ <code>return n%2 == 0</code> — โอเปอเรเตอร์ <code>%</code> หารเอาเศษ",
        starterCode: `func isEven(n int) bool {
\t// TODO: คืน true ถ้า n เป็นเลขคู่, false ถ้าเป็นเลขคี่
\treturn false
}`,
        solution: `func isEven(n int) bool {
\treturn n%2 == 0
}`,
        testFilter: "TestIsEven",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "celsiusToFahrenheit",
        todo: 6,
        title: "แปลงอุณหภูมิ — celsiusToFahrenheit",
        description: "สร้างฟังก์ชัน <code>celsiusToFahrenheit</code> ที่รับอุณหภูมิองศาเซลเซียส (float64) แล้วคืนองศาฟาเรนไฮต์ โดยใช้สูตร <code>F = C * 9/5 + 32</code>",
        hint: "ใช้ <code>return c*9/5 + 32</code> หรือ <code>return c*1.8 + 32</code>",
        starterCode: `func celsiusToFahrenheit(c float64) float64 {
\t// TODO: แปลงองศาเซลเซียสเป็นฟาเรนไฮต์: F = C * 9/5 + 32
\treturn 0
}`,
        solution: `func celsiusToFahrenheit(c float64) float64 {
\treturn c*9/5 + 32
}`,
        testFilter: "TestCelsiusToFahrenheit",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "summarizeTypes",
        todo: 7,
        title: "สำรวจชนิดข้อมูล — summarizeTypes",
        description: "สร้างฟังก์ชัน <code>summarizeTypes</code> ที่ใช้ format verbs อย่างน้อย <code>%v</code>, <code>%s</code>, <code>%d</code>, <code>%t</code>, <code>%T</code> อย่างละ 1 ครั้งขึ้นไป",
        hint: "ประกาศตัวแปรหลายชนิด: <code>name := \"Go\"</code>, <code>version := 14</code>, <code>active := true</code> แล้วใช้ <code>fmt.Sprintf</code> รวมทั้ง 5 format verbs",
        starterCode: `func summarizeTypes() string {
\t// TODO: ใช้ format verbs %v, %s, %d, %t, %T อย่างน้อยอย่างละ 1 ครั้ง
\treturn ""
}`,
        solution: `func summarizeTypes() string {
\tname := "Go"
\tversion := 14
\tactive := true
\treturn fmt.Sprintf("name=%s version=%d active=%t value=%v type=%T", name, version, active, version, version)
}`,
        testFilter: "TestSummarizeTypes",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "concat",
        todo: 8,
        title: "ต่อ string — concat",
        description: "สร้างฟังก์ชัน <code>concat</code> ที่รับ string สองตัว <code>a</code> และ <code>b</code> คืน string ที่ต่อกันโดยมีเว้นวรรค 1 ตัว เช่น <code>concat(\"Hello\", \"Go\")</code> → <code>\"Hello Go\"</code>",
        hint: "ใช้ <code>return a + \" \" + b</code> หรือ <code>return fmt.Sprintf(\"%s %s\", a, b)</code>",
        starterCode: `func concat(a, b string) string {
\t// TODO: ต่อ string a และ b โดยมีเว้นวรรค 1 ตัวระหว่าง
\treturn ""
}`,
        solution: `func concat(a, b string) string {
\treturn fmt.Sprintf("%s %s", a, b)
}`,
        testFilter: "TestConcat",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "formatPerson",
        todo: 9,
        title: "จัดรูปแบบข้อมูลบุคคล — formatPerson",
        description: "สร้างฟังก์ชัน <code>formatPerson</code> ที่รับ <code>name</code> (string), <code>age</code> (int), <code>city</code> (string) คืน string รูปแบบ <code>\"&lt;name&gt; (&lt;age&gt;) lives in &lt;city&gt;\"</code> เช่น <code>formatPerson(\"สมชาย\", 25, \"กรุงเทพ\")</code> → <code>\"สมชาย (25) lives in กรุงเทพ\"</code>",
        hint: "ใช้ <code>fmt.Sprintf(\"%s (%d) lives in %s\", name, age, city)</code>",
        starterCode: `func formatPerson(name string, age int, city string) string {
\t// TODO: คืน string รูปแบบ "<name> (<age>) lives in <city>"
\treturn ""
}`,
        solution: `func formatPerson(name string, age int, city string) string {
\treturn fmt.Sprintf("%s (%d) lives in %s", name, age, city)
}`,
        testFilter: "TestFormatPerson",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }\nfunc swap(a, b string) (string, string) { return \"\", \"\" }"
      },
      {
        id: "swap",
        todo: 10,
        title: "สลับค่า — swap",
        description: "สร้างฟังก์ชัน <code>swap</code> ที่รับ string สองตัว <code>a</code> และ <code>b</code> คืนค่าสองตัวโดยสลับที่ เช่น <code>swap(\"Go\", \"Rust\")</code> → <code>(\"Rust\", \"Go\")</code>",
        hint: "Go คืนค่าหลายตัวได้! ใช้ <code>return b, a</code>",
        starterCode: `func swap(a, b string) (string, string) {
\t// TODO: สลับค่า a และ b แล้วคืน (b, a)
\treturn "", ""
}`,
        solution: `func swap(a, b string) (string, string) {
\treturn b, a
}`,
        testFilter: "TestSwap",
        stubs: "func helloWorld() string { return \"\" }\nfunc greet(name string) string { return \"\" }\nfunc printFormatted(name string, age int) string { return \"\" }\nfunc summarizeTypes() string { return \"\" }\nfunc double(n int) int { return 0 }\nfunc isEven(n int) bool { return false }\nfunc celsiusToFahrenheit(c float64) float64 { return 0 }\nfunc concat(a, b string) string { return \"\" }\nfunc formatPerson(name string, age int, city string) string { return \"\" }\nfunc getType(v interface{}) string { return \"\" }"
      }
    ]
  },

  // ========== บทที่ 2: ตัวแปรและชนิดข้อมูล ==========
  {
    id: "02_variables_types",
    number: 2,
    title: "ตัวแปรและชนิดข้อมูล",
    tier: "foundation",
    unlocked: true,

    lecture: {
      intro: "ในบทนี้เราจะเรียนรู้เกี่ยวกับตัวแปร (Variables) และชนิดข้อมูล (Types) ใน Go — วิธีประกาศตัวแปร ชนิดข้อมูลพื้นฐาน การแปลงชนิดข้อมูล และค่าคงที่",

      concepts: [
        {
          title: "การประกาศตัวแปร — var vs :=",
          text: "Go มี 2 วิธีประกาศตัวแปร: <code>var</code> สำหรับประกาศแบบระบุชนิด และ <code>:=</code> สำหรับประกาศแบบสั้น (short declaration) ซึ่ง Go จะอนุมานชนิดให้อัตโนมัติ",
          code: `package main

import "fmt"

func main() {
    // วิธีที่ 1: var ระบุชนิด
    var name string = "Go"
    var age int = 14

    // วิธีที่ 2: var ไม่ระบุค่าเริ่มต้น (ใช้ zero value)
    var city string  // zero value = ""

    // วิธีที่ 3: := short declaration (ใช้ในฟังก์ชันเท่านั้น)
    lang := "Golang"
    version := 1.22

    fmt.Println(name, age, city, lang, version)
}`,
          codeLang: "go"
        },
        {
          title: "ชนิดข้อมูลพื้นฐาน",
          text: "Go มีชนิดข้อมูลพื้นฐานที่สำคัญ ได้แก่ ตัวเลขจำนวนเต็ม ตัวเลขทศนิยม ข้อความ และค่าจริง/เท็จ",
          table: {
            headers: ["ชนิด", "คำอธิบาย", "ค่าเริ่มต้น (Zero Value)", "ตัวอย่าง"],
            rows: [
              ["<code>int</code>", "เลขจำนวนเต็ม", "<code>0</code>", "<code>var x int = 42</code>"],
              ["<code>float64</code>", "เลขทศนิยม (64-bit)", "<code>0.0</code>", "<code>var pi float64 = 3.14</code>"],
              ["<code>string</code>", "ข้อความ (UTF-8)", '<code>""</code> (เปล่า)', '<code>var s string = "สวัสดี"</code>'],
              ["<code>bool</code>", "จริง/เท็จ", "<code>false</code>", "<code>var active bool = true</code>"],
              ["<code>int8</code>, <code>int16</code>, <code>int32</code>, <code>int64</code>", "เลขจำนวนเต็มขนาดต่างๆ", "<code>0</code>", "<code>var big int64 = 999999</code>"],
              ["<code>float32</code>", "เลขทศนิยม (32-bit)", "<code>0.0</code>", "<code>var f float32 = 2.5</code>"]
            ]
          }
        },
        {
          title: "ค่าเริ่มต้น (Zero Values)",
          text: "ใน Go ตัวแปรที่ประกาศโดยไม่กำหนดค่าเริ่มต้นจะมี <strong>zero value</strong> อัตโนมัติ — ไม่มี <code>null</code> หรือ <code>undefined</code> เหมือนภาษาอื่น",
          code: `package main

import "fmt"

func main() {
    var x int       // 0
    var y float64    // 0
    var s string     // ""
    var b bool       // false

    fmt.Println(x, y, s, b)
    // ผลลัพธ์: 0 0  false
}`,
          codeLang: "go"
        },
        {
          title: "การแปลงชนิดข้อมูล (Type Conversion)",
          text: "Go <strong>ไม่มี</strong>การแปลงชนิดอัตโนมัติ (no implicit conversion) — ต้องแปลงเองทุกครั้ง ใช้ <code>T(v)</code> เพื่อแปลงค่า <code>v</code> เป็นชนิด <code>T</code> สำหรับ string ↔ int ใช้แพ็กเกจ <code>strconv</code>",
          code: `package main

import (
    "fmt"
    "strconv"
)

func main() {
    // int → float64
    var i int = 42
    f := float64(i)
    fmt.Println(f) // 42

    // float64 → int (ตัดทศนิยม)
    var pi float64 = 3.7
    n := int(pi)
    fmt.Println(n) // 3

    // int → string ด้วย strconv.Itoa
    s := strconv.Itoa(42)
    fmt.Println(s) // "42"

    // string → int ด้วย strconv.Atoi
    num, err := strconv.Atoi("42")
    fmt.Println(num, err) // 42 <nil>
}`,
          codeLang: "go"
        },
        {
          title: "ค่าคงที่ (Constants)",
          text: "ใช้ <code>const</code> ประกาศค่าคงที่ที่เปลี่ยนแปลงไม่ได้ ค่าคงที่ใน Go เป็น <strong>untyped</strong> — จะถูกแปลงเป็นชนิดที่เหมาะสมอัตโนมัติเมื่อใช้",
          code: `package main

import "fmt"

const Pi = 3.14159
const AppName = "Go Learning"

func main() {
    const MaxRetries = 3
    fmt.Println(Pi, AppName, MaxRetries)

    // คำนวณพื้นที่วงกลม
    radius := 5.0
    area := Pi * radius * radius
    fmt.Println("Area:", area)
}`,
          codeLang: "go"
        },
        {
          title: "การตั้งชื่อตัวแปร (Naming Conventions)",
          text: "Go ใช้ <strong>camelCase</strong> สำหรับตัวแปรและฟังก์ชัน ตัวแปรที่ขึ้นต้นด้วยตัวพิมพ์ใหญ่จะ <strong>exported</strong> (เข้าถึงได้จากแพ็กเกจอื่น) ตัวพิมพ์เล็กเป็น <strong>unexported</strong> (ใช้ได้ในแพ็กเกจเดียวกันเท่านั้น)",
          table: {
            headers: ["รูปแบบ", "ตัวอย่าง", "คำอธิบาย"],
            rows: [
              ["camelCase", "<code>userName, maxAge, isActive</code>", "ตัวแปรทั่วไป (unexported)"],
              ["PascalCase", "<code>UserName, MaxAge, IsActive</code>", "ตัวแปรที่ export ออกได้"],
              ["ตัวอักษรเดียว", "<code>i, j, k, n</code>", "ใช้ใน loop หรือ scope เล็กๆ"],
              ["_ (underscore)", "<code>_</code>", "ค่าที่ไม่ต้องการใช้ (discard)"]
            ]
          }
        }
      ],

      tips: [
        "<code>:=</code> ใช้ได้เฉพาะ <strong>ในฟังก์ชัน</strong> — ใช้นอกฟังก์ชันต้องใช้ <code>var</code>",
        "Go ไม่มี implicit conversion — <code>int</code> ไม่ถูกแปลงเป็น <code>float64</code> อัตโนมัติ ต้องทำเองด้วย <code>float64(n)</code>",
        "<code>len(\"สวัสดี\")</code> คืน <strong>จำนวน byte</strong> (18) ไม่ใช่จำนวนตัวอักษร (6) — เพราะ string ใน Go เป็น UTF-8",
        "<code>strconv.Atoi</code> คืน <strong>2 ค่า</strong> — ตัวเลขและ error ใช้ <code>n, _ := strconv.Atoi(s)</code> เพื่อเอาแค่ตัวเลข (จะเรียนเรื่อง error ในบทที่ 9)"
      ]
    },

    // แบบฝึกหัด — 10 ข้อ
    exercises: [
      {
        id: "declareVar",
        todo: 1,
        title: "ประกาศตัวแปรด้วย var — declareVar",
        description: "สร้างฟังก์ชัน <code>declareVar</code> ที่ใช้ <code>var</code> ประกาศตัวแปร 3 ตัว: <code>age int = 42</code>, <code>name string = \"Go\"</code>, <code>active bool = true</code> แล้วคืนทั้ง 3 ค่า",
        hint: "ใช้ <code>var age int = 42</code>, <code>var name string = \"Go\"</code>, <code>var active bool = true</code> แล้ว <code>return age, name, active</code>",
        starterCode: `func declareVar() (int, string, bool) {
\t// TODO: ใช้ var ประกาศตัวแปร age=42, name="Go", active=true
\treturn 0, "", false
}`,
        solution: `func declareVar() (int, string, bool) {
\tvar age int = 42
\tvar name string = "Go"
\tvar active bool = true
\treturn age, name, active
}`,
        testFilter: "TestDeclareVar",
        stubs: "func shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "shortDeclare",
        todo: 2,
        title: "ประกาศแบบสั้น := — shortDeclare",
        description: "สร้างฟังก์ชัน <code>shortDeclare</code> ที่ใช้ <code>:=</code> ประกาศตัวแปร 3 ตัว: <code>count = 10</code>, <code>pi = 3.14</code>, <code>lang = \"Go\"</code> แล้วคืนทั้ง 3 ค่า",
        hint: "ใช้ <code>count := 10</code>, <code>pi := 3.14</code>, <code>lang := \"Go\"</code> แล้ว <code>return count, pi, lang</code>",
        starterCode: `func shortDeclare() (int, float64, string) {
\t// TODO: ใช้ := ประกาศตัวแปร count=10, pi=3.14, lang="Go"
\treturn 0, 0, ""
}`,
        solution: `func shortDeclare() (int, float64, string) {
\tcount := 10
\tpi := 3.14
\tlang := "Go"
\treturn count, pi, lang
}`,
        testFilter: "TestShortDeclare",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "zeroValues",
        todo: 3,
        title: "ค่าเริ่มต้น (Zero Values) — zeroValues",
        description: "สร้างฟังก์ชัน <code>zeroValues</code> ที่ประกาศตัวแปร 4 ตัวด้วย <code>var</code> <strong>โดยไม่กำหนดค่าเริ่มต้น</strong>: <code>var x int</code>, <code>var y float64</code>, <code>var s string</code>, <code>var b bool</code> แล้วคืนค่าทั้ง 4 ตัว",
        hint: "ประกาศ <code>var x int</code> (ไม่มีค่า = 0), <code>var y float64</code> (= 0), <code>var s string</code> (= \"\"), <code>var b bool</code> (= false) แล้ว <code>return x, y, s, b</code>",
        starterCode: `func zeroValues() (int, float64, string, bool) {
\t// TODO: ใช้ var ประกาศตัวแปรโดยไม่กำหนดค่า แล้วคืนค่า zero values
\treturn 0, 0, "", false
}`,
        solution: `func zeroValues() (int, float64, string, bool) {
\tvar x int
\tvar y float64
\tvar s string
\tvar b bool
\treturn x, y, s, b
}`,
        testFilter: "TestZeroValues",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "addFloats",
        todo: 4,
        title: "บวกเลขทศนิยม — addFloats",
        description: "สร้างฟังก์ชัน <code>addFloats</code> ที่รับ <code>float64</code> สองตัว <code>a</code> และ <code>b</code> แล้วคืนผลบวก <code>a + b</code>",
        hint: "ง่ายมาก! แค่ <code>return a + b</code>",
        starterCode: `func addFloats(a, b float64) float64 {
\t// TODO: คืนผลบวกของ a และ b
\treturn 0
}`,
        solution: `func addFloats(a, b float64) float64 {
\treturn a + b
}`,
        testFilter: "TestAddFloats",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "intToFloat",
        todo: 5,
        title: "แปลง int → float64 — intToFloat",
        description: "สร้างฟังก์ชัน <code>intToFloat</code> ที่รับ <code>int</code> แล้วแปลงเป็น <code>float64</code> เช่น <code>intToFloat(42)</code> → <code>42.0</code>",
        hint: "ใช้ <code>return float64(n)</code> — Go ไม่แปลงอัตโนมัติ ต้องแปลงเอง",
        starterCode: `func intToFloat(n int) float64 {
\t// TODO: แปลง int เป็น float64
\treturn 0
}`,
        solution: `func intToFloat(n int) float64 {
\treturn float64(n)
}`,
        testFilter: "TestIntToFloat",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "floatToInt",
        todo: 6,
        title: "แปลง float64 → int — floatToInt",
        description: "สร้างฟังก์ชัน <code>floatToInt</code> ที่รับ <code>float64</code> แล้วแปลงเป็น <code>int</code> (ตัดทศนิยมทิ้ง) เช่น <code>floatToInt(3.7)</code> → <code>3</code>",
        hint: "ใช้ <code>return int(f)</code> — การแปลง float64 เป็น int จะตัดทศนิยมทิ้ง (truncate) ไม่ได้ปัดเศษ",
        starterCode: `func floatToInt(f float64) int {
\t// TODO: แปลง float64 เป็น int (ตัดทศนิยมทิ้ง)
\treturn 0
}`,
        solution: `func floatToInt(f float64) int {
\treturn int(f)
}`,
        testFilter: "TestFloatToInt",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "intToStr",
        todo: 7,
        title: "แปลง int → string — intToStr",
        description: "สร้างฟังก์ชัน <code>intToStr</code> ที่รับ <code>int</code> แล้วแปลงเป็น <code>string</code> โดยใช้ <code>strconv.Itoa</code> เช่น <code>intToStr(42)</code> → <code>\"42\"</code>",
        hint: "ใช้ <code>return strconv.Itoa(n)</code> — Itoa = Integer to ASCII",
        starterCode: `func intToStr(n int) string {
\t// TODO: แปลง int เป็น string ด้วย strconv.Itoa
\treturn ""
}`,
        solution: `func intToStr(n int) string {
\treturn strconv.Itoa(n)
}`,
        testFilter: "TestIntToStr",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "strToInt",
        todo: 8,
        title: "แปลง string → int — strToInt",
        description: "สร้างฟังก์ชัน <code>strToInt</code> ที่รับ <code>string</code> แล้วแปลงเป็น <code>int</code> โดยใช้ <code>strconv.Atoi</code> เช่น <code>strToInt(\"42\")</code> → <code>42</code>",
        hint: "<code>strconv.Atoi</code> คืน 2 ค่า: <code>n, err := strconv.Atoi(s)</code> — ใช้ <code>_</code> เพื่อเก็บข้อผิดพลาด: <code>n, _ := strconv.Atoi(s)</code> แล้ว <code>return n</code>",
        starterCode: `func strToInt(s string) int {
\t// TODO: แปลง string เป็น int ด้วย strconv.Atoi (เก็บแค่ค่า int, ละเว้น error)
\treturn 0
}`,
        solution: `func strToInt(s string) int {
\tn, _ := strconv.Atoi(s)
\treturn n
}`,
        testFilter: "TestStrToInt",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strLen(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "strLen",
        todo: 9,
        title: "ความยาว string — strLen",
        description: "สร้างฟังก์ชัน <code>strLen</code> ที่รับ <code>string</code> แล้วคืนความยาวเป็น <code>int</code> ด้วย <code>len()</code> เช่น <code>strLen(\"Hello\")</code> → <code>5</code>",
        hint: "ใช้ <code>return len(s)</code> — <strong>ระวัง!</strong> <code>len()</code> นับจำนวน byte ไม่ใช่จำนวนตัวอักษร",
        starterCode: `func strLen(s string) int {
\t// TODO: คืนความยาวของ string s ด้วย len()
\treturn 0
}`,
        solution: `func strLen(s string) int {
\treturn len(s)
}`,
        testFilter: "TestStrLen",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc circleArea(r float64) float64 { return 0 }"
      },
      {
        id: "circleArea",
        todo: 10,
        title: "พื้นที่วงกลม — circleArea",
        description: "สร้างค่าคงที่ <code>const Pi = 3.14159</code> และฟังก์ชัน <code>circleArea</code> ที่รับรัศมี <code>r</code> (float64) แล้วคืนพื้นที่วงกลม <code>Pi * r * r</code>",
        hint: "ประกาศ <code>const Pi = 3.14159</code> นอกฟังก์ชัน แล้วใช้ <code>return Pi * r * r</code> ในฟังก์ชัน",
        starterCode: `const Pi = 3.14159

func circleArea(r float64) float64 {
\t// TODO: คำนวณพื้นที่วงกลม = Pi * r * r
\treturn 0
}`,
        solution: `const Pi = 3.14159

func circleArea(r float64) float64 {
\treturn Pi * r * r
}`,
        testFilter: "TestCircleArea",
        stubs: "func declareVar() (int, string, bool) { return 0, \"\", false }\nfunc shortDeclare() (int, float64, string) { return 0, 0, \"\" }\nfunc zeroValues() (int, float64, string, bool) { return 0, 0, \"\", false }\nfunc addFloats(a, b float64) float64 { return 0 }\nfunc intToFloat(n int) float64 { return 0 }\nfunc floatToInt(f float64) int { return 0 }\nfunc intToStr(n int) string { return \"\" }\nfunc strToInt(s string) int { return 0 }\nfunc strLen(s string) int { return 0 }"
      }
    ]
  },

  // ========== บทที่ 3–25 (stubs) ==========
  { id: "03_functions", number: 3, title: "ฟังก์ชัน", tier: "foundation", unlocked: false, comingSoon: true },
  { id: "04_control_flow", number: 4, title: "Control Flow", tier: "foundation", unlocked: false, comingSoon: true },
  { id: "05_slices_maps", number: 5, title: "Slice และ Map", tier: "foundation", unlocked: false, comingSoon: true },
  { id: "06_strings_runes", number: 6, title: "String และ Rune", tier: "foundation", unlocked: false, comingSoon: true },
  { id: "07_structs_methods", number: 7, title: "Struct และ Method", tier: "foundation", unlocked: false, comingSoon: true },
  { id: "08_interfaces", number: 8, title: "Interface", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "09_errors", number: 9, title: "การจัดการ Error", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "10_pointers", number: 10, title: "Pointer", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "11_concurrency", number: 11, title: "Goroutine และ Channel", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "12_context", number: 12, title: "Context และการยกเลิก", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "13_packages", number: 13, title: "Package และ Module", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "14_testing", number: 14, title: "การเขียนเทส", tier: "intermediate", unlocked: false, comingSoon: true },
  { id: "15_generics", number: 15, title: "Generics", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "16_reflection", number: 16, title: "Reflection", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "17_concurrency_patterns", number: 17, title: "รูปแบบ Concurrency", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "18_stdlib", number: 18, title: "Standard Library เชิงลึก", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "19_io_filesystem", number: 19, title: "I/O และ Filesystem", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "20_cli_tools", number: 20, title: "สร้าง CLI Tool", tier: "advanced", unlocked: false, comingSoon: true },
  { id: "21_task_tracker", number: 21, title: "Task Tracker CLI", tier: "hero", unlocked: false, comingSoon: true },
  { id: "22_url_shortener", number: 22, title: "URL Shortener API", tier: "hero", unlocked: false, comingSoon: true },
  { id: "23_web_crawler", number: 23, title: "Concurrent Web Crawler", tier: "hero", unlocked: false, comingSoon: true },
  { id: "24_chat_server", number: 24, title: "Real-time Chat Server", tier: "hero", unlocked: false, comingSoon: true },
  { id: "25_kv_store", number: 25, title: "Key-Value Store", tier: "hero", unlocked: false, comingSoon: true }
];

// Tier metadata — uses Lucide icon names
const TIERS = {
  foundation:   { label: "พื้นฐาน",        color: "#4caf50", description: "สัปดาห์ที่ 1–2", icon: "shield" },
  intermediate: { label: "ระดับกลาง",      color: "#ffd600", description: "สัปดาห์ที่ 3–4", icon: "zap" },
  advanced:     { label: "ขั้นสูง",         color: "#f44336", description: "สัปดาห์ที่ 5–6", icon: "flame" },
  hero:         { label: "โปรเจกต์ฮีโร่",  color: "#b388ff", description: "สัปดาห์ที่ 7+", icon: "trophy" }
};