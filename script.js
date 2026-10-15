// MediTrip - Frontend JavaScript
// API endpoints and interaction logic (UI only, no backend implementation)

// API Configuration
const API_BASE_URL = '/api/v1';

const API_ENDPOINTS = {
    // Service endpoints
    services: {
        checkup: `${API_BASE_URL}/services/checkup`,
        tcm: `${API_BASE_URL}/services/tcm`,
        dental: `${API_BASE_URL}/services/dental`,
        optometry: `${API_BASE_URL}/services/optometry`,
        aesthetics: `${API_BASE_URL}/services/aesthetics`,
        boao: `${API_BASE_URL}/services/boao`,
        list: `${API_BASE_URL}/services`
    },

    // Market/destination endpoints
    markets: {
        list: `${API_BASE_URL}/markets`,
        southeast_asia: `${API_BASE_URL}/markets/southeast-asia`,
        russia_central_asia: `${API_BASE_URL}/markets/russia-central-asia`,
        middle_east: `${API_BASE_URL}/markets/middle-east`,
        europe: `${API_BASE_URL}/markets/europe`
    },

    // Consultation and booking
    consultation: {
        create: `${API_BASE_URL}/consultation/create`,
        status: `${API_BASE_URL}/consultation/status`,
        list: `${API_BASE_URL}/consultation/list`
    },

    // Hospital network
    hospitals: {
        list: `${API_BASE_URL}/hospitals`,
        search: `${API_BASE_URL}/hospitals/search`,
        details: `${API_BASE_URL}/hospitals/:id`
    },

    // Insurance and payment
    insurance: {
        check: `${API_BASE_URL}/insurance/check`,
        providers: `${API_BASE_URL}/insurance/providers`,
        directBilling: `${API_BASE_URL}/insurance/direct-billing`
    },

    payment: {
        methods: `${API_BASE_URL}/payment/methods`,
        process: `${API_BASE_URL}/payment/process`,
        currencies: `${API_BASE_URL}/payment/currencies`
    },

    // Contact and inquiries
    contact: {
        submit: `${API_BASE_URL}/contact/submit`,
        callback: `${API_BASE_URL}/contact/callback`
    },

    // Content (SEO/Insights)
    content: {
        insights: `${API_BASE_URL}/content/insights`,
        articles: `${API_BASE_URL}/content/articles`,
        faqs: `${API_BASE_URL}/content/faqs`
    },

    // User authentication
    auth: {
        login: `${API_BASE_URL}/auth/login`,
        register: `${API_BASE_URL}/auth/register`,
        logout: `${API_BASE_URL}/auth/logout`,
        forgotPassword: `${API_BASE_URL}/auth/forgot-password`,
        changePassword: `${API_BASE_URL}/auth/change-password`,
        deleteAccount: `${API_BASE_URL}/auth/delete-account`
    },

    // User data
    user: {
        notes: `${API_BASE_URL}/user/notes`,
        profile: `${API_BASE_URL}/user/profile`
    }
};

// Language data structure
const LANGUAGES = {
    en: 'English',
    zh: '中文'
};

// User Management System (LocalStorage-based)
class UserManager {
    constructor() {
        this.storageKey = 'meditrip_users';
        this.currentUserKey = 'meditrip_current_user';
        this.notesKey = 'meditrip_notes';
    }

    // Get all users
    getUsers() {
        const users = localStorage.getItem(this.storageKey);
        return users ? JSON.parse(users) : {};
    }

    // Save users
    saveUsers(users) {
        localStorage.setItem(this.storageKey, JSON.stringify(users));
    }

    // Register new user
    register(email, password) {
        const users = this.getUsers();

        // Check if email already exists
        if (users[email]) {
            return { success: false, error: 'Email already registered' };
        }

        // Save user (in production, password should be hashed)
        users[email] = {
            email: email,
            password: password, // In production: hash this!
            role: 'user', // default role: user | staff | admin | superadmin
            createdAt: new Date().toISOString()
        };

        this.saveUsers(users);
        return { success: true };
    }

    // Login user
    login(email, password) {
        const users = this.getUsers();
        const user = users[email];

        if (!user || user.password !== password) {
            return { success: false, error: 'Login credentials are incorrect' };
        }

        // Set current user
        localStorage.setItem(this.currentUserKey, email);
        return { success: true, user: { email: email } };
    }

