const TOKEN = '1172111308:AAF2XLRqUTCrY925f4cz_jNTU8UdfdXTfzk';
const TELEGRAM_URL = 'https://api.telegram.org/bot' + TOKEN;
const APP_URL = 'https://script.google.com/macros/s/AKfycbx8p1e4zaK2VDLEpUL1a5wfkeBl_kB76Z6Lke68fiSg097W84M/exec';

function fetchAndLog(endpoint) {
  const response = UrlFetchApp.fetch(TELEGRAM_URL + endpoint);
  const text = response.getContentText();
  Logger.log(text);
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const message = data.message;
  fetchAndLog('/sendMessage?chat_id=' + message.chat.id + '&text=' + message.from.first_name);
}

function setWebhook() {
  fetchAndLog('/setWebhook?url=' + encodeURIComponent(APP_URL));
}
