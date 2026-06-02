// ============================================
// Go Learning — App Logic (Per-Exercise Editors)
// ============================================

const editors = {};  // exerciseId -> ace editor instance
let currentLectureId = null;

document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  renderWelcomeCards();

  // Mobile hamburger
  const hamburger = document.getElementById('hamburger');
  const sidebar = document.getElementById('sidebar');
  const overlay = document.getElementById('sidebarOverlay');

  hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('open');
    overlay.classList.toggle('visible');
  });

  overlay.addEventListener('click', () => {
    sidebar.classList.remove('open');
    overlay.classList.remove('visible');
  });

  // Check hash
  const hash = window.location.hash.slice(1);
  if (hash) {
    const lecture = LECTURES.find(l => l.id === hash);
    if (lecture && lecture.unlocked) {
      navigateToLecture(lecture.id);
    }
  }
});

// ============================================
// Ace Editor Management (per-exercise)
// ============================================

function initEditor(exerciseId) {
  if (typeof ace === 'undefined') return null;

  const el = document.getElementById('editor-' + exerciseId);
  if (!el) return null;

  // Destroy existing editor for this exercise
  if (editors[exerciseId]) {
    editors[exerciseId].destroy();
    delete editors[exerciseId];
  }

  const editor = ace.edit(el);
  editor.setTheme('ace/theme/monokai');
  editor.session.setMode('ace/mode/golang');
  editor.setOptions({
    fontSize: '14px',
    showPrintMargin: false,
    wrap: true,
    tabSize: 4,
    useSoftTabs: true,
    highlightActiveLine: true,
    showGutter: true,
    fontFamily: "'Fira Code', 'Consolas', monospace"
  });

  // Save on Ctrl+S
  editor.commands.addCommand({
    name: 'saveCode',
    bindKey: { win: 'Ctrl-S', mac: 'Cmd-S' },
    exec: () => { saveExerciseCode(exerciseId); showToast('บันทึกแล้ว'); }
  });

  editors[exerciseId] = editor;
  return editor;
}

function getEditorCode(exerciseId) {
  const editor = editors[exerciseId];
  return editor ? editor.getValue() : '';
}

function setEditorCode(exerciseId, code) {
  const editor = editors[exerciseId];
  if (editor) {
    editor.setValue(code, -1);
    editor.clearSelection();
  }
}

function saveExerciseCode(exerciseId) {
  const code = getEditorCode(exerciseId);
  localStorage.setItem('golearn_' + currentLectureId + '_' + exerciseId, code);
}

function loadSavedCode(lectureId, exerciseId) {
  return localStorage.getItem('golearn_' + lectureId + '_' + exerciseId) || null;
}

// ============================================
// API Calls (per-exercise)
// ============================================

async function runTests(lectureId, exerciseId) {
  const btn = document.getElementById('runBtn-' + exerciseId);
  const resultsPanel = document.getElementById('results-' + exerciseId);

  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader" class="icon-sm spin"></i> กำลังรันเทส...';
  if (typeof lucide !== 'undefined') lucide.createIcons();

  resultsPanel.style.display = 'block';
  resultsPanel.innerHTML = '<div class="results-loading"><i data-lucide="loader" class="icon-lg spin"></i> กำลังรันเทส...</div>';
  if (typeof lucide !== 'undefined') lucide.createIcons();

  // Save code before running
  saveExerciseCode(exerciseId);

  const lecture = LECTURES.find(l => l.id === lectureId);
  const exercise = lecture.exercises.find(e => e.id === exerciseId);
  const code = getEditorCode(exerciseId);

  try {
    const resp = await fetch('/api/test', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lectureId: lectureId,
        exerciseId: exercise.testFilter || exerciseId,
        code: code,
        stubs: exercise.stubs
      })
    });

    const data = await resp.json();
    renderTestResults(resultsPanel, data);
  } catch (err) {
    resultsPanel.innerHTML = '<div class="results-error"><i data-lucide="wifi-off" class="icon-md"></i> ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์ — ต้องรัน <code>cd site/server && go run main.go</code> ก่อน</div>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="play" class="icon-sm"></i> รันเทส';
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

async function runCode(lectureId, exerciseId) {
  const btn = document.getElementById('runCodeBtn-' + exerciseId);
  const resultsPanel = document.getElementById('results-' + exerciseId);

  btn.disabled = true;
  btn.innerHTML = '<i data-lucide="loader" class="icon-sm spin"></i> กำลังรัน...';
  if (typeof lucide !== 'undefined') lucide.createIcons();

  resultsPanel.style.display = 'block';
  resultsPanel.innerHTML = '<div class="results-loading"><i data-lucide="loader" class="icon-lg spin"></i> กำลังรันโปรแกรม...</div>';
  if (typeof lucide !== 'undefined') lucide.createIcons();

  const lecture = LECTURES.find(l => l.id === lectureId);
  const exercise = lecture.exercises.find(e => e.id === exerciseId);
  const code = getEditorCode(exerciseId);

  try {
    const resp = await fetch('/api/run', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        lectureId: lectureId,
        exerciseId: exerciseId,
        code: code,
        stubs: exercise.stubs
      })
    });

    const data = await resp.json();
    renderRunResults(resultsPanel, data);
  } catch (err) {
    resultsPanel.innerHTML = '<div class="results-error"><i data-lucide="wifi-off" class="icon-md"></i> ไม่สามารถเชื่อมต่อเซิร์ฟเวอร์</div>';
    if (typeof lucide !== 'undefined') lucide.createIcons();
  }

  btn.disabled = false;
  btn.innerHTML = '<i data-lucide="terminal" class="icon-sm"></i> รันโปรแกรม';
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================
// Render Results
// ============================================

