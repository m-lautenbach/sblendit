import React from 'react'
import { hydrate } from 'react-dom'
import { Provider } from 'react-redux'
import Main from '../shared/components/Main'
import store from './store'

if ('serviceWorker' in navigator) {
  window.addEventListener('load', function () {
    navigator.serviceWorker.register('/sw.js')
  })
}

window.addEventListener('DOMContentLoaded', () => {
  const parsedUrl = new URL(window.location)
  if (parsedUrl.pathname === '/share-target/') {
    alert('Title shared: ' + parsedUrl.searchParams.get('title'))
    alert('Text shared: ' + parsedUrl.searchParams.get('text'))
    alert('URL shared: ' + parsedUrl.searchParams.get('url'))
  }
})

hydrate(<Provider store={store}><Main /></Provider>, document.getElementById('app'))