    // Get current user
    getCurrentUser() {
        const email = localStorage.getItem(this.currentUserKey);
        if (!email) return null;

        const users = this.getUsers();
        const userData = users[email];
        if (!userData) return null;

        // Superadmin is hardcoded
        const role = (email === 'nattugglahk@gmail.com') ? 'superadmin' : (userData.role || 'user');
        return { email, role, createdAt: userData.createdAt };
    }

    // Logout
    logout() {
        localStorage.removeItem(this.currentUserKey);
    }

    // Change password
    changePassword(currentPassword, newPassword) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };

        const users = this.getUsers();
        const userData = users[user.email];

        if (userData.password !== currentPassword) {
            return { success: false, error: 'Current password is incorrect' };
        }

        userData.password = newPassword;
        this.saveUsers(users);
        return { success: true };
    }

    // Delete account
    deleteAccount() {
        const user = this.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };

        const users = this.getUsers();
        delete users[user.email];
        this.saveUsers(users);

        // Delete user's notes
        const allNotes = this.getAllNotes();
        delete allNotes[user.email];
        localStorage.setItem(this.notesKey, JSON.stringify(allNotes));

        this.logout();
        return { success: true };
    }

    // Get all users (admin/superadmin only)
    getAllUsers() {
        const user = this.getCurrentUser();
        if (!user || (user.role !== 'admin' && user.role !== 'superadmin')) {
            return { success: false, error: 'Unauthorized' };
        }
        const users = this.getUsers();
        return {
            success: true,
            users: Object.entries(users).map(([email, data]) => ({
                email,
                role: (email === 'nattugglahk@gmail.com') ? 'superadmin' : (data.role || 'user'),
                createdAt: data.createdAt
            }))
        };
    }

    // Update user role (superadmin only)
    updateUserRole(targetEmail, newRole) {
        const user = this.getCurrentUser();
        if (!user || user.role !== 'superadmin') {
            return { success: false, error: 'Only superadmin can change roles' };
        }
        if (targetEmail === 'nattugglahk@gmail.com') {
            return { success: false, error: 'Cannot modify superadmin role' };
        }
        const users = this.getUsers();
        if (!users[targetEmail]) {
            return { success: false, error: 'User not found' };
        }
        users[targetEmail].role = newRole;
        this.saveUsers(users);
        return { success: true };
    }

    // Delete user account (admin only)
    deleteUserAccount(targetEmail) {
        const user = this.getCurrentUser();
        if (!user || user.role !== 'superadmin') {
            return { success: false, error: 'Only superadmin can delete accounts' };
        }
        if (targetEmail === 'nattugglahk@gmail.com') {
            return { success: false, error: 'Cannot delete superadmin' };
        }
        const users = this.getUsers();
        if (!users[targetEmail]) {
            return { success: false, error: 'User not found' };
        }
        delete users[targetEmail];
        this.saveUsers(users);

        // Delete user's notes
        const allNotes = this.getAllNotes();
        delete allNotes[targetEmail];
        localStorage.setItem(this.notesKey, JSON.stringify(allNotes));

        return { success: true };
    }

    // Password reset (simulation)
    resetPassword(email) {
        const users = this.getUsers();
        if (!users[email]) {
            return { success: false, error: 'Email not found' };
        }

        // In production, send email with reset link
        return { success: true, message: 'Password reset instructions sent to your email' };
    }

    // Notes Management
    getAllNotes() {
        const notes = localStorage.getItem(this.notesKey);
        return notes ? JSON.parse(notes) : {};
    }

    getUserNotes() {
        const user = this.getCurrentUser();
        if (!user) return [];

        const allNotes = this.getAllNotes();
        return allNotes[user.email] || [];
    }

    addNote(title, content) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };

        const allNotes = this.getAllNotes();
        if (!allNotes[user.email]) {
            allNotes[user.email] = [];
        }

        const note = {
            id: Date.now(),
            title: title,
            content: content,
            createdAt: new Date().toISOString()
        };

        allNotes[user.email].push(note);
        localStorage.setItem(this.notesKey, JSON.stringify(allNotes));

        return { success: true, note: note };
    }

    deleteNote(noteId) {
        const user = this.getCurrentUser();
        if (!user) return { success: false, error: 'Not logged in' };

        const allNotes = this.getAllNotes();
        if (!allNotes[user.email]) return { success: false };

        allNotes[user.email] = allNotes[user.email].filter(note => note.id !== noteId);
        localStorage.setItem(this.notesKey, JSON.stringify(allNotes));

        return { success: true };
    }
}

