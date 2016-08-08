import 'whatwg-fetch';
const npm = 'https://www.npmjs.com/package/';
const npmRegistry = 'https://registry.npmjs.org';
// Listen
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo && changeInfo.url && changeInfo.url.startsWith(npm)) {
    let packageName = changeInfo.url.split('/');
    packageName = packageName[packageName.length - 1];
    fetch(`${npmRegistry}/${packageName}`)
      .then((response) => {
        return response.json();
      }).then((json) => {
        // If have github repository
        if (json.repository && json.repository.type === 'git' && json.repository.url.match(/github/)) {
          // Remove git+ in url
          let url = json.repository.url.substring(4);
          if (url[0] === '/') {
            url = `https:${url}`;
          }
          // Redirect to github
          chrome.tabs.update(tab.id, { url });
        }
      })
  }
});
