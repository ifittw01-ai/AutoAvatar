/**
 * 全站文案與資料集中設定檔。
 * 價格數字目前為參考站暫用版面資料，正式上線前請一次替換。
 * 小型「待替換」標記由 showReplaceHints 控制，不隱藏整區。
 */

export interface CurriculumModule {
  number: string
  title: string
  problem: string
  result: string
  description: string
  items: string[]
  /** 單項價值（數字，顯示時加幣別符號） */
  valueAmount: number
  enabled: boolean
  replaceHint?: boolean
}

export interface Testimonial {
  name: string
  role: string
  photo: string
  headline: string
  problem: string
  result: string
  quote: string
  resultMetric: string
  socialHandle: string
  workImage?: string
  authorized: boolean
  showVerifiedBadge: boolean
  replaceHint?: boolean
}

export interface FaqItem {
  question: string
  answer: string
  replaceHint?: boolean
}

export const siteContent = {
  brand: {
    name: 'AI 俱樂部',
    shortName: 'AI Avatar Lab',
    courseName: '第一個 AI 分身實戰做課程',
    tagline: '用 AI 分身持續產出內容，不必本人出鏡',
    logoText: 'AI 俱樂部',
    replaceHint: true,
  },

  seo: {
    title: 'AI 分身實做課程｜完成你的第一個可一致產出分身的完整流程',
    description:
      '學習如何建立自己的 AI 分身、維持角色一致、變換服裝與場景，並應用於品牌與產品內容。適合不想露臉、沒有昂貴器材、也沒有 AI 經驗的新手。',
    canonical: '',
    ogImage: 'images/og-share.svg',
  },

  announcement: {
    enabled: true,
    text: '限時免費體驗',
    ctaLabelKey: 'announcement',
    replaceHint: true,
  },

  nav: [
    { id: 'about', label: '課程介紹', href: '#about' },
    { id: 'outcomes', label: '課程成果', href: '#outcomes' },
    { id: 'curriculum', label: '課程內容', href: '#curriculum' },
    { id: 'faq', label: '常見問題', href: '#faq' },
    { id: 'pricing', label: '立即報名', href: '#pricing' },
  ],

  ctaLabels: {
    announcement: '立即報名',
    hero: '打造我的第一個AI分身',
    proof: '我想開始建立AI分身',
    objection: '教我完成專屬AI角色',
    offer: '這正是我需要的',
    faq: '立即報名',
    final: '立即報名',
    sticky: '立即報名',
    header: '立即報名',
  },

  hero: {
    eyebrow: 'AI 分身實做課程',
    title: '快速完成你的第一個可對外使用的 AI 分身',
    subtitle:
      '從零建立一個外型穩定、能換裝換場景、可應用在品牌與產品內容的 AI 分身。就算你沒碰過 AI 工具、也不想本人露臉，也能照著流程做出來。',
    trustPoints: [
      '不用本人出鏡面對鏡頭',
      '不需要昂貴拍攝器材',
      '沒有 AI 經驗也能跟著做',
      '重點是完整流程，不是東拼西湊工具',
      '完成後帶走可重複執行的製作方法',
    ],
    secondaryNote: 'AI 俱樂部',
    visualAlt: 'AI 分身作品拼貼：同一角色在不同服裝與場景',
    instagram: {
      handle: 'ig.twtp008',
      profileUrl: 'https://www.instagram.com/ig.twtp008/',
      embedUrl: 'https://www.instagram.com/ig.twtp008/embed',
      title: 'Instagram · @ig.twtp008',
      galleryImage: 'images/avatar-gallery.png',
    },
  },

  proof: {
    enabled: true,
    eyebrow: 'AI 俱樂部',
    title: '用 AI 分身持續產出內容，把角色變成可經營的資產',
    subtitle: '',
    replaceHint: true,
    highlights: [
      {
        label: '內容產出節奏',
        value: '可重複流程',
        note: '',
      },
      {
        label: '應用場景',
        value: '品牌／產品',
        note: '',
      },
      {
        label: '學習門檻',
        value: '新手可跟做',
        note: '',
      },
    ],
    body: [
      '很多人以為做內容一定要本人露臉、拍片、買器材。這堂課要證明的是另一條路：先建立穩定的 AI 分身，再把角色用在品牌與產品內容。',
    ],
  },

  story: {
    enabled: true,
    eyebrow: '為什麼會有這堂課',
    title: '從「不想露臉卻需要持續出現」開始，整理出可重複的分身流程',
    replaceHint: true,
    paragraphs: [
      '很多人卡在同一件事：想做內容、想推產品，卻不想本人出鏡，也不想被器材與拍攝流程拖住。',
      'AI 分身提供另一種做法——先建立外型一致的角色，再讓它承接畫面中的呈現，把心力放回定位、內容與產品。',
      '這堂課把建立分身、維持一致、換裝換場與可重複產出，整理成新手跟得上的完整流程。',
    ],
    points: [
      '不想本人出鏡，卻仍需要持續出現在內容裡',
      '希望人物外型穩定，而不是每次生成都長得不一樣',
      '需要能換服裝、髮型與場景，服務品牌與產品內容',
      '想要的是一條完整流程，而不是一堆互不相干的工具教學',
    ],
  },

  objections: {
    eyebrow: '先把常見卡關拿掉',
    title: '你以為做內容一定要本人上陣——其實不必',
    lead: '很多人卡在「不敢露臉、沒器材、沒時間、工具太多」就停在起點。這堂課的設計，就是先把這些阻力拆掉。',
    items: [
      {
        title: '不需要本人露臉出鏡',
        text: 'AI 分身可以代替你出現在畫面裡，讓你待在螢幕後面完成內容。',
      },
      {
        title: '不需要對鏡頭說話',
        text: '不必強迫自己表演或面對鏡頭壓力，把心力放在內容與定位。',
      },
      {
        title: '不需要昂貴相機與燈光麥克風',
        text: '降低器材門檻，用你現有的裝置就能開始練習與產出。',
      },
      {
        title: '不需要同時訂閱大量工具',
        text: '學習重點是可重複的完整流程，而不是被一堆軟體月費追著跑。',
      },
      {
        title: '不需要設計或程式背景',
        text: '步驟會拆到新手跟得上；你不需要先成為技術專家才有資格開始。',
      },
      {
        title: '不需要每天花大量時間拍攝',
        text: '一旦角色與流程建立好，後續是可重複執行的製作方式，而不是每次重來。',
      },
    ],
    turn: '你真正需要做的，是照著課程一步一步完成自己的第一個 AI 分身。',
    closing: '當門檻被拿掉，剩下的就是執行。完成後，你會帶走一個能持續用在內容上的角色資產。',
  },

  outcomes: {
    eyebrow: '完成後你會帶走什麼',
    title: '不是「聽過 AI」，而是做出能反覆使用的成果',
    subtitle: '以下是這堂課要帶你完成的具體成果，而不是空泛的能力口號。',
    items: [
      {
        title: '完成自己的第一個 AI 分身',
        text: '從零走到可展示的角色成品，而不是只停留在概念介紹。',
      },
      {
        title: '建立可重複使用的角色設定',
        text: '把外型、風格與關鍵描述整理成之後還能再生成的基礎設定。',
      },
      {
        title: '降低人物每次長得不一樣的問題',
        text: '學會維持分身外型一致性，讓角色看起來可信、可長期使用。',
      },
      {
        title: '同一角色可更換服裝、髮型與場景',
        text: '讓分身能配合不同主題與視覺需求，而不是鎖死在單一造型。',
      },
      {
        title: '產出可應用於品牌與產品的素材方向',
        text: '理解如何把 AI 角色放進品牌內容與產品溝通，而不只是玩圖。',
      },
      {
        title: '整理出可重複執行的製作流程',
        text: '重點不是一次碰運氣，而是之後還能照著做的工作流程。',
      },
    ],
  },

  curriculum: {
    eyebrow: '課程內容',
    title: '完整、可跟做的實戰教學內容',
    subtitle: '每個模組對應一個明確問題與完成成果，並標示單項價值，最後加總成課程總價值。',
    modules: [
      {
        number: '01',
        title: '手把手完成你的第一個 AI 分身',
        problem: '想做分身卻不知道從哪一步開始，工具一打開就卡住。',
        result: '跟著步驟完成第一個可展示的 AI 分身。',
        description:
          '把建立流程拆成新手跟得上的步驟，讓你在短時間內走出「第一次做完」的關鍵里程碑。',
        items: ['角色起點設定', '生成步驟拆解', '新手常見錯誤提醒'],
        valueAmount: 6700,
        enabled: true,
        replaceHint: true,
      },
      {
        number: '02',
        title: '穩定一致的角色生成方法',
        problem: '每次生成都像換了一個人，品牌感與信任感立刻掉下去。',
        result: '掌握讓同一分身穩定重現的關鍵做法。',
        description:
          '對準「AI 看起來很假／每次都不一樣」的痛點，建立可長期使用的角色一致性。',
        items: ['一致性檢查重點', '可重複的描述結構', '成品篩選原則'],
        valueAmount: 4700,
        enabled: true,
        replaceHint: true,
      },
      {
        number: '03',
        title: '自由變換服裝、髮型與場景',
        problem: '角色只能固定一張臉、一個造型，無法服務不同內容主題。',
        result: '同一分身能配合不同服裝、髮型與場景需求。',
        description:
          '這是把分身用在品牌與產品內容時很關鍵的一環：角色不變，場景與造型可變。',
        items: ['造型切換邏輯', '場景搭配思路', '品牌內容應用方向'],
        valueAmount: 4700,
        enabled: true,
        replaceHint: true,
      },
      {
        number: '04',
        title: '可重複的 AI 生圖工作流程',
        problem: '偶爾做出一張圖，卻無法變成穩定產出的方法。',
        result: '帶走一條之後還能繼續執行的製作流程。',
        description:
          '把分身從「單次作品」變成「可經營的內容資產」，強調流程而非零散技巧。',
        items: ['素材產出節奏', '檔案與設定管理', '從圖到內容應用的銜接'],
        valueAmount: 2700,
        enabled: true,
        replaceHint: true,
      },
      {
        number: '05',
        title: '精簡工具路徑，跑通主要產出',
        problem: '工具訂閱越堆越多，學習成本與月費一起上升。',
        result: '理解如何用精簡工具路徑完成核心成果。',
        description:
          '對齊「不必同時訂閱大量工具」的訊息：先把主流程跑通，再決定是否擴充。',
        items: ['核心工具選擇原則', '避免工具焦慮', '新手起步路徑'],
        valueAmount: 2700,
        enabled: true,
        replaceHint: true,
      },
      {
        number: '06',
        title: '加碼：分身內容變現路徑整理',
        problem: '做出分身之後，不知道如何接到品牌或產品內容應用。',
        result: '帶走可延伸的應用與變現思考框架。',
        description:
          '整理如何把 AI 分身放進內容經營與產品溝通（版面暫用價值；正式內容請替換）。',
        items: ['應用場景對位', '內容與產品銜接', '執行優先順序'],
        valueAmount: 9700,
        enabled: true,
        replaceHint: true,
      },
    ] as CurriculumModule[],
    totalValueLabel: '課程總價值',
    /** 與模組加總一致：6700+4700+4700+2700+2700+9700 = 31200 */
    totalValueAmount: 31200,
  },

  pricing: {
    courseName: '第一個 AI 分身實戰課',
    paymentType: '最多24期分期付款( 月繳120 )。立即取得完整課程。',
    accessNote: '報名後會收到報名成功 email，請留正確 email',
    updateNote: '更新政策待正式確認',
    refundNote: '數位商品退款規則以結帳頁說明與正式條款為準',
    includes: [
      '完成第一個 AI 分身的完整步驟引導',
      '角色一致性與造型／場景切換方法',
      '可重複執行的內容製作流程整理',
      '精簡工具路徑與品牌內容應用方向',
      '加碼：分身內容變現路徑整理',
    ],
  },

  testimonials: [
    {
      name: '學員 A',
      role: '內容創作者／自由工作者',
      photo: 'images/testimonial-a.png',
      headline: '終於不用再勉強自己露臉做內容',
      problem: '想做副業卻極度抗拒出鏡',
      result: '完成專屬 AI 分身，開始產出不露臉內容',
      quote:
        '我一直很想經營自己的內容，但每次一想到要面對鏡頭，就會開始緊張、退縮。現在的我，終於可以把心力放在內容本身',
      resultMetric: '【待替換：具體成果數字】',
      socialHandle: '@handle_a',
      authorized: true,
      showVerifiedBadge: false,
      replaceHint: false,
    },
    {
      name: '學員 B',
      role: '品牌經營者',
      photo: 'images/testimonial-b.png',
      headline: '當天就做出第一個能用的 AI 分身',
      problem: '工具太多、流程太散，學了卻做不出來',
      result: '當天完成第一個穩定角色',
      quote:
        '這次跟著清楚的步驟一步步操作，當天就完成了第一個真正能使用的 AI 分身。不用再到處找教學、反覆試錯，真的省下了很多自己摸索的時間。',
      resultMetric: '【待替換：完成時間／應用結果】',
      socialHandle: '@handle_b',
      authorized: true,
      showVerifiedBadge: false,
      replaceHint: false,
    },
    {
      name: '學員 C',
      role: '一人事業／產品銷售',
      photo: 'images/testimonial-c.png',
      headline: '終於把時間從拍攝和剪輯中解放出來',
      problem: '拍攝與剪輯吃掉太多時間',
      result: '用分身承接畫面，專注內容與產品',
      quote:
        '現在做內容不再需要耗掉大半天，也終於能把更多時間，放在真正重要的事情上。',
      resultMetric: '【待替換：節省時間／產出量】',
      socialHandle: '@handle_c',
      authorized: true,
      showVerifiedBadge: false,
      replaceHint: false,
    },
  ] as Testimonial[],

  disclaimer: {
    text: '每位學員的實際成果會依個人定位、內容品質、產品、市場、投入時間與執行程度而有所不同。本課程提供 AI 內容製作與品牌應用相關教育，不保證特定流量、收入、成交或商業成果。',
  },

  faq: {
    eyebrow: '',
    title: '你可能正在想這些事',
    items: [
      {
        question: '我需要拍影片或露臉嗎？',
        answer:
          '不需要本人出鏡，也不必對著鏡頭說話。課程重點是建立 AI 分身來承接畫面中的角色呈現，讓你能在不必露臉的前提下持續做內容。',
      },
      {
        question: '我沒有時間也能完成嗎？',
        answer:
          '可以。流程會盡量拆成可跟做的步驟，目標是先完成第一個分身與可重複方法，而不是要求你每天長時間拍攝。實際完成速度仍取決於你投入的練習時間。',
      },
      {
        question: '我完全不懂 AI 可以嗎？',
        answer:
          '可以。這堂課的節奏是為新手設計：不需要先有 AI 背景、設計能力或程式經驗。你需要的是照著步驟操作，並完成自己的練習。',
      },
      {
        question: '我需要懂英文嗎？',
        answer: '課程以繁體中文說明為主。【介面語言細節待正式確認】',
      },
      {
        question: '我需要購買很多工具嗎？',
        answer:
          '學習重點是完整流程，而不是同時訂閱一堆軟體。建議先把主流程跑通，再決定是否擴充工具。',
      },
      {
        question: '手機可以操作嗎？',
        answer: '部分步驟可用手機完成；為求穩定，建議使用電腦操作主要流程。【待正式確認】',
      },
      {
        question: '多久可以完成第一個 AI 分身？',
        answer:
          '課程目標是讓你在相對短的時間內完成第一個版本。實際時間會因裝置、網路與練習節奏而不同。',
      },
      {
        question: '課程是一次付費還是訂閱？',
        answer: '完全免學費，我們是 AI 俱樂部',
      },
      {
        question: '是否保證可以獲利？',
        answer:
          '不保證。課程提供的是 AI 分身製作與內容應用的教育方法；流量、成交與收入會受定位、作品品質、市場與執行影響，成果因人而異。',
      },
    ] as FaqItem[],
  },

  finalCta: {
    eyebrow: '準備好開始了嗎？',
    title: '建立你的 AI 分身，用不必露臉的方式持續產出內容',
    subtitle:
      '在清楚的步驟引導下，完成第一個可一致使用的 AI 分身，並掌握服裝、場景切換與可重複流程——就算你現在還是 AI 新手。',
    bullets: [
      '完成第一個可對外使用的 AI 分身',
      '學會維持角色外型一致性',
      '同一分身可變換服裝、髮型與場景',
      '理解如何應用在品牌與產品內容',
      '帶走可重複執行的製作流程',
      '不必本人露臉、也不必先成為技術專家',
    ],
  },

  checkout: {
    promise: '約一小時內，完成你的第一個可一致產出的 AI 分身',
    coverAlt: '課程封面占位圖',
    accessMethod: '數位課程・購買後以 Email 提供取用說明',
    digitalGoodsNote:
      '本商品為數位內容。購買完成即開始提供取用資訊；退款規則以正式條款為準。【待替換正式退款政策】',
    paymentWidgetNote: 'PayNow 掃碼付款',
    paymentProvidersHint: '請使用銀行 App 或行動支付掃描 QR Code',
    secureNote:
      '請以官方 PayNow QR Code 完成付款。本站不會自行收集或儲存信用卡資料。',
    paynowSteps: [
      '打開銀行 App／行動支付的掃碼功能',
      '掃描右側（或下方）PayNow QR Code',
      '確認金額後完成付款',
      '回到本頁填寫姓名與 Email，並點選「我已完成付款」',
    ],
    confirmPaidLabel: '我已完成付款',
    confirmPaidHint: '送出後我們會依你留下的 Email 提供課程取用資訊',
  },

  paymentSuccess: {
    title: '付款成功，感謝你的購買',
    nextSteps: [
      '請查收購買時填寫的 Email（含垃圾郵件匣）',
      '依信件內的說明啟用或登入課程',
      '從第一個模組開始，完成你的 AI 分身',
    ],
    noEmailHelp: '若超過合理時間仍未收到信件，請確認 Email 是否正確，並透過客服與我們聯繫。',
  },

  paymentCancelled: {
    title: '付款尚未完成',
    subtitle: '本次沒有完成扣款。你可以返回結帳頁重新選擇付款方式，或稍後再試。',
  },

  instructor: {
    name: '講師姓名【待替換】',
    title: 'AI 內容與分身流程講師',
    photo: '',
    bio: '講師介紹占位。請替換成正式資歷與故事，勿使用他人肖像或經歷。',
    replaceHint: true,
  },

  contact: {
    email: '',
    line: '',
    note: '客服 Email 請於環境變數 VITE_SUPPORT_EMAIL 設定。',
  },

  legal: {
    privacyUrl: '',
    termsUrl: '',
    privacyLabel: '隱私權政策',
    termsLabel: '使用條款',
    copyright: `© ${new Date().getFullYear()} AI 俱樂部. All rights reserved.`,
  },
} as const

export type SiteContent = typeof siteContent