function renderTestResults(panel, data) {
  let html = `
    <div class="results-summary ${data.failed === 0 && data.total > 0 ? 'all-passed' : data.failed > 0 ? 'has-failures' : ''}">
      <div class="results-summary-item">
        <span class="results-count">${data.total}</span>
        <span class="results-label">ทั้งหมด</span>
      </div>
      <div class="results-summary-item passed">
        <span class="results-count">${data.passed}</span>
        <span class="results-label">ผ่าน</span>
      </div>
      <div class="results-summary-item failed">
        <span class="results-count">${data.failed}</span>
        <span class="results-label">ไม่ผ่าน</span>
      </div>
    </div>
    <div class="results-tests">
  `;

  if (data.tests && data.tests.length > 0) {
    data.tests.forEach(test => {
      const icon = test.passed ? 'check-circle' : 'x-circle';
      const cls = test.passed ? 'test-passed' : 'test-failed';
      html += `
        <div class="results-test ${cls}">
          <i data-lucide="${icon}" class="icon-sm"></i>
          <span class="test-name">${escapeHtml(test.name)}</span>
          ${test.passed ? '' : '<span class="test-status">ไม่ผ่าน</span>'}
        </div>
      `;
    });
  } else if (data.output) {
    html += `<div class="results-output"><pre>${escapeHtml(data.output)}</pre></div>`;
  }

  html += '</div>';

  if (data.failed === 0 && data.total > 0) {
    html += `<div class="results-success-msg"><i data-lucide="party-popper" class="icon-md"></i> ยอดเยี่ยม! เทสทั้งหมดผ่าน!</div>`;
  }

  panel.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

function renderRunResults(panel, data) {
  let html = '<div class="results-run-output">';

  if (data.output) {
    html += `<div class="results-run-label"><i data-lucide="terminal" class="icon-sm"></i> ผลลัพธ์</div>`;
    html += `<pre>${escapeHtml(data.output)}</pre>`;
  }

  if (data.error && data.error !== 'exit status 1') {
    html += `<div class="results-run-label error-label"><i data-lucide="alert-triangle" class="icon-sm"></i> ข้อผิดพลาด</div>`;
    html += `<pre class="error-output">${escapeHtml(data.error)}</pre>`;
  }

  html += '</div>';
  panel.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================
// Sidebar
// ============================================

function renderSidebar() {
  const nav = document.getElementById('sidebarNav');
  let currentTier = '';

  LECTURES.forEach(lecture => {
    if (lecture.tier !== currentTier) {
      currentTier = lecture.tier;
      const tierInfo = TIERS[currentTier];
      const header = document.createElement('div');
      header.className = `tier-header tier-${currentTier}`;
      header.innerHTML = `<i data-lucide="${tierInfo.icon}" class="icon-sm"></i> ${tierInfo.label}`;
      nav.appendChild(header);
    }

    const link = document.createElement('a');
    link.className = `lecture-link ${lecture.unlocked ? '' : 'locked'}`;
    link.dataset.id = lecture.id;

    const num = document.createElement('span');
    num.className = 'lecture-num';
    num.textContent = lecture.number;

    const title = document.createElement('span');
    title.className = 'lecture-title';
    title.textContent = lecture.comingSoon ? `${lecture.title} (เร็วๆ นี้)` : lecture.title;

    link.appendChild(num);
    link.appendChild(title);

    if (lecture.unlocked) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        navigateToLecture(lecture.id);
      });
    }

    nav.appendChild(link);
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================
// Welcome Cards
// ============================================

function renderWelcomeCards() {
  const container = document.getElementById('welcomeCards');
  const unlockedLectures = LECTURES.filter(l => l.unlocked);

  unlockedLectures.forEach(lecture => {
    const card = document.createElement('div');
    card.className = 'welcome-card';
    const tierInfo = TIERS[lecture.tier];
    const exCount = lecture.exercises ? lecture.exercises.length : 0;
    card.innerHTML = `
      <div class="card-tier ${lecture.tier}"><i data-lucide="${tierInfo.icon}" class="icon-xs"></i> ${tierInfo.label}</div>
      <div class="card-title">บทที่ ${lecture.number}: ${lecture.title}</div>
      <div class="card-desc">${exCount} แบบฝึกหัด</div>
    `;
    card.addEventListener('click', () => navigateToLecture(lecture.id));
    container.appendChild(card);
  });

  const tiers = ['foundation', 'intermediate', 'advanced', 'hero'];
  tiers.forEach(tier => {
    const tierLectures = LECTURES.filter(l => l.tier === tier && !l.unlocked);
    if (tierLectures.length > 0) {
      const tierInfo = TIERS[tier];
      const card = document.createElement('div');
      card.className = 'welcome-card coming-soon';
      card.innerHTML = `
        <div class="card-tier ${tier}"><i data-lucide="${tierInfo.icon}" class="icon-xs"></i> ${tierInfo.label}</div>
        <div class="card-title">${tierLectures.length} บทเรียน</div>
        <div class="card-desc">เร็วๆ นี้</div>
      `;
      container.appendChild(card);
    }
  });

  if (typeof lucide !== 'undefined') lucide.createIcons();
}

// ============================================
// Navigation
// ============================================

function navigateToLecture(lectureId) {
  const lecture = LECTURES.find(l => l.id === lectureId);
  if (!lecture) return;

  currentLectureId = lectureId;

  // Update sidebar active state
  document.querySelectorAll('.lecture-link').forEach(el => {
    el.classList.toggle('active', el.dataset.id === lectureId);
  });

  // Hide welcome, show content
  document.getElementById('welcome').style.display = 'none';
  document.getElementById('lectureContent').style.display = 'block';

  // Render lecture content
  renderLecture(lecture);

  // Initialize editors for each exercise
  if (lecture.exercises) {
    lecture.exercises.forEach(exercise => {
      const editor = initEditor(exercise.id);
      if (editor) {
        const saved = loadSavedCode(lectureId, exercise.id);
        setEditorCode(exercise.id, saved || exercise.starterCode);
      }
    });
  }

  // Update URL hash
  window.location.hash = lectureId;

  // Close mobile sidebar
  document.getElementById('sidebar').classList.remove('open');
  document.getElementById('sidebarOverlay').classList.remove('visible');

  // Scroll to top
  window.scrollTo(0, 0);
}

// ============================================
// Render Lecture Content
// ============================================

function renderLecture(lecture) {
  const container = document.getElementById('lectureContent');
  const currentIndex = LECTURES.findIndex(l => l.id === lecture.id);
  const prevLecture = currentIndex > 0 ? LECTURES[currentIndex - 1] : null;
  const nextLecture = currentIndex < LECTURES.length - 1 ? LECTURES[currentIndex + 1] : null;

  let html = '';

  // Header
  const tierInfo = TIERS[lecture.tier];
  html += `
    <div class="lecture-header">
      <span class="lecture-tier-badge ${lecture.tier}"><i data-lucide="${tierInfo.icon}" class="icon-xs"></i> ${tierInfo.label}</span>
      <h1>บทที่ ${lecture.number}: ${lecture.title}</h1>
      <div class="lecture-number">${lecture.id}</div>
    </div>
  `;

  if (lecture.lecture) {
    html += renderLectureSection(lecture);
    html += renderStudyCases(lecture);
    html += renderExercisesSection(lecture);
    html += renderTips(lecture);
  } else if (lecture.comingSoon) {
    html += `
      <div style="text-align:center; padding:60px 20px;">
        <h2>เร็วๆ นี้</h2>
        <p style="color: var(--text-muted); margin-top:12px;">บทเรียนนี้กำลังจะเปิดให้เรียนเร็วๆ นี้</p>
      </div>
    `;
  }

  // Navigation
  html += `<div class="lecture-nav">`;
  if (prevLecture) {
    html += `<a onclick="navigateToLecture('${prevLecture.id}')" class="${prevLecture.unlocked ? '' : 'disabled'}"><i data-lucide="chevron-left" class="icon-sm"></i> บทที่ ${prevLecture.number}</a>`;
  } else {
    html += '<span></span>';
  }
  if (nextLecture) {
    html += `<a onclick="navigateToLecture('${nextLecture.id}')" class="${nextLecture.unlocked ? '' : 'disabled'}">บทที่ ${nextLecture.number} <i data-lucide="chevron-right" class="icon-sm"></i></a>`;
  }
  html += '</div>';

  container.innerHTML = html;
  if (typeof lucide !== 'undefined') lucide.createIcons();
  if (typeof Prism !== 'undefined') Prism.highlightAll();
}

// ============================================
// Render: Lecture Section
// ============================================

function renderLectureSection(lecture) {
  const data = lecture.lecture;
  let html = `<div class="section-heading"><i data-lucide="book-open" class="icon-md"></i> บรรยาย</div>`;

  if (data.intro) {
    html += `<p>${data.intro}</p>`;
  }

  if (data.concepts) {
    data.concepts.forEach(concept => {
      html += `<h3 style="margin: 24px 0 10px; color: var(--accent-blue);">${concept.title}</h3>`;
      html += `<p>${concept.text}</p>`;
      if (concept.code) {
        html += createCodeBlock(concept.code, concept.codeLang || 'go');
      }
      if (concept.table) {
        html += createTable(concept.table);
      }
    });
  }

  return html;
}

// ============================================
// Render: Study Cases
// ============================================

function renderStudyCases(lecture) {
  if (!lecture.studyCases || lecture.studyCases.length === 0) return '';

  let html = `<div class="section-heading"><i data-lucide="flask-conical" class="icon-md"></i> กรณีศึกษา</div>`;

  lecture.studyCases.forEach((studyCase, idx) => {
    const caseId = `case-${lecture.id}-${idx}`;
    html += `
      <div class="study-case">
        <div class="study-case-header">
          <span class="case-num">${idx + 1}</span>
          ${studyCase.title}
        </div>
        <div class="study-case-body">
          <p>${studyCase.description}</p>
    `;

    if (studyCase.examples) {
      html += `<p><strong>ตัวอย่าง:</strong></p><ul>`;
      studyCase.examples.forEach(ex => {
        html += `<li><code>${ex.input}</code> → <code>${ex.output}</code></li>`;
      });
      html += `</ul>`;
    }

    html += `
      <div class="toggle-block">
        <button class="toggle-btn hint-btn" onclick="toggleContent('${caseId}-hint')"><i data-lucide="lightbulb" class="icon-xs"></i> เปิดเคล็ดลับ</button>
        <div id="${caseId}-hint" class="toggle-content"><p>${studyCase.hint}</p></div>
      </div>
      <div class="toggle-block">
        <button class="toggle-btn answer-btn" onclick="toggleContent('${caseId}-answer')"><i data-lucide="check" class="icon-xs"></i> เฉลย</button>
        <div id="${caseId}-answer" class="toggle-content">${createCodeBlock(studyCase.answer, studyCase.answerLang || 'go')}</div>
      </div>
    `;

    html += `</div></div>`;
  });

  return html;
}

// ============================================
// Render: Exercises (per-exercise cards with editors)
// ============================================

function renderExercisesSection(lecture) {
  if (!lecture.exercises || lecture.exercises.length === 0) return '';

  let html = `<div class="section-heading"><i data-lucide="code" class="icon-md"></i> แบบฝึกหัด (${lecture.exercises.length} ข้อ)</div>`;
  html += `<p>แต่ละข้อมี editor ของตัวเอง — เขียนโค้ดแล้วกด <strong>รันเทส</strong> เพื่อตรวจสอบ</p>`;

  lecture.exercises.forEach((exercise, idx) => {
    html += `
      <div class="exercise-card-full">
        <div class="exercise-card-header">
          <span class="exercise-num">${exercise.todo}</span>
          <span class="exercise-title">${exercise.title}</span>
        </div>
        <div class="exercise-card-body">
          <p>${exercise.description}</p>

          <div class="toggle-block">
            <button class="toggle-btn hint-btn" onclick="toggleContent('hint-${exercise.id}')"><i data-lucide="lightbulb" class="icon-xs"></i> เคล็ดลับ</button>
            <div id="hint-${exercise.id}" class="toggle-content"><p>${exercise.hint}</p></div>
          </div>

          <div class="editor-toolbar">
            <button class="toolbar-btn primary" id="runBtn-${exercise.id}" onclick="runTests('${lecture.id}', '${exercise.id}')">
              <i data-lucide="play" class="icon-sm"></i> รันเทส
            </button>
            <button class="toolbar-btn secondary" id="runCodeBtn-${exercise.id}" onclick="runCode('${lecture.id}', '${exercise.id}')">
              <i data-lucide="terminal" class="icon-sm"></i> รันโปรแกรม
            </button>
            <button class="toolbar-btn ghost" onclick="resetExercise('${lecture.id}', '${exercise.id}')">
              <i data-lucide="rotate-ccw" class="icon-sm"></i> รีเซ็ต
            </button>
            <button class="toggle-btn answer-btn" onclick="toggleContent('sol-${exercise.id}')"><i data-lucide="eye" class="icon-xs"></i> เฉลย</button>
          </div>

          <div class="editor-container">
            <div id="editor-${exercise.id}" class="exercise-editor"></div>
          </div>

          <div id="results-${exercise.id}" class="results-panel" style="display:none;"></div>

          <div id="sol-${exercise.id}" class="toggle-content" style="display:none;">
            ${createCodeBlock(exercise.solution, 'go')}
          </div>
        </div>
      </div>
    `;
  });

  return html;
}

// ============================================
// Reset Exercise
// ============================================

function resetExercise(lectureId, exerciseId) {
  const lecture = LECTURES.find(l => l.id === lectureId);
  const exercise = lecture.exercises.find(e => e.id === exerciseId);
  if (exercise) {
    setEditorCode(exerciseId, exercise.starterCode);
    localStorage.removeItem('golearn_' + lectureId + '_' + exerciseId);
    showToast('รีเซ็ตโค้ดแล้ว');
  }
}

// ============================================
// Render: Tips
// ============================================

function renderTips(lecture) {
  if (!lecture.lecture || !lecture.lecture.tips) return '';

  let html = `<div class="section-heading"><i data-lucide="lightbulb" class="icon-md"></i> เคล็ดลับ</div>`;

  lecture.lecture.tips.forEach(tip => {
    html += `
      <div class="tip-box">
        <div class="tip-title"><i data-lucide="sparkles" class="icon-xs"></i> เคล็ดลับ</div>
        ${tip}
      </div>
    `;
  });

  return html;
}

// ============================================
// Helpers
// ============================================

function createCodeBlock(code, lang) {
  const langLabel = lang === 'go' ? 'Go' : lang === 'bash' ? 'Terminal' : lang;
  const id = 'code-' + Math.random().toString(36).slice(2, 8);
  return `
    <div class="code-block">
      <div class="code-header">
        <span>${langLabel}</span>
        <button class="copy-btn" onclick="copyCode('${id}')"><i data-lucide="copy" class="icon-xs"></i> คัดลอก</button>
      </div>
      <pre><code id="${id}" class="language-${lang}">${escapeHtml(code.trim())}</code></pre>
    </div>
  `;
}

function createTable(tableData) {
  let html = `<table><thead><tr>`;
  tableData.headers.forEach(h => html += `<th>${h}</th>`);
  html += `</tr></thead><tbody>`;
  tableData.rows.forEach(row => {
    html += `<tr>`;
    row.forEach(cell => html += `<td>${cell}</td>`);
    html += `</tr>`;
  });
  html += `</tbody></table>`;
  return html;
}

function toggleContent(id) {
  const el = document.getElementById(id);
  if (el) {
    el.classList.toggle('visible');
    // Use style.display for toggle since we're not using the .visible class for solutions
    if (el.style.display === 'none' || el.style.display === '') {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
    if (typeof Prism !== 'undefined' && el.style.display === 'block') {
      Prism.highlightAllUnder(el);
    }
  }
}

function copyCode(id) {
  const codeEl = document.getElementById(id);
  if (codeEl) {
    navigator.clipboard.writeText(codeEl.textContent).then(() => {
      showToast('คัดลอกแล้ว');
    });
  }
}

function showToast(message) {
  let toast = document.getElementById('toast');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast';
    toast.className = 'toast';
    document.body.appendChild(toast);
  }
  toast.textContent = message;
  toast.classList.add('visible');
  setTimeout(() => toast.classList.remove('visible'), 2000);
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}