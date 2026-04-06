type T = {
  // Navbar
  nav_timetable: string;
  nav_dashboard: string;
  nav_home: string;
  nav_teachers: string;
  nav_login: string;
  nav_signup: string;
  nav_logout: string;

  // Homepage
  home_h1: string;
  home_sub: string;
  home_login_btn: string;
  home_signup_btn: string;
  home_dashboard_btn: string;

  // Curriculum
  curr_public: string;
  curr_public_desc: string;
  curr_national: string;
  curr_national_desc: string;
  curr_igcse: string;
  curr_igcse_desc: string;
  curr_american: string;
  curr_american_desc: string;
  teachers_count: string;
  teachers_count_plural: string;

  // Login
  login_h1: string;
  login_lead: string;
  login_email: string;
  login_password: string;
  login_btn: string;
  login_no_account: string;
  login_create: string;

  // Signup
  signup_h1: string;
  signup_lead: string;
  signup_fullname: string;
  signup_email: string;
  signup_password: string;
  signup_choose_curriculum: string;
  signup_select_curriculum: string;
  signup_btn: string;
  signup_has_account: string;
  signup_login: string;

  // Dashboard
  dash_h1: string;
  dash_signed_in_as: string;
  dash_browse: string;
  dash_teachers_title: string;
  dash_empty_hint: string;
  dash_empty_hint_bold: string;

  // Teachers page
  teachers_page_h1: string;
  teachers_page_sub: string;
  teachers_page_showing: string;
  teachers_page_placeholder: string;
  teachers_page_all_subjects: string;

  // Teacher card
  card_no_desc: string;
  card_view_profile: string;

  // Teacher profile
  profile_email: string;
  profile_phone: string;
  profile_about: string;
  profile_no_bio: string;
  profile_videos_h2: string;
  profile_videos_hint: string;
  profile_reviews_h2: string;
  profile_reviews_hint: string;
  profile_enrolled_badge: string;
  profile_unenroll: string;
  profile_enroll: string;
  profile_enroll_login: string;
  profile_close: string;
  profile_no_videos: string;
  profile_back: string;
  profile_not_found: string;
  profile_back_teachers: string;

  // Timetable
  tt_h1: string;
  tt_sub: string;
  tt_courses_h2: string;
  tt_empty: string;
  tt_add_session_h2: string;
  tt_select_teacher: string;
  tt_from: string;
  tt_to: string;
  tt_target_reached: string;
  tt_add_btn: string;
  tt_schedule_h2: string;
  tt_sessions_week: string;
  tt_day_monday: string;
  tt_day_tuesday: string;
  tt_day_wednesday: string;
  tt_day_thursday: string;
  tt_day_friday: string;
  tt_day_saturday: string;
  tt_day_sunday: string;
  tt_day_short_mon: string;
  tt_day_short_tue: string;
  tt_day_short_wed: string;
  tt_day_short_thu: string;
  tt_day_short_fri: string;
  tt_day_short_sat: string;
  tt_day_short_sun: string;
  tt_err_select_teacher: string;
  tt_err_teacher_not_found: string;
  tt_err_time: string;
  tt_err_hours: string;
  tt_err_target: string;
  tt_err_overlap: string;
  tt_success_added: string;
  tt_target_full: string;

  // Video card
  video_locked: string;
  video_play: string;
  video_buy: string;
  video_free: string;

  // Misc
  no_reviews: string;
  enroll: string;
  enrolled: string;
};

export type Locale = 'en' | 'ar';

