package main

import (
	"context"
	"encoding/json"
	"fmt"
	"io/ioutil"
	"net/http"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"
)

// TestRequest is the JSON body sent from the browser.
type TestRequest struct {
	LectureID  string `json:"lectureId"`
	ExerciseID string `json:"exerciseId"`
	Code       string `json:"code"`
	Stubs      string `json:"stubs"`
}

// RunRequest is the JSON body for running user code.
type RunRequest struct {
	LectureID  string `json:"lectureId"`
	ExerciseID string `json:"exerciseId"`
	Code       string `json:"code"`
	Stubs      string `json:"stubs"`
}

// TestResult represents a single test case result.
type TestResult struct {
	Name    string `json:"name"`
	Passed  bool   `json:"passed"`
	Output  string `json:"output"`
	Package string `json:"package"`
}

// TestResponse is the JSON response for /api/test.
type TestResponse struct {
	Passed int          `json:"passed"`
	Failed int          `json:"failed"`
	Total  int          `json:"total"`
	Tests  []TestResult `json:"tests"`
	Output string       `json:"output"`
}

// RunResponse is the JSON response for /api/run.
type RunResponse struct {
	Output string `json:"output"`
	Error  string `json:"error,omitempty"`
}

// testFiles maps lecture IDs to their test file content.
var testFiles = map[string]string{
	"01_hello_go": `package main

import (
	"fmt"
	"strings"
	"testing"
)

// Ensure imports are always used (even when -run filters exclude some tests)
var _, _ = fmt.Sprintf, strings.Contains

func TestHelloWorld(t *testing.T) {
	result := helloWorld()
	if result != "Hello, World!" {
		t.Errorf("helloWorld() = %q, ต้องการ %q", result, "Hello, World!")
	}
}

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

func TestGreetIncludesName(t *testing.T) {
	result := greet("ทดสอบ")
	if !strings.Contains(result, "ทดสอบ") {
		t.Error("greet ต้องมีชื่อที่ส่งเข้ามาในผลลัพธ์")
	}
}

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

func TestDouble(t *testing.T) {
	tests := []struct {
		name     string
		input    int
		expected int
	}{
		{"double 0", 0, 0},
		{"double 1", 1, 2},
		{"double 5", 5, 10},
		{"double -3", -3, -6},
		{"double 100", 100, 200},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := double(tt.input)
			if result != tt.expected {
				t.Errorf("double(%d) = %d, ต้องการ %d", tt.input, result, tt.expected)
			}
		})
	}
}

func TestIsEven(t *testing.T) {
	tests := []struct {
		name     string
		input    int
		expected bool
	}{
		{"0 เป็นเลขคู่", 0, true},
		{"1 เป็นเลขคี่", 1, false},
		{"2 เป็นเลขคู่", 2, true},
		{"7 เป็นเลขคี่", 7, false},
		{"100 เป็นเลขคู่", 100, true},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := isEven(tt.input)
			if result != tt.expected {
				t.Errorf("isEven(%d) = %t, ต้องการ %t", tt.input, result, tt.expected)
			}
		})
	}
}

func TestCelsiusToFahrenheit(t *testing.T) {
	tests := []struct {
		name     string
		input    float64
		expected float64
	}{
		{"จุดเยือกแข็ง", 0, 32},
		{"จุดเดือด", 100, 212},
		{"ห้อง", 25, 77},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := celsiusToFahrenheit(tt.input)
			diff := result - tt.expected
			if diff < 0 {
				diff = -diff
			}
			if diff > 0.01 {
				t.Errorf("celsiusToFahrenheit(%v) = %v, ต้องการ %v", tt.input, result, tt.expected)
			}
		})
	}
}

func TestSummarizeTypes(t *testing.T) {
	result := summarizeTypes()
	if result == "" {
		t.Error("summarizeTypes() คืน string เปล่า — ต้องเขียนโค้ดในฟังก์ชันนี้!")
	}

	if len(result) < 20 {
		t.Errorf("summarizeTypes() = %q — สั้นเกินไป ต้องใช้ format verbs ทั้ง 5 ชนิด", result)
	}

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
}

func TestConcat(t *testing.T) {
	tests := []struct {
		name     string
		a        string
		b        string
		expected string
	}{
		{"Hello Go", "Hello", "Go", "Hello Go"},
		{"string เปล่า", "", "Go", " Go"},
		{"ทั้งสองเปล่า", "", "", " "},
		{"ภาษาไทย", "สวัสดี", "โลก", "สวัสดี โลก"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := concat(tt.a, tt.b)
			if result != tt.expected {
				t.Errorf("concat(%q, %q) = %q, ต้องการ %q", tt.a, tt.b, result, tt.expected)
			}
		})
	}
}

func TestFormatPerson(t *testing.T) {
	tests := []struct {
		name     string
		pName    string
		age      int
		city     string
		expected string
	}{
		{"สมชาย", "สมชาย", 25, "กรุงเทพ", "สมชาย (25) lives in กรุงเทพ"},
		{"Go", "Go", 14, "Bangkok", "Go (14) lives in Bangkok"},
		{"ทารก", "ทารก", 0, "เชียงใหม่", "ทารก (0) lives in เชียงใหม่"},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := formatPerson(tt.pName, tt.age, tt.city)
			if result != tt.expected {
				t.Errorf("formatPerson(%q, %d, %q) = %q, ต้องการ %q", tt.pName, tt.age, tt.city, result, tt.expected)
			}
		})
	}
}

func TestSwap(t *testing.T) {
	a, b := swap("Go", "Rust")
	if a != "Rust" || b != "Go" {
		t.Errorf("swap(\"Go\", \"Rust\") = (%q, %q), ต้องการ (\"Rust\", \"Go\")", a, b)
	}

	a2, b2 := swap("", "")
	if a2 != "" || b2 != "" {
		t.Errorf("swap(\"\", \"\") = (%q, %q), ต้องการ (\"\", \"\")", a2, b2)
	}
}`,
}

