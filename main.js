window.addEventListener('load', () => {
  const handleMutation = (mutationsList) => {
    for (let mutation of mutationsList) {
      if (
        mutation.type === 'attributes' &&
        mutation.attributeName === 'class'
      ) {
        const target = mutation.target
        if (
          target.title === 'Нажмите, если лень смотреть опенинг' ||
          (target.title === 'Перейти к следующему эпизоду' &&
            !target.classList.contains('vjs-hidden'))
        ) {
          console.log(
            `%cJut.su Extended%c\n\n    github: https://github.com/soiderino/jut.su-extended\n    created by: soiderino 💜`,
            `color: #293e29; padding: .2rem; border-radius: .3rem; background-color: #62955b; font-family: verdana; font-weight: bold; font-size: 9px; text-transform: uppercase;`,
            `color: #ffffff`
          )
          target.dispatchEvent(new Event('click'))
        }
      }
    }
  }

  const observer = new MutationObserver(handleMutation)

  const intervalId = setInterval(() => {
    const skipOpening = document.querySelector('.vjs-overlay-bottom-left')
    const skipEnding = document.querySelector('.vjs-overlay-bottom-right')

    if (skipOpening) observer.observe(skipOpening, { attributes: true })
    if (skipEnding) observer.observe(skipEnding, { attributes: true })

    if (skipOpening || skipEnding) clearInterval(intervalId)
  })
})
