function getDefaultDaysBack(){
  var x=getDateNDaysBack_(1);
  console.log (x);
  return x;
}

function testcount(){
    var query = '';
  //filename:jpg OR filename:tif OR filename:gif OR fileName:png OR filename:bmp OR filename:svg'; //'after:'+getDateNDaysBack_(1)+
  for (var i in fileTypesToExtract) {
    query += (query === '' ? ('filename:' + fileTypesToExtract[i]) : (' OR filename:' + fileTypesToExtract[i]));
  }
  query = 'in:MailTest ' + query;  
  var label = getGmailLabel_('MailTest'); 
 
  query = query + ' after:'+  getDateNDaysBack_(1);
  console.log (query)
  var threads = GmailApp.search(query);
  console.log (threads.length)
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
