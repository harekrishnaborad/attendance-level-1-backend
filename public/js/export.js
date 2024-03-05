function exportTableToExcel(tableId) {
    const table = document.getElementById(tableId);
    const html = table.outerHTML;
    const blob = new Blob([html], {type: 'application/vnd.ms-excel'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');

    a.href = url;
    a.download = 'table.xls';
    a.click();  
    URL.revokeObjectURL(url);
}
  
document.getElementById('exportButton').addEventListener('click', function() {
  exportTableToExcel('tableId');
});