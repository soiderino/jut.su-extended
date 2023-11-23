// ==UserScript==
// @name         Jut.su Extended
// @namespace    https://github.com/soiderino/jut.su-extended
// @version      0.2
// @description  Basically automatically skips opening/ending on website.
// @author       soiderino
// @match        https://jut.su/*
// @icon         https://jut.su/favicon.ico
// @updateURL    https://github.com/soiderino/jut.su-extended/blob/main/jutsu-extended.user.js
// @downloadURL  https://github.com/soiderino/jut.su-extended/blob/main/jutsu-extended.user.js
// @supportURL   https://github.com/soiderino/jut.su-extended/issues/new
// @grant        none
// @run-at       document-end
// ==/UserScript==

;(function () {
  'use strict'

  window.addEventListener('load', () => {
    const handleMutation = (mutationsList) => {
      for (let mutation of mutationsList) {
        if (
          mutation.type === 'attributes' &&
          mutation.attributeName === 'class'
        ) {
          const target = mutation.target
          if (!target.classList.contains('vjs-hidden')) {
            // only for debugging
            // console.log('vjs-hidden class disappeared from:', target)

            target.click() // force click if the button appears
          }
        }
      }
    }

    const config = { attributes: true }

    const skipOpening = document.querySelectorAll(
      '#my-player > div.vjs-overlay.vjs-overlay-bottom-left.vjs-overlay-skip-intro.vjs-overlay-background'
    )[0]
    const skipEnding = document.querySelectorAll(
      '#my-player > div.vjs-overlay.vjs-overlay-bottom-right.vjs-overlay-skip-intro.vjs-overlay-background'
    )[0]

    const observer = new MutationObserver(handleMutation)

    if (skipOpening) observer.observe(skipOpening, config)
    if (skipEnding) observer.observe(skipEnding, config)
  })
})()
