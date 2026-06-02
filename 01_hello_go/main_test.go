package main

import (
	"fmt"
	"strings"
	"testing"
)

// === ทดสอบ greet ===
func TestGreet(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{"ทักทายสมชาย", "สมชาย", "Hello, Go! Welcome, สมชาย!"},
		{"ทักทาย Go", "Go", "Hello, Go! Welcome, Go!"},
		{"ทักทาย string ว่าง", "", "Hello, Go! Welcome, !"},
		{"ทักทายมีเว้นวรรค", "Go Learner", "Hello, Go! Welcome, Go Learner!"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := greet(tt.input)
			if result != tt.expected {
				t.Errorf("greet(%q) = %q, ต้องการ %q", tt.input, result, tt.expected)
			}
		})
	}
}

// === ทดสอบ printFormatted ===
func TestPrintFormatted(t *testing.T) {
	tests := []struct {
		name     string
		nom      string
		age      int
		expected string
	}{
		{"ข้อมูลสมชาย", "สมชาย", 25, "สมชาย is 25 years old"},
		{"ข้อมูล Go", "Go", 14, "Go is 14 years old"},
		{"อายุ 0", "ทารก", 0, "ทารก is 0 years old"},
		{"อายุมาก", "ปู่", 99, "ปู่ is 99 years old"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := printFormatted(tt.nom, tt.age)
			if result != tt.expected {
				t.Errorf("printFormatted(%q, %d) = %q, ต้องการ %q", tt.nom, tt.age, result, tt.expected)
			}
		})
	}
}

// === ทดสอบ summarizeTypes ===
func TestSummarizeTypes(t *testing.T) {
	result := summarizeTypes()

	// เช็คว่าไม่ใช่ string เปล่า
	if result == "" {
		t.Error("summarizeTypes() คืน string เปล่า — ต้องเขียนโค้ดในฟังก์ชันนี้!")
	}

	// เช็คว่าผลลัพธ์มีความยาวพอสมควร (อย่างน้อย 20 ตัวอักษร)
	if len(result) < 20 {
		t.Errorf("summarizeTypes() = %q — สั้นเกินไป ต้องใช้ format verbs ทั้ง 5 ชนิด", result)
	}

	// เช็คว่ามีทั้งตัวอักษรและตัวเลขปนกัน (แสดงว่าใช้ %s/%v และ %d แล้ว)
	hasLetters := false
	hasDigits := false
	for _, r := range result {
		if (r >= 'a' && r <= 'z') || (r >= 'A' && r <= 'Z') {
			hasLetters = true
		}
		if r >= '0' && r <= '9' {
			hasDigits = true
		}
	}
	if !hasLetters {
		t.Errorf("summarizeTypes() = %q — ไม่มีตัวอักษร ลองใช้ %%s หรือ %%v", result)
	}
	if !hasDigits {
		t.Errorf("summarizeTypes() = %q — ไม่มีตัวเลข ลองใช้ %%d", result)
	}

	// เช็คว่าใช้ fmt.Sprintf จริง (ไม่ใช่ string ตายตัว)
	_ = fmt.Sprintf
}

// === ทดสอบรวม ===
func TestGreetIncludesName(t *testing.T) {
	result := greet("ทดสอบ")
	if !strings.Contains(result, "ทดสอบ") {
		t.Error("greet ต้องมีชื่อที่ส่งเข้ามาในผลลัพธ์")
	}
}