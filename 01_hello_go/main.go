package main

import "fmt"

// TODO #1: สร้างฟังก์ชัน `greet` ที่รับชื่อ (string)
// แล้วคืน string ทักทายรูปแบบ "Hello, Go! Welcome, <ชื่อ>!"
//
// ตัวอย่าง:
//   greet("สมชาย") → "Hello, Go! Welcome, สมชาย!"
//   greet("Go")     → "Hello, Go! Welcome, Go!"
//
// เคล็ดลับ: ใช้ fmt.Sprintf หรือต่อ string ด้วย +
func greet(name string) string {
	// TODO: เขียนโค้ดที่นี่
	return ""
}

// TODO #2: สร้างฟังก์ชัน `printFormatted` ที่รับชื่อ (string) และอายุ (int)
// แล้วคืน string รูปแบบ "<ชื่อ> is <อายุ> years old"
//
// ตัวอย่าง:
//   printFormatted("สมชาย", 25) → "สมชาย is 25 years old"
//   printFormatted("Go", 14)      → "Go is 14 years old"
//
// เคล็ดลับ: ใช้ fmt.Sprintf กับ %s สำหรับ string และ %d สำหรับ int
func printFormatted(name string, age int) string {
	// TODO: เขียนโค้ดที่นี่
	return ""
}

// TODO #3: สร้างฟังก์ชัน `summarizeTypes` ที่แสดงความสามารถของ format verbs
// ต้องใช้ format verbs อย่างน้อย: %v, %s, %d, %t, %T (อย่างละ 1 ครั้งขึ้นไป)
//
// ตัวอย่างผลลัพธ์ (เป็นได้หลายแบบ):
//   "ชื่อ=Go เวอร์ชัน=14 ใช้งานได้=true ชนิด=int"
//
// เคล็ดลับ:
//   ประกาศตัวแปรหลายชนิด:
//     name := "Go"        // string
//     version := 14       // int
//     active := true      // bool
//   แล้วใช้ fmt.Sprintf กับ format verbs ต่างๆ
func summarizeTypes() string {
	// TODO: เขียนโค้ดที่นี่
	return ""
}

func main() {
	fmt.Println("=== บทที่ 01: Hello Go! ===")
	fmt.Println()
	fmt.Println("ทดสอบ greet:")
	fmt.Println(greet("สมชาย"))
	fmt.Println(greet("Go"))
	fmt.Println()
	fmt.Println("ทดสอบ printFormatted:")
	fmt.Println(printFormatted("สมชาย", 25))
	fmt.Println(printFormatted("Go", 14))
	fmt.Println()
	fmt.Println("ทดสอบ summarizeTypes:")
	fmt.Println(summarizeTypes())
}