// goModContent is the go.mod file we write in each temp directory.
const goModContent = `module learn

go 1.26
`

func main() {
	port := ":8080"
	if p := os.Getenv("PORT"); p != "" {
		port = p
	}

	staticDir := filepath.Join("..")
	fs := http.FileServer(http.Dir(staticDir))

	http.Handle("/", fs)
	http.HandleFunc("/api/test", corsMiddleware(handleTest))
	http.HandleFunc("/api/run", corsMiddleware(handleRun))

	fmt.Printf("Go Learning Server running at http://localhost%s\n", port)
	if err := http.ListenAndServe(port, nil); err != nil {
		fmt.Fprintf(os.Stderr, "Server error: %v\n", err)
		os.Exit(1)
	}
}

func corsMiddleware(next http.HandlerFunc) http.HandlerFunc {
	return func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "POST, OPTIONS")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		if r.Method == http.MethodOptions {
			w.WriteHeader(http.StatusOK)
			return
		}
		next(w, r)
	}
}

// buildFullCode assembles a complete Go source file from the exercise's code + stubs.
func buildFullCode(studentCode, stubs string) string {
	return "package main\n\nimport (\n\t\"fmt\"\n\t\"strconv\"\n)\n\nvar _ = fmt.Sprintf\nvar _ = strconv.Itoa\n\n" + studentCode + "\n\n" + stubs + "\n\nfunc main() {}\n"
}

