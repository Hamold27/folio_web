/* =========================================================
 *  Fine Arts 作品清單
 *  ---------------------------------------------------------
 *  新增作品：
 *    1. 把大圖放進 images/fine-arts/full/，縮圖放進 images/fine-arts/thumb/（檔名相同）
 *       （沒有縮圖也可以，兩個資料夾放同一張圖即可）
 *    2. 在下面加一行 { file, category, title, w, h }
 *       - category：'sketch'(炭筆素描) / 'watercolor'(水彩) / 'gouache'(廣告顏料)
 *       - title：作品名稱，會顯示在放大檢視下方（可留空 ''）
 *       - w / h：圖片寬高（只要比例對就好，用來預留版位避免跳動）
 *    3. 排列順序 = 這個清單的順序
 * ========================================================= */
const ARTWORKS = [
  { file: 'IMG_3395.jpg', category: 'gouache', title: '', w: 720, h: 990 },
  { file: 'IMG_3345.jpg', category: 'sketch', title: '', w: 720, h: 520 },
  { file: 'IMG_3372.jpg', category: 'watercolor', title: '', w: 720, h: 463 },
  { file: 'IMG_3346.jpg', category: 'sketch', title: '', w: 720, h: 559 },
  { file: 'IMG_3373.jpg', category: 'watercolor', title: '', w: 720, h: 514 },
  { file: 'IMG_3347.jpg', category: 'sketch', title: '', w: 720, h: 514 },
  { file: 'IMG_3375.jpg', category: 'watercolor', title: '', w: 720, h: 510 },
  { file: 'IMG_3348.jpg', category: 'sketch', title: '', w: 720, h: 553 },
  { file: 'IMG_3376.jpg', category: 'watercolor', title: '', w: 720, h: 527 },
  { file: 'IMG_3349.jpg', category: 'sketch', title: '', w: 720, h: 1027 },
  { file: 'IMG_3378.jpg', category: 'watercolor', title: '', w: 720, h: 510 },
  { file: 'IMG_3351.jpg', category: 'sketch', title: '', w: 720, h: 754 },
  { file: 'IMG_3391.jpg', category: 'gouache', title: '', w: 720, h: 1035 },
  { file: 'IMG_3379.jpg', category: 'watercolor', title: '', w: 720, h: 507 },
  { file: 'IMG_3352.jpg', category: 'sketch', title: '', w: 720, h: 503 },
  { file: 'IMG_3380.jpg', category: 'watercolor', title: '', w: 720, h: 507 },
  { file: 'IMG_3354.jpg', category: 'sketch', title: '', w: 720, h: 728 },
  { file: 'IMG_3382.jpg', category: 'watercolor', title: '', w: 720, h: 514 },
  { file: 'IMG_3355.jpg', category: 'sketch', title: '', w: 720, h: 837 },
  { file: 'IMG_3384.jpg', category: 'watercolor', title: '', w: 720, h: 531 },
  { file: 'IMG_3356.jpg', category: 'sketch', title: '', w: 720, h: 500 },
  { file: 'IMG_3385.jpg', category: 'watercolor', title: '', w: 720, h: 964 },
  { file: 'IMG_3357.jpg', category: 'sketch', title: '', w: 720, h: 484 },
  { file: 'IMG_3396.jpg', category: 'gouache', title: '', w: 720, h: 514 },
  { file: 'IMG_3386.jpg', category: 'watercolor', title: '', w: 720, h: 992 },
  { file: 'IMG_3358.jpg', category: 'sketch', title: '', w: 720, h: 506 },
  { file: 'IMG_3387.jpg', category: 'watercolor', title: '', w: 720, h: 517 },
  { file: 'IMG_3360.jpg', category: 'sketch', title: '', w: 720, h: 495 },
  { file: 'IMG_3388.jpg', category: 'watercolor', title: '', w: 720, h: 538 },
  { file: 'IMG_3361.jpg', category: 'sketch', title: '', w: 720, h: 609 },
  { file: 'IMG_3389.jpg', category: 'watercolor', title: '', w: 720, h: 1009 },
  { file: 'IMG_3362.jpg', category: 'sketch', title: '', w: 720, h: 507 },
  { file: 'IMG_3392.jpg', category: 'watercolor', title: '', w: 720, h: 504 },
  { file: 'IMG_3363.jpg', category: 'sketch', title: '', w: 720, h: 912 },
  { file: 'IMG_3397.jpg', category: 'gouache', title: '', w: 720, h: 510 },
  { file: 'IMG_3394.jpg', category: 'watercolor', title: '', w: 720, h: 507 },
  { file: 'IMG_3365.jpg', category: 'sketch', title: '', w: 720, h: 503 },
  { file: 'IMG_3398.jpg', category: 'watercolor', title: '', w: 720, h: 1061 },
  { file: 'IMG_3366.jpg', category: 'sketch', title: '', w: 720, h: 648 },
  { file: 'IMG_3399.jpg', category: 'watercolor', title: '', w: 720, h: 489 },
  { file: 'IMG_3367.jpg', category: 'sketch', title: '', w: 720, h: 1012 },
  { file: 'IMG_3401.jpg', category: 'watercolor', title: '', w: 720, h: 478 },
  { file: 'IMG_3368.jpg', category: 'sketch', title: '', w: 720, h: 722 },
  { file: 'IMG_3402.jpg', category: 'watercolor', title: '', w: 720, h: 469 },
  { file: 'IMG_3369.jpg', category: 'sketch', title: '', w: 720, h: 509 },
  { file: 'IMG_3404.jpg', category: 'watercolor', title: '', w: 720, h: 486 },
  { file: 'IMG_3370.jpg', category: 'sketch', title: '', w: 720, h: 762 },
  { file: 'IMG_3406.jpg', category: 'watercolor', title: '', w: 720, h: 501 },
  { file: 'IMG_3371.jpg', category: 'sketch', title: '', w: 720, h: 560 },
  { file: 'IMG_3407.jpg', category: 'watercolor', title: '', w: 720, h: 474 },
  { file: 'IMG_3377.jpg', category: 'sketch', title: '', w: 720, h: 498 },
  { file: 'IMG_3408.jpg', category: 'watercolor', title: '', w: 720, h: 507 },
  { file: 'IMG_3409.jpg', category: 'watercolor', title: '', w: 720, h: 458 },
  { file: 'IMG_3410.jpg', category: 'watercolor', title: '', w: 720, h: 486 },
  { file: 'IMG_3411.jpg', category: 'watercolor', title: '', w: 720, h: 1106 },
  { file: 'IMG_3412.jpg', category: 'watercolor', title: '', w: 720, h: 489 },
  { file: 'IMG_3413.jpg', category: 'watercolor', title: '', w: 720, h: 466 },
];
