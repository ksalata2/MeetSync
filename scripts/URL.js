/**
 * File to call when a notification for a meeting is due. It
 * will extract the domain from the link provided by the user
 * so we can launch a new browser/tab
 * 
 * @param {string} url will contain the URL from link povided by user 
 */

const extractHostname = (url) => {
    // Return hostname of URL
    return new URL(url).hostname;
  }