export const translations: Record<string, T> = {
  en: {
    nav_timetable: 'Timetable',
    nav_dashboard: 'Dashboard',
    nav_home: 'Home',
    nav_teachers: 'Teachers',
    nav_login: 'Log in',
    nav_signup: 'Sign up',
    nav_logout: 'Log out',
    home_h1: 'Find your teacher',
    home_sub: 'Browse teachers, read student reviews, and unlock premium lessons. Choose your curriculum system to get started.',
    home_login_btn: 'Log in',
    home_signup_btn: 'Sign up',
    home_dashboard_btn: 'Dashboard',
    curr_public: 'Public',
    curr_public_desc: 'Public education system with local board requirements',
    curr_national: 'National',
    curr_national_desc: 'National government-approved syllabus and examinations',
    curr_igcse: 'IGCSE',
    curr_igcse_desc: 'International Cambridge curriculum with global recognition',
    curr_american: 'American',
    curr_american_desc: 'US-based curriculum following Common Core and AP standards',
    teachers_count: 'teacher',
    teachers_count_plural: 'teachers',
    login_h1: 'Student login',
    login_lead: 'Access your dashboard and see teachers you\'re enrolled with.',
    login_email: 'Email',
    login_password: 'Password',
    login_btn: 'Log in',
    login_no_account: 'No account?',
    login_create: 'Create one',
    signup_h1: 'Create a student account',
    signup_lead: 'Sign up to enroll with teachers and track your learning.',
    signup_fullname: 'Full name',
    signup_email: 'Email',
    signup_password: 'Password',
    signup_choose_curriculum: 'Choose your curriculum',
    signup_select_curriculum: 'Please select a curriculum system.',
    signup_btn: 'Sign up',
    signup_has_account: 'Already have an account?',
    signup_login: 'Log in',
    dash_h1: 'Your dashboard',
    dash_signed_in_as: 'Signed in as',
    dash_browse: 'Browse teachers',
    dash_teachers_title: 'Teachers you\'re enrolled with',
    dash_empty_hint: 'You\'re not enrolled with any teachers yet. Visit a teacher\'s profile and tap',
    dash_empty_hint_bold: 'Enroll',
    teachers_page_h1: 'Find your teacher',
    teachers_page_sub: 'Browse teachers, read student reviews, and unlock premium lessons.',
    teachers_page_showing: 'Showing',
    teachers_page_placeholder: 'Search by name, subject, or email...',
    teachers_page_all_subjects: 'All subjects',
    card_no_desc: 'No description yet.',
    card_view_profile: 'View profile',
    profile_email: 'Email',
    profile_phone: 'Phone',
    profile_about: 'About',
    profile_no_bio: 'No biography available yet.',
    profile_videos_h2: 'Videos',
    profile_videos_hint: 'Free videos play instantly. Paid videos require unlock (mock purchase).',
    profile_enrolled_badge: 'Enrolled',
    profile_unenroll: 'Unenroll',
    profile_enroll: 'Enroll with this teacher',
    profile_enroll_login: 'Log in to enroll',
    profile_close: 'Close',
    profile_no_videos: 'This teacher hasn\'t added any videos yet.',
    profile_back: 'Back to teachers',
    profile_not_found: 'Teacher not found.',
    profile_back_teachers: 'Back to teachers',
    profile_reviews_h2: 'Student reviews',
    profile_reviews_hint: 'Mock testimonials until backend data is connected.',
    tt_h1: 'Weekly Study Timetable',
    tt_sub: 'Plan your study sessions. Set weekly targets and track progress.',
    tt_courses_h2: 'Your Courses',
    tt_empty: 'You\'re not enrolled with any teachers yet. Browse teachers first!',
    tt_add_session_h2: 'Add Study Session',
    tt_select_teacher: 'Select a teacher',
    tt_from: 'From',
    tt_to: 'To',
    tt_target_reached: 'Target reached',
    tt_add_btn: 'Add Session',
    tt_schedule_h2: 'Your Schedule',
    tt_sessions_week: 'sessions / week',
    tt_day_monday: 'Monday',
    tt_day_tuesday: 'Tuesday',
    tt_day_wednesday: 'Wednesday',
    tt_day_thursday: 'Thursday',
    tt_day_friday: 'Friday',
    tt_day_saturday: 'Saturday',
    tt_day_sunday: 'Sunday',
    tt_day_short_mon: 'Mon',
    tt_day_short_tue: 'Tue',
    tt_day_short_wed: 'Wed',
    tt_day_short_thu: 'Thu',
    tt_day_short_fri: 'Fri',
    tt_day_short_sat: 'Sat',
    tt_day_short_sun: 'Sun',
    tt_err_select_teacher: 'Please select a teacher.',
    tt_err_teacher_not_found: 'Teacher not found.',
    tt_err_time: 'End time must be after start time.',
    tt_err_hours: 'Hours must be between 07:00 and 22:00.',
    tt_err_target: 'You have reached your weekly target of',
    tt_err_overlap: 'This slot overlaps with an existing session.',
    tt_success_added: 'Session added!',
    tt_target_full: 'Target reached. Select another teacher or increase their target.',
    video_locked: 'Locked',
    video_play: 'Play',
    video_buy: 'Buy / Unlock',
    video_free: 'Free',
    no_reviews: 'No reviews yet.',
    enroll: 'Enroll',
    enrolled: 'Enrolled',
  },
  ar: {
    nav_timetable: 'الجدول الأسبوعي',
    nav_dashboard: 'لوحة التحكم',
    nav_home: 'الرئيسية',
    nav_teachers: 'المعلمين',
    nav_login: 'تسجيل الدخول',
    nav_signup: 'إنشاء حساب',
    nav_logout: 'تسجيل الخروج',
    home_h1: 'اعثر على معلمك',
    home_sub: 'تصفح المعلمين، اقرأ آراء الطلاب، وافتح الدروس المميزة. اختر منهجك الدراسي للبدء.',
    home_login_btn: 'تسجيل الدخول',
    home_signup_btn: 'إنشاء حساب',
    home_dashboard_btn: 'لوحة التحكم',
    curr_public: 'حكومي',
    curr_public_desc: 'نظام التعليم الحكومي مع متطلبات المجلس المحلي',
    curr_national: 'وطني',
    curr_national_desc: 'منهج واختبارات معتمدة من الحكومة الوطنية',
    curr_igcse: 'IGCSE',
    curr_igcse_desc: 'منهج كامبريدج الدولي مع اعتراف عالمي',
    curr_american: 'أمريكي',
    curr_american_desc: 'منهج أمريكي يعتمد على المعايير الأساسية المشتركة وبرنامج AP',
    teachers_count: 'معلم',
    teachers_count_plural: 'معلمين',
    login_h1: 'تسجيل دخول طالب',
    login_lead: 'ادخل لوحة التحكم وشاهد المعلمين المسجلين معهم.',
    login_email: 'البريد الإلكتروني',
    login_password: 'كلمة المرور',
    login_btn: 'تسجيل الدخول',
    login_no_account: 'ليس لديك حساب؟',
    login_create: 'إنشاء حساب',
    signup_h1: 'إنشاء حساب طالب',
    signup_lead: 'سجل للانضمام إلى المعلمين وتتبع تقدمك الدراسي.',
    signup_fullname: 'الاسم الكامل',
    signup_email: 'البريد الإلكتروني',
    signup_password: 'كلمة المرور',
    signup_choose_curriculum: 'اختر منهجك الدراسي',
    signup_select_curriculum: 'يرجى اختيار نظام المنهج.',
    signup_btn: 'إنشاء حساب',
    signup_has_account: 'لديك حساب بالفعل؟',
    signup_login: 'تسجيل الدخول',
    dash_h1: 'لوحة التحكم الخاصة بك',
    dash_signed_in_as: 'مسجل كـ',
    dash_browse: 'تصفح المعلمين',
    dash_teachers_title: 'المعلمين المسجلين معهم',
    dash_empty_hint: 'أنت غير مسجل مع أي معلم بعد. قم بزيارة ملف المعلم واضغط على',
    dash_empty_hint_bold: 'تسجيل',
    teachers_page_h1: 'اعثر على معلمك',
    teachers_page_sub: 'تصفح المعلمين، اقرأ آراء الطلاب، وافتح الدروس المميزة.',
    teachers_page_showing: 'عرض',
    teachers_page_placeholder: 'البحث بالاسم أو المادة أو البريد...',
    teachers_page_all_subjects: 'جميع المواد',
    card_no_desc: 'لا يوجد وصف بعد.',
    card_view_profile: 'عرض الملف',
    profile_email: 'البريد',
    profile_phone: 'الهاتف',
    profile_about: 'نبذة',
    profile_no_bio: 'لا توجد سيرة ذاتية متاحة بعد.',
    profile_videos_h2: 'الفيديوهات',
    profile_videos_hint: 'مقاطع الفيديو المجانية تعمل فوراً. المقاطع المدفوعة تتطلب شراء.',
    profile_enrolled_badge: 'مسجل',
    profile_unenroll: 'إلغاء التسجيل',
    profile_enroll: 'سجل مع هذا المعلم',
    profile_enroll_login: 'سجل دخولك للتسجيل',
    profile_close: 'إغلاق',
    profile_no_videos: 'لم يضف هذا المعلم أي فيديوهات بعد.',
    profile_back: 'العودة إلى المعلمين',
    profile_not_found: 'لم يتم العثور على المعلم.',
    profile_back_teachers: 'العودة إلى المعلمين',
    profile_reviews_h2: 'آراء الطلاب',
    profile_reviews_hint: 'تقييمات تجريبية حتى يتم ربط البيانات.',
    tt_h1: 'الجدول الدراسي الأسبوعي',
    tt_sub: 'خطط جلسات المذاكرة. حدد أهداف أسبوعية وتابع التقدم.',
    tt_courses_h2: 'موادك الدراسية',
    tt_empty: 'أنت غير مسجل مع أي معلم بعد. تصفح المعلمين أولاً!',
    tt_add_session_h2: 'إضافة جلسة دراسية',
    tt_select_teacher: 'اختر معلمًا',
    tt_from: 'من',
    tt_to: 'إلى',
    tt_target_reached: 'تم الوصول للهدف',
    tt_add_btn: 'إضافة جلسة',
    tt_schedule_h2: 'جدولك الدراسي',
    tt_sessions_week: 'جلسات / أسبوع',
    tt_day_monday: 'الإثنين',
    tt_day_tuesday: 'الثلاثاء',
    tt_day_wednesday: 'الأربعاء',
    tt_day_thursday: 'الخميس',
    tt_day_friday: 'الجمعة',
    tt_day_saturday: 'السبت',
    tt_day_sunday: 'الأحد',
    tt_day_short_mon: 'إثنين',
    tt_day_short_tue: 'ثلاثاء',
    tt_day_short_wed: 'أربعاء',
    tt_day_short_thu: 'خميس',
    tt_day_short_fri: 'جمعة',
    tt_day_short_sat: 'سبت',
    tt_day_short_sun: 'أحد',
    tt_err_select_teacher: 'يرجى اختيار معلم.',
    tt_err_teacher_not_found: 'لم يتم العثور على المعلم.',
    tt_err_time: 'وقت الانتهاء يجب أن يكون بعد وقت البدء.',
    tt_err_hours: 'يجب أن تكون الساعات بين 07:00 و 22:00.',
    tt_err_target: 'لقد وصلت للهدف الأسبوعي وهو',
    tt_err_overlap: 'هذه الخانة تتداخل مع جلسة موجودة.',
    tt_success_added: 'تمت إضافة الجلسة!',
    tt_target_full: 'تم الوصول للهدف. اختر معلمًا آخر أو ز هدفهم.',
    video_locked: 'مغلق',
    video_play: 'تشغيل',
    video_buy: 'شراء / فتح',
    video_free: 'مجاني',
    no_reviews: 'لا توجد تقييمات بعد.',
    enroll: 'تسجيل',
    enrolled: 'مسجل',
  },
};

export type TranslationKeys = keyof typeof translations['en'];
