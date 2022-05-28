import React, { useEffect, useState } from 'react'
import { DateTime } from 'luxon'
import cn from 'classnames'

import { useGlobalWebsocket } from '../../hooks'

import styles from './ticker.module.css'

const Ticker = () => {
  const { ticker } = useGlobalWebsocket()

  return <div>
    <h3>Ticker</h3>
    {ticker && (
      <div className={styles.column}>
        <div className={styles.item}>{`Date Time: ${DateTime.fromMillis(ticker.time).toFormat('yyyy-MM-dd tt')}`}</div>
        <div className={styles.item}>{`Last: ${ticker.last}`}</div>
        <div className={cn(styles.item, styles.ask)}>{`Ask: ${ticker.ask}`}</div>
        <div className={cn(styles.item, styles.ask)}>{`Ask Size: ${ticker.askSize}`}</div>
        <div className={cn(styles.item, styles.bid)}>{`Bid: ${ticker.bid}`}</div>
        <div className={cn(styles.item, styles.bid)}>{`Bid Size: ${ticker.bidSize}`}</div>
      </div>
    )}
  </div>
}
export default Ticker
