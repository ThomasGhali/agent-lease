/* global document, window */
;(function () {
  const script = document.currentScript
  const scriptOrigin = script.src.split('/widget')[0]
  const agentId = script.getAttribute('data-agent-id')

  if (!agentId) {
    console.error('AgentLease: data-agent-id is required')
    return
  }

  // Inject Styles dynamically
  const style = document.createElement('style')
  style.textContent = `
    .al-bubble {
      position: fixed;
      bottom: 20px;
      right: 20px;
      width: 60px;
      height: 60px;
      background: hsl(142.1 76.2% 36.3%);
      border-radius: 50%;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 999999;
      transition: transform 0.15s ease-in-out, background-color 0.15s ease-in-out;
    }
    .al-bubble:hover {
      transform: scale(1.1);
      background-color: hsl(142.1 76.2% 26.3%);
    }
    .al-bubble svg {
      transition: transform 0.2s ease-in-out;
    }
    .al-bubble.al-active svg {
      transform: rotate(90deg);
    }
    .al-iframe {
      position: fixed;
      bottom: 90px;
      right: 20px;
      width: 400px;
      height: 85vh;
      max-height: 700px;
      border: none;
      border-radius: 24px;
      box-shadow: 0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1);
      z-index: 999998;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.9);
      transform-origin: bottom right;
      transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
    }
    .al-iframe.al-active {
      pointer-events: auto;
      opacity: 1;
      transform: none;
    }
  `
  document.head.appendChild(style)

  const bubble = document.createElement('div')
  bubble.className = 'al-bubble'
  bubble.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  `
  document.body.appendChild(bubble)

  const iframe = document.createElement('iframe')
  iframe.className = 'al-iframe'
  iframe.setAttribute('inert', '')
  document.body.appendChild(iframe)

  let isOpen = false

  bubble.addEventListener('click', () => {
    if (isOpen) {
      iframe.classList.remove('al-active')
      bubble.classList.remove('al-active')
      iframe.setAttribute('inert', '')
      isOpen = false
      return
    }

    if (!iframe.src) {
      iframe.src = `${scriptOrigin}/widget?agentId=${agentId}`
    }

    iframe.classList.add('al-active')
    iframe.removeAttribute('inert')
    bubble.classList.add('al-active')
    isOpen = true
  })

  window.addEventListener('message', event => {
    if (event.data && event.data.type === 'close-widget') {
      iframe.classList.remove('al-active')
      bubble.classList.remove('al-active')
      iframe.setAttribute('inert', '')
      isOpen = false
    }
  })
})()