// Initialize user manager
const userManager = new UserManager();

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeApp();
});

function initializeApp() {
    console.log('MediTrip initialized');
    console.log('API Endpoints:', API_ENDPOINTS);

    // Set up event listeners
    setupServiceButtons();
    setupLanguageSwitcher();
    setupSmoothScroll();
    setupModals();
    setupAuthSystem();
    setupDashboard();
    setupAccountManagement();
    setupCustomerManagement();

    // Check if user is logged in
    updateUIForUser();

    // Log available API structure for development
    logAPIStructure();
}

// Update UI based on login state
function updateUIForUser() {
    const user = userManager.getCurrentUser();
    const loginBtn = document.getElementById('login-btn');
    const userMenu = document.getElementById('user-menu');
    const userEmailDisplay = document.getElementById('user-email-display');

    if (user) {
        loginBtn.style.display = 'none';
        userMenu.style.display = 'flex';
        userEmailDisplay.textContent = user.email;
        document.getElementById('user-menu-toggle').title = user.email;

        // Show/hide role-specific menu items
        const customerMgmtBtn = document.getElementById('customer-mgmt-btn');
        const accountMgmtBtn = document.getElementById('account-mgmt-btn');

        // Customer Management: visible to staff, admin, superadmin
        if (customerMgmtBtn) {
            customerMgmtBtn.style.display = ['staff', 'admin', 'superadmin'].includes(user.role) ? 'block' : 'none';
        }

        // Account Management: visible only to superadmin
        if (accountMgmtBtn) {
            accountMgmtBtn.style.display = (user.role === 'superadmin') ? 'block' : 'none';
        }
    } else {
        loginBtn.style.display = 'block';
        userMenu.style.display = 'none';
        document.getElementById('user-dropdown').hidden = true;
        document.getElementById('user-menu-toggle').setAttribute('aria-expanded', 'false');
    }
}

// User dropdown menu
function setupUserDropdown() {
    const toggle = document.getElementById('user-menu-toggle');
    const dropdown = document.getElementById('user-dropdown');
    if (!toggle || !dropdown) return;

    const setOpen = (open) => {
        dropdown.hidden = !open;
        toggle.setAttribute('aria-expanded', String(open));
    };

    toggle.addEventListener('click', (e) => {
        e.stopPropagation();
        setOpen(dropdown.hidden);
    });

    // Close after choosing an item, when clicking elsewhere, or on Escape
    dropdown.addEventListener('click', () => setOpen(false));
    document.addEventListener('click', () => setOpen(false));
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') setOpen(false);
    });
}

// Modal Management
function setupModals() {
    // Get all modals
    const modals = document.querySelectorAll('.modal');
    const closeButtons = document.querySelectorAll('.close-modal');

    // Close modal when clicking X
    closeButtons.forEach(btn => {
        btn.addEventListener('click', function() {
            const modal = this.closest('.modal');
            modal.style.display = 'none';
            modal.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        });
    });

    // Close modal when clicking outside
    window.addEventListener('click', (e) => {
        if (e.target.classList.contains('modal')) {
            e.target.style.display = 'none';
            e.target.setAttribute('aria-hidden', 'true');
            document.body.classList.remove('modal-open');
        }
    });

    // CTA Button - Open Consultation Modal
    const ctaButton = document.querySelector('.cta-button');
    const consultationModal = document.getElementById('consultation-modal');

    if (ctaButton) {
        ctaButton.addEventListener('click', () => {
            consultationModal.style.display = 'block';
        });
    }

    // Consultation Form Submit - emailed to the team inbox via FormSubmit
    const consultationForm = document.getElementById('consultation-form');
    if (consultationForm) {
        consultationForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const submitButton = consultationForm.querySelector('button[type="submit"]');
            const errorBox = document.getElementById('consultation-error');
            const data = Object.fromEntries(new FormData(consultationForm).entries());

            errorBox.classList.remove('show');
            // Reuse the existing text node so applyTranslations keeps tracking it
            const buttonLabel = submitButton.firstChild;
            submitButton.disabled = true;
            buttonLabel.nodeValue = t('Sending...');

            try {
                await sendConsultationEmail(data);
                showNotification(t('Thank you! We will contact you soon.'));
                consultationModal.style.display = 'none';
                consultationForm.reset();
            } catch (err) {
                console.error('Consultation email failed:', err);
                errorBox.textContent = t('Sorry, your request could not be sent. Please try again or email us at {email}.', { email: CONSULTATION_INBOX });
                errorBox.classList.add('show');
            } finally {
                submitButton.disabled = false;
                buttonLabel.nodeValue = t('Submit Consultation Request');
            }
        });
    }
}

