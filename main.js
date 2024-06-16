window.addEventListener('load', () => {
  const handleMutation = (mutationsList) => {
    mutationsList.forEach((mut) => {
      if (mut.type === 'attributes' && mut.attributeName === 'class') {
        const target = mut.target
        const emulateClick =
          target.title === 'Нажмите, если лень смотреть опенинг' ||
          (target.title === 'Перейти к следующему эпизоду' &&
            !target.classList.contains('vjs-hidden'))
        if (emulateClick) {
          target.dispatchEvent(new Event('click'))
        }
      }
    })
  }

  const observer = new MutationObserver(handleMutation)

  const intervalId = setInterval(() => {
    const skipOpening = document.querySelector('.vjs-overlay-bottom-left')
    const nextEpisode = document.querySelector('.vjs-overlay-bottom-right')

    if (skipOpening) observer.observe(skipOpening, { attributes: true })
    if (nextEpisode) observer.observe(nextEpisode, { attributes: true })

    if (skipOpening || nextEpisode) clearInterval(intervalId)
  })
})
