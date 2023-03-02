export const SCOPE_DATA = [
  {
    scope: 'Scope 1',
    data: [
      { category: '고정연소', emission: 171338 },
      {
        category: '공정배출',
        emission: 158654,
      },
      { category: '이동연소(차량)', emission: 100997 },
      { category: '탈루배출', emission: 12325 },
      { category: '폐기물 처리', emission: 1652 },
    ],
    total: 444965,
  },
  {
    scope: 'Scope 2',
    data: [
      { category: '전기 사용', emission: 304627 },
      {
        category: '열(스팀) 사용',
        emission: 69090,
      },
    ],
    total: 373718,
  },
  {
    scope: 'Scope 3',
    data: [
      { category: '원부자재 및 서비스 구매', emission: 191688 },
      {
        category: '사업장 발생 폐기물',
        emission: 94819,
      },
      { category: '원부자재 운송', emission: 74483 },
      { category: '운송 및 유통', emission: 23246 },
    ],
    total: 384236,
  },
];

export const SUB_EMISSION_DATA = [
  { name: '엔츠에너지', emission: 450883 },
  { name: '엔츠건설', emission: 390273 },
  { name: '엔츠물류', emission: 361763 },
];

export const SUPPLIER_EMISSION_DATA = [
  { name: '쿠팡샷시', emission: 58886 },
  { name: '레진스틸', emission: 25678 },
  { name: '대성패키징', emission: 13458 },
];

export const MONTHLY_EMISSON_DATA = [
  { month: '1월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '2월', scope1: '20', scope2: '30', scope3: '20' },
  { month: '3월', scope1: '15', scope2: '30', scope3: '30' },
  { month: '4월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '5월', scope1: '10', scope2: '30', scope3: '15' },
  { month: '6월', scope1: '5', scope2: '30', scope3: '10' },
  { month: '7월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '8월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '9월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '10월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '11월', scope1: '25', scope2: '50', scope3: '25' },
  { month: '12월', scope1: '25', scope2: '50', scope3: '25' },
];
