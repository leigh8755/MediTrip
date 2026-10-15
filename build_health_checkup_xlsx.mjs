import fs from 'node:fs/promises';
import { SpreadsheetFile, Workbook } from '@oai/artifact-tool';

const root = process.cwd();
const sourceJs = await fs.readFile(`${root}/service-data.js`, 'utf8');
const jsonText = sourceJs.slice(sourceJs.indexOf('=') + 1).trim().replace(/;\s*$/, '');
const serviceData = JSON.parse(jsonText);
const sourceRecords = serviceData.find(x => x.key === 'checkup').records;

const english = {
  '北京': [
    ['Peking Union Medical College Hospital, Department of Health Management', '北京·东城（东单/西院国际医疗）', 'Dongcheng, Beijing (Dongdan / Western Campus International Medical)', '公立三甲综合医院健康医学部', 'Health medicine department in a public Grade III-A general hospital', 'Hospital-level comprehensive screening configured by sex and age, with VIP options that may include advanced imaging and MRI.', '通行英文名'],
    ['United Family Hospital Beijing, Health Screening Center', '北京·朝阳（芳园西路）', 'Chaoyang, Beijing (Fangyuan West Road)', '国际私立综合医院健康体检中心', 'Health screening center in an international private general hospital', 'A bilingual, one-stop screening service that can be tailored by age, sex and risk profile, with support for international patients and insurance coordination.', '官网英文名'],
    ['Peking University International Hospital, VIP Health Screening Center', '北京·昌平（生命科学园）', 'Changping, Beijing (Life Science Park)', '大学附属私立综合医院VIP体检中心', 'VIP health screening center in a university-affiliated private general hospital', 'Sex-specific programs combine laboratory tests, thyroid assessment, C13 testing and imaging, with optional cancer-risk screening.', '参考译名'],
    ['China-Japan Friendship Hospital, Health Check-up Center / International Medical Department', '北京·朝阳（樱花园）', 'Chaoyang, Beijing (Yinghuayuan)', '公立三甲综合医院健康体检中心/国际部', 'Health check-up center and international department in a public Grade III-A general hospital', 'Standard and advanced screening pathways can combine cardiovascular, cerebrovascular, cancer and digestive-system assessments, with imaging options.', '参考译名'],
    ['Peking University Third Hospital, Outpatient Health Screening Center', '北京·海淀（花园北路）', 'Haidian, Beijing (Huayuan North Road)', '公立三甲综合医院门诊体检中心', 'Outpatient health screening center in a public Grade III-A general hospital', 'Sex-specific screening covers cardiovascular and cerebrovascular health, lung, gastrointestinal and cancer-risk assessment, with selected ultrasound and CT options.', '官网英文名'],
    ['Beijing Anzhen Hospital, Health Management Center', '北京·朝阳（安贞路）', 'Chaoyang, Beijing (Anzhen Road)', '公立三甲心血管专科医院健康管理中心', 'Health management center in a public Grade III-A cardiovascular specialty hospital', 'Focused cardiovascular and cerebrovascular assessment includes vascular evaluation, lung function, ultrasound and cancer-risk screening.', '参考译名'],
    ["Peking University People's Hospital, Health Management Center", '北京·西城（西直门）', 'Xicheng, Beijing (Xizhimen)', '公立三甲综合医院健康管理中心', 'Health management center in a public Grade III-A general hospital', 'Advanced imaging, tumor markers and cardiovascular assessment can be combined, with a clear pathway to hospital specialty referral.', '官网英文名'],
    ['iKang Jun’an International Healthcare, Beijing Flagship / VVIP Center', '北京·朝阳（建国门/郎家园）', 'Chaoyang, Beijing (Jianguomen / Langjiayuan)', '高端专业体检网络国际中心', 'International premium health-screening network and center', 'Dedicated guidance supports cancer-risk, cardiovascular and multi-site ultrasound screening, with selected AI retinal assessment options.', '参考译名'],
    ['Ciming Aoya / Ciyun Temple Premium Health Screening Center', '北京·朝阳', 'Chaoyang, Beijing', '高端专业体检中心', 'Premium health-screening center', 'Premium screening programs cover MRI or CT options and multi-system assessment, with sex-specific pathways.', '参考译名'],
    ['Rich Healthcare, Beijing Sanlitun / Wangjing', '北京·朝阳', 'Chaoyang, Beijing', '高端专业体检网络中心', 'Premium health-screening network center', 'Screening covers cancer, cardiovascular and cerebrovascular, liver and gastrointestinal risks, with C13 and selected CT or cardiac ultrasound options.', '参考译名'],
  ],
  '大湾区（内地九市）': [
    ['The University of Hong Kong-Shenzhen Hospital, International Medical Center (IMC)', '深圳·福田', 'Futian, Shenzhen', '公立三甲综合医院国际医疗中心健康筛查', 'International health screening center in a public Grade III-A general hospital', 'Gender- and age-specific programs cover laboratory tests, imaging, cancer-risk assessment and nutritional consultation.', '官网英文名'],
    ['Shenzhen New Frontier United Family Hospital', '深圳·福田', 'Futian, Shenzhen', '国际私立综合医院健康体检中心', 'Health screening center in an international private general hospital', 'A one-stop international screening service can add cancer, gastrointestinal and brain-health assessments, with multilingual and cross-border service support.', '官网英文名'],
    ['Guangzhou United Family Hospital, Health Screening Center', '广州·海珠', 'Haizhu, Guangzhou', '国际私立综合医院健康体检中心', 'Health screening center in an international private general hospital', 'A multidisciplinary team can tailor screening by age, sex and risk, covering digestive, cardiac, women’s, breast, cervical, prostate and thyroid health.', '官网英文名'],
    ['Nanfang Hospital, Southern Medical University, VIP Health Management Center', '广州·白云', 'Baiyun, Guangzhou', '公立三甲综合医院健康管理中心VIP区', 'VIP health management center in a public Grade III-A general hospital', 'Tertiary-hospital multidisciplinary resources cover cardiovascular and cerebrovascular, cancer, lung, digestive and women’s health screening.', '参考译名'],
    ['Guangdong Provincial People’s Hospital, Health Management / Health Screening Center', '广州·越秀', 'Yuexiu, Guangzhou', '公立三甲综合医院健康管理/体检中心', 'Health management and screening center in a public Grade III-A general hospital', 'Sex-specific screening provides broad systemic assessment with options for hospital-based specialty referral.', '参考译名'],
    ['Peking University Shenzhen Hospital, Health Management Center / International Department', '深圳·福田', 'Futian, Shenzhen', '公立三甲综合医院健康管理中心/国际部', 'Health management center and international department in a public Grade III-A general hospital', 'Sex-specific imaging, cancer-risk, cardiovascular and specialty assessments are available, with an international-care setting for overseas visitors.', '官网英文名'],
    ['Shenzhen Hengsheng Hospital, Health Management Center', '深圳·宝安', 'Bao’an, Shenzhen', '民营综合医院健康管理中心', 'Health management center in a private general hospital', 'Screening pathways cover imaging, cancer-risk, cardiovascular and sex-specific assessments, with expanded options for individualized plans.', '参考译名'],
    ['The Fifth Affiliated Hospital of Sun Yat-sen University, Health Management Center', '珠海·香洲', 'Xiangzhou, Zhuhai', '公立三甲大学附属医院健康管理中心', 'Health management center in a public Grade III-A university-affiliated hospital', 'Programs cover cardiovascular and cerebrovascular, cancer, thyroid, gastrointestinal and women’s health, with sex-specific pathways.', '官网英文名'],
    ['Dongguan Tungwah Hospital, Health Management Department', '东莞·东城/松山湖', 'Dongcheng / Songshan Lake, Dongguan', '民营综合医院健康管理部', 'Health management department in a private general hospital', 'Standard and VIP pathways use guided navigation and risk-based combinations, with a dedicated Songshan Lake campus option.', '参考译名'],
    ["Shenzhen People's Hospital, Health Management Center", '深圳·罗湖', 'Luohu, Shenzhen', '公立三甲综合医院健康管理中心', 'Health management center in a public Grade III-A general hospital', 'Public-hospital screening covers routine laboratory tests, imaging and common chronic-disease risks, with hospital referral continuity.', '官网英文名'],
  ],
  '香港': [
    ['HKSH Medical Group, Health Assessment Centre', '香港岛·跑马地', 'Happy Valley, Hong Kong Island', '私立综合医院健康评估中心', 'Health assessment centre in a private hospital group', 'Physician consultation, laboratory tests, imaging and sex-specific screening are available, with optional low-dose chest CT.', '官网英文名'],
    ['Matilda International Hospital', '香港岛·山顶', 'The Peak, Hong Kong Island', '私立综合医院健康检查中心', 'Health screening centre in a private general hospital', 'Multi-level health screening covers cancer, cardiac and sex-specific assessments, supported by mature English-language services.', '官网英文名'],
    ['Hong Kong Adventist Hospital—Stubbs Road', '香港岛·司徒拔道', 'Stubbs Road, Hong Kong Island', '私立综合医院健康检查中心', 'Health screening centre in a private general hospital', 'Physician assessments, laboratory tests, imaging and cardiovascular or cancer-risk screening are combined into sex-specific pathways.', '官网英文名'],
    ['CUHK Medical Centre', '香港·沙田', 'Sha Tin, Hong Kong', '大学附属私立医院健康检查中心', 'Health screening centre in a university-affiliated private hospital', 'Comprehensive screening covers cardiovascular, diabetes and cancer risks, with family-doctor assessment before and after testing.', '官网英文名'],
    ['Gleneagles Hospital Hong Kong, Health Screening Centre', '香港岛·黄竹坑', 'Wong Chuk Hang, Hong Kong Island', '私立综合医院健康检查中心', 'Health screening centre in a private general hospital', 'Tiered screening covers blood tests, diagnostic imaging, eye and cardiac checks, and sex-specific assessments.', '官网英文名'],
    ["St. Paul's Hospital, Health Centre & Electro-Diagnostic Centre", '香港岛·铜锣湾', 'Causeway Bay, Hong Kong Island', '私立综合医院健康中心', 'Health centre in a private general hospital', 'Men’s and women’s health checks include physician examination, laboratory tests and progressively broader imaging and ultrasound.', '官网英文名'],
    ['Hong Kong Baptist Hospital, Ambulatory Medical Centre (HKBH AMC)', '香港·九龙塘/沙田', 'Kowloon Tong / Sha Tin, Hong Kong', '私立医院日间医疗健康检查中心', 'Health screening centre in a private hospital ambulatory medical centre', 'Physician consultations before and after screening combine nursing assessment, vital signs, laboratory tests and imaging.', '官网英文名'],
    ['Union Hospital, Health Check Centre', '香港·沙田大围', 'Tai Wai, Sha Tin, Hong Kong', '私立综合医院健康检查中心', 'Health check centre in a private general hospital', 'Physician consultation, laboratory tests, ultrasound and imaging can be combined across sex-specific and specialty pathways.', '官网英文名'],
    ['Canossa Hospital, Health Check-up Centre', '香港岛·半山区', 'Mid-Levels, Hong Kong Island', '私立综合医院健康检查中心', 'Health check-up centre in a private general hospital', 'Sex-specific screening can add bone-density, coronary-risk and other targeted assessments according to clinical needs.', '官网英文名'],
    ['re:HEALTH Hong Kong', '香港·中环/尖沙咀等', 'Central / Tsim Sha Tsui and other Hong Kong locations', '私立专业体检中心', 'Private specialist health-screening centre', 'Health checks combine physical examination, blood and urine testing, biochemistry, cancer markers and imaging, with focused screening pathways.', '品牌通行英文名'],
  ],
  '海南': [
    ['PLA General Hospital Hainan Hospital (Hainan 301), Health Medicine Department', '三亚·海棠湾', 'Haitang Bay, Sanya', '军队三甲综合医院健康医学科', 'Health medicine department in a military Grade III-A general hospital', 'Tertiary-hospital imaging and multidisciplinary consultation support customized systemic screening and post-screening referral.', '参考译名'],
    ['Hainan General Hospital, Health Management Center', '海口', 'Haikou, Hainan', '公立三甲综合医院健康管理中心', 'Health management center in a public Grade III-A general hospital', 'Routine, biochemical, imaging, cancer-risk and cardiovascular screening can be combined with individualized clinical additions.', '参考译名'],
    ['The First Affiliated Hospital of Hainan Medical University, Health Management Center', '海口', 'Haikou, Hainan', '公立三甲大学附属医院健康管理中心', 'Health management center in a public Grade III-A university-affiliated hospital', 'One-stop screening with guided navigation, standard assessments, individualized review and specialist interpretation after testing.', '官网英文名'],
    ['The Second Affiliated Hospital of Hainan Medical University, Health Check-up Center', '海口', 'Haikou, Hainan', '公立三甲大学附属医院健康体检中心', 'Health check-up centre in a public Grade III-A university-affiliated hospital', 'A one-stop health check-up service covers core examinations and health-management follow-up across sex-specific pathways.', '参考译名'],
    ['Boao Super Hospital, Health Screening Center', '琼海·博鳌乐城', 'Boao Lecheng, Qionghai', '博鳌乐城研究型综合医疗平台体检中心', 'Screening centre in a Boao Lecheng research-oriented medical platform', 'Screening can connect with Lecheng multidisciplinary services and regulated innovative medical resources when clinically appropriate.', '参考译名'],
    ['Ruijin Hainan Hospital (Boao Research Hospital), Health Screening Center', '琼海·博鳌乐城', 'Boao Lecheng, Qionghai', '博鳌乐城研究型医院体检中心', 'Screening centre in a Boao Lecheng research-oriented hospital', 'Multidisciplinary expertise, imaging and chronic-disease or cancer-risk assessment support tailored screening and referral.', '参考译名'],
    ['United Family Boao Medical Center', '琼海·博鳌乐城', 'Boao Lecheng, Qionghai', '国际私立医疗中心健康评估', 'Health assessment service in an international private medical centre', 'Family medicine, health assessment and specialty coordination support bilingual care and international-patient navigation.', '官网英文名'],
    ['Hainan Chengmei International Health Management Center', '海口', 'Haikou, Hainan', '私立国际健康管理中心', 'Private international health management centre', 'Services combine specialist consultation, risk screening, health assessment, chronic-disease management and integrated prevention.', '官网英文名'],
    ['Sanya Central Hospital (Hainan Third People’s Hospital), Health Management Center', '三亚', 'Sanya, Hainan', '公立三甲综合医院健康管理中心', 'Health management centre in a public Grade III-A general hospital', 'Pre-check assessment, laboratory tests, imaging and post-check management can be tailored to cardiovascular or cancer-risk needs.', '参考译名'],
    ['Hainan Cancer Hospital, Health Management / Health Screening Center', '海口·西海岸', 'West Coast, Haikou', '公立三甲肿瘤专科医院健康管理/体检中心', 'Health management and screening centre in a public Grade III-A oncology specialty hospital', 'Focused screening for people with elevated cancer risk can connect with oncology follow-up and specialist treatment pathways.', '官网英文名'],
  ],
};

