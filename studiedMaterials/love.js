const ExcelJS = require('exceljs');

const workbook = new ExcelJS.Workbook();
const sheet = workbook.addWorksheet('떠든 사람');

sheet.columns = [
    {header: '이름'},
    {header: '학년'},
    {header: '떠든횟수'},
]

sheet.addRows([
    ['김덕배', 3, 1],
    ['암스트롱', 4, 2],
    ['나카무라', 2, 1]
]);

workbook.xlsx.writeFile('./foo.xlsx').then(_=>{
    console.log('완료');
}).catch(_=>{
    console.log('시래');
});