// Inbox that receives consultation requests
const CONSULTATION_INBOX = 'nattugglahk@gmail.com';
const CONSULTATION_ENDPOINT = `https://formsubmit.co/ajax/${CONSULTATION_INBOX}`;

async function sendConsultationEmail(data) {
    const serviceSelect = document.querySelector('#consultation-form select[name="service"]');
    const serviceLabel = serviceSelect?.selectedOptions[0]?.textContent || data.service;
    const response = await fetch(CONSULTATION_ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
            'Full Name': data.name,
            'Email': data.email,
            'Phone': data.phone || '-',
            'Service of Interest': serviceLabel,
            'Message': data.message || '-',
            'Language': LANGUAGES[currentLanguage] || currentLanguage,
            _subject: `MediTrip consultation request: ${data.name} (${serviceLabel})`,
            _replyto: data.email,
            _template: 'table',
            _captcha: 'false',
            _honey: data._honey || ''
        })
    });
    const result = await response.json().catch(() => ({}));
    // FormSubmit returns success as the string "true"
    if (!response.ok || String(result.success) !== 'true') {
        throw new Error(result.message || `HTTP ${response.status}`);
    }
    return result;
}

// Auth System
function setupAuthSystem() {
    const loginBtn = document.getElementById('login-btn');
    const logoutBtn = document.getElementById('logout-btn');
    const authModal = document.getElementById('auth-modal');

    const loginForm = document.getElementById('login-form');
    const registerForm = document.getElementById('register-form');
    const forgotPasswordForm = document.getElementById('forgot-password-form');

    const loginContainer = document.getElementById('login-form-container');
    const registerContainer = document.getElementById('register-form-container');
    const forgotPasswordContainer = document.getElementById('forgot-password-container');

    // Show auth modal
    if (loginBtn) {
        loginBtn.addEventListener('click', () => {
            authModal.style.display = 'block';
            showLoginForm();
        });
    }

    // User dropdown menu (email -> Dashboard / Logout)
    setupUserDropdown();

    // Logout
    if (logoutBtn) {
        logoutBtn.addEventListener('click', () => {
            userManager.logout();
            updateUIForUser();
            showNotification(t('Logged out successfully'));
        });
    }

    // Switch forms
    document.getElementById('show-register')?.addEventListener('click', (e) => {
        e.preventDefault();
        showRegisterForm();
    });

    document.getElementById('show-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    document.getElementById('show-forgot-password')?.addEventListener('click', (e) => {
        e.preventDefault();
        showForgotPasswordForm();
    });

    document.getElementById('back-to-login')?.addEventListener('click', (e) => {
        e.preventDefault();
        showLoginForm();
    });

    function showLoginForm() {
        loginContainer.style.display = 'block';
        registerContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'none';
        clearErrors();
    }

    function showRegisterForm() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'block';
        forgotPasswordContainer.style.display = 'none';
        clearErrors();
    }

    function showForgotPasswordForm() {
        loginContainer.style.display = 'none';
        registerContainer.style.display = 'none';
        forgotPasswordContainer.style.display = 'block';
        clearErrors();
    }

    function clearErrors() {
        document.querySelectorAll('.form-error, .form-success').forEach(el => {
            el.classList.remove('show');
            el.textContent = '';
        });
    }

    // Login Form Submit
    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('login-email').value;
            const password = document.getElementById('login-password').value;
            const errorDiv = document.getElementById('login-error');

            const result = userManager.login(email, password);

            if (result.success) {
                authModal.style.display = 'none';
                loginForm.reset();
                updateUIForUser();
                showNotification(t('Welcome back!'));
            } else {
                errorDiv.textContent = t(result.error);
                errorDiv.classList.add('show');
            }
        });
    }

    // Register Form Submit
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('register-email').value;
            const password = document.getElementById('register-password').value;
            const confirmPassword = document.getElementById('register-password-confirm').value;
            const errorDiv = document.getElementById('register-error');

            // Validation
            if (password.length < 8) {
                errorDiv.textContent = t('Password must be at least 8 characters');
                errorDiv.classList.add('show');
                return;
            }

            if (password !== confirmPassword) {
                errorDiv.textContent = t('Passwords do not match');
                errorDiv.classList.add('show');
                return;
            }

            const result = userManager.register(email, password);

            if (result.success) {
                showNotification(t('Account created successfully! Please login.'));
                showLoginForm();
                registerForm.reset();
            } else {
                errorDiv.textContent = t(result.error);
                errorDiv.classList.add('show');
            }
        });
    }

    // Forgot Password Form Submit
    if (forgotPasswordForm) {
        forgotPasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('forgot-email').value;
            const errorDiv = document.getElementById('forgot-error');
            const successDiv = document.getElementById('forgot-success');

            const result = userManager.resetPassword(email);

            if (result.success) {
                successDiv.textContent = t(result.message);
                successDiv.classList.add('show');
                errorDiv.classList.remove('show');
                forgotPasswordForm.reset();
            } else {
                errorDiv.textContent = t(result.error);
                errorDiv.classList.add('show');
                successDiv.classList.remove('show');
            }
        });
    }
}