const regionOrder = ['北京', '大湾区（内地九市）', '香港', '海南'];
const regionSheet = { '北京': '北京 Beijing', '大湾区（内地九市）': '大湾区 GBA', '香港': '香港 Hong Kong', '海南': '海南 Hainan' };
const regionTitle = { '北京': '北京高端健康体检机构推荐 Top 10 / Premium Health Screening Institutions', '大湾区（内地九市）': '大湾区健康体检机构推荐 Top 10 / Greater Bay Area Health Screening Institutions', '香港': '香港健康体检机构推荐 Top 10 / Hong Kong Health Screening Institutions', '海南': '海南健康体检机构推荐 Top 10 / Hainan Health Screening Institutions' };
const cleanCn = s => s.replace(/现价需咨询[。；]?/g, '').replace(/套餐现价需咨询/g, '').trim();
const rawMap = new Map(sourceRecords.map(r => [`${r.region}|${r.rank}`, r]));
const records = [];
for (const [regionIndex, region] of regionOrder.entries()) {
  for (const meta of english[region]) {
    const rank = english[region].indexOf(meta) + 1;
    const raw = rawMap.get(`${region}|${rank}`);
    if (!raw) throw new Error(`Missing source record: ${region} #${rank}`);
    records.push({
      region, rank, nameCn: raw.nameCn, nameEn: meta[0], nameStatus: meta[6], locationCn: raw.locationCn,
      locationEn: meta[2], typeCn: meta[3], typeEn: meta[4], introCn: cleanCn(raw.introCn), introEn: meta[5],
      website: raw.website, officialSource: '附件资料中的机构官网 / Institution website listed in the attached source',
      urlVerification: '已与附件资料逐行核对 / Cross-checked against attached source data', verifiedOn: '2026-10-08'
    });
  }
}

