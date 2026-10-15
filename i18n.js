// MediTrip i18n: English source strings -> translations.
// Static page text is translated by matching each text node / attribute
// against this dictionary; dynamic messages use t().

const TRANSLATIONS = {
    zh: {
        // Head / header
        'MediTrip - Medical Tourism in China': 'MediTrip - 中国医疗旅游',
        'Your Healthcare Bridge to China': '您通往中国医疗的桥梁',
        'Services': '服务项目',
        'How It Works': '服务流程',
        'Insurance': '保险',
        'About Us': '关于我们',
        'Contact': '联系我们',
        'Sign In / Sign Up': '登录 / 注册',
        'Dashboard': '个人中心',
        'Logout': '退出登录',
        'My Notes': '我的记事本',
        'Account Management': '账号管理',
        'Customer Management': '客户管理',

        // Hero
        'Access World-Class Healthcare in China': '在中国享受世界一流的医疗服务',
        'Expert consultation • Trusted medical facilities • Seamless experience': '专业咨询 • 可信赖的医疗机构 • 无缝衔接的体验',
        'Start Your Healthcare Journey': '开启您的医疗之旅',

        // Services
        'Our Services': '我们的服务',
        'Health Checkup': '健康体检',
        'Comprehensive health examination packages': '全面的健康体检套餐',
        'Traditional Chinese Medicine': '中医',
        'Acupuncture, herbal therapy, and wellness programs': '针灸、中药调理及养生项目',
        'Dental Services': '口腔服务',
        'Implants, orthodontics, and comprehensive dental care': '种植牙、正畸及全面口腔护理',
        'Vision Care': '眼科服务',
        'Eye exams, glasses, and ortho-k lenses': '眼科检查、配镜及角膜塑形镜',
        'Medical Aesthetics': '医疗美容',
        'Skin care treatments and aesthetic procedures': '皮肤护理及医美项目',
        'Advanced Treatment (Boao Lecheng)': '前沿医疗（博鳌乐城）',
        'Innovative drugs and cancer treatment': '创新药物与肿瘤治疗',
        'Learn More': '了解更多',
        'Curated institutions for preventive screening and personalized health assessment': '精选预防性筛查与个性化健康评估机构',
        'Bilingual institution guide for TCM care, rehabilitation and wellness': '中医诊疗、康复与养生机构指南',
        'Dental hospitals and centres for examinations, restoration, implants and orthodontics': '提供检查、修复、种植与正畸的口腔医院及中心',
        'Ophthalmology institutions covering specialist assessment and eye care': '提供专科评估与眼部诊疗的眼科机构',
        'Public and private institutions for aesthetic medicine and reconstructive care': '提供医疗美容与修复重建的公立及私立机构',
        'A regulated pilot zone for specialist care and selected innovative medicines and devices': '提供专科医疗及部分创新药械先行使用的监管先行区',
        'Official information': '官方信息',
        'Official website': '官方网站',
        '← Back to Services': '← 返回服务列表',
        'Regions': '地区',
        '{count} institutions': '{count} 家机构',
        'Service not found': '未找到该服务',
        'Please choose a service from the home page.': '请返回首页选择服务。',
        'Institutions are presented by region. Confirm current departments, doctors, eligibility and appointment arrangements with the institution before travel.': '机构按地区列出。出行前请向机构确认当前科室、医生、就诊资格及预约安排。',

        // How it works
        'Consultation': '咨询',
        'Share your medical needs with our team': '向我们的团队说明您的医疗需求',
        'Planning': '规划',
        'We create a personalized healthcare plan': '为您制定个性化的医疗方案',
        'Coordination': '协调',
        'We arrange appointments and logistics': '为您安排预约及行程',
        'Support': '支持',
        'On-site assistance throughout your journey': '全程提供现场协助',

        // Insurance
        'Insurance & Payment': '保险与支付',
        'International Insurance': '国际保险',
        'Direct billing for eligible insurance plans': '符合条件的保险计划可直接结算',
        'Payment Options': '支付方式',
        'Multiple currencies and payment methods accepted': '支持多种货币和支付方式',

        // About
        'MediTrip connects international patients with trusted healthcare providers in China.': 'MediTrip 为国际患者对接中国值得信赖的医疗机构。',
        'Medical disclaimer: This platform provides healthcare consultation and coordination services. We do not provide medical diagnosis or prescription services. Consult licensed medical professionals for medical advice.': '医疗免责声明：本平台提供医疗咨询与协调服务，不提供医疗诊断或处方服务。如需医疗建议，请咨询持证医疗专业人员。',

        // Contact
        'Contact Us': '联系我们',
        'E-Mail': '电子邮件',
        'Send us an email anytime': '随时给我们发送邮件',
        'Chat with us on WhatsApp': '通过 WhatsApp 与我们沟通',

        // Consultation modal
        'Full Name *': '姓名 *',
        'Email *': '电子邮箱 *',
        'Phone Number': '电话号码',
        'Service of Interest *': '感兴趣的服务 *',
        'Select a service': '请选择服务',
        'Advanced Treatment': '前沿医疗',
        'Message': '留言',
        'Tell us about your healthcare needs...': '请告诉我们您的医疗需求……',
        'Submit Consultation Request': '提交咨询申请',

        // Auth modal
        'Login to Your Account': '登录您的账户',
        'Password *': '密码 *',
        'Login': '登录',
        "Don't have an account?": '还没有账户？',
        'Register': '注册',
        'Forgot Password?': '忘记密码？',
        'Create an Account': '创建账户',
        'Minimum 8 characters': '至少 8 个字符',
        'Confirm Password *': '确认密码 *',
        'Already have an account?': '已有账户？',
        'Reset Password': '重置密码',
        'Send Reset Link': '发送重置链接',
        'Back to Login': '返回登录',

        // Dashboard modal
        'My Dashboard': '我的个人中心',
        'Notes & Schedule': '笔记与日程',
        'Account Settings': '账户设置',
        'My Notes & Schedule': '我的笔记与日程',
        'Title': '标题',
        'Add your note or schedule...': '添加笔记或日程……',
        'Add Note': '添加笔记',
        'Change Password': '修改密码',
        'Current Password *': '当前密码 *',
        'New Password *': '新密码 *',
        'Confirm New Password *': '确认新密码 *',
        'Update Password': '更新密码',
        'Danger Zone': '危险操作',
        'Once you delete your account, there is no going back. Please be certain.': '账户一旦删除将无法恢复，请谨慎操作。',
        'Delete My Account': '删除我的账户',
        'Delete Account': '删除账户',
        'Are you sure you want to delete your account? This action cannot be undone.': '确定要删除您的账户吗？此操作无法撤销。',
        'Yes, Delete My Account': '是的，删除我的账户',
        'Cancel': '取消',

        // Account Management (Superadmin)
        'Manage User Accounts': '管理用户账户',
        'All registered users': '所有注册用户',
        'Search by email': '按邮箱搜索',
        'Email': '邮箱',
        'Role': '权限',
        'Created At': '创建时间',
        'Created': '创建时间',
        'Actions': '操作',
        'User': '用户',
        'Staff': '员工',
        'Admin': '管理员',
        'Superadmin': '超级管理员',
        'Delete': '删除',
        'Save Changes': '保存更改',
        'Are you sure you want to delete this account?': '确定要删除此账户吗？',
        'Yes, Delete': '是的，删除',
        'Role updated successfully': '权限更新成功',
        'Account deleted successfully': '账户删除成功',
        'Failed to update role': '权限更新失败',
        'Failed to delete account': '账户删除失败',
        'Select a role from the dropdown to change user permissions. Superadmin account is protected and cannot be modified.': '从下拉框中选择权限来修改用户角色。超级管理员账号受保护，无法修改。',


        // Customer Management Page
        'Customer Management System': '客户管理系统',
        'This page is under development': '此页面正在开发中',
        'Coming soon: Customer relationship management and business operations': '即将推出：客户关系管理与业务操作功能',
        'Return to Homepage': '返回首页',

        // Footer
        'Your trusted healthcare bridge to China': '您值得信赖的中国医疗桥梁',
        'Quick Links': '快速链接',
        'Legal': '法律信息',
        'Privacy Policy': '隐私政策',
        'Terms of Service': '服务条款',
        'Medical Disclaimer': '医疗免责声明',
        '© 2024 MediTrip. Healthcare consultation platform.': '© 2024 MediTrip. 医疗咨询平台。',

        // Dynamic messages (script.js)
        'Thank you! We will contact you soon.': '感谢您的提交！我们会尽快与您联系。',
        'Sending...': '正在发送……',
        'Sorry, your request could not be sent. Please try again or email us at {email}.': '抱歉，您的申请未能发送。请稍后重试，或直接发送邮件至 {email}。',
        'Logged out successfully': '已成功退出登录',
        'Welcome back!': '欢迎回来！',
        'Password must be at least 8 characters': '密码至少需要 8 个字符',
        'Passwords do not match': '两次输入的密码不一致',
        'Account created successfully! Please login.': '账户创建成功！请登录。',
        'Email already registered': '该邮箱已注册',
        'Login credentials are incorrect': '邮箱或密码不正确',
        'Not logged in': '尚未登录',
        'Current password is incorrect': '当前密码不正确',
        'Email not found': '未找到该邮箱',
        'Password reset instructions sent to your email': '密码重置说明已发送至您的邮箱',
        'Note added successfully': '笔记添加成功',
        'New password must be at least 8 characters': '新密码至少需要 8 个字符',
        'New passwords do not match': '两次输入的新密码不一致',
        'Password updated successfully': '密码更新成功',
        'Account deleted successfully': '账户已删除',
        'No notes yet. Create your first note above!': '还没有笔记，在上方创建第一条吧！',
        'Are you sure you want to delete this note?': '确定要删除这条笔记吗？',
        'Note deleted': '笔记已删除',
        'Loading {service} service details...': '正在加载{service}服务详情……',
        'Thank you for your inquiry. We will contact you soon.': '感谢您的咨询，我们会尽快与您联系。',
        'Language: {language}': '语言：{language}',
        'Error loading service details': '加载服务详情失败',
        'Error submitting inquiry': '提交咨询失败',
        'Error checking insurance eligibility': '查询保险资格失败',
        'Error searching hospitals': '搜索医院失败'
    }
};