// Dashboard System
function setupDashboard() {
    const dashboardModal = document.getElementById('dashboard-modal');

    // Open dashboard on a specific tab (from the user dropdown)
    document.querySelectorAll('.user-dropdown-item[data-tab]').forEach(item => {
        item.addEventListener('click', () => {
            dashboardModal.style.display = 'block';
            document.querySelector(`.tab-button[data-tab="${item.dataset.tab}"]`)?.click();
            loadUserNotes();
        });
    });

    // Tab switching
    const tabButtons = document.querySelectorAll('.tab-button');
    tabButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            const tabName = btn.dataset.tab;

            // Update buttons
            tabButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            // Update content
            document.querySelectorAll('.tab-content').forEach(content => {
                content.style.display = 'none';
                content.classList.remove('active');
            });

            const targetTab = document.getElementById(`${tabName}-tab`);
            targetTab.style.display = 'block';
            targetTab.classList.add('active');
        });
    });

    // Note Form Submit
    const noteForm = document.getElementById('note-form');
    if (noteForm) {
        noteForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const title = document.getElementById('note-title').value;
            const content = document.getElementById('note-content').value;

            const result = userManager.addNote(title, content);

            if (result.success) {
                showNotification(t('Note added successfully'));
                noteForm.reset();
                loadUserNotes();
            } else {
                showNotification(t(result.error));
            }
        });
    }

    // Change Password Form
    const changePasswordForm = document.getElementById('change-password-form');
    if (changePasswordForm) {
        changePasswordForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const currentPassword = document.getElementById('current-password').value;
            const newPassword = document.getElementById('new-password').value;
            const confirmPassword = document.getElementById('new-password-confirm').value;
            const errorDiv = document.getElementById('password-error');
            const successDiv = document.getElementById('password-success');

            // Validation
            if (newPassword.length < 8) {
                errorDiv.textContent = t('New password must be at least 8 characters');
                errorDiv.classList.add('show');
                successDiv.classList.remove('show');
                return;
            }

            if (newPassword !== confirmPassword) {
                errorDiv.textContent = t('New passwords do not match');
                errorDiv.classList.add('show');
                successDiv.classList.remove('show');
                return;
            }

            const result = userManager.changePassword(currentPassword, newPassword);

            if (result.success) {
                successDiv.textContent = t('Password updated successfully');
                successDiv.classList.add('show');
                errorDiv.classList.remove('show');
                changePasswordForm.reset();
            } else {
                errorDiv.textContent = t(result.error);
                errorDiv.classList.add('show');
                successDiv.classList.remove('show');
            }
        });
    }

    // Delete Account
    const deleteAccountBtn = document.getElementById('delete-account-btn');
    const deleteConfirmModal = document.getElementById('delete-confirm-modal');
    const confirmDeleteBtn = document.getElementById('confirm-delete-btn');
    const cancelDeleteBtn = document.getElementById('cancel-delete-btn');

    if (deleteAccountBtn) {
        deleteAccountBtn.addEventListener('click', () => {
            deleteConfirmModal.style.display = 'block';
        });
    }

    if (cancelDeleteBtn) {
        cancelDeleteBtn.addEventListener('click', () => {
            deleteConfirmModal.style.display = 'none';
        });
    }

    if (confirmDeleteBtn) {
        confirmDeleteBtn.addEventListener('click', () => {
            const result = userManager.deleteAccount();

            if (result.success) {
                deleteConfirmModal.style.display = 'none';
                dashboardModal.style.display = 'none';
                updateUIForUser();
                showNotification(t('Account deleted successfully'));
            }
        });
    }
}