const headers = ['地区 Region', '推荐序号 Rank', '机构名称 Institution (CN)', 'Institution Name (EN)', '英文名性质 English-name status', '所在城市/院区 Location (CN)', 'Location (EN)', '机构类型 Type (CN)', 'Type (EN)', '健康体检服务概述（中文）', 'Health screening summary (EN)', '官网 Website', '官方来源 Official source', '网址核验状态 URL verification', '核验日期 Verified on'];
const toRow = r => [r.region, r.rank, r.nameCn, r.nameEn, r.nameStatus, r.locationCn, r.locationEn, r.typeCn, r.typeEn, r.introCn, r.introEn, r.website, r.officialSource, r.urlVerification, r.verifiedOn];

const wb = Workbook.create();
const navy = '#18344A';
const pale = '#EAF0F4';
const gray = '#60717B';
const widths = [18, 8, 34, 42, 20, 27, 29, 30, 35, 46, 49, 33, 42, 42, 16];

function styleMainTable(sheet, tableRange, headerRange, dataRange, titleRange, subtitleRange, tableName, dataRowCount) {
  sheet.showGridLines = false;
  sheet.getRange('B:P').format.font = { name: 'Arial', size: 10, color: '#20313C' };
  sheet.getRange(titleRange).format = { font: { name: 'Arial', size: 16, bold: true, color: navy }, verticalAlignment: 'center' };
  sheet.getRange(subtitleRange).format = { font: { name: 'Arial', size: 10, italic: true, color: gray }, verticalAlignment: 'center' };
  sheet.getRange(headerRange).format = { fill: navy, font: { name: 'Arial', size: 9, bold: true, color: '#FFFFFF' }, wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#FFFFFF' } };
  sheet.getRange(dataRange).format = { wrapText: true, verticalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#D9E1E7' } };
  sheet.getRange(dataRange).format.fill = '#FFFFFF';
  sheet.getRange(`B${dataRange.match(/\d+/)[0]}:P${Number(dataRange.match(/:(?:[A-Z]+)(\d+)/)?.[1] || 0)}`).format.rowHeight = 104;
  for (let i = 0; i < widths.length; i++) sheet.getRangeByIndexes(0, i + 1, 1, 1).format.columnWidth = widths[i];
  sheet.getRange(titleRange).format.rowHeight = 28;
  sheet.getRange(subtitleRange).format.rowHeight = 24;
  sheet.getRange(headerRange).format.rowHeight = 50;
  sheet.freezePanes.freezeRows(5);
  sheet.freezePanes.freezeColumns(3);
  const table = sheet.tables.add(tableRange, true, tableName);
  table.style = 'TableStyleMedium4';
  table.showBandedRows = false;
}

const overview = wb.worksheets.add('总览 Overview');
overview.showGridLines = false;
overview.getRange('B2:J2').merge();
overview.getRange('B3:J3').merge();
overview.getRange('B2').values = [['四地健康体检机构中英文推荐榜 / Bilingual Health Screening Guide']];
overview.getRange('B3').values = [['北京、大湾区内地九市、香港、海南｜40家｜资料核对 2026-10-08']];
overview.getRange('B2:J2').format = { font: { name: 'Arial', size: 16, bold: true, color: navy } };
overview.getRange('B3:J3').format = { font: { name: 'Arial', size: 10, italic: true, color: gray } };
overview.getRange('B5:J5').values = [['地区 Region', '机构数 Count', '已填官网 Website', '公立/三甲 Public/Grade III-A', '私立/连锁 Private/network', '博鳌乐城 Lecheng', '英文名 English names', '核对日期 Checked on', '说明 Notes']];
const overviewRows = regionOrder.map(region => {
  const rs = records.filter(r => r.region === region);
  const publicCount = rs.filter(r => /公立|三甲|军队/.test(r.typeCn)).length;
  const privateCount = rs.filter(r => /私立|民营|连锁|专业/.test(r.typeCn)).length;
  const lecheng = rs.filter(r => /博鳌乐城/.test(r.locationCn)).length;
  return [region, rs.length, rs.filter(r => r.website).length, publicCount, privateCount, lecheng, rs.filter(r => r.nameEn).length, '2026-10-08', '研究推荐顺序，非官方排名 / Editorial research order, not an official ranking.'];
});
overview.getRange('B6:J9').values = overviewRows;
overview.getRange('B12:J12').merge();
overview.getRange('B12').values = [['口径与使用说明 / Method and use notes']];
overview.getRange('B12:J12').format = { font: { name: 'Arial', size: 12, bold: true, color: navy } };
overview.getRange('B13:J17').merge(true);
overview.getRange('B13').values = [['1. 四地没有统一官方“前十”榜单。本表按机构资质、医疗能力、专科覆盖、国际服务与资料可核验性整理为研究推荐顺序。\n2. 大湾区按内地九市统计，香港单列，澳门本次不纳入。\n3. 英文名称用于双语展示，逐行标注官网英文名、通行英文名或参考译名。\n4. 机构服务、院区与预约安排可能调整，实际需求请以机构官网及预约沟通结果为准。\n5. 本表仅保留机构、服务、官网与来源信息，便于后续按客户需求沟通。']];
overview.getRange('B13:J17').format = { font: { name: 'Arial', size: 10, color: '#20313C' }, wrapText: true, verticalAlignment: 'center' };
overview.getRange('B5:J5').format = { fill: navy, font: { name: 'Arial', size: 9, bold: true, color: '#FFFFFF' }, wrapText: true, horizontalAlignment: 'center', verticalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#FFFFFF' } };
overview.getRange('B6:J9').format = { wrapText: true, verticalAlignment: 'center', borders: { preset: 'all', style: 'thin', color: '#D9E1E7' } };
overview.getRange('B2:J2').format.rowHeight = 28; overview.getRange('B3:J3').format.rowHeight = 24; overview.getRange('B5:J5').format.rowHeight = 42; overview.getRange('B6:J9').format.rowHeight = 34; overview.getRange('B13:J17').format.rowHeight = 32;
for (const [i, w] of [24, 12, 15, 22, 20, 18, 18, 17, 48].entries()) overview.getRangeByIndexes(0, i + 1, 1, 1).format.columnWidth = w;
overview.tables.add('B5:J9', true, 'OverviewTable').style = 'TableStyleMedium4';

for (const [regionIndex, region] of regionOrder.entries()) {
  const sheet = wb.worksheets.add(regionSheet[region]);
  const rows = records.filter(r => r.region === region).map(toRow);
  sheet.getRange('B2:P2').merge(); sheet.getRange('B3:P3').merge();
  sheet.getRange('B2').values = [[regionTitle[region]]];
  sheet.getRange('B3').values = [['资料核对日期 / Checked: 2026-10-08｜研究推荐顺序，非官方排名 / Editorial research order, not an official ranking.']];
  sheet.getRange('B5:P5').values = [headers];
  sheet.getRange('B6:P15').values = rows;
  styleMainTable(sheet, 'B5:P15', 'B5:P5', 'B6:P15', 'B2:P2', 'B3:P3', `Region${regionIndex + 1}HealthTable`, 10);
}

const all = wb.worksheets.add('全部数据 All Data');
all.showGridLines = false;
all.getRange('B2:P2').merge(); all.getRange('B3:P3').merge();
all.getRange('B2').values = [['全部健康体检机构 / All Health Screening Institutions']];
all.getRange('B3').values = [['四地共 40 家｜大湾区按内地九市统计，香港单列｜资料核对 2026-10-08']];
all.getRange('B4:P4').values = [headers];
all.getRange('B5:P44').values = records.map(toRow);
styleMainTable(all, 'B4:P44', 'B4:P4', 'B5:P44', 'B2:P2', 'B3:P3', 'AllHealthData', 40);
all.freezePanes.freezeRows(4); all.freezePanes.freezeColumns(3);

wb.recalculate();
const out = `${root}/北京-大湾区-香港-海南健康体检机构中英文推荐榜.xlsx`;
const xlsx = await SpreadsheetFile.exportXlsx(wb);
await xlsx.save(out);

for (const name of ['总览 Overview', '北京 Beijing', '大湾区 GBA', '香港 Hong Kong', '海南 Hainan', '全部数据 All Data']) {
  const preview = await wb.render({ sheetName: name, autoCrop: 'all', scale: 1, format: 'png' });
  await fs.writeFile(`${root}/preview_${name.replace(/[^A-Za-z0-9]+/g, '_')}.png`, new Uint8Array(await preview.arrayBuffer()));
}
console.log(`EXPORTED ${out}`);
console.log((await wb.inspect({ kind: 'table', range: '北京 Beijing!B5:P8', include: 'values,formulas', tableMaxRows: 4, tableMaxCols: 15 })).ndjson);
console.log((await wb.inspect({ kind: 'match', searchTerm: '#REF!|#DIV/0!|#VALUE!|#NAME\\?|#N/A|#NUM!|#NULL!|#SPILL!|#CALC!', options: { useRegex: true, maxResults: 50 }, summary: 'final formula error scan' })).ndjson);
