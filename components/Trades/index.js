import React, { useEffect, useState } from 'react'
import { uniqBy } from 'lodash'
import { DateTime } from 'luxon'
import cn from 'classnames'

import { useGlobalWebsocket } from '../../hooks'

import styles from './trades.module.css'

const TradeItem = ({ data }) => (
  <div className={styles.tradeItem}>
    <div className={cn(
      styles.tradeItemColumn,
      {
        [styles.ask]: data.side === 'sell',
        [styles.bid]: data.side === 'buy'
      })}>{data.price}</div>
    <div className={styles.tradeItemColumn}>{data.size}</div>
    <div className={styles.tradeItemColumn}>{DateTime.fromISO(data.time).toFormat('tt')}</div>
  </div>
)

const Trades = () => {
  const { trades } = useGlobalWebsocket()

  return <div>
    <h3>Trades</h3>
    <div className={styles.column}>
      {trades.map(t => (<TradeItem key={t.id} data={t} />))}
    </div>
  </div>
}
export default Trades
