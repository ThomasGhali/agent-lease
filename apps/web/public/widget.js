;(function () {
  const script = document.currentScript
  const agentId = script.getAttribute('data-agent-id')

  if (!agentId) {
    console.error('AgentLease: data-agent-id is required')
    return
  }

  const bubble = document.createElement('div')
  bubble.style.cssText = `
    position: fixed; bottom: 20px; right: 20px; width: 60px; height: 60px;
    background: #3b82f6; border-radius: 50%; box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.3);
    display: flex; align-items: center; justify-content: center; cursor: pointer; z-index: 9999;
  `

  bubble.innerHTML = `
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
    </svg>
  `

  document.body.appendChild(bubble)

  const iframe = document.createElement('iframe')
  let isOpen = false

  bubble.addEventListener('click', () => {
    if (isOpen) {
      iframe.style.display = 'none'
      isOpen = false
      return
    }

    if (iframe.src) {
      iframe.style.display = 'block'
      isOpen = true
      return
    }

    isOpen = true
    iframe.src = `http://localhost:3000`
    iframe.style.cssText = `
        position: fixed; bottom: 90px; right: 20px; width: 340px; height: 420px;
        border: none; border-radius: 16px; box-shadow: 0 10px 20px -12px rgb(0 0 0 / 0.4);
        z-index: 9998;
      `
    document.body.appendChild(iframe)
  })
})()

/* 
  - create a bubble (div) that is clickable and toggles a chat window
  - check if data-agent-id exists, otherwise don't render the widget and return console error
  - add styles to the bubble and chat window
  - create hidden iframe with src set to next.js localhost:3000 and pass the agent id as a prop
  - 
*/
