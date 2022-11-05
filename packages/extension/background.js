chrome.runtime.onInstalled.addListener(() => {
  chrome.contextMenus.create({
    id: "posthog",
    contexts: ["selection"],
    title: "Look this up in PostHog",
    type: "normal",
  });
});

const createPanel = (query) => {
  if (!document.getElementById("posthog-panel")) {
    const frame = document.createElement("iframe");
    frame.src = query
      ? `https://sidecar-panel.vercel.app//?email=${query}`
      : `https://sidecar-panel.vercel.app/`;
    frame.id = "posthog-panel";
    frame.style.width = "425px";
    frame.style.position = "fixed";
    frame.style.right = 0;
    frame.style.top = 0;
    frame.style.bottom = 0;
    frame.style.height = "100%";
    frame.style.border = "";
    frame.style.zIndex = 99999;

    const removeFrame = () => {
      document.body.removeChild(frame);
      document.body.removeEventListener("click", removeFrame);
    };

    document.body.addEventListener("click", removeFrame);

    document.body.appendChild(frame);
  } else {
    const frame = document.getElementById("posthog-panel");
    frame.src = query
      ? `https://sidecar-panel.vercel.app/?email=${query}`
      : `https://sidecar-panel.vercel.app/`;
  }
};

chrome.contextMenus.onClicked.addListener(async (info, tab) => {
  if (info.selectionText) {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      args: [info.selectionText],
      func: createPanel,
    });
  }
});

chrome.action.onClicked.addListener((tab) => {
  getEmailCheck(tab)
  .then((email) => {
    chrome.scripting.executeScript({
      target: { tabId: tab.id, allFrames: false },
      args: [email],
      func: createPanel,
    });
  })
});

chrome.runtime.onMessage.addListener((message) => {
  if (message.type === "save-prefs") {
  } else if (message.type === "get-defs") {
  }
});


const getEmailCheck = (tab) => {
  return new Promise((resolve, reject) => {
    // Get email if we know where to look
    if (tab.url.includes("zendesk")) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id, allFrames: false },
        func: () => {
          let email = "";
          const userEmailElement = document.getElementsByClassName("email-text")
          if (userEmailElement.length > 0) {
            email = userEmailElement[0].innerText
          }

          if (!email) {
            const ticketEmail = document.getElementsByClassName("sc-7acs88-3 hljQCC")
            if (ticketEmail.length > 0) {
              email = ticketEmail[0].innerText
            }
          }
          return email
        },
      }).then((result) => {
        let email = result[0].result || "";
        return resolve(email);
      });
    } else {
      return resolve("");
    }
  });
}