func handleTest(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req TestRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	testCode, ok := testFiles[req.LectureID]
	if !ok {
		jsonError(w, "Unknown lecture ID", http.StatusBadRequest)
		return
	}

	fullCode := buildFullCode(req.Code, req.Stubs)
	result, err := runTest(fullCode, testCode, req.ExerciseID)
	if err != nil {
		jsonError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

func handleRun(w http.ResponseWriter, r *http.Request) {
	if r.Method != http.MethodPost {
		http.Error(w, "Method not allowed", http.StatusMethodNotAllowed)
		return
	}

	var req RunRequest
	if err := json.NewDecoder(r.Body).Decode(&req); err != nil {
		jsonError(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	fullCode := buildFullCode(req.Code, req.Stubs)
	result, err := runCode(fullCode)
	if err != nil {
		jsonError(w, err.Error(), http.StatusInternalServerError)
		return
	}

	w.Header().Set("Content-Type", "application/json")
	json.NewEncoder(w).Encode(result)
}

// runTest writes the user code + test file to a temp directory and runs go test.
// If testFilter is non-empty, uses -run flag to run only matching tests.
func runTest(userCode, testCode, testFilter string) (*TestResponse, error) {
	tmpDir, err := ioutil.TempDir("", "golearn-test-*")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	if err := ioutil.WriteFile(filepath.Join(tmpDir, "go.mod"), []byte(goModContent), 0644); err != nil {
		return nil, fmt.Errorf("failed to write go.mod: %w", err)
	}

	if err := ioutil.WriteFile(filepath.Join(tmpDir, "main.go"), []byte(userCode), 0644); err != nil {
		return nil, fmt.Errorf("failed to write main.go: %w", err)
	}

	if err := ioutil.WriteFile(filepath.Join(tmpDir, "main_test.go"), []byte(testCode), 0644); err != nil {
		return nil, fmt.Errorf("failed to write main_test.go: %w", err)
	}

	args := []string{"test", "-v", "-json", "-timeout", "5s"}
	if testFilter != "" {
		args = append(args, "-run", testFilter)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, "go", args...)
	cmd.Dir = tmpDir

	output, err := cmd.CombinedOutput()
	if err != nil && len(output) == 0 {
		return &TestResponse{
			Passed: 0, Failed: 0, Total: 0,
			Output: string(output),
			Tests:  []TestResult{},
		}, nil
	}

	return parseTestOutput(output), nil
}

// parseTestOutput parses go test -json output into structured results.
func parseTestOutput(raw []byte) *TestResponse {
	response := &TestResponse{Tests: []TestResult{}}
	lines := strings.Split(string(raw), "\n")
	var allOutput []string
	testMap := make(map[string]*TestResult)

	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		var entry map[string]interface{}
		if err := json.Unmarshal([]byte(line), &entry); err != nil {
			allOutput = append(allOutput, line)
			continue
		}

		testName, _ := entry["Test"].(string)
		action, _ := entry["Action"].(string)
		pkg, _ := entry["Package"].(string)
		outputLine, _ := entry["Output"].(string)

		if outputLine != "" {
			allOutput = append(allOutput, outputLine)
		}

		if testName == "" {
			continue
		}

		switch action {
		case "run":
			testMap[testName] = &TestResult{Name: testName, Package: pkg}
		case "pass":
			if tr, ok := testMap[testName]; ok {
				tr.Passed = true
			}
		case "fail":
			if tr, ok := testMap[testName]; ok {
				tr.Passed = false
			}
		}
	}

	seen := make(map[string]bool)
	for _, line := range lines {
		line = strings.TrimSpace(line)
		if line == "" {
			continue
		}
		var entry map[string]interface{}
		if err := json.Unmarshal([]byte(line), &entry); err != nil {
			continue
		}
		testName, _ := entry["Test"].(string)
		if testName == "" || seen[testName] {
			continue
		}
		seen[testName] = true
		if tr, ok := testMap[testName]; ok {
			response.Tests = append(response.Tests, *tr)
			response.Total++
			if tr.Passed {
				response.Passed++
			} else {
				response.Failed++
			}
		}
	}

	response.Output = strings.Join(allOutput, "\n")
	return response
}

// runCode writes the user code to a temp directory and runs go run.
func runCode(userCode string) (*RunResponse, error) {
	tmpDir, err := ioutil.TempDir("", "golearn-run-*")
	if err != nil {
		return nil, fmt.Errorf("failed to create temp dir: %w", err)
	}
	defer os.RemoveAll(tmpDir)

	if err := ioutil.WriteFile(filepath.Join(tmpDir, "go.mod"), []byte(goModContent), 0644); err != nil {
		return nil, fmt.Errorf("failed to write go.mod: %w", err)
	}

	if err := ioutil.WriteFile(filepath.Join(tmpDir, "main.go"), []byte(userCode), 0644); err != nil {
		return nil, fmt.Errorf("failed to write main.go: %w", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	cmd := exec.CommandContext(ctx, "go", "run", "main.go")
	cmd.Dir = tmpDir

	output, err := cmd.CombinedOutput()
	resp := &RunResponse{}
	if err != nil {
		resp.Output = string(output)
		resp.Error = err.Error()
	} else {
		resp.Output = string(output)
	}
	return resp, nil
}

func jsonError(w http.ResponseWriter, message string, code int) {
	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(code)
	json.NewEncoder(w).Encode(map[string]string{"error": message})
}