// Setup Account Management (Superadmin only)
function setupAccountManagement() {
    const accountMgmtBtn = document.getElementById('account-mgmt-btn');
    const accountMgmtModal = document.getElementById('account-mgmt-modal');

    if (accountMgmtBtn) {
        accountMgmtBtn.addEventListener('click', () => {
            openAccountManagement();
        });
    }
}

function openAccountManagement() {
    const modal = document.getElementById('account-mgmt-modal');
    const result = userManager.getAllUsers();

    if (!result.success) {
        showNotification(result.error);
        return;
    }

    // Store all users for filtering
    window.allAccountUsers = result.users;

    // Render initial list
    renderAccountList(result.users);

    // Setup search
    const searchInput = document.getElementById('account-search');
    searchInput.value = ''; // Clear previous search
    searchInput.addEventListener('input', filterAccountList);

    modal.style.display = 'block';
    modal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
}

function filterAccountList(e) {
    const searchTerm = e.target.value.toLowerCase().trim();
    const filtered = window.allAccountUsers.filter(user =>
        user.email.toLowerCase().includes(searchTerm)
    );
    renderAccountList(filtered);
}

function renderAccountList(users) {
    const accountList = document.getElementById('account-list');
    const accountCount = document.getElementById('account-count');

    // Update count
    const currentLang = localStorage.getItem('language') || 'en';
    const countText = currentLang === 'zh'
        ? `${users.length} 个账号`
        : `${users.length} account${users.length !== 1 ? 's' : ''}`;
    accountCount.textContent = countText;

    // Render table rows
    if (users.length === 0) {
        accountList.innerHTML = `
            <tr>
                <td colspan="4" style="text-align:center;color:#64748B;padding:2rem;">
                    ${currentLang === 'zh' ? '未找到匹配的账号' : 'No accounts found'}
                </td>
            </tr>
        `;
        return;
    }

    accountList.innerHTML = users.map(user => {
        const isCurrentSuperadmin = user.email === 'nattugglahk@gmail.com';
        const roleOptions = ['user', 'staff', 'admin'].map(role =>
            `<option value="${role}" ${user.role === role ? 'selected' : ''}>${role.charAt(0).toUpperCase() + role.slice(1)}</option>`
        ).join('');

        const deleteText = currentLang === 'zh' ? '删除' : 'Delete';
        const protectedText = currentLang === 'zh' ? '受保护' : 'Protected';

        return `
            <tr data-email="${user.email}">
                <td>${escapeHtml(user.email)}</td>
                <td>
                    ${isCurrentSuperadmin
                        ? `<span style="color:#38BDF8;font-weight:600;">Superadmin</span>`
                        : `<select class="role-select" data-email="${user.email}">
                            ${roleOptions}
                        </select>`
                    }
                </td>
                <td>${formatDate(user.createdAt)}</td>
                <td class="action-buttons">
                    ${isCurrentSuperadmin
                        ? `<span style="color:#64748B;">${protectedText}</span>`
                        : `<button class="btn-delete" onclick="deleteUserAccount('${user.email}')">${deleteText}</button>`
                    }
                </td>
            </tr>
        `;
    }).join('');

    // Add event listeners for role changes
    accountList.querySelectorAll('.role-select').forEach(select => {
        select.addEventListener('change', (e) => {
            const email = e.target.dataset.email;
            const newRole = e.target.value;
            changeUserRole(email, newRole);
        });
    });
}


function changeUserRole(email, newRole) {
    const result = userManager.updateUserRole(email, newRole);
    if (result.success) {
        showNotification(`Role updated to ${newRole} for ${email}`);
    } else {
        showNotification(result.error);
        openAccountManagement(); // Refresh
    }
}

function deleteUserAccount(email) {
    if (!confirm(`Are you sure you want to delete the account for ${email}? This action cannot be undone.`)) {
        return;
    }

    const result = userManager.deleteUserAccount(email);
    if (result.success) {
        showNotification(`Account ${email} deleted successfully`);
        openAccountManagement(); // Refresh
    } else {
        showNotification(result.error);
    }
}

// Setup Customer Management Navigation
function setupCustomerManagement() {
    const customerMgmtBtn = document.getElementById('customer-mgmt-btn');
    if (customerMgmtBtn) {
        customerMgmtBtn.addEventListener('click', () => {
            window.location.href = 'customer-management.html';
        });
    }
}