let currentLanguage = 'en';

// Translate a string into the current language, with optional {param} substitution
function t(text, params = {}) {
    const dict = TRANSLATIONS[currentLanguage];
    let result = (dict && dict[text]) || text;
    for (const [key, value] of Object.entries(params)) {
        result = result.replace(`{${key}}`, value);
    }
    return result;
}

// Containers whose content is user data or set dynamically via t()
const I18N_SKIP_SELECTOR = '#user-email-display, #notes-list, #service-page-content, .form-error, .form-success, script, style';
const I18N_ATTRIBUTES = ['placeholder', 'title', 'aria-label'];

// Original English values, so we can switch back
const originalText = new WeakMap();
const originalAttrs = new WeakMap();

function applyTranslations(langCode) {
    currentLanguage = (langCode === 'en' || TRANSLATIONS[langCode]) ? langCode : 'en';
    const dict = TRANSLATIONS[currentLanguage] || {};

    document.documentElement.lang = currentLanguage === 'zh' ? 'zh-CN' : 'en';

    // Text nodes
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
        acceptNode(node) {
            if (!node.nodeValue.trim()) return NodeFilter.FILTER_REJECT;
            if (node.parentElement.closest(I18N_SKIP_SELECTOR)) return NodeFilter.FILTER_REJECT;
            return NodeFilter.FILTER_ACCEPT;
        }
    });
    let node;
    while ((node = walker.nextNode())) {
        if (!originalText.has(node)) originalText.set(node, node.nodeValue);
        const original = originalText.get(node);
        const key = original.replace(/\s+/g, ' ').trim();
        const translated = dict[key];
        node.nodeValue = translated ? original.replace(original.trim(), translated) : original;
    }

    // Attributes
    document.querySelectorAll(I18N_ATTRIBUTES.map(a => `[${a}]`).join(',')).forEach(el => {
        if (!originalAttrs.has(el)) {
            const saved = {};
            I18N_ATTRIBUTES.forEach(a => { if (el.hasAttribute(a)) saved[a] = el.getAttribute(a); });
            originalAttrs.set(el, saved);
        }
        for (const [attr, value] of Object.entries(originalAttrs.get(el))) {
            el.setAttribute(attr, dict[value] || value);
        }
    });

    // Document title
    if (!originalText.has(document)) originalText.set(document, document.title);
    const originalTitle = originalText.get(document);
    document.title = dict[originalTitle] || originalTitle;
}
