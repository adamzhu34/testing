/*
Develop by Adam Zhu
Develop on 2019-12-6
*/

// Step 1:get folder ID from URL information
function getIdFromUrl(url) {
  //var url="https://drive.google.com/drive/folders/1xw7zxwqjnc5E3Ts4zbd8DXcilKBr06-_"
  var result = url.match(/[-\w]{25,}/)
  Logger.log(result);
  return result;
}

// Step 2:get folder sheet list by file name and file ID
function get_FolderFiles(folder_id) {
 folder_id=folder_id||"1fEb6Dvo1jXz579uPRcY576ae5e9kUuPA";
  if (folder_id.toString().length > 0) {
    var folder = DriveApp.getFolderById(folder_id);
    var contents = folder.getFiles(); var cnt = 0; var file; var data = [];
    while (contents.hasNext()) {
      var file = contents.next();
      //  console.log (file.getMimeType()); //ms-excel
      if (file.getMimeType().match('spreadsheet')|| file.getMimeType().match('ms-excel')) {
        cnt++; data.push([file.getName(), file.getId()]);
      }
    }
  }
  //  Logger.log (data);
  return data;
}

//Step 3:get the sheet list by file name and file ID base on given URL
function get_Sheets() {
  let folder_id = "1fEb6Dvo1jXz579uPRcY576ae5e9kUuPA";
  // folder_id=getIdFromUrl(URL);
  var list = get_FolderFiles(folder_id);
  console.log(list);
  return list

}


function convertXlsToGS_test() {
  let files = get_Sheets();
  // let filename = files[0][0];
  let target_folderid = '1NmN3Nwa6typ9Sn8h-b4U2gTL1xmRFlfs'
  files.forEach(filename=> convertExceltoGoogleSpreadsheet(filename[0], target_folderid));
 
  console.log('ok')
}

function convertExceltoGoogleSpreadsheet(fileName, folderId) {

  try {

    // Written by Amit Agarwal
    // www.ctrlq.org

    fileName = fileName || "microsoft-excel.xlsx";

    var excelFile = DriveApp.getFilesByName(fileName).next();
    var fileId = excelFile.getId();
    // var folderId = Drive.Files.get(fileId).parents[0].id;

    var blob = excelFile.getBlob();
    var resource = {
      title: excelFile.getName(),
      mimeType: MimeType.GOOGLE_SHEETS,
      parents: [{ id: folderId }],
    };

    Drive.Files.insert(resource, blob);

  } catch (f) {
    Logger.log(f.toString());
  }

}


function getDefaultDaysBack() {
  var x = getDateNDaysBack_(1);
  console.log(x);
  return x;
}

function testcount() {
  var query = '';
  //filename:jpg OR filename:tif OR filename:gif OR fileName:png OR filename:bmp OR filename:svg'; //'after:'+getDateNDaysBack_(1)+
  for (var i in fileTypesToExtract) {
    query += (query === '' ? ('filename:' + fileTypesToExtract[i]) : (' OR filename:' + fileTypesToExtract[i]));
  }
  query = 'in:MailTest ' + query;
  var label = getGmailLabel_('MailTest');

  query = query + ' after:' + getDateNDaysBack_(1);
  console.log(query)
  var threads = GmailApp.search(query);
  console.log(threads.length)
}



function getGmailLabel_test(name) {

  var labels = GmailApp.getUserLabels();
  var label = getGmailLabel('MailTest')

  var filter = createFilter(label, label.getName());
  var threads = GmailApp.search(filter, 0, 5);

  console.log(label.getName())
  console.log(threads)
  // Logs all of the names of your labels

  // for (var i = 0; i < labels.length; i++) {
  //   Logger.log("label: " + labels[i].getName());
  // }

}


function getGmailLabel(name) {

  var label = GmailApp.getUserLabelByName(name);

  if (!label) {

    label = GmailApp.createLabel(name);

  }

  return label;

}

function createFilter(label, archiveLabel) {

  var filter = "has:attachment -label:" + archiveLabel + " label:" + label;

  return filter;

}