// Load and display user notes
function loadUserNotes() {
    const notesList = document.getElementById('notes-list');
    const notes = userManager.getUserNotes();

    if (notes.length === 0) {
        notesList.innerHTML = `<p style="text-align: center; color: #999;">${t('No notes yet. Create your first note above!')}</p>`;
        return;
    }

    notesList.innerHTML = notes.reverse().map(note => `
        <div class="note-item" data-note-id="${note.id}">
            <div class="note-header">
                <div class="note-title">${escapeHtml(note.title)}</div>
                <div class="note-actions">
                    <button class="note-delete-btn" onclick="deleteNote(${note.id})">🗑️</button>
                </div>
            </div>
            <div class="note-content">${escapeHtml(note.content)}</div>
            <div class="note-date">${formatDate(note.createdAt)}</div>
        </div>
    `).join('');
}

// Delete note
function deleteNote(noteId) {
    if (confirm(t('Are you sure you want to delete this note?'))) {
        const result = userManager.deleteNote(noteId);
        if (result.success) {
            showNotification(t('Note deleted'));
            loadUserNotes();
        }
    }
}

// Helper functions
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleString();
}

// Service button handlers

// Service button handlers
function setupServiceButtons() {
    const serviceButtons = document.querySelectorAll('.service-button');

    serviceButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const serviceType = e.target.dataset.service;
            handleServiceClick(serviceType);
        });
    });
}

// Open the service's directory page
function handleServiceClick(serviceType) {
    window.location.href = `service.html?type=${encodeURIComponent(serviceType)}`;
}

// Contact form handler
function setupContactForm() {
    const form = document.querySelector('.contact-form');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            handleContactFormSubmit(e.target);
        });
    }
}

function handleContactFormSubmit(form) {
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());

    console.log('Contact form submitted:', data);
    console.log(`API Endpoint: ${API_ENDPOINTS.contact.submit}`);

    // UI feedback
    showNotification(t('Thank you for your inquiry. We will contact you soon.'));

    // TODO: Implement API call
    // Example structure:
    // submitContactForm(data);

    // Reset form
    form.reset();
}

// Language switcher
function setupLanguageSwitcher() {
    const customSelect = document.querySelector('.custom-select');
    const selectSelected = customSelect.querySelector('.select-selected');
    const selectItems = customSelect.querySelector('.select-items');
    const options = selectItems.querySelectorAll('div');

    // Toggle dropdown
    selectSelected.addEventListener('click', function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        selectItems.classList.toggle('select-hide');
        this.classList.toggle('select-arrow-active');
    });

    // Select option
    options.forEach(option => {
        option.addEventListener('click', function(e) {
            const langCode = this.getAttribute('data-value');
            selectSelected.innerHTML = this.innerHTML;
            selectItems.classList.add('select-hide');
            selectSelected.classList.remove('select-arrow-active');
            handleLanguageChange(langCode);
        });
    });

    // Close dropdown when clicking outside
    document.addEventListener('click', function() {
        closeAllSelect();
    });

    // Restore saved language preference
    const savedLang = localStorage.getItem('preferred_language');
    const savedOption = selectItems.querySelector(`[data-value="${savedLang}"]`);
    if (savedOption) {
        selectSelected.innerHTML = savedOption.innerHTML;
        applyTranslations(savedLang);
    }

    function closeAllSelect(elmnt) {
        const arrNo = [];
        const selectItems = document.getElementsByClassName('select-items');
        const selectSelected = document.getElementsByClassName('select-selected');

        for (let i = 0; i < selectSelected.length; i++) {
            if (elmnt == selectSelected[i]) {
                arrNo.push(i);
            } else {
                selectSelected[i].classList.remove('select-arrow-active');
            }
        }

        for (let i = 0; i < selectItems.length; i++) {
            if (arrNo.indexOf(i)) {
                selectItems[i].classList.add('select-hide');
            }
        }
    }
}

function handleLanguageChange(langCode) {
    console.log(`Language changed to: ${langCode} (${LANGUAGES[langCode]})`);

    applyTranslations(langCode);

    // Refresh dynamic content rendered in the current language
    if (document.getElementById('dashboard-modal').style.display === 'block') {
        loadUserNotes();
    }

    // UI feedback
    showNotification(t('Language: {language}', { language: LANGUAGES[langCode] }));

    // Store preference
    localStorage.setItem('preferred_language', langCode);
}

