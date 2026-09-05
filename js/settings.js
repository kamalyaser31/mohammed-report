/**
 * إدارة إعدادات الجلسة وتخصيص الحقول والمظهر (Settings & Preferences)
 */
function setTheme(t) {
    document.documentElement.setAttribute("data-theme", t);
    localStorage.setItem(STORAGE_KEYS.THEME, t);
    const btn = document.getElementById("themeToggleBtn");
    if (btn) btn.textContent = t === "dark" ? "الوضع الفاتح" : "الوضع الليلي";
}

function toggleTheme() {
    setTheme(document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark");
}

function setDatePreset(preset) {
    const d = new Date();
    if (preset === 'yesterday') {
        d.setDate(d.getDate() - 1);
    }
    const formatted = d.toLocaleDateString('ar-EG', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    const el = document.getElementById('reportDate');
    if (el) {
        el.value = formatted;
        saveState();
    }
}

function updateSettingsSummary() {
    const getFieldValue = id => document.getElementById(id)?.value || '';
    const badge = document.getElementById('settingsBadge');
    if (!badge) return;
    const dur = formatDurationText(getFieldValue('durationHours'), getFieldValue('durationMinutes'));
    badge.textContent = `${TEACHER_NAME} • ${dur}`;
}

function loadSettings() {
    const s = JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS) || '{}');
    document.getElementById('reportDate').value = s.date || new Date().toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });
    const activeDraft = typeof getActiveDraft === 'function' ? getActiveDraft() : null;
    document.getElementById('durationHours').value = s.durationHours !== undefined ? s.durationHours : '1';
    document.getElementById('durationMinutes').value = s.durationMinutes !== undefined ? s.durationMinutes : '0';
    document.getElementById('halaNum').value = activeDraft?.halaNum || s.halaNum || '';

    const details = document.getElementById('settingsDetails');
    if (details) {
        if (localStorage.getItem(STORAGE_KEYS.SETTINGS_OPEN) === '0') {
            details.removeAttribute('open');
        }
        details.addEventListener('toggle', () => {
            localStorage.setItem(STORAGE_KEYS.SETTINGS_OPEN, details.open ? '1' : '0');
        });
    }
    updateSettingsSummary();
}

function saveState() {
    syncCurrentDraft();
    localStorage.setItem(STORAGE_KEYS.DRAFTS, JSON.stringify(drafts));
    localStorage.setItem(STORAGE_KEYS.DATA, JSON.stringify(students));
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify({
        date: document.getElementById('reportDate')?.value || '',
        teacherName: TEACHER_NAME,
        durationHours: document.getElementById('durationHours')?.value || '',
        durationMinutes: document.getElementById('durationMinutes')?.value || '',
        halaNum: document.getElementById('halaNum')?.value || ''
    }));
    updateSettingsSummary();
    renderStats();
    updateDraftSelectUI();
}

function openSettingsModal() {
    VISIBILITY_FIELD_KEYS.forEach(k => {
        const el = document.getElementById(`vis_${k}`);
        if (el) el.checked = fieldVisibility[k] !== false;
    });

    const modal = document.getElementById('settingsModal');
    if (modal) modal.style.display = 'flex';
}

function closeSettingsModal() {
    const modal = document.getElementById('settingsModal');
    if (modal) modal.style.display = 'none';
}

function updateFieldVisibility() {
    VISIBILITY_FIELD_KEYS.forEach(k => {
        const el = document.getElementById(`vis_${k}`);
        if (el) fieldVisibility[k] = el.checked;
    });

    localStorage.setItem(STORAGE_KEYS.FIELD_VIS, JSON.stringify(fieldVisibility));
    render();
    showToast('تم حفظ تفضيلات الحقول ✓');
}

function resetFieldVisibility() {
    fieldVisibility = { ...DEFAULT_FIELD_VISIBILITY };
    VISIBILITY_FIELD_KEYS.forEach(k => {
        const el = document.getElementById(`vis_${k}`);
        if (el) el.checked = true;
    });

    localStorage.setItem(STORAGE_KEYS.FIELD_VIS, JSON.stringify(fieldVisibility));
    render();
    showToast('تم استعادة كافة الحقول ✓');
}
