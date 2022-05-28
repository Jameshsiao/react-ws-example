import React, { useState, useEffect } from 'react'

import { useGlobalWebsocket } from '../../hooks'

import styles from './header.module.css'

const Header = () => {
  const [symbol, setSymbol] = useState({ current: 'BTC/USD' })
  const { sendJsonMessage } = useGlobalWebsocket()

  useEffect(() => {
    if (symbol.prev) {
      sendJsonMessage({'op': 'unsubscribe', 'channel': 'trades', 'market': symbol.prev})
      sendJsonMessage({'op': 'unsubscribe', 'channel': 'ticker', 'market': symbol.prev})
    }
    sendJsonMessage({'op': 'subscribe', 'channel': 'trades', 'market': symbol.current})
    sendJsonMessage({'op': 'subscribe', 'channel': 'ticker', 'market': symbol.current})
  }, [symbol.current])

  return <div className={styles.header}>
    <div className={styles.headerItem}>SYMBOL</div>
    <select
      className={styles.headerItem}
      onChange={(event) => setSymbol({ prev: symbol.current, current: event.target.value })}
      value={symbol.current}>
      <option value='BTC/USD'>BTC/USD</option>
      <option value='ETH/USD'>ETH/USD</option>
    </select>
  </div>
}
export default Header