// Smooth scroll for navigation
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('.nav-link');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href.startsWith('#')) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
                }
            }
        });
    });
}

// Notification system
function showNotification(message, duration = 3000) {
    // Remove existing notification if any
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }

    // Create notification element
    const notification = document.createElement('div');
    notification.className = 'notification';
    notification.textContent = message;

    // Style
    Object.assign(notification.style, {
        position: 'fixed',
        top: '20px',
        right: '20px',
        background: '#0B6E6E',
        color: 'white',
        padding: '1rem 1.5rem',
        borderRadius: '999px',
        boxShadow: '0 4px 16px rgba(0,0,0,0.2)',
        zIndex: '10000',
        fontSize: '0.9375rem',
        fontFamily: "'Noto Sans SC', sans-serif",
        animation: 'slideIn 0.3s ease'
    });

    // Add animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOut {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(style);

    // Add to page
    document.body.appendChild(notification);

    // Remove after duration
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, duration);
}

// Log API structure for development reference
function logAPIStructure() {
    console.log('%c=== MediTrip API Structure ===', 'color: #0B6E6E; font-weight: bold; font-size: 16px;');
    console.log('%cServices API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.services);

    console.log('%cMarkets API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.markets);

    console.log('%cConsultation API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.consultation);

    console.log('%cHospitals API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.hospitals);

    console.log('%cInsurance API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.insurance);

    console.log('%cPayment API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.payment);

    console.log('%cContact API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.contact);

    console.log('%cContent API:', 'color: #C9A24B; font-weight: bold;');
    console.table(API_ENDPOINTS.content);
}

// API call templates (for future implementation)
// ================================================

/**
 * Fetch service details
 * @param {string} serviceType - Type of service (checkup, tcm, dental, etc.)
 */
async function fetchServiceDetails(serviceType) {
    const endpoint = API_ENDPOINTS.services[serviceType];

    try {
        console.log(`Fetching: ${endpoint}`);
        // const response = await fetch(endpoint);
        // const data = await response.json();
        // return data;

        // Mock response for development
        return {
            service: serviceType,
            details: {},
            locations: []
        };
    } catch (error) {
        console.error('Error fetching service details:', error);
        showNotification(t('Error loading service details'), 3000);
    }
}

/**
 * Submit contact form
 * @param {Object} formData - Form data object
 */
async function submitContactForm(formData) {
    const endpoint = API_ENDPOINTS.contact.submit;

    try {
        console.log(`Submitting to: ${endpoint}`, formData);
        // const response = await fetch(endpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(formData)
        // });
        // const data = await response.json();
        // return data;

        // Mock response
        return { success: true, message: 'Inquiry submitted successfully' };
    } catch (error) {
        console.error('Error submitting contact form:', error);
        showNotification(t('Error submitting inquiry'), 3000);
    }
}

/**
 * Check insurance eligibility
 * @param {Object} insuranceData - Insurance information
 */
async function checkInsurance(insuranceData) {
    const endpoint = API_ENDPOINTS.insurance.check;

    try {
        console.log(`Checking insurance: ${endpoint}`, insuranceData);
        // const response = await fetch(endpoint, {
        //     method: 'POST',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(insuranceData)
        // });
        // const data = await response.json();
        // return data;

        // Mock response
        return {
            eligible: false,
            provider: null,
            coverage: null
        };
    } catch (error) {
        console.error('Error checking insurance:', error);
        showNotification(t('Error checking insurance eligibility'), 3000);
    }
}

/**
 * Search hospitals
 * @param {Object} searchParams - Search parameters (location, service, etc.)
 */
async function searchHospitals(searchParams) {
    const endpoint = API_ENDPOINTS.hospitals.search;

    try {
        const queryString = new URLSearchParams(searchParams).toString();
        const url = `${endpoint}?${queryString}`;
        console.log(`Searching hospitals: ${url}`);

        // const response = await fetch(url);
        // const data = await response.json();
        // return data;

        // Mock response
        return {
            results: [],
            total: 0,
            page: 1
        };
    } catch (error) {
        console.error('Error searching hospitals:', error);
        showNotification(t('Error searching hospitals'), 3000);
    }
}

// Export for use in other modules (if needed)
if (typeof module !== 'undefined' && module.exports) {
    module.exports = {
        API_ENDPOINTS,
        LANGUAGES,
        fetchServiceDetails,
        submitContactForm,
        checkInsurance,
        searchHospitals
    };
}
