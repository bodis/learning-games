// ===================================================================
// 5. OSZTÁLY MATEMATIKA TÉMAZÁRÓ GYAKORLÓ - ALKALMAZÁS LOGIKA
// Funkciók: dinamikus renderelés, SVG számegyenesek, blokkonkénti és
//           teljes ellenőrzés, AI prompt export, nyomtatási nézetek.
//
// JÖVŐBELI VERCEL / API TOKEN INTEGRÁCIÓ:
// A QUIZ_CONFIG objektumban elő van készítve a direct_ai_token és backend_api mód.
// ===================================================================

const QUIZ_CONFIG = {
  version: "1.0.0",
  // Üzemmód: 'offline_export' (vágólapra másolás AI-hoz) | 'backend_api' (későbbi Vercel)
  mode: 'offline_export',
  apiEndpoint: '/api/tutor', // Későbbi Next.js / Vercel Serverless route
  aiProvider: 'gemini',       // Tervezett AI modell: Gemini 2.0 / 1.5 Flash
  debug: false
};

(function() {
  'use strict';

  const STORAGE_KEY = 'matek_5_tz1_answers_v1';
  let studentAnswers = {};
  let blockResults = {};
  let currentExportScope = null; // null: teljes dolgozat, 'block-id': adott blokk
  let exportFilter = 'mistakes_only'; // 'mistakes_only' | 'all'

  // String normalizálása számokhoz
  function normalizeAnswer(str) {
    if (str === null || str === undefined) return '';
    return String(str)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, '')             // Szóközök eltávolítása (pl. "245 029" -> "245029")
      .replace(/[.,]/g, '')             // Tagoló pontok/vesszők
      .replace(/[\u2013\u2014]/g, '-'); // Nagykötőjel / gondolatjel normalizálása
  }

  // Szöveges (betűvel kiírt számok) normalizálása
  function normalizeWordAnswer(str) {
    if (!str) return '';
    return String(str)
      .trim()
      .toLowerCase()
      .replace(/\s+/g, ' ')
      .replace(/[\u2013\u2014]/g, '-');
  }

  // Ellenőrzés egyezésre
  function isMatch(userVal, expectedVal) {
    if (!userVal) return false;
    const cleanUser = normalizeAnswer(userVal);
    const cleanExp = normalizeAnswer(expectedVal);

    if (cleanUser === cleanExp) return true;

    // Szöveges formák vizsgálata
    const wUser = normalizeWordAnswer(userVal);
    const wExp = normalizeWordAnswer(expectedVal);
    if (wUser === wExp) return true;

    // Szinonimák: "kettőezer" és "kétezer"
    const synUser = wUser.replace(/^kettőezer/, 'kétezer');
    const synExp = wExp.replace(/^kettőezer/, 'kétezer');
    if (synUser === synExp) return true;

    // Kötőjel nélküli változat tolerancia
    if (synUser.replace(/-/g, '') === synExp.replace(/-/g, '')) return true;

    return false;
  }

  // Mentés / Betöltés localStorage
  function loadSavedAnswers() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        studentAnswers = JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Nem sikerült betölteni a korábbi válaszokat:', e);
    }
  }

  function saveCurrentAnswers() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(studentAnswers));
    } catch (e) {
      console.warn('Nem sikerült menteni a válaszokat:', e);
    }
  }

  // ================== SVG SZÁMEGYENESEK ==================
  function generateNumberLineSVG(lineDef) {
    const min = lineDef.min;
    const max = lineDef.max;
    const step = lineDef.step;
    
    const svgWidth = 840;
    const svgHeight = 110;
    const padX = 50;
    const axisY = 65;
    const usableWidth = svgWidth - 2 * padX;
    const totalSpan = max - min;
    
    const getX = (val) => padX + ((val - min) / totalSpan) * usableWidth;

    let svgHtml = `<svg class="numberline-svg" viewBox="0 0 ${svgWidth} ${svgHeight}" xmlns="http://www.w3.org/2000/svg">`;
    svgHtml += `<defs>
      <marker id="arrow-start-${lineDef.id}" markerWidth="8" markerHeight="8" refX="2" refY="4" orient="auto">
        <path d="M7,1 L2,4 L7,7" fill="none" stroke="#1e1b18" stroke-width="2"/>
      </marker>
      <marker id="arrow-end-${lineDef.id}" markerWidth="8" markerHeight="8" refX="6" refY="4" orient="auto">
        <path d="M1,1 L6,4 L1,7" fill="none" stroke="#1e1b18" stroke-width="2"/>
      </marker>
    </defs>`;

    // Fő tengely
    svgHtml += `<line x1="${padX - 15}" y1="${axisY}" x2="${svgWidth - padX + 15}" y2="${axisY}" 
                      stroke="#1e1b18" stroke-width="2" 
                      marker-start="url(#arrow-start-${lineDef.id})" 
                      marker-end="url(#arrow-end-${lineDef.id})" />`;

    // Beosztások
    for (let val = min; val <= max; val += step) {
      const x = getX(val);
      const isKnown = lineDef.known.some(k => k.val === val);
      const isPoint = lineDef.points.some(p => p.val === val);
      const tickH = isKnown || isPoint ? 14 : 9;
      
      svgHtml += `<line x1="${x}" y1="${axisY - tickH / 2}" x2="${x}" y2="${axisY + tickH / 2}" stroke="#5e574d" stroke-width="1.6" />`;
    }

    // Ismert számok a tengely alatt
    lineDef.known.forEach(k => {
      const x = getX(k.val);
      svgHtml += `<text x="${x}" y="${axisY + 24}" font-family="'IBM Plex Mono', monospace" font-size="14" font-weight="600" fill="#1e1b18" text-anchor="middle">${k.label}</text>`;
    });

    // Keresett pontok (piros körök és betűk a tengely felett)
    lineDef.points.forEach(p => {
      const x = getX(p.val);
      svgHtml += `<circle cx="${x}" cy="${axisY}" r="5.5" fill="#d84a1b" stroke="#1e1b18" stroke-width="1.8" />`;
      svgHtml += `<text x="${x}" y="${axisY - 14}" font-family="'Fraunces', serif" font-size="16" font-weight="700" fill="#d84a1b" text-anchor="middle">${p.name}</text>`;
    });

    svgHtml += `</svg>`;
    return svgHtml;
  }

  // ================== HTML RENDERELÉS ==================
  function renderQuiz() {
    const mainContainer = document.getElementById('quiz-container');
    if (!mainContainer) return;

    let html = '';

    QUIZ_DATA.blocks.forEach(block => {
      html += `
        <section class="quiz-block" id="${block.id}" data-block-id="${block.id}">
          <header class="block-header">
            <div class="block-title-wrap">
              <span class="block-num">${block.number}</span>
              <h2 class="block-title">${block.title}</h2>
              <span class="block-badge">${block.badge}</span>
            </div>
            <div class="block-score" id="score-${block.id}">0 / ? pont</div>
          </header>

          <div class="block-body">
            <p class="block-desc">${block.description}</p>
            
            ${block.ruleHint ? `
              <details class="rule-box">
                <summary>💡 Szabály és gondolatmenet emlékeztető</summary>
                <div>${block.ruleHint}</div>
              </details>
            ` : ''}

            ${renderTasks(block)}
          </div>

          <footer class="block-footer">
            <div class="block-footer-left">
              <button type="button" class="btn btn-primary" onclick="window.quizApp.checkBlock('${block.id}')">
                ✓ Blokk ellenőrzése
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.quizApp.revealAnswers('${block.id}')">
                👁️ Megoldás mutatása
              </button>
              <button type="button" class="btn btn-secondary btn-sm" onclick="window.quizApp.resetBlock('${block.id}')">
                ↺ Blokk újrakezdése
              </button>
              <button type="button" class="btn btn-ai btn-sm" onclick="window.quizApp.exportBlockToAI('${block.id}')">
                🤖 E blokk exportálása AI-nak
              </button>
            </div>
            <div class="block-footer-status" id="status-${block.id}">Még nem ellenőrizve</div>
          </footer>
        </section>
      `;
    });

    mainContainer.innerHTML = html;

    // Visszatöltés és statisztikák kalkulálása
    restoreAnswersToInputs();
    calculateTotalQuestions();
  }

  function renderTasks(block) {
    return block.tasks.map(task => {
      let taskContent = '';

      if (task.type === 'numberline_read') {
        taskContent = task.lines.map(line => `
          <div class="numberline-card" data-line-id="${line.id}">
            <h4>${line.label} Számegyenes</h4>
            <div class="numberline-svg-wrap">
              ${generateNumberLineSVG(line)}
            </div>
            <div class="numberline-inputs">
              ${line.points.map(p => `
                <div class="q-item" data-q-id="${p.id}" data-expected="${p.val}" data-parent-title="${line.label} Számegyenes">
                  <div class="nl-input-unit">
                    <label for="input-${p.id}">${p.label}</label>
                    <input type="text" id="input-${p.id}" class="q-input" data-qid="${p.id}" placeholder="érték...">
                  </div>
                  <div class="q-feedback">
                    <strong>Helyes: ${p.val}</strong>
                    <div class="q-explanation">${line.explanation}</div>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        `).join('');

      } else if (task.type === 'interval_select') {
        taskContent = `
          <div class="grid-questions-wide">
            ${task.items.map(item => `
              <div class="q-item interval-card" data-q-id="${item.id}" data-expected="${item.expected}">
                <div class="interval-desc"><strong>${item.label}</strong> ${item.description}</div>
                <select class="interval-select q-input" data-qid="${item.id}">
                  <option value="">-- Válassz matematikai jelölést --</option>
                  ${item.options.map(opt => `<option value="${opt.val}">${opt.label}</option>`).join('')}
                </select>
                <div class="q-feedback">
                  <strong>Helyes jelölés: ${item.expected}</strong>
                  <div class="q-explanation">${item.explanation}</div>
                </div>
              </div>
            `).join('')}
          </div>
        `;

      } else {
        const isWide = task.items.some(it => it.prompt.length > 25);
        taskContent = `
          <div class="${isWide ? 'grid-questions-wide' : 'grid-questions'}">
            ${task.items.map(item => `
              <div class="q-item" data-q-id="${item.id}" data-expected="${item.expected}">
                <div class="q-prompt-row">
                  ${item.label ? `<span class="q-label">${item.label}</span>` : ''}
                  <span class="q-prompt">${item.prompt}</span>
                </div>
                <div class="q-input-wrap">
                  <input type="text" class="q-input" id="input-${item.id}" data-qid="${item.id}" placeholder="megoldásod...">
                </div>
                <div class="q-feedback">
                  <strong>Helyes válasz: ${item.expected}</strong>
                  ${item.explanation ? `<div class="q-explanation">${item.explanation}</div>` : ''}
                </div>
              </div>
            `).join('')}
          </div>
        `;
      }

      return `
        <div class="task-group">
          <h3 class="task-group-title">${task.title}</h3>
          ${task.instructions ? `<div class="task-group-inst">${task.instructions}</div>` : ''}
          ${taskContent}
        </div>
      `;
    }).join('');
  }

  function bindInputEvents() {
    document.addEventListener('input', (e) => {
      if (e.target && e.target.classList.contains('q-input')) {
        const qid = e.target.dataset.qid;
        studentAnswers[qid] = e.target.value;
        saveCurrentAnswers();
        updateGlobalCounters();

        const qItem = e.target.closest('.q-item');
        if (qItem) {
          qItem.classList.remove('is-correct', 'is-wrong');
        }
      }
    });

    document.addEventListener('change', (e) => {
      if (e.target && e.target.classList.contains('interval-select')) {
        const qid = e.target.dataset.qid;
        studentAnswers[qid] = e.target.value;
        saveCurrentAnswers();
        updateGlobalCounters();

        const qItem = e.target.closest('.q-item');
        if (qItem) {
          qItem.classList.remove('is-correct', 'is-wrong');
        }
      }
    });
  }

  function restoreAnswersToInputs() {
    Object.keys(studentAnswers).forEach(qid => {
      const input = document.querySelector(`.q-input[data-qid="${qid}"]`);
      if (input) {
        input.value = studentAnswers[qid];
      }
    });
    updateGlobalCounters();
  }

  function calculateTotalQuestions() {
    const allItems = document.querySelectorAll('.q-item');
    const printMax = document.getElementById('print-max-pts');
    if (printMax) {
      printMax.textContent = allItems.length;
    }
  }

  // ================== ELLENŐRZÉSI FUNKCIÓK ==================
  function checkBlock(blockId) {
    const blockEl = document.getElementById(blockId);
    if (!blockEl) return;

    const qItems = blockEl.querySelectorAll('.q-item');
    let correctCount = 0;
    let totalCount = qItems.length;

    qItems.forEach(item => {
      const expected = item.dataset.expected;
      const input = item.querySelector('.q-input');
      const userVal = input ? input.value : '';

      const correct = isMatch(userVal, expected);
      item.classList.remove('is-correct', 'is-wrong');

      if (correct) {
        item.classList.add('is-correct');
        correctCount++;
      } else {
        item.classList.add('is-wrong');
      }
    });

    const percent = Math.round((correctCount / totalCount) * 100);
    blockResults[blockId] = { correct: correctCount, total: totalCount, percent: percent };

    const scoreBadge = document.getElementById(`score-${blockId}`);
    if (scoreBadge) {
      scoreBadge.innerHTML = `<strong>${correctCount}</strong> / ${totalCount} pont (${percent}%)`;
    }

    const statusEl = document.getElementById(`status-${blockId}`);
    if (statusEl) {
      if (percent === 100) {
        statusEl.innerHTML = `🌟 Hibátlan megoldás! (100%)`;
        statusEl.style.color = 'var(--green)';
      } else {
        statusEl.innerHTML = `Eredmény: ${correctCount} / ${totalCount} (${percent}%)`;
        statusEl.style.color = percent >= 80 ? 'var(--green)' : percent >= 50 ? 'var(--amber)' : 'var(--red)';
      }
    }

    updateGlobalCounters();
    return { correctCount, totalCount, percent };
  }

  function checkAll() {
    let grandCorrect = 0;
    let grandTotal = 0;

    QUIZ_DATA.blocks.forEach(block => {
      const res = checkBlock(block.id);
      if (res) {
        grandCorrect += res.correctCount;
        grandTotal += res.totalCount;
      }
    });

    const grandPercent = grandTotal > 0 ? Math.round((grandCorrect / grandTotal) * 100) : 0;
    let gradeName = 'Elégtelen (1)';
    if (grandPercent >= 85) gradeName = 'Jeles (5)';
    else if (grandPercent >= 70) gradeName = 'Jó (4)';
    else if (grandPercent >= 55) gradeName = 'Közepes (3)';
    else if (grandPercent >= 40) gradeName = 'Elégséges (2)';

    alert(`🎉 Teljes dolgozat kiértékelve!\n\nÖsszeredmény: ${grandCorrect} / ${grandTotal} pont (${grandPercent}%)\nVárható érdemjegy: ${gradeName}\n\nA hibák részletes elemzéséhez használd az "🤖 AI Tanácsadó Export" gombot!`);
  }

  function revealAnswers(blockId) {
    const blockEl = document.getElementById(blockId);
    if (!blockEl) return;

    const qItems = blockEl.querySelectorAll('.q-item');
    qItems.forEach(item => {
      const expected = item.dataset.expected;
      const input = item.querySelector('.q-input');
      if (input && expected) {
        input.value = expected;
        const qid = item.dataset.qId;
        studentAnswers[qid] = expected;
      }
      item.classList.remove('is-wrong');
      item.classList.add('is-correct');
    });

    saveCurrentAnswers();
    checkBlock(blockId);
  }

  function resetBlock(blockId) {
    if (!confirm('Biztosan törölni szeretnéd a beírt válaszaidat ebben a blokkban?')) return;

    const blockEl = document.getElementById(blockId);
    if (!blockEl) return;

    const qItems = blockEl.querySelectorAll('.q-item');
    qItems.forEach(item => {
      const qid = item.dataset.qId;
      delete studentAnswers[qid];
      const input = item.querySelector('.q-input');
      if (input) input.value = '';
      item.classList.remove('is-correct', 'is-wrong');
    });

    saveCurrentAnswers();
    delete blockResults[blockId];

    const scoreBadge = document.getElementById(`score-${blockId}`);
    if (scoreBadge) scoreBadge.textContent = '0 / ? pont';
    const statusEl = document.getElementById(`status-${blockId}`);
    if (statusEl) {
      statusEl.textContent = 'Még nem ellenőrizve';
      statusEl.style.color = '';
    }

    updateGlobalCounters();
  }

  function resetAll() {
    if (!confirm('Biztosan újrakezded az egész tesztet? Minden beírt válasz törlődik!')) return;
    studentAnswers = {};
    blockResults = {};
    localStorage.removeItem(STORAGE_KEY);
    renderQuiz();
    updateGlobalCounters();
  }

  function updateGlobalCounters() {
    let allInputs = document.querySelectorAll('.q-input');
    let filled = 0;
    let total = allInputs.length;

    allInputs.forEach(inp => {
      if (inp.value && inp.value.trim() !== '') filled++;
    });

    const filledCountEl = document.getElementById('filled-count');
    if (filledCountEl) filledCountEl.textContent = `${filled} / ${total}`;

    let totalCorrect = 0;
    let evaluatedTotal = 0;
    Object.keys(blockResults).forEach(bId => {
      totalCorrect += blockResults[bId].correct;
      evaluatedTotal += blockResults[bId].total;
    });

    const totalScoreEl = document.getElementById('total-score');
    if (totalScoreEl) {
      if (evaluatedTotal > 0) {
        const pct = Math.round((totalCorrect / evaluatedTotal) * 100);
        totalScoreEl.innerHTML = `<strong>${totalCorrect}</strong> / ${evaluatedTotal} pont (${pct}%)`;
      } else {
        totalScoreEl.innerHTML = `0 / ${total} pont`;
      }
    }
  }

  // ================== AI EXPORT MODUL ==================
  function generateAIPrompt(targetBlockId = null, filter = 'mistakes_only') {
    let grandCorrect = 0;
    let grandTotal = 0;
    let mistakes = [];
    let correctList = [];

    const blocksToScan = targetBlockId 
      ? QUIZ_DATA.blocks.filter(b => b.id === targetBlockId)
      : QUIZ_DATA.blocks;

    blocksToScan.forEach(block => {
      const blockEl = document.getElementById(block.id);
      if (!blockEl) return;

      const qItems = blockEl.querySelectorAll('.q-item');
      qItems.forEach(item => {
        const qid = item.dataset.qId;
        const expected = item.dataset.expected;
        const input = item.querySelector('.q-input');
        const userVal = input ? input.value : '';
        const parentTitle = item.dataset.parentTitle ? ` (${item.dataset.parentTitle})` : '';
        const promptText = (item.querySelector('.q-prompt')?.textContent || item.querySelector('label')?.textContent || item.querySelector('.interval-desc')?.textContent || qid) + parentTitle;
        const explanation = item.querySelector('.q-explanation')?.textContent || '';

        grandTotal++;

        if (isMatch(userVal, expected)) {
          grandCorrect++;
          correctList.push({ block: block.title, prompt: promptText.trim(), val: userVal.trim() });
        } else {
          mistakes.push({
            block: block.title,
            qid: qid,
            prompt: promptText.trim(),
            userVal: userVal.trim() || '(Nem adott meg választ)',
            expected: expected,
            explanation: explanation
          });
        }
      });
    });

    const pct = grandTotal > 0 ? Math.round((grandCorrect / grandTotal) * 100) : 0;
    const topicTitle = targetBlockId ? blocksToScan[0].title : 'Teljes 1. Témazáró (Természetes számok, műveletek, számegyenes)';

    let md = `# 5. Osztályos Matematika Dolgozat Elemzés és Korrepetálás\n\n`;
    md += `Kedves Matematika Tanár Asszisztens!\n`;
    md += `Kérlek, elemezd az 5. osztályos matematika témazáró feladatsorom eredményeit! Kérlek, tanárként lépésről lépésre segíts megérteni, miért tévesztettem, és adj személyre szabott gyakorló tippeket!\n\n`;
    md += `## 📊 Eredmény Összesítő\n`;
    md += `- **Témakör:** ${topicTitle}\n`;
    md += `- **Elért pontszám:** ${grandCorrect} / ${grandTotal} (${pct}%)\n`;
    md += `- **Hibás / kihagyott válaszok:** ${mistakes.length} db\n`;
    md += `- **Helyes válaszok:** ${grandCorrect} db\n\n`;

    if (mistakes.length === 0) {
      md += `🎉 **Minden feladat hibátlan lett!**\n`;
      md += `Kérlek, dicsérj meg, és adj 2-3 nehezebb, gondolkodtató bónusz feladatot ebből a tananyagból a matematika versenyre való felkészüléshez!\n`;
    } else {
      md += `## ❌ Részletes Hibák Jegyzéke\n\n`;
      mistakes.forEach((m, idx) => {
        md += `### ${idx + 1}. [${m.block}] ${m.prompt}\n`;
        md += `- **A diákom által adott válasz:** \`${m.userVal}\`\n`;
        md += `- **Elvárt helyes eredmény:** \`${m.expected}\`\n`;
        if (m.explanation) {
          md += `- **Háttér-magyarázat a tananyagból:** _${m.explanation}_\n`;
        }
        md += `\n`;
      });

      if (filter === 'all' && correctList.length > 0) {
        md += `## ✅ Sikeresen Megoldott Feladatok (${correctList.length} db)\n`;
        correctList.forEach((c, idx) => {
          md += `- [${c.block}] ${c.prompt} = \`${c.val}\` ✓\n`;
        });
        md += `\n`;
      }

      md += `## 🎯 Kérésem hozzád (AI Tanár):\n`;
      md += `1. **Magyarázat:** Kérlek, magyarázd el egyszerűen, 5. osztályos szinten, hol téveszthettem a fenti feladatokban (pl. helyiérték elírás, műveleti sorrend, zárójelezés vagy csoportosítás trükkök)!\n`;
      md += `2. **Szabályok felidézése:** Idézd fel a legfontosabb szabályt vagy fejszámolási tippet minden hibához!\n`;
      md += `3. **Gyakorló feladatok:** Készíts nekem 3 hasonló, új gyakorló példát a javításhoz, a megoldásokkal együtt!\n`;
    }

    return md;
  }

  function showExportModal(blockId = null) {
    currentExportScope = blockId;
    if (blockId) {
      checkBlock(blockId);
    } else {
      checkAll();
    }

    updateExportModalContent();
    const modal = document.getElementById('ai-modal');
    if (modal) modal.classList.add('is-active');
  }

  function updateExportModalContent() {
    const promptText = generateAIPrompt(currentExportScope, exportFilter);
    const promptBox = document.getElementById('ai-prompt-content');
    const toast = document.getElementById('copy-toast');
    if (promptBox) promptBox.value = promptText;
    if (toast) toast.classList.remove('is-shown');
  }

  function setExportFilter(newFilter) {
    exportFilter = newFilter;
    updateExportModalContent();
  }

  function closeModal() {
    const modal = document.getElementById('ai-modal');
    if (modal) modal.classList.remove('is-active');
  }

  function copyPromptToClipboard() {
    const promptBox = document.getElementById('ai-prompt-content');
    const toast = document.getElementById('copy-toast');
    if (!promptBox) return;

    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(promptBox.value).then(() => {
        showCopySuccess(toast);
      }).catch(() => {
        fallbackCopy(promptBox, toast);
      });
    } else {
      fallbackCopy(promptBox, toast);
    }
  }

  function fallbackCopy(textarea, toast) {
    textarea.select();
    try {
      document.execCommand('copy');
      showCopySuccess(toast);
    } catch (err) {
      alert('Kérlek jelöld ki kézzel a szöveget és másold ki (Ctrl+C / Cmd+C)!');
    }
  }

  function showCopySuccess(toast) {
    if (toast) {
      toast.classList.add('is-shown');
      setTimeout(() => toast.classList.remove('is-shown'), 3500);
    }
  }

  // ================== NYOMTATÁS ==================
  function printQuiz(withAnswers = false) {
    if (withAnswers) {
      document.body.classList.add('print-with-answers');
      QUIZ_DATA.blocks.forEach(block => revealAnswers(block.id));
    } else {
      document.body.classList.remove('print-with-answers');
    }

    window.print();

    setTimeout(() => {
      document.body.classList.remove('print-with-answers');
      restoreAnswersToInputs();
    }, 800);
  }

  // Globális interfész export
  window.quizApp = {
    checkBlock,
    checkAll,
    revealAnswers,
    resetBlock,
    resetAll,
    exportBlockToAI: (bId) => showExportModal(bId),
    exportAllToAI: () => showExportModal(null),
    setExportFilter,
    closeModal,
    copyPromptToClipboard,
    printBlank: () => printQuiz(false),
    printKey: () => printQuiz(true)
  };

  document.addEventListener('DOMContentLoaded', () => {
    loadSavedAnswers();
    renderQuiz();
    bindInputEvents();
  });

})();
