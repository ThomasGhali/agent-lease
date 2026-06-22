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
      bottom: 1.2rem;
      right: 1.2rem;
      width: 40px;
      height: 40px;
      background: hsl(142.1 76.2% 36.3%);
      border-radius: 50%;
      box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      z-index: 9999;
      transition: transform 0.12s ease-in-out;
    }
    .al-bubble:hover {
      transform: scale(1.1);
      background-color: hsl(142.1 76.2% 26.3%);
    }
    .al-symbol {
      position: absolute;
      opacity: 0;
      transform: scale(0.6) rotate(-45deg);
      transition: opacity 0.2s ease-in-out, transform 0.2s ease-in-out;
    }
    .al-symbol.is-active {
      opacity: 1;
      transform: scale(1) rotate(0deg);
    }
    .al-iframe {
      position: fixed;
      right: 1.2rem;
      bottom: calc(1.2rem * 2 + 40px);
      display: flex;
      width: 400px;
      height: 85vh;
      border: none;
      z-index: 1000;
      pointer-events: none;
      opacity: 0;
      transform: scale(0.9);
      transform-origin: bottom right;
      transition: transform 0.15s ease-in-out, opacity 0.15s ease-in-out;
      border-radius: 32px;
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
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="al-symbol al-symbol-message is-active">
      <path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/>
    </svg>
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="al-symbol al-symbol-close">
      <path d="m6 9 6 6 6-6"/>
    </svg>
  `
  document.body.appendChild(bubble)

  const iframe = document.createElement('iframe')
  iframe.className = 'al-iframe'
  iframe.setAttribute('inert', '')
  document.body.appendChild(iframe)

  let isOpen = false

  bubble.addEventListener('click', () => {
    const messageIcon = bubble.querySelector('.al-symbol-message')
    const closeIcon = bubble.querySelector('.al-symbol-close')

    if (isOpen) {
      iframe.classList.remove('al-active')
      messageIcon.classList.add('is-active')
      closeIcon.classList.remove('is-active')
      iframe.setAttribute('inert', '')
      isOpen = false
      return
    }

    if (!iframe.src) {
      iframe.src = `${scriptOrigin}/widget?agentId=${agentId}`
    }

    iframe.classList.add('al-active')
    iframe.removeAttribute('inert')
    messageIcon.classList.remove('is-active')
    closeIcon.classList.add('is-active')
    isOpen = true
  })

  window.addEventListener('message', event => {
    if (event.data && event.data.type === 'close-widget') {
      const messageIcon = bubble.querySelector('.al-symbol-message')
      const closeIcon = bubble.querySelector('.al-symbol-close')
      
      iframe.classList.remove('al-active')
      messageIcon.classList.add('is-active')
      closeIcon.classList.remove('is-active')
      iframe.setAttribute('inert', '')
      isOpen = false
    }
  })
})()
